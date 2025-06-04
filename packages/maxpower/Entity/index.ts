import * as GLP from 'glpower';
import * as MXP from 'maxpower';

import { Component, ComponentParams, ComponentUpdateEvent } from "../Component";
import { RenderStack } from '../Component/Renderer';
import { Serializable } from '../Serializable';

export interface EntityUpdateEvent {
	timeElapsed: number;
	timeDelta: number;
	timeCode: number;
	timeCodeFrame: number;
	playing: boolean;
	renderer: MXP.Renderer;
	resolution: GLP.Vector;
	matrix?: GLP.Matrix;
	visibility?: boolean;
	forceDraw?: boolean
}

export interface EntityFinalizeEvent extends EntityUpdateEvent{
	renderStack?: RenderStack;
}

export interface EntityResizeEvent {
	resolution: GLP.Vector
}

export interface EntityParams {
	name?: string;
}

export type ConstructorArgType<T extends typeof Component> =
  ConstructorParameters<T>[0] extends ComponentParams<infer A>
    ? A
    : never;

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
	private componentsSorted: Component[];
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
		this.componentsSorted = [];

		this.visible = true;
		this.userData = {};

		this.field( "name", () => this.name, value => this.name = value );
		this.field( "position", () => this.position.getElm( "vec3" ), value => this.position.setFromArray( value ), { format: { type: "vector" } } );
		this.field( "euler", () => this.euler.getElm( "vec3" ), value => this.euler.setFromArray( value ), { format: { type: "vector" } } );
		this.field( "scale", () => this.scale.getElm( "vec3" ), value => this.scale.setFromArray( value ), { format: { type: "vector" } } );
		this.field( "children", () => this.children.map( c => c.uuid ), { hidden: true } );
		this.field( "components", () => {

			const list: string[] = [];

			this.components.forEach( c => list.push( c.uuid ) );

			return list;

		}, { hidden: true } );

	}

	/*-------------------------------
		Update
	-------------------------------*/

	// update

	public update( event: EntityUpdateEvent ) {

		const childEvent = { ...event } as ComponentUpdateEvent;
		childEvent.matrix = this.matrixWorld;

		// update - entity

		this.updateImpl( event );

		// update - components

		for ( let i = 0; i < this.componentsSorted.length; i ++ ) {

			const c = this.componentsSorted[ i ];

			c.update( childEvent );

		}

		// matrix

		if ( this.autoMatrixUpdate ) {

			this.updateMatrix();

		}

		// children

		for ( let i = 0; i < this.children.length; i ++ ) {

			this.children[ i ].update( childEvent );

		}

	}

	protected updateImpl( event:EntityUpdateEvent ) {
	}

	/*-------------------------------
		Before / After Render
	-------------------------------*/

	public onBeforeRender( event: EntityUpdateEvent ) {

		// before render - components

		for ( let i = 0; i < this.componentsSorted.length; i ++ ) {

			const c = this.componentsSorted[ i ];

			c.beforeRender( event );

		}

		// children

		for ( let i = 0; i < this.children.length; i ++ ) {

			this.children[ i ].onBeforeRender( event );

		}

	}

	public onAfterRender( event: EntityUpdateEvent ) {

		this.matrixWorldPrev.copy( this.matrixWorld );

		// after render - components

		for ( let i = 0; i < this.componentsSorted.length; i ++ ) {

			const c = this.componentsSorted[ i ];

			c.afterRender( event );

		}

		// children

		for ( let i = 0; i < this.children.length; i ++ ) {

			this.children[ i ].onAfterRender( event );

		}

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

	public decomposeMatrix( matrix: GLP.Matrix ) {

		matrix.decompose(
			this.position,
			this.quaternion,
			this.scale
		);

		this.updateMatrix();

	}

	public applyMatrix( matrix: GLP.Matrix ) {

		this.decomposeMatrix( this.matrix.clone().multiply( matrix ) );

	}

	public lookAt( targetWorldPos: GLP.Vector ) {

		this.updateMatrix();

		const newMatrix = new GLP.Matrix();

		const entityWorldPos = new GLP.Vector();
		this.matrixWorld.decompose( entityWorldPos );

		const targetPos = this.position.clone().add( targetWorldPos.clone().sub( entityWorldPos ) );
		newMatrix.lookAt( this.position, targetPos, new GLP.Vector( 0.0, 1.0, 0.0 ) );

		this.decomposeMatrix( newMatrix );

	}

	/*-------------------------------
		Components
	-------------------------------*/

	public addComponent<T extends typeof Component>(
		component: T,
		...args: ConstructorArgType<T> extends undefined ? [] | [ConstructorArgType<T>]
		  : [ConstructorArgType<T>]
	  ): InstanceType<T> {

		this.removeComponent( component );

		const [ componentArgs ] = args;

		const instance = new component( { entity: this, args: componentArgs || {} } );

		this.components.set( component, instance );

		this.componentsSorted.push( instance );
		this.componentsSorted.sort( ( a, b ) => a.order - b.order );

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

		this.componentsSorted = this.componentsSorted.filter( instance => instance !== c );

		this.noticeField( "components" );

	}

	public removeComponentByUUID( uuid: string ) {

		for ( const c of this.components ) {

			const key = c[ 0 ];
			const component = c[ 1 ];

			if ( component.uuid === uuid ) {

				component.dispose();

				this.components.delete( key );

				this.noticeField( "components" );

				return component;

			}

		}

	}

	// get

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

	public getComponentByTag<T extends Component>( tag: string ) {

		for ( const c of this.components.values() ) {

			if ( c.tag === tag ) {

				return c as T;

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

	public findEntityByUUID( id: string ) : Entity | undefined {

		if ( this.uuid == id ) {

			return this;

		}

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			const entity = c.findEntityByUUID( id );

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
		Methods
	-------------------------------*/

	public isVisibleTraverse(): boolean {

		if ( ! this.visible ) {

			return false;

		}

		if ( this.parent ) {

			return this.parent.isVisibleTraverse();

		}

		return true;

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

		this.componentsSorted = [];

	}

	public disposeRecursive() {

		this.dispose();

		this.children.concat().forEach( c => {

			c.disposeRecursive();

		} );

		this.children = [];

	}

}
