import * as GLP from 'glpower';

import { Component, ComponentUpdateEvent } from "../Component";
import { RenderCamera } from '../Component/Camera/RenderCamera';
import { Light } from '../Component/Light';
import { Mesh } from '../Component/Mesh';
import { RenderStack } from '../Component/Renderer';
import { Serializable } from '../Serializable';

export type EntityUpdateEvent = {
	timElapsed: number;
	timeDelta: number;
	timeCode: number;
	timeCodeFrame: number;
	playing: boolean;
	matrix?: GLP.Matrix;
	visibility?: boolean;
	forceDraw?: boolean
}

export type EntityFinalizeEvent = {
	renderStack?: RenderStack;
} & EntityUpdateEvent

export type EntityResizeEvent = {
	resolution: GLP.Vector
}

export type EntityParams = {
	name?: string;
}

export class Entity extends Serializable {

	public name: string;
	public position: GLP.Vector;
	public euler: GLP.Euler;
	public quaternion: GLP.Quaternion;
	public scale: GLP.Vector;
	public matrix: GLP.Matrix;
	public matrixWorld: GLP.Matrix;
	public matrixWorldPrev: GLP.Matrix;
	public autoMatrixUpdate: boolean;
	public parent: Entity | null;
	public children: Entity[];
	public components: Map<typeof Component, Component>;
	public visible: boolean;
	public userData: any;

	constructor( params?: EntityParams ) {

		super();

		this.name = params && params.name || "";

		this.position = new GLP.Vector( 0.0, 0.0, 0.0, 1.0 );
		this.euler = new GLP.Euler();
		this.quaternion = new GLP.Quaternion( 0.0, 0.0, 0.0, 1.0 );
		this.scale = new GLP.Vector( 1.0, 1.0, 1.0 );

		this.matrix = new GLP.Matrix();
		this.matrixWorld = new GLP.Matrix();
		this.matrixWorldPrev = new GLP.Matrix();
		this.autoMatrixUpdate = true;

		this.parent = null;
		this.children = [];

		this.components = new Map();

		this.visible = true;
		this.userData = {};

		this.field( "name", () => this.name, value => this.name = value );
		this.field( "position", () => this.position.getElm( "vec3" ), value => this.position.setFromArray( value ), { format: { type: "vector" } } );
		this.field( "euler", () => this.euler.getElm( "vec3" ), value => this.euler.setFromArray( value ), { format: { type: "vector" } } );
		this.field( "scale", () => this.scale.getElm( "vec3" ), value => this.scale.setFromArray( value ), { format: { type: "vector" } } );
		this.field( "children", () => this.children.map( c => c.uuid ), undefined, { noExport: true, hidden: true } );
		this.field( "components", () => {

			const list: string[] = [];

			this.components.forEach( c => list.push( c.uuid ) );

			return list;

		}, undefined, { noExport: true, hidden: true } );

	}

	/*-------------------------------
		Update
	-------------------------------*/

	// update

	public update( event: EntityUpdateEvent ) {

		const childEvent = { ...event } as ComponentUpdateEvent;
		childEvent.entity = this;
		childEvent.matrix = this.matrixWorld;

		// update components

		// pre

		this.preUpdateImpl( event );

		this.components.forEach( c => {

			c.preUpdate( childEvent );

		} );

		// update

		this.updateImpl( event );

		this.components.forEach( c => {

			c.update( childEvent );

		} );

		// matrix

		if ( this.autoMatrixUpdate ) {

			this.updateMatrix();

		}

		// post

		this.postUpdateImpl( event );

		this.components.forEach( c => {

			c.postUpdate( childEvent );

		} );

		// children

		for ( let i = 0; i < this.children.length; i ++ ) {

			this.children[ i ].update( childEvent );

		}

	}

	protected preUpdateImpl( event:EntityUpdateEvent ) {
	}

	protected updateImpl( event:EntityUpdateEvent ) {
	}

	protected postUpdateImpl( event:EntityUpdateEvent ) {
	}

	/*-------------------------------
		Finalize
	-------------------------------*/

	public finalize( event:EntityFinalizeEvent ) {

		if ( ! event.renderStack ) event.renderStack = {
			camera: [],
			light: [],
			deferred: [],
			forward: [],
			ui: [],
			shadowMap: [],
			envMap: [],
		};

		const childEvent = { ...event } as ComponentUpdateEvent;
		childEvent.entity = this;
		childEvent.matrix = this.matrixWorld;

		const visibility = ( event.visibility || event.visibility === undefined ) && this.visible;
		childEvent.visibility = visibility;

		const mesh = this.getComponent( Mesh );

		if ( mesh && ( visibility || event.forceDraw ) ) {

			const material = mesh.material;

			if ( material.visibilityFlag.deferred ) event.renderStack.deferred.push( this );
			if ( material.visibilityFlag.shadowMap ) event.renderStack.shadowMap.push( this );
			if ( material.visibilityFlag.forward ) event.renderStack.forward.push( this );
			if ( material.visibilityFlag.ui ) event.renderStack.ui.push( this );
			if ( material.visibilityFlag.envMap ) event.renderStack.envMap.push( this );

		}

		const camera = this.getComponent( RenderCamera );

		if ( camera && camera.enabled ) {

			event.renderStack.camera.push( this );

		}

		const light = this.getComponent( Light );

		if ( light && light.enabled && visibility ) {

			event.renderStack.light.push( this );

		}

		// finalize

		this.finalizeImpl( event );

		this.components.forEach( c => {

			c.finalize( childEvent );

		} );

		for ( let i = 0; i < this.children.length; i ++ ) {

			this.children[ i ].finalize( childEvent );

		}

		return event.renderStack;

	}

