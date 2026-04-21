import { Component, ComponentParams } from "..";
import { Geometry } from "../../Geometry";
import { CubeGeometry } from "../../Geometry/CubeGeometry";
import { CylinderGeometry } from "../../Geometry/CylinderGeometry";
import { PlaneGeometry } from "../../Geometry/PlaneGeometry";
import { SphereGeometry } from "../../Geometry/SphereGeometry";
import { Material } from "../../Material";

const defaultGeometry = new Geometry();
export const defaultMeshMaterial = new Material();

export class Mesh extends Component {

	public geometry: Geometry;
	public material: Material;

	public static getGeometryList: () => { name: string, geometryClass: typeof Geometry }[] = () => [];

	private _geometryType: string;
	private _geometryParams: { [key: string]: number | boolean };

	constructor( params: ComponentParams<{ geometry?: Geometry; material?: Material } | void> ) {

		super( params );

		const args = params.args || {};

		this.geometry = args.geometry || defaultGeometry;
		this.material = args.material || defaultMeshMaterial;
		this._geometryType = "";
		this._geometryParams = {};

		/*-------------------------------
			Geometry Fields
		-------------------------------*/

		const geo = this.fieldDir( "geometry" );

		geo.field( "type", () => this._geometryType, ( v ) => {

			this._geometryType = v;
			this._rebuildGeometry();

		}, {
			format: {
				type: "select",
				list: () => {

					const list: { label: string, value: string }[] = [ { label: "(None)", value: "" } ];

					Mesh.getGeometryList().forEach( g => {

						list.push( { label: g.name, value: g.name } );

					} );

					return list;

				}
			}
		} );

		geo.field( "width",
			() => this._geometryParams.width ?? 1,
			( v ) => {

				this._geometryParams.width = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Cube" && this._geometryType !== "Plane", step: 0.1 }
		);

		geo.field( "height",
			() => this._geometryParams.height ?? 1,
			( v ) => {

				this._geometryParams.height = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Cube" && this._geometryType !== "Cylinder", step: 0.1 }
		);

		geo.field( "depth",
			() => this._geometryParams.depth ?? 1,
			( v ) => {

				this._geometryParams.depth = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Cube", step: 0.1 }
		);

		geo.field( "radius",
			() => this._geometryParams.radius ?? 0.5,
			( v ) => {

				this._geometryParams.radius = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Sphere", step: 0.1 }
		);

		geo.field( "widthSegments",
			() => this._geometryParams.widthSegments ?? 8,
			( v ) => {

				this._geometryParams.widthSegments = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Sphere" && this._geometryType !== "Cylinder", step: 1 }
		);

		geo.field( "heightSegments",
			() => this._geometryParams.heightSegments ?? 8,
			( v ) => {

				this._geometryParams.heightSegments = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Sphere" && this._geometryType !== "Cylinder", step: 1 }
		);

		geo.field( "floor",
			() => this._geometryParams.floor ?? false,
			( v ) => {

				this._geometryParams.floor = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Plane" }
		);

		geo.field( "radiusTop",
			() => this._geometryParams.radiusTop ?? 1,
			( v ) => {

				this._geometryParams.radiusTop = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Cylinder", step: 0.1 }
		);

		geo.field( "radiusBottom",
			() => this._geometryParams.radiusBottom ?? 1,
			( v ) => {

				this._geometryParams.radiusBottom = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Cylinder", step: 0.1 }
		);

		geo.field( "caps",
			() => this._geometryParams.caps ?? true,
			( v ) => {

				this._geometryParams.caps = v;
				this._rebuildGeometry();

			},
			{ hidden: () => this._geometryType !== "Cylinder" }
		);

	}

	/*-------------------------------
		Geometry Rebuild
	-------------------------------*/

	private _rebuildGeometry() {

		if ( ! this._geometryType ) return;

		this.geometry.dispose();
		this.geometry = this._createGeometryWithParams( this._geometryType );

	}

	private _createGeometryWithParams( type: string ): Geometry {

		const p = this._geometryParams;

		switch ( type ) {

		case "Cube":
			return new CubeGeometry( { width: p.width as number, height: p.height as number, depth: p.depth as number } );

		case "Sphere":
			return new SphereGeometry( { radius: p.radius as number, widthSegments: p.widthSegments as number, heightSegments: p.heightSegments as number } );

		case "Plane":
			return new PlaneGeometry( { width: p.width as number, height: p.height as number, floor: p.floor as boolean } );

		case "Cylinder":
			return new CylinderGeometry( { height: p.height as number, radiusTop: p.radiusTop as number, radiusBottom: p.radiusBottom as number, caps: p.caps as boolean } );

		default: {

			const item = Mesh.getGeometryList().find( g => g.name === type );

			if ( item ) {

				return new item.geometryClass();

			}

			return new Geometry();

		}

		}

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		if ( this._geometryType ) {

			this.geometry.dispose();

		}

		super.dispose();

	}

}
