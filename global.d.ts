/// <reference types="vite/client" />

declare module '*.json' {
	const v: any;
	export default v;
}

declare module '*.glsl' {
	const v: string;
	export default v;
}

declare module '*.vs' {
	const v: string;
	export default v;
}

declare module '*.fs' {
	const v: string;
	export default v;
}

declare const BASE_PATH: string;
