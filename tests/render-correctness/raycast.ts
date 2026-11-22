import { add, cross, dot, normalize, scale, sub } from './answer';

import type { Vec3 } from './answer';

/*-------------------------------
	画素から面を求める

	ハーネスが返したカメラとメッシュ（GPU に渡したのと同じ頂点）から、画素の中心を通る光線が当たる面の位置と法線を出す。
	GPU は画素の中心で三角形の頂点の値を補間するので、球の式ではなく実際の三角形に当てる（48×32 分割の球は、
	当たる位置が式の球から最大で半径の約 0.5% ずれ、粗さ 0.2 のハイライトでは 1 割近い差になるため）
-------------------------------*/

// 列優先の 4×4 行列（MTP.Matrix の elm と同じ並び）
export type Matrix4 = number[];

export type CameraInfo = {
	matrixWorld: Matrix4;
	projectionMatrix: Matrix4;
};

export type MeshInfo = {
	name: string;
	matrixWorld: Matrix4;
	positions: number[];
	normals: number[];
	indices: number[];
};

export type Hit = {
	mesh: string;
	distance: number;
	position: Vec3;
	normal: Vec3;
	viewDir: Vec3;
};

const transformPoint = ( m: Matrix4, p: Vec3 ): Vec3 => [
	m[ 0 ] * p[ 0 ] + m[ 4 ] * p[ 1 ] + m[ 8 ] * p[ 2 ] + m[ 12 ],
	m[ 1 ] * p[ 0 ] + m[ 5 ] * p[ 1 ] + m[ 9 ] * p[ 2 ] + m[ 13 ],
	m[ 2 ] * p[ 0 ] + m[ 6 ] * p[ 1 ] + m[ 10 ] * p[ 2 ] + m[ 14 ],
];

const transformDirection = ( m: Matrix4, d: Vec3 ): Vec3 => [
	m[ 0 ] * d[ 0 ] + m[ 4 ] * d[ 1 ] + m[ 8 ] * d[ 2 ],
	m[ 1 ] * d[ 0 ] + m[ 5 ] * d[ 1 ] + m[ 9 ] * d[ 2 ],
	m[ 2 ] * d[ 0 ] + m[ 6 ] * d[ 1 ] + m[ 10 ] * d[ 2 ],
];

export type Ray = {
	origin: Vec3;
	direction: Vec3;
	// 視線の向き（面からカメラへ）。perspective は面ごとに変わるので null
	orthographicViewDir: Vec3 | null;
	cameraPosition: Vec3;
};

// 画素（左下原点）の中心を通る光線。射影行列の対角から視野を読む（perspective・orthographic とも、ずらしの無い行列だけを扱う）
export const pixelRay = ( camera: CameraInfo, x: number, y: number, width: number, height: number ): Ray => {

	const p = camera.projectionMatrix;
	const ndcX = ( x + 0.5 ) / width * 2 - 1;
	const ndcY = ( y + 0.5 ) / height * 2 - 1;
	const cameraPosition = transformPoint( camera.matrixWorld, [ 0, 0, 0 ] );

	// 射影行列の [3][3] が 1 なら orthographic（common.module.glsl の viewDirection と同じ見分け方）
	if ( p[ 15 ] === 1 ) {

		const origin = transformPoint( camera.matrixWorld, [ ndcX / p[ 0 ], ndcY / p[ 5 ], 0 ] );
		const direction = normalize( transformDirection( camera.matrixWorld, [ 0, 0, - 1 ] ) );

		return { origin, direction, orthographicViewDir: scale( direction, - 1 ), cameraPosition };

	}

	const direction = normalize( transformDirection( camera.matrixWorld, [ ndcX / p[ 0 ], ndcY / p[ 5 ], - 1 ] ) );

	return { origin: cameraPosition, direction, orthographicViewDir: null, cameraPosition };

};