	protected finalizeImpl( event:EntityFinalizeEvent ) {
	}

	/*-------------------------------
		SceneGraph
	-------------------------------*/

	public add( entity: Entity ) {

		if ( entity.parent ) {

			entity.parent.remove( entity );

		}

		entity.parent = this;

		this.children.push( entity );

		this.noticeField( "children" );

	}

	public remove( entity: Entity ) {

		this.children = this.children.filter( c => c.uuid != entity.uuid );

		this.noticeField( "children" );

	}

	/*-------------------------------
		Matrix
	-------------------------------*/

	public updateMatrix( updateParent?: boolean ) {

		if ( this.parent && updateParent ) {

			this.parent.updateMatrix( true );

		}

		const matrix = this.parent ? this.parent.matrixWorld : new GLP.Matrix();

		this.matrixWorldPrev.copy( this.matrixWorld );

		// quaternion to euler

		if ( this.quaternion.updated ) {

			this.euler.setFromQuaternion( this.quaternion );

		} else {

			this.quaternion.setFromEuler( this.euler );

		}

		this.quaternion.updated = false;

		this.matrix.setFromTransform( this.position, this.quaternion, this.scale );

		this.matrixWorld.copy( this.matrix ).preMultiply( matrix );

	}

	public applyMatrix( matrix: GLP.Matrix ) {

		this.matrix.clone().multiply( matrix ).decompose(
			this.position,
			this.quaternion,
			this.scale
		);

		this.updateMatrix();

	}

	/*-------------------------------
		Components
	-------------------------------*/

	// add

	public addComponent<T extends typeof Component>( component: T, args?: any ) {

		const instance = new component( { entity: this, args } );
		this.components.set( component, instance );

		this.noticeField( "components" );

		return instance as InstanceType<T>;

	}
	// remove

	public removeComponent<T extends typeof Component>( component: T ) {

		const c = this.components.get( component );

		if ( c ) {

			c.dispose();

		}

		this.components.delete( component );

		this.noticeField( "components" );

	}

	public getComponent<T extends typeof Component>( component: T ) {

		return this.components.get( component ) as InstanceType<T> | undefined;

	}

	public getComponentByUUID( uuid: string ) {

		for ( const c of this.components.values() ) {

			if ( c.uuid === uuid ) {

				return c;

			}

		}

		return null;

	}

	public getComponentsByTag<T extends Component>( tag: string ) {

		const components: Component[] = [];

		this.components.forEach( c => {

			if ( c.tag == tag ) components.push( c );

		} );

		return components as T[];

	}

	/*-------------------------------
		Entity
	-------------------------------*/

	public findEntityByName( name: string ) : Entity | undefined {

		if ( this.name == name ) {

			return this;

		}

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			const entity = c.findEntityByName( name );

			if ( entity ) {

				return entity;

			}

		}

		return undefined;

	}

	public findEntityById( id: string ) : Entity | undefined {

		if ( this.uuid == id ) {

			return this;

		}

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			const entity = c.findEntityById( id );

			if ( entity ) {

				return entity;

			}

		}

		return undefined;

	}

	public getRootEntity(): Entity {

		if ( this.parent ) {

			return this.parent.getRootEntity();

		}

		return this;

	}

	/*-------------------------------
		Path
	-------------------------------*/

	public getScenePath( root? : Entity ) {

		let path = "/" + this.name;

		if ( root && ( root.uuid == this.uuid ) ) {

			return path;

		}

		if ( this.parent ) {

			path = this.parent.getScenePath( root ) + path;

		}

		return path;

	}

	/*-------------------------------
		Event
	-------------------------------*/

	public noticeEventChilds( eventName: string, opt: any ) {

		this.emit( eventName, opt );

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			c.noticeEventChilds( eventName, opt );

		}

	}

	public noticeEventParent( eventName: string, opt?: any ) {

		this.emit( eventName, opt );

		if ( this.parent ) {

			this.parent.noticeEventParent( eventName, opt );

		}

	}

	public traverse( cb: ( entity: Entity ) => void ) {

		cb( this );

		this.children.forEach( c => c.traverse( cb ) );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose( ) {

		this.emit( "dispose" );

		if ( this.parent ) {

			this.parent.remove( this );

		}

		this.components.forEach( c => {

			c.dispose();

		} );

		this.components.clear();

	}

	public disposeRecursive() {

		this.dispose();

		this.children.concat().forEach( c => {

			c.disposeRecursive();

		} );

		this.children = [];

	}

}
