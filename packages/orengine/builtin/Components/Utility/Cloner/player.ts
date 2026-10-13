import { CLONER_LAYOUT_KIND, DEFAULT_CLONER_LAYOUT } from './layout';

// player ビルドのシーン走査が Node から読む。シーンに保存された props から、使う並べ方をライブラリの参照として返す
export const collectLibraryRefs = ( props: Record<string, unknown> ) => {

	let name = DEFAULT_CLONER_LAYOUT;

	if ( typeof props.layout === 'string' ) {

		name = props.layout;

	}

	return [ { kind: CLONER_LAYOUT_KIND, name } ];

};
