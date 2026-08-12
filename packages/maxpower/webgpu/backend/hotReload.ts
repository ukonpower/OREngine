/*-------------------------------
	.wgsl のHMR通知

	各モジュールが import.meta.hot.accept で差し替えたシェーダーソースを
	GPU資源へ反映してもらうための通知。呼び出しはすべて import.meta.hot の
	ガード内にあるため、playerビルドにはこのモジュールごと残らない。
-------------------------------*/

const listeners = new Set<() => void>();

// シェーダー資源の作り直しが必要になったときに呼ばれるリスナーを登録する
export const onShaderReload = ( listener: () => void ) => {

	listeners.add( listener );

};

// 登録されたリスナーへシェーダー資源の作り直しを依頼する
export const requestShaderReload = () => {

	listeners.forEach( ( listener ) => listener() );

};
