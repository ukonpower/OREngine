import { AGENT_HEADLESS_PARAM } from '../AgentBridge/Protocol';

import type { Editor } from '../Editor';

// 未保存の変更があるときに、リロード・タブを閉じる・別 URL への遷移の前でブラウザの確認を出す。戻り値で外す。
// vite の full-reload（外部からのファイルの編集・シーン CLI の保存・コードの変更）も location.reload() なので同じく確認が出る
export const installUnsavedGuard = ( editor: Editor ) => {

	// headless は CLI（Playwright）が開いて閉じるページで、確認が出ると操作が止まるため
	if ( new URLSearchParams( location.search ).has( AGENT_HEADLESS_PARAM ) ) {

		return () => {};

	}

	const onBeforeUnload = ( event: BeforeUnloadEvent ) => {

		if ( ! editor.unsaved ) return;

		event.preventDefault();

	};

	window.addEventListener( 'beforeunload', onBeforeUnload );

	return () => {

		window.removeEventListener( 'beforeunload', onBeforeUnload );

	};

};
