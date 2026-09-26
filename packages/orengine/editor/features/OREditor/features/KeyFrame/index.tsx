import { useEffect, useRef, useState } from 'react';

import * as MXP from 'maxpower';
import { type KeyFrameFieldRef } from 'orengine/editor';
import { AnchorRect, Menu, MenuItem, Modal, pointAnchor, usePopover } from 'uipower';

import { useOREditor } from '../../hooks/useOREditor';

type Message = {
	text: string;
	anchor: AnchorRect;
};

// ビューポートの I で出すメニューの項目と、打つフィールド。回転は euler に打つ
const VIEWPORT_KEY_ITEMS: { label: string, paths: string[] }[] = [
	{ label: "Position", paths: [ "position" ] },
	{ label: "Rotation", paths: [ "euler" ] },
	{ label: "Scale", paths: [ "scale" ] },
	{ label: "All", paths: [ "position", "euler", "scale" ] },
];

// キーフレームの挿入で、ポインタの位置に出す UI を受け持つ常駐要素。ビューポートの I（editor 側の "request/insertKeyMenu"）で
// どのフィールドに打つかのメニューを開き、打てなかったとき（"message"）はその理由を小窓で出す
export const KeyFrame = () => {

	const { editor } = useOREditor();
	const { open, closeAll } = usePopover();
	const [ message, setMessage ] = useState<Message | null>( null );

	// キーボードから開くので、表示位置はポインタの居る場所にする（Blender と同じ）
	const pointer = useRef( { x: 0, y: 0 } );

	useEffect( () => {

		const onPointerMove = ( e: PointerEvent ) => {

			pointer.current.x = e.clientX;
			pointer.current.y = e.clientY;

		};

		window.addEventListener( "pointermove", onPointerMove );

		return () => {

			window.removeEventListener( "pointermove", onPointerMove );

		};

	}, [] );

	useEffect( () => {

		const onRequestMenu = ( entity: MXP.Entity ) => {

			// 連打で同じメニューが積み上がらないよう、開いているものは畳んでから出す
			closeAll();

			const items: MenuItem[] = [];

			for ( const item of VIEWPORT_KEY_ITEMS ) {

				items.push( {
					label: item.label,
					onClick: () => {

						const fields: KeyFrameFieldRef[] = [];

						for ( const path of item.paths ) {

							fields.push( { target: entity, path } );

						}

						// 全部を1回の undo にまとめて打つ
						editor.insertKeys( fields );

						closeAll();

					},
				} );

			}

			open( <Menu title="Insert Keyframe" items={items} />, pointAnchor( pointer.current.x, pointer.current.y ) );

		};

		const onMessage = ( text: string ) => {

			setMessage( { text, anchor: pointAnchor( pointer.current.x, pointer.current.y ) } );

		};

		editor.on( "request/insertKeyMenu", onRequestMenu );
		editor.on( "message", onMessage );

		return () => {

			editor.off( "request/insertKeyMenu", onRequestMenu );
			editor.off( "message", onMessage );

		};

	}, [ editor, open, closeAll ] );

	if ( ! message ) return null;

	return <Modal title="Keyframe" anchor={message.anchor} onClose={() => setMessage( null )}>
		{message.text}
	</Modal>;

};
