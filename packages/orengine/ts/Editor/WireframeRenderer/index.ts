import * as MXP from 'maxpower';

import { Engine } from '../../Engine';
import gizmoFrag from '../shaders/gizmo.fs';
import gizmoVert from '../shaders/gizmo.vs';

export class WireframeRenderer {

	private _showWireframe: boolean;
	private _wireframeMaterial: MXP.Material;
	private _wireframeGeometryCache: Map<MXP.Geometry, MXP.Geometry>;

	constructor() {

		this._showWireframe = false;
		this._wireframeGeometryCache = new Map();

		this._wireframeMaterial = new MXP.Material( {
			vert: gizmoVert,
			frag: gizmoFrag,
			drawType: 'LINES',
			phase: [ "forward" ],
			depthTest: true,
			depthWrite: false,
			uniforms: { uColor: { value: [ 0.3, 0.8, 0.3 ], type: '3fv' } },
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

		const stack = engine.renderer.getRenderStack( engine.root );
		const meshEntities = [ ...stack.deferred, ...stack.forward ];

		const origMaterials: Map<MXP.Entity, MXP.Material> = new Map();
		const origGeometries: Map<MXP.Entity, MXP.Geometry> = new Map();

		for ( const entity of meshEntities ) {

			const mesh = entity.getComponent( MXP.Mesh );
			if ( ! mesh ) continue;

			origMaterials.set( entity, mesh.material );
			origGeometries.set( entity, mesh.geometry );

			mesh.material = this._wireframeMaterial;

			let wireGeo = this._wireframeGeometryCache.get( mesh.geometry );

			if ( ! wireGeo ) {

				wireGeo = this._createWireframeGeometry( mesh.geometry );
				this._wireframeGeometryCache.set( mesh.geometry, wireGeo );

			}

			mesh.geometry = wireGeo;

		}

		engine.renderer.renderCamera(
			"forward",
			cameraEntity,
			meshEntities,
			engine.renderer.renderTarget.uiBuffer,
			engine.renderer.resolution,
			{ disableClear: true }
		);

		for ( const entity of meshEntities ) {

			const mesh = entity.getComponent( MXP.Mesh );
			if ( ! mesh ) continue;

			const origMat = origMaterials.get( entity );
			const origGeo = origGeometries.get( entity );

			if ( origMat ) mesh.material = origMat;
			if ( origGeo ) mesh.geometry = origGeo;

		}

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
