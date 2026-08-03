import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';

export class WireframeRenderer {

	private _draw: MXP.EditorDrawContract;
	private _showWireframe: boolean;
	private _wireframeMaterial: MXP.MaterialContract;
	private _wireframeGeometryCache: Map<MXP.Geometry, MXP.Geometry>;

	constructor( draw: MXP.EditorDrawContract ) {

		this._draw = draw;
		this._showWireframe = false;
		this._wireframeGeometryCache = new Map();

		this._wireframeMaterial = draw.materials.flat( {
			color: [ 0.3, 0.8, 0.3 ],
			lines: true,
			depthWrite: false,
		} );

	}

	public get showWireframe() {

		return this._showWireframe;

	}

	public set showWireframe( v: boolean ) {

		this._showWireframe = v;

	}

	public render( cameraMode: string, cameraEntity: MXP.Entity | null, engine: Engine ) {

		if ( ! this._showWireframe || cameraMode !== "scene" ) return;

		if ( ! cameraEntity ) return;

		const meshEntities = this._collectMeshEntities( engine.root );

		const origGeometries: Map<MXP.Entity, MXP.Geometry> = new Map();

		for ( const entity of meshEntities ) {

			const mesh = entity.getComponent( MXP.Mesh );
			if ( ! mesh ) continue;

			origGeometries.set( entity, mesh.geometry );

			let wireGeo = this._wireframeGeometryCache.get( mesh.geometry );

			if ( ! wireGeo ) {

				wireGeo = this._createWireframeGeometry( mesh.geometry );
				this._wireframeGeometryCache.set( mesh.geometry, wireGeo );

			}

			mesh.geometry = wireGeo;

		}

		this._draw.renderEntities( {
			camera: cameraEntity,
			entities: meshEntities,
			target: null,
			materialOverride: this._wireframeMaterial,
		} );

		for ( const entity of meshEntities ) {

			const mesh = entity.getComponent( MXP.Mesh );
			if ( ! mesh ) continue;

			const origGeo = origGeometries.get( entity );

			if ( origGeo ) mesh.geometry = origGeo;

		}

	}

	// 表示中のメッシュエンティティを木から集める
	private _collectMeshEntities( root: MXP.Entity ): MXP.Entity[] {

		const result: MXP.Entity[] = [];

		const collect = ( entity: MXP.Entity, parentVisible: boolean ) => {

			const visible = parentVisible && entity.visible;

			if ( visible && entity.getComponent( MXP.Mesh ) ) {

				result.push( entity );

			}

			for ( let i = 0; i < entity.children.length; i ++ ) {

				collect( entity.children[ i ], visible );

			}

		};

		collect( root, true );

		return result;

	}

	private _createWireframeGeometry( srcGeometry: MXP.Geometry ): MXP.Geometry {

		const geo = new MXP.Geometry();
		const posAttr = srcGeometry.getAttribute( 'position' );
		const indexAttr = srcGeometry.getAttribute( 'index' );

		if ( ! posAttr ) return geo;

		geo.setAttribute( 'position', posAttr.array, 3 );

		const normalAttr = srcGeometry.getAttribute( 'normal' );

		if ( normalAttr ) {

			geo.setAttribute( 'normal', normalAttr.array, 3 );

		}

		if ( indexAttr ) {

			const indices = indexAttr.array;
			const edgeSet = new Set<string>();
			const lineIndices: number[] = [];

			for ( let i = 0; i < indices.length; i += 3 ) {

				const a = indices[ i ];
				const b = indices[ i + 1 ];
				const c = indices[ i + 2 ];

				const edges = [
					[ Math.min( a, b ), Math.max( a, b ) ],
					[ Math.min( b, c ), Math.max( b, c ) ],
					[ Math.min( c, a ), Math.max( c, a ) ],
				];

				for ( const [ e0, e1 ] of edges ) {

					const key = `${e0}_${e1}`;

					if ( ! edgeSet.has( key ) ) {

						edgeSet.add( key );
						lineIndices.push( e0, e1 );

					}

				}

			}

			geo.setAttribute( 'index', new Uint16Array( lineIndices ), 1 );

		}

		return geo;

	}

}
