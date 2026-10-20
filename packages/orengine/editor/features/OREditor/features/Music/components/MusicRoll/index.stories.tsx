import { useState } from 'react';

import { withOREditor } from '@or-storybook/decorators/withOREditor';
import { MUSIC_ROLL_TRACK, musicDefault } from '@or-storybook/fixtures/music';

import { Music } from '../../../../../../../builtin/Components/Utility/Music';
import { decodeClips } from '../../../../../../../builtin/Components/Utility/Music/clips';
import { useEditorFrame } from '../../../../hooks/useEditorFrame';
import { useSerializableField } from '../../../SerializableField/hooks/useSerializableProps';
import { clipKey } from '../../lib/clipEdit';

import { MusicRoll } from '.';

import type { MusicTrackData } from '../../../../../../../builtin/Components/Utility/Music/instrument';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Music パネルでノートの帯を開いたときの下半分。パネルの中の選択（開いた帯）は外から与えられないので、ロールだけを Lead の最初の帯で描く
const StoryRoll = () => {

	const [ music, setMusic ] = useState<Music | null>( Music.instance );

	useEditorFrame( () => {

		if ( Music.instance !== music ) setMusic( Music.instance );

	} );

	const [ tracks ] = useSerializableField<MusicTrackData[]>( music || undefined, "tracks" );

	if ( ! music || ! tracks ) return null;

	const track = tracks[ MUSIC_ROLL_TRACK ];
	const clip = decodeClips( track[ 4 ] )[ 0 ];

	return <MusicRoll
		music={music}
		tracks={tracks}
		activeKey={clipKey( MUSIC_ROLL_TRACK, 0 )}
		clip={clip}
		bpm={100}
		trackName={track[ 0 ]}
		preview={() => {}}
	/>;

};

const meta = {
	title: 'OREditor/MusicRoll',
	component: StoryRoll,
} satisfies Meta<typeof StoryRoll>;

export default meta;

type Story = StoryObj<typeof meta>;

// 帯の中の時間 0〜8 拍（2小節）に 1/4 拍のアルペジオと和音。帯の終わりより後ろのノートは斜線の上で薄く出る。
// 鍵盤の列の幅は Music パネル（MusicTimeline の .timeline）が --music-head-width で与えるので、同じ値を枠に置く
export const Default: Story = {
	decorators: [
		( Story ) => <div style={{ height: '320px', display: 'flex', flexDirection: 'column', '--music-head-width': 'calc(var(--or-space) * 36)' } as React.CSSProperties}><Story /></div>,
		withOREditor( musicDefault ),
	],
};
