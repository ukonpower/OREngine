import { useAnchoredPosition } from '../hooks/useAnchoredPosition';

import style from './index.module.scss';

import type { AnchorRect } from '../hooks/useAnchoredPosition';

export type ModalProps = {
	// 見出し行のタイトル。省略すると見出し行ごと出ない
	title?: string;
	// タイトルに添える補足（プロジェクト名など）
	note?: string;
	// 窓の幅(px)。省略すると中身なりの幅になる
	width?: number;
	// 窓を寄せる先（クリック位置など）。省略すると画面中央に出る
	anchor?: AnchorRect;
	footer?: React.ReactNode;
	children?: React.ReactNode;
	onClose: () => void;
}

// 背面を塞いで浮かせる窓。背面のクリックで閉じる
export const Modal = ( props: ModalProps ) => {

	const anchored = useAnchoredPosition( props.anchor );

	return <div className={style.modal}>
		<div className={style.overlay} onClick={props.onClose} />
		<div ref={anchored.ref} className={style.window} style={{ ...anchored.style, width: props.width }}>
			{props.title && <div className={style.head}>
				<span className={style.head_title}>{props.title}</span>
				{props.note && <span className={style.head_note}>{props.note}</span>}
				<button type="button" className={style.head_close} onClick={props.onClose}>×</button>
			</div>}
			<div className={style.body}>{props.children}</div>
			{props.footer && <div className={style.footer}>{props.footer}</div>}
		</div>
	</div>;

};
