import * as path from 'path';

import type { EditorServerExtension } from 'orengine/server';

// プロジェクト側サーバー拡張のサンプル。ここで足した route は /api/ext 配下に生える
const extension: EditorServerExtension = ( router, ctx ) => {

	router.get( '/hello', ( _req, res ) => {

		res.json( { message: `hello from ${path.basename( ctx.projectDir )}` } );

	} );

};

export default extension;
