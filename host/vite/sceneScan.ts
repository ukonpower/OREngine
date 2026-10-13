// シーンに置かれたコンポーネント1つ分の名前と props（player ビルドでコンポーネントに使う部品を聞くため）
export interface ComponentUsage {
	name: string;
	props: Record<string, unknown>;
}

export interface SceneUsage {
	componentNames: Set<string>;
	propKeys: Set<string>;
	useGLTF: boolean;
	components: ComponentUsage[];
}

// フィールド名 a/b の区切りごとの名前も、改名させないキーに足す。
// コンポーネントがオブジェクトのキーからフィールド名を組み立てることがあり（Cloner の params/<キー> など）、
// そのキーが terser の property mangle で改名されるとシーンの値が入らなくなる
const addPropKey = ( key: string, propKeys: Set<string> ) => {

	propKeys.add( key );

	if ( key.indexOf( '/' ) === - 1 ) return;

	for ( const segment of key.split( '/' ) ) {

		propKeys.add( segment );

	}

};

// シーンファイルのパース結果から使用コンポーネント名・propsキー・GLTF使用有無を収集する
// 構造を仮定した早期returnをせず、任意のネスト（BLidgeClient の props.attachments 配下等）を一律に辿る
export const collectSceneUsage = ( sceneJson: unknown ): SceneUsage => {

	const componentNames = new Set<string>();
	const propKeys = new Set<string>();
	const components: ComponentUsage[] = [];
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

			if ( insideProps ) addPropKey( key, propKeys );

			if ( key === 'components' && Array.isArray( value ) ) {

				value.forEach( ( comp ) => {

					if ( comp !== null && typeof comp === 'object' ) {

						const c = comp as Record<string, unknown>;

						if ( typeof c.name === 'string' ) componentNames.add( c.name );

						const props = c.props;
						if ( c.name === 'BLidgeClient' && props !== null && typeof props === 'object' && ( props as Record<string, unknown> ).gltf === true ) {

							useGLTF = true;

						}

						if ( typeof c.name === 'string' ) {

							let componentProps: Record<string, unknown> = {};

							if ( props !== null && typeof props === 'object' ) {

								componentProps = props as Record<string, unknown>;

							}

							components.push( { name: c.name, props: componentProps } );

						}

					}

					walk( comp, insideProps );

				} );

			} else if ( key === 'props' || key === 'renderer' || key === 'curves' ) {

				// props と renderer は Serializable がフィールド名の文字列で読むため、キーを改名させない。
				// curves（カーブの表）はリンクがカーブ ID の文字列で引くので、ID のキーも改名させない
				walk( value, true );

			} else {

				walk( value, insideProps );

			}

		}

	};

	// トップレベル（timeline/fps 等）も Engine の Serializable がフィールド名の文字列で読む
	if ( sceneJson !== null && typeof sceneJson === 'object' ) {

		for ( const key of Object.keys( sceneJson ) ) {

			propKeys.add( key );

		}

	}

	walk( sceneJson, false );

	return { componentNames, propKeys, useGLTF, components };

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
