import * as MXP from 'maxpower';
import { Engine, OREngineDataEntityComponent } from 'orengine';

interface BLidgeAttachment {
	name: string,
	components: OREngineDataEntityComponent[]
}

/**
 * BLidgeClient
 * BLidgeを使用してBlenderなどの3Dツールとリアルタイムに連携するためのコンポーネント
 * WebSocketまたはJSON形式でシーンデータを受信し、エンティティとして管理する
 */
export class BLidgeClient extends MXP.Component {

	/** BLidgeインスタンス */
	private blidge: MXP.BLidge;
	/** データ取得方法の種類（WebSocketまたはJSON） */
	private type: "websocket" | "json" | null;

	/** BLidgeルートエンティティ */
	private blidgeRoot: MXP.Entity | null;
	/** 名前をキーとするエンティティのマップ */
	private entities: Map<string, MXP.Entity>;

	/** BLidgeエンティティへのコンポーネント付加データ */
	private attachments: BLidgeAttachment[];
	/** applyAttachments が一度成功したかのフラグ */
	private _attachmentsApplied: boolean;
	/** Engine.resources で解決できなかった attachment をラウンドトリップ保全する */
	private _unresolvedByEntity: Map<string, OREngineDataEntityComponent[]>;

	/** ビルド時に焼き込まれたシーンデータ。未設定なら実行時に /blidge-scene.json を fetch する */
	public static sceneData: MXP.BLidgeScene | null = null;

	// connection
	/** WebSocket接続情報 */
	private connection: {
		enabled: boolean,
		url: string,
	};

	// gltf path
	/** GLTFを使用するかどうか */
	private useGLTF: boolean;
	/** GLTFファイルのパス */
	private gltfPath: string;

	/**
	 * コンストラクタ
	 * @param params コンポーネントのパラメータ
	 */
	constructor( params: MXP.ComponentParams ) {

		super( params );

		// 初期化
		this.entities = new Map();
		this.attachments = [];
		this._attachmentsApplied = false;
		this._unresolvedByEntity = new Map();
		this.type = "websocket";
		this.connection = {
			enabled: true,
			url: "ws://localhost:3100",
		};
		this.useGLTF = false;
		this.gltfPath = BASE_PATH + "/scene.glb";

		/*-------------------------------
			BLidge初期化
		-------------------------------*/

		this.blidgeRoot = null;

		this.blidge = new MXP.BLidge( this.engine );

		// シーン同期イベントハンドラ
		const onSyncScene = this.onSyncScene.bind( this );

		// タイムライン同期イベントハンドラ
		const onSyncTimeline = ( frame: MXP.BLidgeFrame ) => {

			if ( this.entity ) {

				this.entity.noticeEventParent( "update/blidge/frame", [ frame ] );

			}

		};

		// イベントリスナー登録
		this.blidge.on( 'sync/scene', onSyncScene );
		this.blidge.on( 'sync/timeline', onSyncTimeline );

		// コンポーネント破棄時のイベントリスナー削除
		this.once( "dispose", () => {

			this.blidge.off( 'sync/scene', onSyncScene );
			this.blidge.off( 'sync/timeline', onSyncTimeline );

		} );

		/*-------------------------------
			UIフィールド設定
		-------------------------------*/

		/**
		 * 再読み込み処理
		 * 選択されたタイプに基づいてシーンを読み込み直す
		 */
		const reload = async () => {

			if ( this.type == "json" ) {

				let sceneData = BLidgeClient.sceneData;

				if ( ! sceneData ) {

					const res = await fetch( BASE_PATH + '/blidge-scene.json' );
					if ( ! res.ok ) {

						console.warn( `BLidgeClient: failed to load /blidge-scene.json (${res.status})` );
						return;

					}

					sceneData = await res.json() as MXP.BLidgeScene;

				}

				await this.blidge.loadScene( sceneData, this.useGLTF ? this.gltfPath : undefined );

				this.emit( "loaded" );

			} else {

				this.blidge.connect( this.connection.url, this.useGLTF ? this.gltfPath : undefined );

			}

		};

		// モード選択フィールド (websocket/json)
		this.field( "mode", () => this.type, v => {

			this.type = v;

			reload();

		}, {
			format: {
				type: "select",
				list: [ "websocket", "json" ],
			}
		} );

		// GLTFを使用するかどうかのフィールド
		this.field( "gltf", () => this.useGLTF, v => {

			this.useGLTF = v;

			reload();

		} );

		// GLTFパス設定フィールド
		this.field( "gltfPath", () => this.gltfPath, ( v ) => {

			this.gltfPath = v;

			reload();

		}, );

		// WebSocket設定用ディレクトリ（WebSocketモード時のみ表示）
		const ws = this.fieldDir( "websocket", { hidden: () => this.type != "websocket" } );
		// 再接続ボタン
		ws.field( "reconnect", () => () => reload(), undefined, {
			label: "Reconnect",
		} );
		// WebSocket URL設定
		ws.field( "url", () => this.connection.url, v => this.connection.url = v );

		// attachments フィールド（UIには非表示、保存対象）
		// 非同期 sync 完了前（apply 未実行）の保存で空配列を書き出してデータを壊さないよう、
		// 未 apply 時は deserialize で受け取った元データをそのまま返す
		this.field( "attachments",
			() => {

				if ( ! this.blidgeRoot || ! this._attachmentsApplied ) {

					return this.attachments as any;

				}

				return this.serializeAttachments() as any;

			},
			( v: any ) => {

				this.attachments = v || [];
				this._attachmentsApplied = false;
				this._unresolvedByEntity.clear();

			},
			{ hidden: true }
		);

	}

