import { cloneEntity, Component, ComponentParams, ComponentUpdateEvent, Entity, Serializable, SerializableFieldOpt, SerializeFieldValue } from 'maxpower';
import { Engine } from 'orengine';

import { Animation, AnimationLinks } from '../Animation';

import { ClonerSlot } from './ClonerSlot';
import { CLONER_LAYOUT_KIND, ClonerLayout, ClonerLayoutParams, DEFAULT_CLONER_LAYOUT } from './layout';
import { ClonerOrder, ClonerSettings, ClonerSlotSpec, computeSlots } from './slots';

// slots.ts の ClonerOrder と同じ並び
const ORDER_LIST: ClonerOrder[] = [ 'layout', 'index', 'center', 'x', 'y', 'z', 'random' ];

// 数値の配列を新しい配列に写す
const copyNumbers = ( values: number[] ): number[] => {

	const result: number[] = [];

	for ( const value of values ) {

		result.push( value );

	}

	return result;

};

// 並べ方の数値1つを写す。配列は新しく作る
const copyParamValue = ( value: number | number[] ): number | number[] => {

	if ( Array.isArray( value ) ) {

		return copyNumbers( value );

	}

	return value;

};

// 直下の子のうち initiator が user のもの（登録順）
const getUserChildren = ( entity: Entity ): Entity[] => {

	const result: Entity[] = [];

	for ( const child of entity.children ) {

		if ( child.initiator === "user" ) {

			result.push( child );

		}

	}

	return result;

};

// 2つのエンティティの並びが、同じエンティティを同じ順に持っているか
const isSameEntityList = ( a: Entity[], b: Entity[] ): boolean => {

	if ( a.length !== b.length ) {

		return false;

	}

	for ( let i = 0; i < a.length; i ++ ) {

		if ( a[ i ].uuid !== b[ i ].uuid ) {

			return false;

		}

	}

	return true;

};

// 直下の子（テンプレート）を、並べ方の持ち場の数だけ実行時に複製して並べる。
// 持ち場ごとに時刻をずらすので、テンプレートに打ったキーが複製ごとに時間差で再生される。複製は保存しない
export class Cloner extends Component {

	private layoutName_: string;
	// 並べ方ごとの数値。並べ方を切り替えて戻したときに値を戻すため、使っていない並べ方の分も持っておく
	private paramValues_: Map<string, ClonerLayoutParams>;
	// layout より後ろに登録しているフィールドのパス（params/* と delay/* ・ jitter/*）
	private trailingFieldPaths_: string[];
	private order_: ClonerOrder;
	private spread_: number;
	private loop_: boolean;
	private jitterPosition_: number[];
	private jitterRotation_: number[];
	private jitterScale_: number;
	private seed_: number;

	private slots_: ClonerSlot[];
	private templates_: Entity[];
	// テンプレート側のエンティティ・コンポーネント → 持ち場ごとの対応する複製
	private counterparts_: Map<Serializable, Serializable[]>;
	// 同期のために付けたリスナー。作り直し・破棄のときに外す
	private listeners_: { target: Serializable, listener: ( paths: string[] ) => void }[];
	private rebuildRequested_: boolean;
	private placementDirty_: boolean;
	// 最後に作ったときの「自分がテンプレートの中にいるか」
	private builtHidden_: boolean;

	private onEntityUpdate_: ( paths: string[] ) => void;
	private onSelfUpdate_: ( paths: string[] ) => void;

