export interface SceneUsage {
	componentNames: Set<string>;
	propKeys: Set<string>;
	useGLTF: boolean;
	// Cloner が使う並べ方の名前（player に焼き込む並べ方）
	layoutNames: Set<string>;
}

// packages/orengine/builtin/Components/Utility/Cloner の既定の layout と一致させる
const CLONER_DEFAULT_LAYOUT = 'Grid';

const CLONER_PARAMS_PREFIX = 'params/';

// Cloner の props から使う並べ方の名前を layoutNames に、並べ方の数値名を propKeys に足す。
// Cloner は並べ方の params オブジェクトのキーからフィールド名 params/<キー> を作るので、
// キー（spacing など）が terser の property mangle で改名されるとシーンの値が入らなくなる
const collectClonerUsage = ( props: Record<string, unknown>, layoutNames: Set<string>, propKeys: Set<string> ) => {

	const layout = props.layout;

	if ( typeof layout === 'string' ) {

		layoutNames.add( layout );

	} else if ( ! ( 'layout' in props ) ) {

		layoutNames.add( CLONER_DEFAULT_LAYOUT );

	}

	for ( const key of Object.keys( props ) ) {

		if ( key.startsWith( CLONER_PARAMS_PREFIX ) ) {

			propKeys.add( key.slice( CLONER_PARAMS_PREFIX.length ) );

		}

	}

};

// シーンファイルのパース結果から使用コンポーネント名・propsキー・GLTF使用有無を収集する
// 構造を仮定した早期returnをせず、任意のネスト（BLidgeClient の props.attachments 配下等）を一律に辿る
export const collectSceneUsage = ( sceneJson: unknown ): SceneUsage => {

	const componentNames = new Set<string>();
	const propKeys = new Set<string>();
	const layoutNames = new Set<string>();
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

						if ( c.name === 'Cloner' ) {

							// props が無い Cloner も既定の並べ方を使うので、空の props として扱う
							let clonerProps: Record<string, unknown> = {};

							if ( props !== null && typeof props === 'object' ) {

								clonerProps = props as Record<string, unknown>;

							}

							collectClonerUsage( clonerProps, layoutNames, propKeys );

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

	return { componentNames, propKeys, useGLTF, layoutNames };

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
