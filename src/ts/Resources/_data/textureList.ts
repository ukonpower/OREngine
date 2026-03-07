// @ts-nocheck

export const TEXTURELIST: {name: string, frag?: string, resolution: number[], filter?: string, updateEveryFrame?: boolean}[] = [
	{ name: "hash", frag: "Hash/frag", resolution: [512,512], filter: "nearest" },
	{ name: "noise", frag: "Noise/frag", resolution: [1024,1024], filter: "linear", updateEveryFrame: true },
	{ name: "noiseCyclic", frag: "NoiseCyclic/frag", resolution: [1024,1024], filter: "linear" },
	{ name: "noiseCyclicAnime", frag: "NoiseCyclic/frag", resolution: [512,512], filter: "linear", updateEveryFrame: true },
];
