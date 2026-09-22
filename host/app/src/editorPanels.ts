import type { PanelDefinition } from 'orengine/react';

// プロジェクトのエディタ拡張パネル。<projectDir>/editor/Panels/**/index.tsx が
// `panel` を export すると拾われる（先頭 `_` のディレクトリは Components と同じく対象外）
const panelModules = import.meta.glob<{ panel?: PanelDefinition }>( [ '@or-project-editor/Panels/**/index.tsx', '!**/_*/**' ], { eager: true } );

// 各モジュールの panel export を集める
const collectPanels = () => {

	const panels: PanelDefinition[] = [];
	const keys = Object.keys( panelModules );

	for ( let i = 0; i < keys.length; i ++ ) {

		const panel = panelModules[ keys[ i ] ].panel;

		if ( panel ) {

			panels.push( panel );

		}

	}

	return panels;

};

// OREditor は props.panels の identity が変わると PanelLayout の派生計算が空回りするため、
// レンダーのたびに作り直さずモジュールスコープで1度だけ確定させる
export const projectPanels = collectPanels();
