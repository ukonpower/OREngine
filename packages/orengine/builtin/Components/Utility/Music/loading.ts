import { Engine } from 'orengine';

import { Music } from '.';

// player の読み込み（Engine.compileShaders）に曲の生成をつなぎ、全トラックを作り終えるまで待たせる。
// 進捗はシェーダーのコンパイルと曲の生成の合計で返すので、今の進捗バーにそのまま載る。
// Music を置いたシーンの player ビルドでだけ PlayerRegistry が呼ぶ（置かないシーンの player に生成待ちのコードを入れないため）
export const attachMusicLoading = ( engine: Engine ) => {

	const compileShaders = engine.compileShaders.bind( engine );

	engine.compileShaders = async ( view, onProgress ) => {

		const music = Music.instance;

		if ( ! music ) {

			await compileShaders( view, onProgress );

			return;

		}

		let shaderLoaded = 0;
		let shaderTotal = 0;
		let musicDone = 0;
		let musicTotal = 0;

		const report = () => {

			if ( onProgress ) onProgress( shaderLoaded + musicDone, shaderTotal + musicTotal );

		};

		// 生成は始めた時点で（最初の await の前に）全体の数を返すので、コンパイルの進捗にも最初から曲のぶんが入る
		const generating = music.generate( ( done, total ) => {

			musicDone = done;
			musicTotal = total;
			report();

		} );

		const compiling = compileShaders( view, ( loaded, total ) => {

			shaderLoaded = loaded;
			shaderTotal = total;
			report();

		} );

		await Promise.all( [ generating, compiling ] );

	};

};
