import type { FieldUIDefinition } from 'orengine/react';

// コンポーネントのフィールド UI。<projectDir>/Resources/Components/**/editor.tsx が
// `fieldUIs` を export すると拾われる。player のエントリからは辿られないので packed サイズに入らない
const fieldUIModules = import.meta.glob<{ fieldUIs?: FieldUIDefinition }>( [ '@or-resources/Components/**/editor.tsx', '!**/_*/**' ], { eager: true } );

// 各モジュールの fieldUIs export を集める
const collectFieldUIs = () => {

	const definitions: FieldUIDefinition[] = [];
	const keys = Object.keys( fieldUIModules );

	for ( let i = 0; i < keys.length; i ++ ) {

		const definition = fieldUIModules[ keys[ i ] ].fieldUIs;

		if ( definition ) {

			definitions.push( definition );

		}

	}

	return definitions;

};

export const projectFieldUIs = collectFieldUIs();
