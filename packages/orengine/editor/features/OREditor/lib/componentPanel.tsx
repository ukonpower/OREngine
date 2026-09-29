import * as MXP from 'maxpower';

import { ComponentPanel } from '../features/ComponentPanel';

import type { Engine } from '../../../../core/Engine';
import type { Editor } from '../../../lib';
import type { PanelDefinition } from '../features/PanelLayout';
import type React from 'react';

// コンポーネントパネルの UI が受け取る props。C は対象のコンポーネント
export type ComponentPanelProps<C extends MXP.Component = MXP.Component> = {
	// 選択中（アクティブ）のエンティティが持つ対象コンポーネント
	target: C;
	entity: MXP.Entity;
	engine: Engine;
	editor: Editor;
};

export type ComponentPanelUI<C extends MXP.Component = MXP.Component> = React.FC<ComponentPanelProps<C>>;

export type ComponentPanelOption<C extends MXP.Component> = {
	id: string;
	title: string;
	// タブ追加メニュー上の階層。PanelDefinition の category と同じ
	category?: string;
	ui: ComponentPanelUI<C>;
};

// コンポーネントの editor.tsx で panel として export するパネル定義を作る。
// 選択中のエンティティが target クラスのコンポーネントを持つときだけ ui を描く
export const defineComponentPanel = <C extends MXP.Component>( target: abstract new ( ...args: any[] ) => C, option: ComponentPanelOption<C> ): PanelDefinition => {

	return {
		id: option.id,
		title: option.title,
		category: option.category,
		content: <ComponentPanel target={target} ui={option.ui as ComponentPanelUI} title={option.title} />,
	};

};
