// @ts-nocheck

export const TEXTURELIST: {name: string, frag?: string, resolution: number[], filter?: string, updateEveryFrame?: boolean}[] = [
	{ name: "hash", frag: undefined, resolution: [512,512], filter: "nearest" },
	{ name: "noise", frag: undefined, resolution: [1024,1024], filter: "linear", updateEveryFrame: true },
	{ name: "noiseCyclic", frag: undefined, resolution: [1024,1024], filter: "linear" },
	{ name: "noiseCyclicAnime", frag: undefined, resolution: [512,512], filter: "linear", updateEveryFrame: true },
];