	constructor( params: ComponentParams ) {

		super( params );

		this.layoutName_ = DEFAULT_CLONER_LAYOUT;
		this.paramValues_ = new Map();
		this.trailingFieldPaths_ = [];
		this.order_ = 'layout';
		this.spread_ = 0;
		this.loop_ = true;
		this.jitterPosition_ = [ 0, 0, 0 ];
		this.jitterRotation_ = [ 0, 0, 0 ];
		this.jitterScale_ = 0;
		this.seed_ = 0;

		this.slots_ = [];
		this.templates_ = [];
		this.counterparts_ = new Map();
		this.listeners_ = [];
		this.rebuildRequested_ = true;
		this.placementDirty_ = false;
		this.builtHidden_ = false;

		// deserialize は props のキー順に set し、未登録のフィールドは捨てる。
		// layout を先に登録しておけば、読み込み時に layout が入った時点で params/* が登録済みになる
		this.field( "layout", () => this.layoutName_, ( v: string ) => this.setLayout_( v ), {
			format: { type: "select", list: () => Engine.resources.getLibraryItemNames( CLONER_LAYOUT_KIND ) }
		} );

		this.applyTrailingFields_();

		// 持ち場の追加・削除でも children が通知されるので、テンプレートの並びが変わったときだけ作り直す
		// （比べずに作り直すと、作り直しの通知でまた作り直してしまう）
		this.onEntityUpdate_ = ( paths: string[] ) => {

			if ( paths.indexOf( "children" ) === - 1 ) return;

			if ( ! isSameEntityList( getUserChildren( this.entity ), this.templates_ ) ) {

				this.rebuildRequested_ = true;

			}

		};

		// 無効の間は updateImpl が呼ばれないので、無効にした時点でここで片付ける
		this.onSelfUpdate_ = ( paths: string[] ) => {

			if ( paths.indexOf( "enabled" ) === - 1 ) return;

			if ( this.enabled ) {

				this.rebuildRequested_ = true;

			} else {

				this.teardown_();

			}

		};

		this.entity.on( "fields/update", this.onEntityUpdate_ );
		this.on( "fields/update", this.onSelfUpdate_ );

	}

	/*-------------------------------
		Fields
	-------------------------------*/

	// 並べ方を切り替え、params/* を登録し直す。個数が変わりうるので作り直す
	private setLayout_( name: string ) {

		this.layoutName_ = name;
		this.applyTrailingFields_();
		this.rebuildRequested_ = true;

	}

	// layout より後ろのフィールドを、params/* → delay/* → jitter/* の順に登録し直す。
	// パネルは登録順に並び、登録済みのパスを登録し直しても位置は変わらないので、一度全部外してから登録する
	// （params/* だけを登録し直すと、並べ方を切り替えるたびに params/* が末尾に回る）
	private applyTrailingFields_() {

		for ( const path of this.trailingFieldPaths_ ) {

			this.removeField( path );

		}

		this.trailingFieldPaths_ = [];

		this.applyParamFields_();
		this.applySettingFields_();

	}

	// layout より後ろのフィールドを1つ登録し、applyTrailingFields_ で外せるようにパスを覚えておく
	private addTrailingField_<T extends SerializeFieldValue>( path: string, getter: () => T, setter: ( v: T ) => void, opt?: SerializableFieldOpt ) {

		this.field( path, getter, setter, opt );
		this.trailingFieldPaths_.push( path );

	}

	// 今の並べ方の params のキーごとに params/<キー> を登録する
	private applyParamFields_() {

		const layout = Engine.resources.getLibraryItem<ClonerLayout>( CLONER_LAYOUT_KIND, this.layoutName_ );

		if ( ! layout ) return;

		let values = this.paramValues_.get( this.layoutName_ );

		if ( ! values ) {

			values = {};

			for ( const key of Object.keys( layout.params ) ) {

				values[ key ] = copyParamValue( layout.params[ key ] );

			}

			this.paramValues_.set( this.layoutName_, values );

		}

		const layoutValues = values;

		for ( const key of Object.keys( layout.params ) ) {

			let opt: SerializableFieldOpt = {};

			if ( layout.paramOptions && layout.paramOptions[ key ] ) {

				opt = { ...layout.paramOptions[ key ] };

			}

			if ( Array.isArray( layout.params[ key ] ) ) {

				opt.format = { type: "vector" };

			}

			this.addTrailingField_( `params/${key}`, () => copyParamValue( layoutValues[ key ] ), ( v: number | number[] ) => {

				layoutValues[ key ] = copyParamValue( v );
				this.placementDirty_ = true;

			}, opt );

		}

	}

