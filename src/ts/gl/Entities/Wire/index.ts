import * as GLP from 'glpower';

import poleVert from './shaders/pole.vs';
import poleFrag from '~/shaders/basic.fs';
import { Entity } from 'maxpower/Entity';
import { CylinderGeometry } from 'maxpower';

export class Wire extends Entity {

	public start: GLP.Vector;
	public end: GLP.Vector;
	private uniforms: GLP.Uniforms;

	constructor() {

		super();

		this.start = new GLP.Vector();
		this.end = new GLP.Vector();

		this.uniforms = {
			uPosStart: {
				value: new GLP.Vector(),
				type: "3f"
			},
			uPosEnd: {
				value: new GLP.Vector(),
				type: "3f"
			}
		};

		this.addComponent( 'geometry', new CylinderGeometry( 0.03, 0.03, 1, 8, 10, false ) );
		this.addComponent( 'material', new GLP.Material( {
			vert: poleVert,
			frag: poleFrag,
			uniforms: this.uniforms,
			type: [ "deferred", "shadowMap" ],
		} ) );

	}

	public setPoints( start: GLP.Vector, end: GLP.Vector ) {

		this.start.copy( start );
		this.end.copy( end );

		this.uniforms.uPosStart.value.copy( this.start );
		this.uniforms.uPosEnd.value.copy( this.end );

	}

	public entityToEntity( start: Entity, end: Entity ) {

		const posStart = start.position.clone();
		const posEnd = end.position.clone();

		this.updateMatrix( true );
		const selfMatrixWorldInverse = this.matrixWorld.clone().inverse();

		start.parent!.updateMatrix( true );
		posStart.applyMatrix4( start.parent!.matrixWorld ).applyMatrix4( selfMatrixWorldInverse );

		end.parent!.updateMatrix( true );
		posEnd.applyMatrix4( end.parent!.matrixWorld ).applyMatrix4( selfMatrixWorldInverse );

		this.setPoints( posStart, posEnd );

	}

}
