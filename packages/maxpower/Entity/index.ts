import * as GLP from 'glpower';


import { BLidgeEntity } from "../BLidge";
import { Component, ComponentUpdateEvent } from "../Component";
import { BLidger } from '../Component/BLidger';
import { RenderCamera } from '../Component/Camera/RenderCamera';
import { Geometry } from '../Component/Geometry';
import { Light } from '../Component/Light';
import { Material } from '../Component/Material';
import { RenderStack } from '../Component/Renderer';
import { Serializable, SerializableProps, TypedSerializableProps } from '../Serializable';

export type EntityUpdateEvent = {
	timElapsed: number;
	timeDelta: number;
	timeCode: number;
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

	public readonly uuid: string;

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
	public components: Map<string, Component>;
	private componentsByTag: Map<string, Component>;

	protected blidgeNode?: BLidgeEntity;

	public visible: boolean;
	public userData: any;

	constructor( params?: EntityParams ) {

		super();

		this.name = params && params.name || "";
		this.uuid = GLP.ID.genUUID();

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
		this.componentsByTag = new Map();

		this.visible = true;

		this.userData = {};

	}


	public get props() {

		return {
			position: {
				value: this.position.getElm( "vec3" ),
			},
			euler: {
				value: this.euler.getElm( "vec3" ),
			},
			scale: {
				value: this.scale.getElm( "vec3" ),
			},
			children: {
				value: this.children,
				opt: {
					noExport: true,
				}
			},
			components: {
				value: Array.from( this.components.values() ),
				opt: {
					noExport: true,
				}
			}
		};

	}

	protected deserializer( props: TypedSerializableProps<this> ): void {

		this.position.set( props.position.value[ 0 ], props.position.value[ 1 ], props.position.value[ 2 ] );
		this.euler.set( props.euler.value[ 0 ], props.euler.value[ 1 ], props.euler.value[ 2 ], props.euler.value[ 3 ] );
		this.scale.set( props.scale.value[ 0 ], props.scale.value[ 1 ], props.scale.value[ 2 ] );

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

		const geometry = this.getComponentByTag<Geometry>( "geometry" );
		const material = this.getComponentByTag<Material>( "material" );

		if ( geometry && material && ( geometry.enabled && material.enabled && visibility || event.forceDraw ) ) {

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

		if ( light && light.enabled ) {

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

		this.noticePropsChanged( "children" );

	}

	public remove( entity: Entity ) {

		this.children = this.children.filter( c => c.uuid != entity.uuid );

		this.noticePropsChanged( "children" );

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

	public addComponent<T extends Component>( component: T ) {

		const id = component.resourceId;

		const prevComponent = this.components.get( id );

		if ( prevComponent ) {

			prevComponent.unsetEntity();

		}

		component.setEntity( this );

		this.components.set( id, component );

		if ( component.tag !== "" ) {

			this.componentsByTag.set( component.tag, component );

		}

		this.emit( "add/component", [ component ] );

		this.noticePropsChanged( "components" );

		return component;

	}

	public getComponentByTag<T extends Component>( tag: string ): T | undefined {

		return this.componentsByTag.get( tag ) as T;

	}

	public getComponentByResourceId<T extends Component>( id: string ): T | undefined {

		return this.components.get( id ) as T;

	}

	public getComponent<T extends typeof Component>( component: T ): InstanceType<T> | undefined {

		return this.getComponentByResourceId( component.resourceId );

	}

	public removeComponent( component: Component | typeof Component ) {

		const currentComponent = this.components.get( component.resourceId );

		if ( currentComponent ) {

			this.components.delete( currentComponent.resourceId );
			currentComponent.unsetEntity();

			if ( currentComponent.tag !== "" ) {

				this.componentsByTag.delete( currentComponent.tag );

			}

		}

		this.noticePropsChanged( "components" );

		return currentComponent;

	}

	public removeComponentByKey( key: string ) {

		const component = this.components.get( key );

		if ( component ) {

			return this.removeComponent( component );

		}

		return null;

	}

	/*-------------------------------
		API
	-------------------------------*/

	public getEntityByName( name: string ) : Entity | undefined {

		if ( this.name == name ) {

			return this;

		}

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			const entity = c.getEntityByName( name );

			if ( entity ) {

				return entity;

			}

		}

		return undefined;

	}

	public getEntityById( id: string ) : Entity | undefined {

		if ( this.uuid == id ) {

			return this;

		}

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			const entity = c.getEntityById( id );

			if ( entity ) {

				return entity;

			}

		}

		return undefined;

	}

	public getPath( root? : Entity ) {

		let path = "/" + this.name;

		if ( root && ( root.uuid == this.uuid ) ) {

			return path;

		}

		if ( this.parent ) {

			path = this.parent.getPath( root ) + path;

		}

		return path;

	}

	public getRootEntity(): Entity {

		if ( this.parent ) {

			return this.parent.getRootEntity();

		}

		return this;

	}

	/*-------------------------------
		Event
	-------------------------------*/

	public notice( eventName: string, opt: any ) {

		this.emit( eventName, opt );

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			c.notice( eventName, opt );

		}

	}

	public noticeParent( eventName: string, opt?: any ) {

		this.emit( eventName, opt );

		if ( this.parent ) {

			this.parent.noticeParent( eventName, opt );

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
		this.parent && this.parent.remove( this );
		this.components.forEach( c => {

			c.unsetEntity();
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
