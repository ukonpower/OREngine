import { Entity, EntityParams, EntityUpdateEvent } from 'maxpower';

import { shiftFrame } from './slots';

// Cloner の持ち場。子に渡す時刻を delayFrames だけ遅らせ、loopFrames があればその長さで折り返す。
// Animation も時刻で動くコンポーネントも event の時刻しか見ないので、ここでずらせば子孫が全部遅れる。
// 入れ子の Cloner では持ち場が重なるので、遅れが足される
export class ClonerSlot extends Entity {

	// event.timeCodeFrame と同じ単位（秒×60）
	public delayFrames: number;
	public loopFrames: number | null;

	constructor( params: EntityParams ) {

		super( params );

		this.delayFrames = 0;
		this.loopFrames = null;

	}

	// 子に渡す event。時刻だけをずらし、経過時間（timeDelta）などはそのまま
	private shiftEvent_( event: EntityUpdateEvent ): EntityUpdateEvent {

		const frame = shiftFrame( event.timeCodeFrame, this.delayFrames, this.loopFrames );

		return { ...event, timeCodeFrame: frame, timeCode: frame / 60 };

	}

	public update( event: EntityUpdateEvent ) {

		super.update( this.shiftEvent_( event ) );

	}

	public postUpdate( event: EntityUpdateEvent ) {

		super.postUpdate( this.shiftEvent_( event ) );

	}

	public prepareRender( event: EntityUpdateEvent ) {

		super.prepareRender( this.shiftEvent_( event ) );

	}

	public commitFrame( event: EntityUpdateEvent ) {

		super.commitFrame( this.shiftEvent_( event ) );

	}

}
