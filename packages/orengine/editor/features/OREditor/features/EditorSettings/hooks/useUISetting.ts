import { useCallback, useSyncExternalStore } from 'react';

// エディタの端末ごとのUI設定。シーンに依存しない好みなので editor.json ではなく localStorage に持つ
export type UISettings = {
	showAudioView: boolean;
};

const DEFAULTS: UISettings = {
	showAudioView: true,
};

const STORAGE_KEY = 'orengine-editor-ui-settings';

// localStorage から設定を読む。壊れていたらデフォルトに戻す
const load = (): UISettings => {

	try {

		const json = localStorage.getItem( STORAGE_KEY );

		if ( json ) {

			return { ...DEFAULTS, ...JSON.parse( json ) };

		}

	} catch ( _e ) {

		// 読めない環境ではデフォルトで動かす

	}

	return { ...DEFAULTS };

};

let settings = load();

const listeners = new Set<() => void>();

const subscribe = ( listener: () => void ) => {

	listeners.add( listener );

	return () => {

		listeners.delete( listener );

	};

};

// UI設定を1項目読み書きするフック。同じ項目を参照するコンポーネント間で値が同期する
export const useUISetting = <K extends keyof UISettings>( key: K ) => {

	const value = useSyncExternalStore( subscribe, () => settings[ key ] );

	const setValue = useCallback( ( v: UISettings[ K ] ) => {

		settings = { ...settings, [ key ]: v };

		try {

			localStorage.setItem( STORAGE_KEY, JSON.stringify( settings ) );

		} catch ( _e ) {

			// 保存できなくてもセッション中は動かす

		}

		listeners.forEach( ( l ) => l() );

	}, [ key ] );

	return [ value, setValue ] as const;

};
