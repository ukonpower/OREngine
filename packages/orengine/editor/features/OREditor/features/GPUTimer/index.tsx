import { useEffect, useState, useRef, useCallback } from 'react';

import { useOREngine } from '../../../OREngine/hooks/useOREngine';
import { useOREditor } from '../../hooks/useOREditor';

import style from './index.module.scss';
import { TimerDataBuffer } from './lib/TimerDataBuffer';
import { TimerDuration, TimerStatistics } from './lib/types';


const getColorForDuration = ( duration: number ): string => {

	if ( duration < 2 ) {

		const ratio = duration / 2;
		const r = Math.floor( 100 + ratio * 100 );
		return `rgb(${r}, 200, 100)`;

	} else if ( duration < 5 ) {

		const ratio = ( duration - 2 ) / 3;
		const g = Math.floor( 200 - ratio * 50 );
		return `rgb(200, ${g}, 100)`;

	} else if ( duration < 10 ) {

		const ratio = ( duration - 5 ) / 5;
		const g = Math.floor( 150 - ratio * 80 );
		const b = Math.floor( 100 - ratio * 50 );
		return `rgb(200, ${g}, ${b})`;

	} else {

		return 'rgb(200, 70, 50)';

	}

};

const formatNumber = ( value: number ): string => {

	if ( value >= 10 ) {

		return value.toFixed( 1 );

	} else if ( value >= 1 ) {

		return value.toFixed( 2 );

	} else {

		return value.toFixed( 3 );

	}

};

const shortenName = ( name: string ): string => {

	return name.replace( /\[([^\]]{4,})\]/g, ( _, id ) => `[${id.slice( 0, 3 )}]` );

};

export const Timer = () => {

	const { editor } = useOREditor();
	const { engine } = useOREngine();
	const [ statistics, setStatistics ] = useState<TimerStatistics[]>( [] );
	const [ totalTime, setTotalTime ] = useState<number>( 0 );
	const [ filterType, setFilterType ] = useState<string>( 'all' );
	const [ threshold, setThreshold ] = useState<number>( 0 );
	const [ sortBy, setSortBy ] = useState<'time' | 'name'>( 'time' );
	const [ isRunning, setIsRunning ] = useState<boolean>( false );
	const dataBufferRef = useRef<TimerDataBuffer>( new TimerDataBuffer( 30 ) );
	const rafIdRef = useRef<number>( 0 );
	const dirtyRef = useRef<boolean>( false );
	const lastUpdateTimeRef = useRef<number>( 0 );

	const handleItemClick = useCallback( ( entityId?: string ) => {

		if ( ! entityId ) return;

		const entity = engine.root.findEntityByUUID( entityId );

		if ( entity ) {

			editor.selectEntity( entity );

		}

	}, [ engine, editor ] );

	useEffect( () => {

		const renderer = engine.renderer;
		const dataBuffer = dataBufferRef.current;
		const updateInterval = 300;

		const onTimerUpdate = ( samples: TimerDuration[] ) => {

			if ( ! isRunning ) return;

			dataBuffer.update( samples );
			dirtyRef.current = true;

		};

		const tick = ( timestamp: number ) => {

			if ( dirtyRef.current && timestamp - lastUpdateTimeRef.current >= updateInterval ) {

				setStatistics( dataBuffer.getStatistics() );
				setTotalTime( dataBuffer.getTotalTime() );
				dirtyRef.current = false;
				lastUpdateTimeRef.current = timestamp;

			}

			rafIdRef.current = requestAnimationFrame( tick );

		};

		renderer.on( "timer", onTimerUpdate );
		rafIdRef.current = requestAnimationFrame( tick );

		return () => {

			renderer.off( "timer", onTimerUpdate );
			cancelAnimationFrame( rafIdRef.current );

		};

	}, [ engine, isRunning ] );

	const filteredStats = statistics.filter( ( stat ) => {

		if ( filterType !== 'all' && stat.renderType !== filterType ) {

			return false;

		}

		if ( stat.avg < threshold ) {

			return false;

		}

		return true;

	} );

	const availableTypes = Array.from( new Set( statistics.map( ( s ) => s.renderType ) ) );

	const sortedItems = [ ...filteredStats ].sort( ( a, b ) => {

		if ( sortBy === 'time' ) {

			return b.avg - a.avg;

		} else {

			return a.name.localeCompare( b.name );

		}

	} );

	const fps = totalTime > 0 ? Math.floor( 1000 / totalTime ) : 0;

	return (
		<div className={style.container}>
			<div className={style.headerRow}>
				<span className={style.totalTime}>
					{formatNumber( totalTime )}ms ({fps}fps)
				</span>
				<button
					className={style.toggleButton}
					onClick={() => setIsRunning( ! isRunning )}
					title={isRunning ? 'Stop timer' : 'Start timer'}
				>
					{isRunning ? '⏸' : '▶'}
				</button>
			</div>

			<div className={style.controls}>
				<div className={style.control}>
					<span className={style.controlLabel}>Type</span>
					<select
						className={style.select}
						value={filterType}
						onChange={( e ) => setFilterType( e.target.value )}
					>
						<option value="all">All</option>
						{availableTypes.map( ( type ) => (
							<option key={type} value={type}>{type}</option>
						) )}
					</select>
				</div>
				<div className={style.control}>
					<span className={style.controlLabel}>Min</span>
					<input
						className={style.input}
						type="number"
						min="0"
						step="0.1"
						value={threshold}
						onChange={( e ) => setThreshold( parseFloat( e.target.value ) || 0 )}
					/>
				</div>
				<div className={style.control}>
					<span className={style.controlLabel}>Sort</span>
					<select
						className={style.select}
						value={sortBy}
						onChange={( e ) => setSortBy( e.target.value as 'time' | 'name' )}
					>
						<option value="time">Time</option>
						<option value="name">Name</option>
					</select>
				</div>
			</div>

			<div className={style.group}>
				{sortedItems.map( ( stat, index ) => {

					const color = getColorForDuration( stat.avg );
					const barWidth = totalTime > 0 ? ( stat.avg / totalTime ) * 100 : 0;
					const isClickable = !! stat.entityId;

					return (
						<div
							key={stat.name + index}
							className={`${style.item} ${isClickable ? style.clickable : ''}`}
							onClick={() => handleItemClick( stat.entityId )}
						>
							<div className={style.itemRow}>
								<span className={style.itemName} title={stat.name}>
									{shortenName( stat.name )}
								</span>
								<span className={style.itemTime} style={{ color }}>
									{formatNumber( stat.avg )}
								</span>
								<span className={style.itemStats}>
									{formatNumber( stat.max )}
								</span>
							</div>
							<div className={style.progressBar}>
								<div
									className={style.progressFill}
									style={{
										width: `${barWidth}%`,
										backgroundColor: color
									}}
								/>
							</div>
						</div>
					);

				} )}
			</div>
		</div>
	);

};
