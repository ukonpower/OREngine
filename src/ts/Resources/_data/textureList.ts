// @ts-nocheck

export const TEXTURELIST: {name: string, frag?: string, resolution: number[], filter?: string, updateEveryFrame?: boolean}[] = [
	{ name: "hash", frag: "Hash/frag", resolution: [512,512], filter: "nearest" },
	{ name: "noise", frag: "Noise/frag", resolution: [1024,1024] },
	{ name: "noiseCyclic", frag: "NoiseCyclic/frag", resolution: [1024,1024] },
	{ name: "noiseCyclicAnime", frag: "NoiseCyclic/frag", resolution: [512,512], updateEveryFrame: true },
];
