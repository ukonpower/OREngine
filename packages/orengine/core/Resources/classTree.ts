// import.meta.glob の結果からディレクトリ階層に沿ったクラスツリーを組み立てる
// 例: './Components/Samples/Effects/EyeRings/index.ts' の export class EyeRings
//     → { Samples: { Effects: { EyeRings } } }
// グループはコンポーネント自身のディレクトリを除いた中間ディレクトリ、リーフ名は export されたクラス名になる
export const buildClassTree = ( modules: Record<string, unknown>, rootDirName: string ) => {

	const tree: { [ key: string ]: any } = {};

	const marker = `/${rootDirName}/`;

	for ( const [ modulePath, mod ] of Object.entries( modules ) ) {

		const rel = modulePath.slice( modulePath.lastIndexOf( marker ) + marker.length );
		const groupDirs = rel.split( '/' ).slice( 0, - 2 );

		const entry = Object.entries( mod as Record<string, unknown> ).find(
			( [ key, value ] ) => typeof value === 'function' && /^[A-Z]/.test( key )
		);

		if ( ! entry ) continue;

		let target = tree;

		for ( const dir of groupDirs ) {

			target = target[ dir ] = target[ dir ] || {};

		}

		target[ entry[ 0 ] ] = entry[ 1 ];

	}

	return tree;

};
