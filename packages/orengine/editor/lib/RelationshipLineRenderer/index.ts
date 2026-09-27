import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../core/Engine';
import { quaternionFromTo } from '../TransformUtils';

// 線の色。Blender の Relationship Lines と同じく、ヘルパーより控えめな灰色にする
const LINE_COLOR = [ 0.55, 0.55, 0.55 ];

// 点線の1周期（線＋隙間）の長さ。画面の高さを 2 とした単位（NDC）で、1080px の画面なら約 12px
const DASH_PERIOD_NDC = 2 / 90;

// 作り置きする点線の数の上限。画面上でこれより長い線は、点の間隔が広がる
const MAX_DASHES = 128;

// 線を置く向き。形状は +Z に沿って 0〜1 に作る
const LINE_AXIS = new MTP.Vector( 0, 0, 1 );

// 親子の間に、子の原点から親の原点まで点線を引く（Blender の Relationship Lines）。
// 点の数ごとの形状を作り置きし、線ごとに画面上の長さから数を選んで伸ばす。毎フレーム頂点を作り直すと GPU のバッファも
// 作り直しになるので、それを避けつつ画面上の点の間隔をそろえるため
export class RelationshipLineRenderer {

	private _engine: MXP.EngineContract;
	private _draw: MXP.EditorDrawContract;
	private _material: MXP.MaterialContract;
	private _root: MXP.Entity;
	// 点の数 → 形状
	private _geometries: Map<number, MXP.Geometry>;
	// 線の実体。足りなくなったら足し、余った分は描かないだけにする
	private _lines: MXP.Entity[];

	constructor( engine: MXP.EngineContract, draw: MXP.EditorDrawContract ) {

		this._engine = engine;
		this._draw = draw;
		this._material = draw.materials.flat( { color: LINE_COLOR, lines: true } );
		this._geometries = new Map();
		this._lines = [];

		this._root = engine.createEntity( { name: "__relationship_lines" } );
		this._root.initiator = "god";

	}

	public render( view: MXP.RenderViewContract, cameraEntity: MXP.Entity | null, engine: Engine ) {

		if ( ! cameraEntity ) return;

		const camera = cameraEntity.getComponentsByTag<MXP.Camera>( "camera" )[ 0 ];

		if ( ! camera ) return;

		const drawLines: MXP.Entity[] = [];

		engine.root.traverseEditable( ( entity ) => {

			const parent = entity.parent;

			// root の直下は親子関係として見せるものが無い。ギズモ等のエディタ管理（god）は対象外
			if ( ! parent || parent === engine.root ) return;
			if ( entity.initiator === "god" || parent.initiator === "god" ) return;

			// 非表示のものと、Cloner のテンプレート（描かれない）には引かない
			if ( ! entity.isVisibleTraverse() || entity.isRenderHiddenTraverse() ) return;

			const childElm = entity.matrixWorld.elm;
			const parentElm = parent.matrixWorld.elm;
			const from = new MTP.Vector( childElm[ 12 ], childElm[ 13 ], childElm[ 14 ] );
			const to = new MTP.Vector( parentElm[ 12 ], parentElm[ 13 ], parentElm[ 14 ] );
			const direction = to.clone().sub( from );
			const length = direction.length();

			if ( length < 1e-6 ) return;

			const line = this._getLine( drawLines.length );
			const mesh = line.getComponent( MXP.Mesh )!;

			mesh.geometry = this._getGeometry( this._dashCount( from, to, camera ) );

			line.position.copy( from );
			line.quaternion.copy( quaternionFromTo( LINE_AXIS, direction ) );
			line.scale.set( 1, 1, length );

			drawLines.push( line );

		} );

		if ( drawLines.length === 0 ) return;

		this._root.updateMatrix( true );
		this._root.update( engine.createEntityUpdateEvent() );

		this._draw.renderEntities( {
			view,
			camera: cameraEntity,
			entities: drawLines,
			target: null,
		} );

	}

	// 画面上の長さに合う点の数。片方がカメラの後ろにあって長さが測れないときは上限にする
	private _dashCount( from: MTP.Vector, to: MTP.Vector, camera: MXP.Camera ): number {

		const a = this._projectToNDC( from, camera );
		const b = this._projectToNDC( to, camera );

		if ( ! a || ! b ) return MAX_DASHES;

		// NDC の横は画面の幅を 2 とする単位なので、縦と同じ尺度にそろえてから測る
		const dx = ( b.x - a.x ) * camera.aspect;
		const dy = b.y - a.y;
		const count = Math.round( Math.sqrt( dx * dx + dy * dy ) / DASH_PERIOD_NDC );

		return Math.min( MAX_DASHES, Math.max( 1, count ) );

	}

	// ワールド座標をカメラの NDC へ投影する（カメラの後ろは null）
	private _projectToNDC( worldPos: MTP.Vector, camera: MXP.Camera ): MTP.Vector | null {

		const p = new MTP.Vector( worldPos.x, worldPos.y, worldPos.z, 1 )
			.applyMatrix4( camera.viewMatrix )
			.applyMatrix4( camera.projectionMatrix );

		if ( p.w <= 0 ) return null;

		return new MTP.Vector( p.x / p.w, p.y / p.w );

	}

	// index 番目の線の実体。無ければ作る
	private _getLine( index: number ): MXP.Entity {

		const existing = this._lines[ index ];

		if ( existing ) return existing;

		const line = this._engine.createEntity( { name: "__relationship_line" } );
		line.initiator = "god";
		line.addComponent( MXP.Mesh, { geometry: this._getGeometry( 1 ), material: this._material } );

		this._root.add( line );
		this._lines.push( line );

		return line;

	}

	// 0〜1 を count 等分し、各区間の前半だけを線にした点線の形状。数ごとに作り置きする
	private _getGeometry( count: number ): MXP.Geometry {

		const cached = this._geometries.get( count );

		if ( cached ) return cached;

		const positions: number[] = [];

		for ( let i = 0; i < count; i ++ ) {

			positions.push( 0, 0, i / count );
			positions.push( 0, 0, ( i + 0.5 ) / count );

		}

		const geometry = new MXP.Geometry();
		geometry.setAttribute( 'position', new Float32Array( positions ), 3 );
		geometry.setAttribute( 'normal', new Float32Array( positions.length ).fill( 0 ), 3 );

		this._geometries.set( count, geometry );

		return geometry;

	}

}