	private applySettingFields_() {

		this.addTrailingField_( "delay/order", () => this.order_, ( v: ClonerOrder ) => {

			this.order_ = v;
			this.placementDirty_ = true;

		}, { format: { type: "select", list: ORDER_LIST } } );

		this.addTrailingField_( "delay/spread", () => this.spread_, ( v: number ) => {

			this.spread_ = v;
			this.placementDirty_ = true;

		} );

		this.addTrailingField_( "delay/loop", () => this.loop_, ( v: boolean ) => {

			this.loop_ = v;
			this.placementDirty_ = true;

		} );

		this.addTrailingField_( "jitter/position", () => copyNumbers( this.jitterPosition_ ), ( v: number[] ) => {

			this.jitterPosition_ = copyNumbers( v );
			this.placementDirty_ = true;

		}, { format: { type: "vector" } } );

		this.addTrailingField_( "jitter/rotation", () => copyNumbers( this.jitterRotation_ ), ( v: number[] ) => {

			this.jitterRotation_ = copyNumbers( v );
			this.placementDirty_ = true;

		}, { format: { type: "vector" } } );

		this.addTrailingField_( "jitter/scale", () => this.jitterScale_, ( v: number ) => {

			this.jitterScale_ = v;
			this.placementDirty_ = true;

		} );

		this.addTrailingField_( "jitter/seed", () => this.seed_, ( v: number ) => {

			this.seed_ = v;
			this.placementDirty_ = true;

		}, { int: true, min: 0, step: 1 } );

	}

	/*-------------------------------
		Update
	-------------------------------*/

	protected updateImpl( _event: ComponentUpdateEvent ) {

		const hidden = this.entity.isRenderHiddenTraverse();

		if ( hidden !== this.builtHidden_ ) {

			this.rebuildRequested_ = true;

		}

		if ( this.rebuildRequested_ ) {

			this.rebuildRequested_ = false;
			this.placementDirty_ = false;
			this.rebuild_();

		} else if ( this.placementDirty_ ) {

			this.placementDirty_ = false;
			this.updatePlacement_();

		}

		let loopFrames: number | null = null;

		if ( this.loop_ ) {

			loopFrames = ( this.engine as unknown as Engine ).frameSetting.duration;

		}

		for ( const slot of this.slots_ ) {

			slot.loopFrames = loopFrames;

		}

	}

	/*-------------------------------
		Build
	-------------------------------*/

	// 今の設定での持ち場。並べ方が見つからなければ null
	private computeSpecs_(): ClonerSlotSpec[] | null {

		const layout = Engine.resources.getLibraryItem<ClonerLayout>( CLONER_LAYOUT_KIND, this.layoutName_ );

		if ( ! layout ) return null;

		// 並べ方がこの Cloner より後に登録されたときは、まだ数値のフィールドが無いのでここで作る
		if ( ! this.paramValues_.has( this.layoutName_ ) ) {

			this.applyTrailingFields_();

		}

		const params = this.paramValues_.get( this.layoutName_ );

		if ( ! params ) return null;

		const settings: ClonerSettings = {
			order: this.order_,
			spread: this.spread_,
			jitterPosition: this.jitterPosition_,
			jitterRotation: this.jitterRotation_,
			jitterScale: this.jitterScale_,
			seed: this.seed_,
		};

		return computeSlots( layout, params, settings );

	}

	// 持ち場と複製を全部作り直す
	private rebuild_() {

		this.teardown_();

		this.templates_ = getUserChildren( this.entity );
		this.builtHidden_ = this.entity.isRenderHiddenTraverse();

		// ほかの Cloner のテンプレートの中では作らない（コピーされた側の Cloner が作る）
		if ( this.builtHidden_ ) return;

		const specs = this.computeSpecs_();

		if ( ! specs ) {

			console.warn( `[Cloner] layout "${this.layoutName_}" not found` );

			return;

		}

		for ( const template of this.templates_ ) {

			template.renderHidden = true;

		}

		for ( let index = 0; index < specs.length; index ++ ) {

			const slot = new ClonerSlot( { engine: this.engine, name: `${this.entity.name}#${index}` } );
			slot.editorHidden = true;
			this.applySpec_( slot, specs[ index ] );
			this.entity.add( slot );

			for ( const template of this.templates_ ) {

				const copy = cloneEntity( this.engine, template );
				this.linkCounterparts_( template, copy );
				slot.add( copy );

			}

			this.slots_.push( slot );

		}

		this.subscribeTemplates_();

	}

	// 持ち場と複製を片付け、テンプレートを見える状態に戻す
	private teardown_() {

		for ( const slot of this.slots_ ) {

			slot.disposeRecursive();

		}

		this.slots_ = [];

		for ( const item of this.listeners_ ) {

			item.target.off( "fields/update", item.listener );

		}

		this.listeners_ = [];
		this.counterparts_.clear();

		for ( const template of this.templates_ ) {

			template.renderHidden = false;

		}

	}

	// 持ち場に位置・回転・大きさ・遅れを入れる
	private applySpec_( slot: ClonerSlot, spec: ClonerSlotSpec ) {

		slot.position.setFromArray( spec.position );
		slot.euler.setFromArray( spec.rotation );
		slot.scale.setFromArray( spec.scale );
		slot.delayFrames = spec.delay * 60;

	}

