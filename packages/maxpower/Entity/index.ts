import * as GLP from 'glpower';

import { RenderStack } from "~/ts/Scene/Renderer";
import { Component, ComponentUpdateEvent, BuiltInComponents } from "../Component";
import { Camera } from "../Component/Camera";
import { GPUCompute } from "../Component/GPUCompute";
import { Geometry } from "../Component/Geometry";
import { Light } from "../Component/Light";
import { Material } from "../Component/Material";
import { BLidgeNode } from "../BLidge";
import { BLidger } from "../Component/BLidger";

export type EntityUpdateEvent = {
	time: number;
	deltaTime: number;
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

let entityCount: number = 0;

export class Entity extends GLP.EventEmitter {

	public readonly uuid: number;

	public name: string;

	public position: GLP.Vector;
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

	constructor() {

		super();

		this.name = "";
		this.uuid = entityCount ++;

		this.position = new GLP.Vector( 0.0, 0.0, 0.0, 1.0 );
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

		const geometry = this.getComponent<Geometry>( 'geometry' );
		const material = this.getComponent<Material>( 'material' );

		if ( geometry && material && ( visibility || event.forceDraw ) ) {

			if ( material.visibilityFlag.deferred ) event.renderStack.deferred.push( this );
			if ( material.visibilityFlag.shadowMap ) event.renderStack.shadowMap.push( this );
			if ( material.visibilityFlag.forward ) event.renderStack.forward.push( this );
			if ( material.visibilityFlag.ui ) event.renderStack.ui.push( this );
			if ( material.visibilityFlag.envMap ) event.renderStack.envMap.push( this );

		}

		const camera = this.getComponent<Camera>( 'camera' );

		if ( camera ) {

			event.renderStack.camera.push( this );

		}

		const light = this.getComponent<Light>( 'light' );

		if ( light ) {

			event.renderStack.light.push( this );

		}

		const gpuCompute = this.getComponent<GPUCompute>( "gpuCompute" );

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

	}

	public remove( entity: Entity ) {

		this.children = this.children.filter( c => c.uuid != entity.uuid );

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

		this.matrix.setFromTransform( this.position, this.quaternion, this.scale );

		this.matrixWorld.copy( this.matrix ).preMultiply( matrix );

	}

	public applyMatrix( matrix: GLP.Matrix ) {

		this.matrix.clone().multiply( matrix ).decompose(
			this.position,
			this.quaternion,
			this.scale
		);

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

	/*-------------------------------
		Event
	-------------------------------*/

	public notice( eventName: string, opt?: any ) {

		this.emit( "notice/" + eventName, [ opt ] );

	}

	public noticeRecursive( eventName: string, opt?: any ) {

		this.notice( eventName, opt );

		for ( let i = 0; i < this.children.length; i ++ ) {

			const c = this.children[ i ];

			c.noticeRecursive( eventName, opt );

		}

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this.emit( "dispose" );

		this.parent && this.parent.remove( this );

		this.children.forEach( c => c.parent = null );

		this.components.forEach( c => c.setEntity( null ) );

	}

}