	private serializeAttachments(): BLidgeAttachment[] {

		if ( ! this.blidgeRoot ) return [];

		const resolver = {
			getName: ( c: MXP.Component ): string => {

				const item = Engine.resources.componentList.find(
					( ci ) => c instanceof ci.component
				);

				return item ? item.name : c.constructor.name;

			}
		};

		const result: BLidgeAttachment[] = [];

		this.blidgeRoot.traverse( entity => {

			const components: OREngineDataEntityComponent[] = [];

			entity.components.forEach( c => {

				if ( c.initiator !== "user" ) return;

				const exportFields = c.serialize( { mode: "export" } );
				const hasFields = Object.keys( exportFields ).length > 0;

				const comp: OREngineDataEntityComponent = {
					name: resolver.getName( c ),
					uuid: c.uuid,
				};

				if ( hasFields ) comp.props = exportFields;

				components.push( comp );

			} );

			const unresolved = this._unresolvedByEntity.get( entity.name );

			if ( unresolved ) {

				components.push( ...unresolved );

			}

			if ( components.length > 0 ) {

				result.push( {
					name: entity.name,
					components
				} );

			}

		} );

		return result;

	}

	private applyAttachments( blidgeRoot: MXP.Entity ) {

		this._unresolvedByEntity.clear();

		if ( ! this.attachments.length ) return;

		const attachmentMap = new Map<string, BLidgeAttachment>();
		this.attachments.forEach( a => attachmentMap.set( a.name, a ) );

		blidgeRoot.traverse( entity => {

			const attachment = attachmentMap.get( entity.name );
			if ( ! attachment ) return;

			attachment.components.forEach( c => {

				const compItem = Engine.resources.getComponent( c.name );

				if ( compItem ) {

					// BLidger の Mesh 差し替えに追従するため、毎 sync でコンストラクタを再実行させる
					entity.removeComponent( compItem.component );
					const component = entity.addComponent( compItem.component );
					component.initiator = "user";
					component.restoreUUID( c.uuid );

					if ( c.props ) {

						component.deserialize( c.props );

					}

				} else {

					console.warn( `[BLidgeClient] unresolved attachment component "${c.name}" on entity "${entity.name}". Preserving data for round-trip.` );

					const list = this._unresolvedByEntity.get( entity.name ) || [];
					list.push( { name: c.name, uuid: c.uuid, props: c.props } );
					this._unresolvedByEntity.set( entity.name, list );

				}

			} );

		} );

	}

