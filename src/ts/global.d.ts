type Undefineder<T> = {
	[P in keyof T]?: T[P]
}

declare module '*.json'{
	const value: any;
	export default value;
}

declare module '*.glsl'{
	const value: string;
	export default value;
}
declare module '*.vs'{
	const value: string;
	export default value;
}
declare module '*.fs'{
	const value: string;
	export default value;
}

declare global {
  const BASE_PATH: string;
}

type HooksContext<T> = Undefineder<ReturnType<T>>
