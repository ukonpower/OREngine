import { INSTRUMENT_KIND } from './instrument';

// player ビルドのシーン走査が Node から読む。シーンに保存された props から、トラックが使う楽器をライブラリの参照として返す
export const collectLibraryRefs = ( props: Record<string, unknown> ) => {

	const refs: { kind: string, name: string }[] = [];

	if ( ! Array.isArray( props.tracks ) ) return refs;

	for ( const track of props.tracks ) {

		if ( Array.isArray( track ) && typeof track[ 1 ] === 'string' ) {

			refs.push( { kind: INSTRUMENT_KIND, name: track[ 1 ] } );

		}

	}

	return refs;

};
