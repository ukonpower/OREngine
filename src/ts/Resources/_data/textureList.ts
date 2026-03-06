// @ts-nocheck
import HashFrag from '../Shaders/Hash/index.fs';
import NoiseFrag from '../Shaders/Noise/index.fs';
import NoiseCyclicFrag from '../Shaders/NoiseCyclic/index.fs';

export const TEXTURELIST: {name: string, frag?: string, resolution: number[], filter?: string, updateEveryFrame?: boolean}[] = [
	{ name: "hash", frag: HashFrag, resolution: [512,512], filter: "nearest" },
	{ name: "noise", frag: NoiseFrag, resolution: [1024,1024] },
	{ name: "noiseCyclic", frag: NoiseCyclicFrag, resolution: [1024,1024] },
	{ name: "noiseCyclicAnime", frag: NoiseCyclicFrag, resolution: [512,512], updateEveryFrame: true },
];
