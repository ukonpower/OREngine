import { NumberScope } from '@or-project-editor/FieldUIs/NumberScope';
import { defineFieldUIs } from 'orengine/react';

import { FieldUISample } from '.';

// 同じ NumberScope を2つのフィールドに使う（別のコンポーネントからも import するだけで使える）。
// speed は既定の inline（ラベルの右）、wave は block（ラベルの下に行いっぱい）で並べる
export const fieldUIs = defineFieldUIs( FieldUISample, {
	speed: NumberScope,
	wave: { ui: NumberScope, layout: 'block' },
} );
