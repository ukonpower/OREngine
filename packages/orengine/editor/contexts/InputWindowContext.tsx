import { createContext } from "react";

export type InputWindowConfig = {
	type: "number" | "text";
	value: number | string;
	label?: string;
	onChange: ( value: number | string ) => void;
	step?: number;
	min?: number;
	max?: number;
	precision?: number;
};

// 入力ウィンドウの開閉契約。Provider 実装は features/OREditor/features/InputWindow が担う
export type InputWindowContextValue = {
	config: InputWindowConfig | null;
	open: ( config: InputWindowConfig ) => void;
	close: () => void;
};

export const InputWindowContext = createContext<InputWindowContextValue | null>( null );
