// DEV のときだけ名前を返す。パスやマテリアルの名前のような、エディタの表示・計測にしか使わない文字列を player ビルドから外すためのもの。
// player では引数ごと消える（terser が呼び出しを undefined に畳み、渡した文字列も残らない）
export const devName = ( name: string ): string | undefined => {

	if ( import.meta.env.DEV ) {

		return name;

	}

	return undefined;

};
