import * as MTP from 'mathpower';
import * as MXP from 'maxpower';

import { Engine } from '../../../../core/Engine';
import { AgentCommandError } from '../Command';

/*-------------------------------
	Entity
-------------------------------*/

// root からの名前パス（例: root/Camera）
export const entityPath = ( entity: MXP.Entity ) => {

	const names: string[] = [];
	let current: MXP.Entity | null = entity;

	while ( current ) {

		names.unshift( current.name );
		current = current.parent;

	}

	return names.join( '/' );

};

// uuid か名前パスでエンティティを1つに決める。名前パスが複数に当たるときは候補を返して失敗させる
export const resolveEntity = ( engine: Engine, spec: string ) => {

	const byUUID = engine.root.findEntityByUUID( spec );

	if ( byUUID ) return byUUID;

	const target = spec.split( '/' ).filter( ( name ) => name !== '' ).join( '/' );
	const matches: MXP.Entity[] = [];

	engine.root.traverse( ( entity ) => {

		if ( entityPath( entity ) === target ) {

			matches.push( entity );

		}

	} );

	if ( matches.length === 0 ) {

		throw new AgentCommandError( `エンティティが見つかりません: ${spec}（uuid か root から始まる名前パスで指定します。一覧は tree で確認できます）` );

	}

	if ( matches.length > 1 ) {

		const candidates = [];

		for ( const entity of matches ) {

			candidates.push( { uuid: entity.uuid, path: entityPath( entity ) } );

		}

		throw new AgentCommandError( `名前パスが ${matches.length} 件に一致しました。uuid で指定してください: ${spec}`, candidates );

	}

	return matches[ 0 ];

};

/*-------------------------------
	World
-------------------------------*/

const toArray = ( v: MTP.Vector ) => [ v.x, v.y, v.z ];

// エンティティ自身の Mesh の境界ボックスをワールド空間の軸平行な箱にする（子孫は含めない）
const worldBounds = ( entity: MXP.Entity ) => {

	const mesh = entity.getComponent( MXP.Mesh );

	if ( ! mesh || ! mesh.geometry.boundingBox ) return null;

	const box = mesh.geometry.boundingBox;

	const min = new MTP.Vector( Infinity, Infinity, Infinity );
	const max = new MTP.Vector( - Infinity, - Infinity, - Infinity );

	// 回転すると軸に沿わなくなるので、8頂点を移してから取り直す
	for ( let i = 0; i < 8; i ++ ) {

		const p = new MTP.Vector(
			i & 1 ? box.max.x : box.min.x,
			i & 2 ? box.max.y : box.min.y,
			i & 4 ? box.max.z : box.min.z,
		).applyMatrix4AsPosition( entity.matrixWorld );

		min.x = Math.min( min.x, p.x );
		min.y = Math.min( min.y, p.y );
		min.z = Math.min( min.z, p.z );
		max.x = Math.max( max.x, p.x );
		max.y = Math.max( max.y, p.y );
		max.z = Math.max( max.z, p.z );

	}

	return { min: toArray( min ), max: toArray( max ) };

};

// ワールド空間での位置・向き・境界ボックス（直近フレームの matrixWorld から求める）
export const worldInfo = ( entity: MXP.Entity ) => {

	const position = new MTP.Vector( 0, 0, 0, 1 ).applyMatrix4( entity.matrixWorld );
	// forward はローカル -Z（カメラの視線方向。Matrix.lookAt と同じ規約）。
	// up はローカル +Y。ライトはこれを光源へ向かう向きとしてシェーダーへ渡す（光はその逆向きに進む）
	const forward = new MTP.Vector( 0, 0, - 1, 0 ).applyMatrix4( entity.matrixWorld ).normalize();
	const up = new MTP.Vector( 0, 1, 0, 0 ).applyMatrix4( entity.matrixWorld ).normalize();

	return {
		position: toArray( position ),
		forward: toArray( forward ),
		up: toArray( up ),
		bounds: worldBounds( entity ),
	};

};

/*-------------------------------
	Component
-------------------------------*/

// 表示・シリアライズ用のコンポーネント名（登録名）
export const componentName = ( component: MXP.Component ) => Engine.resources.getComponentName( component );

/*-------------------------------
	Field
-------------------------------*/

export type FieldDescription = {
	path: string;
	value: unknown;
	format?: string;
	options?: unknown[];
	readOnly?: true;
	hidden?: true;
	noExport?: true;
};

// select / resource の選択肢は関数で遅延評価されることがあるので、ここで値に落とす
const resolveList = ( list: MXP.SelectList | ( () => MXP.SelectList ) ) => {

	let items = list;

	if ( typeof items === 'function' ) {

		items = items();

	}

	const values: unknown[] = [];

	for ( const item of items ) {

		if ( typeof item === 'string' ) {

			values.push( item );

		} else {

			values.push( item.value );

		}

	}

	return values;

};

// Serializable が持つフィールドを、path・現在値・書式の一覧にする（フォルダの見出し行は除く）
export const describeFields = ( target: MXP.Serializable ) => {

	const serialized = target.serialize( { mode: 'view' } );
	const fields: FieldDescription[] = [];

	for ( const path of Object.keys( serialized ) ) {

		const opt = target.getFieldOpt( path ) ?? {};

		if ( opt.isFolder ) continue;

		const rawValue = serialized[ path ];

		let value: unknown = rawValue;

		// ボタン（関数）はエディタ上の操作なので値としては出さない
		if ( typeof rawValue === 'function' ) {

			value = '(action)';

		}

		const field: FieldDescription = { path, value };

		if ( opt.format ) {

			field.format = opt.format.type;

			if ( opt.format.type === 'select' || opt.format.type === 'resource' ) {

				field.options = resolveList( opt.format.list );

			}

		}

		if ( opt.readOnly ) field.readOnly = true;

		if ( opt.noExport ) field.noExport = true;

		let hidden = false;

		if ( typeof opt.hidden === 'function' ) {

			hidden = opt.hidden( rawValue );

		} else if ( opt.hidden ) {

			hidden = true;

		}

		if ( hidden ) field.hidden = true;

		fields.push( field );

	}

	return fields;

};
