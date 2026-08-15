import { TimerSample, TimerStatistics, TimerDuration } from './types';

class CircularBuffer {

	private buffer: number[];
	private index: number;
	private size: number;
	private filled: boolean;

	constructor( size: number ) {

		this.size = size;
		this.buffer = new Array( size );
		this.index = 0;
		this.filled = false;

	}

	push( value: number ) {

		this.buffer[ this.index ] = value;
		this.index = ( this.index + 1 ) % this.size;

		if ( ! this.filled && this.index === 0 ) {

			this.filled = true;

		}

	}

	getAverage(): number {

		const count = this.filled ? this.size : this.index;

		if ( count === 0 ) return 0;

		let sum = 0;

		for ( let i = 0; i < count; i ++ ) {

			sum += this.buffer[ i ];

		}

		return sum / count;

	}

	getMax(): number {

		const count = this.filled ? this.size : this.index;

		if ( count === 0 ) return 0;

		let max = this.buffer[ 0 ];

		for ( let i = 1; i < count; i ++ ) {

			if ( this.buffer[ i ] > max ) {

				max = this.buffer[ i ];

			}

		}

		return max;

	}

	getMin(): number {

		const count = this.filled ? this.size : this.index;

		if ( count === 0 ) return 0;

		let min = this.buffer[ 0 ];

		for ( let i = 1; i < count; i ++ ) {

			if ( this.buffer[ i ] < min ) {

				min = this.buffer[ i ];

			}

		}

		return min;

	}

	getCount(): number {

		return this.filled ? this.size : this.index;

	}

}

export class TimerDataBuffer {

	private buffers: Map<string, CircularBuffer>;
	private windowSize: number;
	private currentData: Map<string, TimerSample & { entityId?: string }>;

	constructor( windowSize: number = 30 ) {

		this.windowSize = windowSize;
		this.buffers = new Map();
		this.currentData = new Map();

	}

	update( samples: TimerDuration[] ) {

		const timestamp = performance.now();

		for ( let i = 0; i < samples.length; i ++ ) {

			const sample = samples[ i ];

			const parts = sample.name.split( '/' );
			const renderType = parts[ 0 ] || 'unknown';

			let entityId: string | undefined;
			const lastPart = parts[ parts.length - 1 ];
			const match = lastPart && lastPart.match( /\[([^\]]+)\]/ );

			if ( match ) {

				entityId = match[ 1 ];

			}

			const timerSample: TimerSample = {
				name: sample.name,
				duration: sample.duration,
				timestamp,
				renderType,
			};

			let buffer = this.buffers.get( sample.name );

			if ( ! buffer ) {

				buffer = new CircularBuffer( this.windowSize );
				this.buffers.set( sample.name, buffer );

			}

			buffer.push( sample.duration );

			this.currentData.set( sample.name, { ...timerSample, entityId } );

		}

	}

	getStatistics(): TimerStatistics[] {

		const stats: TimerStatistics[] = [];
		let totalDuration = 0;
		const now = performance.now();
		const staleThreshold = 1000;

		const staleEntries: string[] = [];

		this.currentData.forEach( ( sample, name ) => {

			if ( now - sample.timestamp > staleThreshold ) {

				staleEntries.push( name );

			}

		} );

		staleEntries.forEach( name => {

			this.currentData.delete( name );

		} );

		this.currentData.forEach( ( sample ) => {

			totalDuration += sample.duration;

		} );

		this.currentData.forEach( ( sample ) => {

			const buffer = this.buffers.get( sample.name );

			if ( buffer ) {

				stats.push( {
					name: sample.name,
					renderType: sample.renderType,
					entityId: sample.entityId,
					current: sample.duration,
					avg: buffer.getAverage(),
					max: buffer.getMax(),
					min: buffer.getMin(),
					samples: buffer.getCount(),
					percentage: totalDuration > 0 ? ( sample.duration / totalDuration ) * 100 : 0,
				} );

			}

		} );

		return stats;

	}

	getTotalTime(): number {

		let total = 0;

		this.currentData.forEach( ( sample ) => {

			total += sample.duration;

		} );

		return total;

	}

}
