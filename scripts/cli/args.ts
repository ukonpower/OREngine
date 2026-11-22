import type { AgentOptions } from '../../packages/orengine/editor/lib/AgentBridge/Protocol/index.ts';

export class CliError extends Error {}

// `--key value` / `--flag` を options に、それ以外を位置引数に分ける
export const parseArgs = ( argv: string[] ) => {

	const args: string[] = [];
	const options: AgentOptions = {};

	for ( let i = 0; i < argv.length; i ++ ) {

		const arg = argv[ i ];

		if ( ! arg.startsWith( '--' ) ) {

			args.push( arg );
			continue;

		}

		const key = arg.slice( 2 );
		const next = argv[ i + 1 ];

		if ( next === undefined || next.startsWith( '--' ) ) {

			options[ key ] = true;

		} else {

			options[ key ] = next;
			i ++;

		}

	}

	return { args, options };

};

// batch の1行を、シェルと同じく空白で区切る。'...' と "..." の中の空白は区切らない（curve-set の JSON・空文字の --name "" 用）
export const splitLine = ( line: string ) => {

	const words: string[] = [];
	let word = '';
	let quote: string | null = null;
	let hasWord = false;

	for ( const char of line ) {

		if ( quote ) {

			if ( char === quote ) {

				quote = null;

			} else {

				word += char;

			}

			continue;

		}

		if ( char === '\'' || char === '"' ) {

			quote = char;
			hasWord = true;
			continue;

		}

		if ( char === ' ' || char === '\t' ) {

			if ( hasWord ) words.push( word );

			word = '';
			hasWord = false;
			continue;

		}

		word += char;
		hasWord = true;

	}

	if ( quote ) {

		throw new CliError( `引用符が閉じていません: ${line}` );

	}

	if ( hasWord ) words.push( word );

	return words;

};
