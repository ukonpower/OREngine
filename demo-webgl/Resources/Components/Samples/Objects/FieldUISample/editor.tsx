import { NumberScope } from '@or-project-editor/FieldUIs/NumberScope';
import { defineFieldUIs } from 'orengine/react';

import { FieldUISample } from '.';

// 同じ NumberScope を2つのフィールドに使う（別のコンポーネントからも import するだけで使える）
export const fieldUIs = defineFieldUIs( FieldUISample, {
	speed: NumberScope,
	wave: NumberScope,
} );
