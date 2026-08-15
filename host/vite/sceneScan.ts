export interface SceneUsage {
	componentNames: Set<string>;
	propKeys: Set<string>;
	useGLTF: boolean;
}

// scene.json のパース結果から使用コンポーネント名・propsキー・GLTF使用有無を収集する
// 構造を仮定した早期returnをせず、任意のネスト（BLidgeClient の props.attachments 配下等）を一律に辿る
export const collectSceneUsage = ( sceneJson: unknown ): SceneUsage => {

	const componentNames = new Set<string>();
	const propKeys = new Set<string>();
	let useGLTF = false;

	const walk = ( node: unknown, insideProps: boolean ): void => {

		if ( Array.isArray( node ) ) {

			node.forEach( child => walk( child, insideProps ) );
			return;

		}

		if ( node === null || typeof node !== 'object' ) return;

		const obj = node as Record<string, unknown>;

		for ( const key of Object.keys( obj ) ) {

			const value = obj[ key ];

			if ( insideProps ) propKeys.add( key );

			if ( key === 'components' && Array.isArray( value ) ) {

				value.forEach( ( comp ) => {

					if ( comp !== null && typeof comp === 'object' ) {

						const c = comp as Record<string, unknown>;

						if ( typeof c.name === 'string' ) componentNames.add( c.name );

						const props = c.props;
						if ( c.name === 'BLidgeClient' && props !== null && typeof props === 'object' && ( props as Record<string, unknown> ).gltf === true ) {

							useGLTF = true;

						}

					}

					walk( comp, insideProps );

				} );

			} else if ( key === 'props' ) {

				walk( value, true );

			} else {

				walk( value, insideProps );

			}

		}

	};

	walk( sceneJson, false );

	return { componentNames, propKeys, useGLTF };

};

// JSONの全ネストレベルのオブジェクトキーを収集する（terserのproperty mangleから保護する用途）
export const collectJsonKeys = ( json: unknown ): Set<string> => {

	const keys = new Set<string>();

	const walk = ( node: unknown ): void => {

		if ( Array.isArray( node ) ) {

			node.forEach( walk );
			return;

		}

		if ( node === null || typeof node !== 'object' ) return;

		for ( const key of Object.keys( node as Record<string, unknown> ) ) {

			keys.add( key );
			walk( ( node as Record<string, unknown> )[ key ] );

		}

	};

	walk( json );

	return keys;

};
