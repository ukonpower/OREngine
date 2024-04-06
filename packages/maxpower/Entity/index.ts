import * as GLP from 'glpower';


import { BLidgeNode } from "../BLidge";
import { Component, ComponentUpdateEvent, BuiltInComponents } from "../Component";
import { BLidger } from '../Component/BLidger';
import { Camera } from '../Component/Camera';
import { Geometry } from '../Component/Geometry';
import { GPUCompute } from '../Component/GPUCompute';
import { Light } from '../Component/Light';
import { Material } from '../Component/Material';
import { Serializable } from '../Serializable';

import { RenderStack } from '~/ts/gl/Scene/Renderer';

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

	protected blidgeNode?: BLidgeNode;

	public visible: boolean;

	public userData: any;

	public noExport: boolean;

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

		this.visible = true;

		this.userData = {};

		this.noExport = false;

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
			gpuCompute: [],
		};

		const childEvent = { ...event } as ComponentUpdateEvent;
		childEvent.entity = this;
		childEvent.matrix = this.matrixWorld;

		const visibility = ( event.visibility || event.visibility === undefined ) && this.visible;
		childEvent.visibility = visibility;

		const geometry = this.getComponentEnabled<Geometry>( 'geometry' );
		const material = this.getComponentEnabled<Material>( 'material' );

		if ( geometry && material && ( visibility || event.forceDraw ) ) {

			if ( material.visibilityFlag.deferred ) event.renderStack.deferred.push( this );
			if ( material.visibilityFlag.shadowMap ) event.renderStack.shadowMap.push( this );
			if ( material.visibilityFlag.forward ) event.renderStack.forward.push( this );
			if ( material.visibilityFlag.ui ) event.renderStack.ui.push( this );
			if ( material.visibilityFlag.envMap ) event.renderStack.envMap.push( this );

		}

		const camera = this.getComponentEnabled<Camera>( 'camera' );

		if ( camera ) {

			event.renderStack.camera.push( this );

		}

		const light = this.getComponentEnabled<Light>( 'light' );

		if ( light ) {

			event.renderStack.light.push( this );

		}

		const gpuCompute = this.getComponentEnabled<GPUCompute>( "gpuCompute" );

		if ( gpuCompute ) {

			event.renderStack.gpuCompute.push( this );

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

		entity.noticeParent( "update/graph", [ "add" ] );

	}

	public remove( entity: Entity ) {

		this.children = this.children.filter( c => c.uuid != entity.uuid );

		entity.noticeParent( "update/graph" );

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

	public addComponent<T extends Component>( name: BuiltInComponents, component: T ) {

		const prevComponent = this.components.get( name );

		if ( prevComponent ) {

			prevComponent.setEntity( null );

		}

		component.setEntity( this );

		this.components.set( name, component );

		if ( name == "blidger" ) {

			this.appendBlidger( component as unknown as BLidger );

		}

		return component;

	}

	public getComponent<T extends Component>( name: BuiltInComponents ): T | undefined {

		return this.components.get( name ) as T;

	}

	public getComponentEnabled<T extends Component>( name: BuiltInComponents ): T | undefined {

		const component = this.components.get( name ) as T;

		if ( ! component || ! component.enabled ) return undefined;

		return component;

	}

	public removeComponent( name: string ) {

		const component = this.components.get( name );

		this.components.delete( name );

		return component;

	}

	/*-------------------------------
		BLidger
	-------------------------------*/

	private appendBlidger( blidger: BLidger ) {

		this.blidgeNode = blidger.node;

		this.appendBlidgerImpl( blidger );

	}

	protected appendBlidgerImpl( blidger: BLidger ) {

		this.emit( "appendBlidger", [ blidger ] );

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

		this.components.forEach( c => c.setEntity( null ) );

		this.components.clear();

	}

	public disposeRecursive() {

		this.dispose();

		this.children.concat().forEach( c => {

			c.disposeRecursive();

		} );

	}

}
