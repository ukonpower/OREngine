/// <reference types="vite/client" />

declare const BASE_PATH: string;
declare const __OR_PROJECT_NAME__: string;

declare module '*.fs' {
	const content: string;
	export default content;
}

declare module '*.vs' {
	const content: string;
	export default content;
}

declare module '*.glsl' {
	const content: string;
	export default content;
}