	/**
	 * シーン同期イベントハンドラ
	 * BLidgeからシーンデータを受け取った際に呼ばれる
	 * @param blidge BLidgeインスタンス
	 */
	private async onSyncScene( blidge: MXP.BLidge ) {

		// sync 中の中間保存で空 attachments が書き出されるのを防ぐ
		this._attachmentsApplied = false;

		// 現在のタイムスタンプを取得（更新されたエンティティを追跡するため）
		const timeStamp = new Date().getTime();

		/**
		 * ノードからエンティティを再帰的に作成/更新する内部関数
		 * @param node BLidgeノード
		 * @returns 作成/更新されたエンティティ
		 */
		const _ = ( node: MXP.BLidgeNode ): MXP.Entity => {

			// 既存のエンティティがあれば取得、なければ新規作成
			const entity: MXP.Entity = ( this.entities.get( node.name ) || this.engine.createEntity() );

			// カメラノードの場合、カメラパラメータを設定
			if ( node.type == 'camera' ) {

				const cameraParam = node.param as MXP.BLidgeCameraParam;
				entity.userData.cameraParam = cameraParam;

			}

			// BLidgerコンポーネントを更新（いったん削除して再追加）
			entity.removeComponent( MXP.BLidger );
			entity.addComponent( MXP.BLidger, { blidge, node } );

			// 子ノードを再帰的に処理
			node.children.forEach( c => {

				const child = _( c );

				entity.add( child );

			} );

			// エンティティをマップに保存し、タイムスタンプを更新
			this.entities.set( entity.name, entity );
			entity.userData.updateTime = timeStamp;

			return entity;

		};

		// ルートノードからエンティティツリーを作成
		const newBLidgeRoot = blidge.root && _( blidge.root );

		if ( newBLidgeRoot ) {

			// 新しいルートエンティティに名前を設定
			newBLidgeRoot.name = "blidgeRoot";

			// 既存のルートがあれば削除
			if ( this.blidgeRoot && this.entity ) {

				this.entity.remove( this.blidgeRoot );

			}

			// 新しいルートを設定
			this.blidgeRoot = newBLidgeRoot;

			// 親エンティティに追加
			if ( this.entity ) {

				this.entity.add( this.blidgeRoot );

			}

		}

		// 古いエンティティ（タイムスタンプが更新されていないもの）を削除
		this.entities.forEach( item => {

			if ( item.userData.updateTime != timeStamp ) {

				const parent = item.parent;

				if ( parent ) {

					parent.remove( item );

				}

				item.dispose();
				this.entities.delete( item.name );

			}

		} );

		// BLidger 内の gltfPrm.then(...) ハンドラが drain してから apply するため await を挟む
		if ( blidge.gltf ) {

			await blidge.gltfPrm;

		}

		// attachments からコンポーネントを適用
		if ( this.blidgeRoot ) {

			this.applyAttachments( this.blidgeRoot );
			this._attachmentsApplied = true;

		}

		// イベント通知
		if ( this.entity ) {

			// シーン作成イベントを子に通知
			this.entity.noticeEventChilds( "sceneCreated", [ this.blidgeRoot ] );
			// シーン更新イベントを親に通知
			this.entity.noticeEventParent( "update/blidge/scene", [ this.blidgeRoot ] );

		}

	}

	/**
	 * コンポーネントの破棄処理
	 * リソースの解放とエンティティの削除を行う
	 */
	public dispose(): void {

		super.dispose();

		// BLidgeルートエンティティがある場合は破棄
		if ( this.blidgeRoot ) {

			this.blidgeRoot.disposeRecursive();
			this.entity.remove( this.blidgeRoot );
			this.blidgeRoot = null;

		}

		this._attachmentsApplied = false;
		this._unresolvedByEntity.clear();

	}

}