// Möller–Trumbore。当たれば光線上の距離と重心座標を返す。
// 裏の面も当てる（テストシーンの形は凸で外から見るので、いちばん手前に当たるのは必ず表の面）
const intersectTriangle = ( ray: Ray, a: Vec3, b: Vec3, c: Vec3 ) => {

	const edge1 = sub( b, a );
	const edge2 = sub( c, a );
	const pvec = cross( ray.direction, edge2 );
	const det = dot( edge1, pvec );

	if ( Math.abs( det ) < 1e-12 ) return null;

	const invDet = 1 / det;
	const tvec = sub( ray.origin, a );
	const u = dot( tvec, pvec ) * invDet;

	if ( u < 0 || u > 1 ) return null;

	const qvec = cross( tvec, edge1 );
	const v = dot( ray.direction, qvec ) * invDet;

	if ( v < 0 || u + v > 1 ) return null;

	const t = dot( edge2, qvec ) * invDet;

	if ( t <= 0 ) return null;

	return { t, u, v };

};

const vertex = ( array: number[], index: number ): Vec3 => [ array[ index * 3 ], array[ index * 3 + 1 ], array[ index * 3 + 2 ] ];

// ワールド座標へ移したメッシュ。光線ごとに頂点を変換し直さないよう先に作る
export type WorldMesh = {
	name: string;
	positions: Vec3[];
	normals: Vec3[];
	indices: number[];
	// 光線が当たりうるかを先に見る外接球
	center: Vec3;
	radius: number;
};

// 法線はワールド行列の 3×3 で回す（Shape は一様な拡大か、軸に沿った面だけなので逆転置にしなくても向きは同じ）
export const toWorldMesh = ( mesh: MeshInfo ): WorldMesh => {

	const positions: Vec3[] = [];
	const normals: Vec3[] = [];
	const count = mesh.positions.length / 3;

	let center: Vec3 = [ 0, 0, 0 ];

	for ( let i = 0; i < count; i ++ ) {

		const position = transformPoint( mesh.matrixWorld, vertex( mesh.positions, i ) );

		positions.push( position );
		normals.push( normalize( transformDirection( mesh.matrixWorld, vertex( mesh.normals, i ) ) ) );
		center = add( center, position );

	}

	center = scale( center, 1 / count );

	let radius = 0;

	for ( const position of positions ) {

		const d = sub( position, center );

		radius = Math.max( radius, Math.sqrt( dot( d, d ) ) );

	}

	return { name: mesh.name, positions, normals, indices: mesh.indices, center, radius };

};

// 光線が外接球に掛かるか
const touchesBounds = ( ray: Ray, mesh: WorldMesh ) => {

	const toCenter = sub( mesh.center, ray.origin );
	const along = dot( toCenter, ray.direction );
	const closest = sub( toCenter, scale( ray.direction, along ) );

	return dot( closest, closest ) <= mesh.radius * mesh.radius * 1.0001;

};

// 光線が最初に当たる面。法線は頂点の法線を重心座標で混ぜて正規化する（GPU の補間と同じ）
export const castRay = ( ray: Ray, meshes: WorldMesh[] ): Hit | null => {

	let best: Hit | null = null;

	for ( const mesh of meshes ) {

		if ( ! touchesBounds( ray, mesh ) ) continue;

		for ( let i = 0; i < mesh.indices.length; i += 3 ) {

			const ia = mesh.indices[ i ];
			const ib = mesh.indices[ i + 1 ];
			const ic = mesh.indices[ i + 2 ];

			const hit = intersectTriangle( ray, mesh.positions[ ia ], mesh.positions[ ib ], mesh.positions[ ic ] );

			if ( ! hit ) continue;

			if ( best && best.distance <= hit.t ) continue;

			const w = 1 - hit.u - hit.v;
			const blended = add( add( scale( mesh.normals[ ia ], w ), scale( mesh.normals[ ib ], hit.u ) ), scale( mesh.normals[ ic ], hit.v ) );
			const normal = normalize( blended );
			const position = add( ray.origin, scale( ray.direction, hit.t ) );

			let viewDir = ray.orthographicViewDir;

			if ( ! viewDir ) {

				viewDir = normalize( sub( ray.cameraPosition, position ) );

			}

			best = { mesh: mesh.name, distance: hit.t, position, normal, viewDir };

		}

	}

	return best;

};
