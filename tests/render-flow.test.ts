import assert from 'node:assert/strict';
import test from 'node:test';

import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { ShakeViewer } from '../packages/orengine/builtin/Components/Camera/CameraShake';
import { LookAt } from '../packages/orengine/builtin/Components/Camera/LookAt';

const engine = {} as MXP.EngineContract;
const renderer = {} as MXP.Renderer;

const event: MXP.EntityUpdateEvent = {
	timeElapsed: 1,
	timeDelta: 1 / 60,
	timeCode: 1,
	timeCodeFrame: 60,
	playing: true,
	renderer,
	resolution: new MTP.Vector( 1920, 1080 ),
};

const createEntity = ( name: string ) => new MXP.Entity( { engine, name } );

const assertMatrixClose = ( actual: MTP.Matrix, expected: MTP.Matrix, message: string ) => {

	for ( let i = 0; i < actual.elm.length; i ++ ) {

		assert.ok(
			Math.abs( actual.elm[ i ] - expected.elm[ i ] ) < 1e-6,
			`${ message } (index ${ i }: ${ actual.elm[ i ] } !== ${ expected.elm[ i ] })`,
		);

	}

};

const runFramePreparation = ( root: MXP.Entity ) => {

	root.update( event );
	root.postUpdate( event );
	root.updateMatrixRecursive();
	root.prepareRender( event );

};

class MoveInUpdate extends MXP.Component {

	protected updateImpl(): void {

		this.entity.position.set( 4, 2, - 3 );

	}

}

class ObserveTargetInPostUpdate extends MXP.Component {

	public observedPosition = new MTP.Vector();

	protected postUpdateImpl(): void {

		const target = this.entity.userData.target as MXP.Entity;
		target.matrixWorld.decompose( this.observedPosition );

	}

}

class TestCamera extends MXP.Component {

	public fov = 50;
	public viewMatrix = new MTP.Matrix();

	constructor( params: MXP.ComponentParams ) {

		super( params );
		this._tag = 'camera';

	}

	protected prepareRenderImpl(): void {

		this.viewMatrix.copy( this.entity.matrixWorld ).inverse();

	}

}

test( 'postUpdateはscene tree上で後ろにいるEntityの確定済みmatrixWorldを参照する', () => {

	const root = createEntity( 'root' );
	const observerEntity = createEntity( 'observer' );
	const target = createEntity( 'target' );

	root.add( observerEntity );
	root.add( target );
	target.addComponent( MoveInUpdate );
	observerEntity.userData.target = target;
	const observer = observerEntity.addComponent( ObserveTargetInPostUpdate );

	runFramePreparation( root );

	assert.deepEqual(
		observer.observedPosition.getElm( 'vec3' ),
		[ 4, 2, - 3 ],
	);

} );

test( 'LookAt後もlocal/world transformと子階層が同じ姿勢を共有する', () => {

	const root = createEntity( 'root' );
	const source = createEntity( 'source' );
	const target = createEntity( 'target' );
	const child = createEntity( 'child' );

	source.position.set( 1, 0.5, 2 );
	target.position.set( - 3, 2, - 4 );
	child.position.set( 0, 0, - 1 );

	root.add( source );
	root.add( target );
	source.add( child );
	source.addComponent( LookAt ).setTarget( target );

	runFramePreparation( root );

	const expectedSourceWorld = source.matrix.clone().preMultiply( root.matrixWorld );
	const expectedChildWorld = child.matrix.clone().preMultiply( source.matrixWorld );

	assertMatrixClose( source.matrixWorld, expectedSourceWorld, 'LookAtの結果がlocal transformへ保存されていない' );
	assertMatrixClose( child.matrixWorld, expectedChildWorld, '子EntityがLookAt後の親transformを参照していない' );
	assertMatrixClose( source.matrixWorldPrev, source.matrixWorld, '初回履歴がconstraint適用前の姿勢になっている' );

} );

test( '回転した親の下でもLookAtはworld spaceのtargetを向く', () => {

	const root = createEntity( 'root' );
	const parent = createEntity( 'parent' );
	const source = createEntity( 'source' );
	const target = createEntity( 'target' );

	parent.position.set( 2, 0, 1 );
	parent.euler.set( 0, 0.7, 0 );
	parent.scale.set( 2, 0.5, 1.5 );
	source.position.set( 1, 1, 0 );
	target.position.set( - 2, 3, - 5 );

	root.add( parent );
	root.add( target );
	parent.add( source );
	source.addComponent( LookAt ).setTarget( target );

	runFramePreparation( root );

	const sourceWorldPos = new MTP.Vector();
	const targetWorldPos = new MTP.Vector();
	source.matrixWorld.decompose( sourceWorldPos );
	target.matrixWorld.decompose( targetWorldPos );

	const expectedForward = sourceWorldPos.sub( targetWorldPos ).normalize();
	const actualForward = new MTP.Vector(
		source.matrixWorld.elm[ 8 ],
		source.matrixWorld.elm[ 9 ],
		source.matrixWorld.elm[ 10 ],
	).normalize();

	assert.ok( actualForward.dot( expectedForward ) > 0.999999 );

} );

test( 'CameraShakeはmatrixWorldを変更せずviewMatrixだけへoffsetを加える', () => {

	const root = createEntity( 'root' );
	const cameraEntity = createEntity( 'camera' );
	root.add( cameraEntity );

	const camera = cameraEntity.addComponent( TestCamera );
	cameraEntity.addComponent( ShakeViewer );

	root.update( event );
	root.postUpdate( event );
	root.updateMatrixRecursive();

	const matrixWorldBeforePrepare = cameraEntity.matrixWorld.clone();
	const viewWithoutShake = cameraEntity.matrixWorld.clone().inverse();

	root.prepareRender( event );

	assertMatrixClose( cameraEntity.matrixWorld, matrixWorldBeforePrepare, 'CameraShakeがscene transformを変更した' );
	assert.notDeepEqual( camera.viewMatrix.elm, viewWithoutShake.elm );

} );
