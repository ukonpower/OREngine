import fs from 'node:fs';
import path from 'node:path';

// scene.ts の shot の応答（packages/orengine/editor/lib/AgentBridge/ShotCommand の戻り値）
type ShotResult = {
	png: string;
	[ key: string ]: unknown;
};

// shot の応答の PNG（base64）を outPath へ書き出し、stdout に出す情報（PNG 本体を除いたもの）を返す。
// outPath は CLI を実行したディレクトリからの相対パスでもよい
export const writeShotPng = ( outPath: string, result: unknown ) => {

	const { png, ...info } = result as ShotResult;
	const file = path.resolve( outPath );

	fs.mkdirSync( path.dirname( file ), { recursive: true } );
	fs.writeFileSync( file, Buffer.from( png, 'base64' ) );

	return { path: file, ...info };

};
