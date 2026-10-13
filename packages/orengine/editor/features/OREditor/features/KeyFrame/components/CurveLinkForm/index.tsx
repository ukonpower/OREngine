import { useState } from 'react';

import { type CurveLinkInfo, type CurveLinkSettings } from 'orengine/editor';
import { Button, InputNumber, InputText, Label } from 'uipower';

import style from './index.module.scss';

type Props = {
	info: CurveLinkInfo;
	onSubmit: ( settings: CurveLinkSettings ) => void;
	onClose: () => void;
};

// リンクの設定の小窓。倍率・足し算とリンク先のカーブの名前を編集し、OK でまとめて反映する（undo 1回）。
// select とイベントのリンクは倍率・足し算が 1 / 0 固定なので名前だけを出す
export const CurveLinkForm = ( props: Props ) => {

	const [ name, setName ] = useState( props.info.name || "" );
	const [ scale, setScale ] = useState( props.info.scale );
	const [ offset, setOffset ] = useState( props.info.offset );

	const submit = () => {

		props.onSubmit( { name, scale, offset } );

	};

	let scaleElms = null;

	if ( ! props.info.fixedScale ) {

		scaleElms = <>
			<Label title="Scale"><InputNumber value={scale} onChange={setScale} /></Label>
			<Label title="Offset"><InputNumber value={offset} onChange={setOffset} /></Label>
		</>;

	}

	return <div className={style.form}>
		<div className={style.title}>Link Settings ({props.info.curveId} / {props.info.uses} uses)</div>
		<Label title="Name"><InputText value={name} onChange={setName} /></Label>
		{scaleElms}
		<div className={style.footer}>
			<Button onClick={props.onClose}>Cancel</Button>
			<Button onClick={submit}>OK</Button>
		</div>
	</div>;

};
