import { Component } from '../../../core/Component';

import type { ComponentParams } from '../../../core/Component';
import type { PostProcessPassParam } from '../../PostProcess';

/*-------------------------------
	プロジェクト側がポストプロセスを差し込む口

	カメラのエンティティに付けると、レンダラーの仕上げが終わったあとに
	追加したパスが順に走り、最後の出力が画面へ出る。

	コンポーネントはパスの宣言だけを持ち、実体（描画先・前フレームの結果）は
	描くビューごとに Renderer が組んで RenderView に持たせる。
	ビューごとに大きさが違っても毎回作り直さず、前フレームの結果もビュー間で混ざらないようにするため。
-------------------------------*/

export class PostProcessPipeline extends Component {

	private _params: PostProcessPassParam[];

	constructor( params: ComponentParams ) {

		super( params );

		this._params = [];

	}

	// 宣言の一覧。add / remove のたびに配列ごと差し替えるので、各ビューは参照が変わったのを見て実体を組み直す
	public get params() {

		return this._params;

	}

	// 走らせたいパスを宣言する。順番がそのまま実行順になる
	public add( ...params: PostProcessPassParam[] ) {

		this._params = this._params.concat( params );

	}

	// add で渡した宣言を外す
	public remove( param: PostProcessPassParam ) {

		const index = this._params.indexOf( param );

		if ( index < 0 ) return;

		const next = this._params.slice();
		next.splice( index, 1 );

		this._params = next;

	}

}
