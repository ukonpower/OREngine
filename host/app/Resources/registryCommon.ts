import { Engine } from 'orengine';

export type TexModule = {
	name: string;
	frag?: string;
	resolution?: number[];
	filter?: string;
	updateEveryFrame?: boolean;
	textures?: { [key: string]: string };
} | null;

const texModules = import.meta.glob<TexModule>( [ '@or-resources/Textures/**/*.tex', '!**/_*', '!**/_*/**' ], { eager: true, import: 'default' } );

// .tex モジュール（TexLoaderプラグインがビルド時にfragを解決済み）を登録する
export const registerProjectTextures = () => {

	for ( const tex of Object.values( texModules ) ) {

		if ( ! tex ) continue;

		Engine.resources.addTextureResource( tex.name, {
			frag: tex.frag,
			resolution: tex.resolution || [ 1024, 1024 ],
			filter: tex.filter,
			updateEveryFrame: tex.updateEveryFrame,
			textures: tex.textures,
		} );

	}

};

export const initResourceInstances = ( engine: Engine ) => {

	Engine.resources.buildTextureInstances( engine.renderer, engine.gl, engine.uniforms );

};