	// 数値だけが変わったときに持ち場を置き直す。個数が変わったら作り直す
	private updatePlacement_() {

		const specs = this.computeSpecs_();

		if ( ! specs || specs.length !== this.slots_.length ) {

			this.rebuild_();

			return;

		}

		for ( let index = 0; index < specs.length; index ++ ) {

			this.applySpec_( this.slots_[ index ], specs[ index ] );

		}

	}

	/*-------------------------------
		Template Sync
	-------------------------------*/

	private addCounterpart_( source: Serializable, copy: Serializable ) {

		let list = this.counterparts_.get( source );

		if ( ! list ) {

			list = [];
			this.counterparts_.set( source, list );

		}

		list.push( copy );

	}

	// テンプレート側と複製側のエンティティ・コンポーネントを対応づける（子も再帰で）
	private linkCounterparts_( source: Entity, copy: Entity ) {

		copy.cloneSource = source;
		this.addCounterpart_( source, copy );

		for ( const component of source.components.values() ) {

			if ( component.initiator !== "user" ) continue;

			const copiedComponent = copy.getComponent( component.constructor as typeof Component );

			if ( copiedComponent ) {

				this.addCounterpart_( component, copiedComponent );

			}

		}

		// cloneEntity はコンポーネントを先に足すので、コンポーネントが constructor で作った script の子が
		// copy の先頭に入っていることがある。user だけに絞った並びどうしで対応させる
		const sourceChildren = getUserChildren( source );
		const copyChildren = getUserChildren( copy );

		for ( let i = 0; i < sourceChildren.length; i ++ ) {

			if ( i >= copyChildren.length ) break;

			this.linkCounterparts_( sourceChildren[ i ], copyChildren[ i ] );

		}

	}

	private listen_( target: Serializable, listener: ( paths: string[] ) => void ) {

		target.on( "fields/update", listener );
		this.listeners_.push( { target, listener } );

	}

	// テンプレート配下の user のエンティティと、その user のコンポーネントの変化を受ける
	private subscribeTemplates_() {

		for ( const template of this.templates_ ) {

			this.subscribeEntity_( template );

		}

	}

	private subscribeEntity_( entity: Entity ) {

		this.listen_( entity, ( paths: string[] ) => this.onTemplateUpdate_( entity, entity, paths ) );

		for ( const component of entity.components.values() ) {

			if ( component.initiator !== "user" ) continue;

			this.listen_( component, ( paths: string[] ) => this.onTemplateUpdate_( entity, component, paths ) );

		}

		for ( const child of getUserChildren( entity ) ) {

			this.subscribeEntity_( child );

		}

	}

	// テンプレート側で変わった値を、対応する複製へ写す。子・コンポーネントの増減は作り直す
	private onTemplateUpdate_( owner: Entity, target: Serializable, paths: string[] ) {

		for ( const path of paths ) {

			if ( target === owner && ( path === "children" || path === "components" ) ) {

				this.rebuildRequested_ = true;

				continue;

			}

			if ( this.isAnimated_( owner, target, path ) ) continue;

			const value = target.getField<SerializeFieldValue>( path );

			if ( value === undefined || typeof value === "function" ) continue;

			const copies = this.counterparts_.get( target );

			if ( ! copies ) continue;

			for ( const copy of copies ) {

				if ( copy.getFieldOpt( path ) === undefined ) continue;

				copy.setField( path, value );

			}

		}

	}

	// テンプレート側の Animation がリンクしているフィールドか。
	// 遅れていない値を写すと複製の遅れた値が上書きされ、停止中はそのまま残るので写さない
	private isAnimated_( owner: Entity, target: Serializable, path: string ): boolean {

		const animation = owner.getComponent( Animation );

		if ( ! animation ) return false;

		const links = animation.getField( "links" ) as AnimationLinks | undefined;

		if ( ! links ) return false;

		let key = path;

		if ( target !== owner ) {

			key = `${Engine.resources.getComponentName( target as Component )}:${path}`;

		}

		return Object.prototype.hasOwnProperty.call( links, key );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		super.dispose();

		this.teardown_();

		this.entity.off( "fields/update", this.onEntityUpdate_ );
		this.off( "fields/update", this.onSelfUpdate_ );

	}

}
