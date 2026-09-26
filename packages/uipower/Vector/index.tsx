import { useRef, useState } from 'react';

import { useMobileDevice } from '../hooks/useMobileDevice';
import { InputNumber } from '../Input/InputNumber';
import { Label } from '../Label';

import style from './index.module.scss';

type VectorProps = {
	value: number[],
	step?: number,
	min?: number,
	max?: number,
	int?: boolean,
	disabled?: boolean,
	onChange?: ( value: number[] ) => void
}

const axisDict = [ "x", "y", "z", "w" ];

// min / max の範囲に収める。指定の無い側は制限しない（InputNumber の clamp と同じ）
const clamp = ( value: number, min: number | undefined, max: number | undefined ) => {

	let result = value;

	if ( min !== undefined ) result = Math.max( min, result );
	if ( max !== undefined ) result = Math.min( max, result );

	return result;

};

// 軸ごとの数値入力を並べる。選択した複数軸へは、ドラッグで同じ変化量・数値入力で同じ値をまとめて入れる
export const Vector = ( { onChange, disabled, ...props }: VectorProps ) => {

	const isSP = useMobileDevice();

	// 一括入力の対象の軸。PC は縦ドラッグの連続範囲で、ドラッグ・入力の確定で外す。SP は軸ラベルのタップで切り替え、再タップまで残す
	const [ selected, setSelected ] = useState<number[]>( [] );

	const valueRef = useRef<number[] | undefined>( undefined );
	valueRef.current = props.value;

	const rowRefs = useRef<( HTMLDivElement | null )[]>( [] );

	// ドラッグ中に積み上げている軸ごとの丸める前の値。int のとき 1px ぶんの小さな変化が丸めで消えないように持つ
	const dragValuesRef = useRef<number[] | null>( null );

	// 操作した軸が選択に含まれていれば選択中の全軸、含まれていなければその軸だけを対象にする
	const getTargets = ( axisIndex: number ) => {

		if ( selected.includes( axisIndex ) ) return selected;

		return [ axisIndex ];

	};

	const clearSelectionOnPC = () => {

		if ( ! isSP ) setSelected( [] );

	};

	// 数値入力の確定。対象の軸をすべて同じ値にする
	const onCommitAxis = ( axisIndex: number, axisValue: number ) => {

		const value = valueRef.current;

		if ( onChange && value ) {

			const newValue = value.slice();

			for ( const i of getTargets( axisIndex ) ) {

				newValue[ i ] = axisValue;

			}

			onChange( newValue );

		}

		clearSelectionOnPC();

	};

	// 横ドラッグ。対象の軸すべてに同じ変化量を足し、min / max / int は軸ごとに適用する
	const onDragAxis = ( axisIndex: number, deltaValue: number ) => {

		const value = valueRef.current;

		if ( ! onChange || ! value ) return;

		if ( dragValuesRef.current === null ) {

			dragValuesRef.current = value.slice();

		}

		const dragValues = dragValuesRef.current;
		const newValue = value.slice();
		let changed = false;

		for ( const i of getTargets( axisIndex ) ) {

			dragValues[ i ] = clamp( dragValues[ i ] + deltaValue, props.min, props.max );

			let axisValue = dragValues[ i ];

			if ( props.int ) axisValue = Math.round( axisValue );

			if ( axisValue !== newValue[ i ] ) {

				newValue[ i ] = axisValue;
				changed = true;

			}

		}

		if ( changed ) onChange( newValue );

	};

	const onDragEnd = () => {

		dragValuesRef.current = null;

		clearSelectionOnPC();

	};

	// PC の縦ドラッグ。押した軸からポインタの下にある軸までを選択する
	const onSelectDrag = ( originIndex: number, clientY: number ) => {

		let hoveredIndex = 0;

		for ( let i = 0; i < rowRefs.current.length; i ++ ) {

			const row = rowRefs.current[ i ];

			if ( row && row.getBoundingClientRect().top <= clientY ) hoveredIndex = i;

		}

		const first = Math.min( originIndex, hoveredIndex );
		const last = Math.max( originIndex, hoveredIndex );
		const range = [];

		for ( let i = first; i <= last; i ++ ) {

			range.push( i );

		}

		setSelected( range );

	};

	// SP の軸ラベルのタップ。その軸の選択を切り替える
	const onTapLabel = ( axisIndex: number ) => {

		if ( ! isSP || disabled ) return;

		// 描画を挟まずに続けてタップされても前のタップを消さないよう、直前の状態から作る
		setSelected( ( prev ) => {

			if ( prev.includes( axisIndex ) ) {

				return prev.filter( ( i ) => i !== axisIndex );

			}

			return [ ...prev, axisIndex ];

		} );

	};

	const rows = [];

	for ( let i = 0; i < props.value.length; i ++ ) {

		const isSelected = selected.includes( i );

		// SP の縦ドラッグはスクロールに譲るので範囲選択を渡さない
		let onSelectDragAxis: ( ( clientY: number ) => void ) | undefined = undefined;

		if ( ! isSP ) {

			onSelectDragAxis = ( clientY ) => onSelectDrag( i, clientY );

		}

		const title = <span className={style.axisLabel} data-selected={isSelected} data-sp={isSP} onClick={() => onTapLabel( i )}>{axisDict[ i ]}</span>;

		rows.push(
			<div key={i} ref={( elm ) => {

				rowRefs.current[ i ] = elm;

			}}>
				<Label title={title} labelAlign='right'>
					<InputNumber disabled={disabled} value={props.value[ i ]} step={props.step} min={props.min} max={props.max} int={props.int}
						selected={isSelected}
						onChange={( value ) => onCommitAxis( i, value )}
						onDrag={( deltaValue ) => onDragAxis( i, deltaValue )}
						onDragEnd={onDragEnd}
						onSelectDrag={onSelectDragAxis}
					/>
				</Label>
			</div>
		);

	}

	return <div className={style.vector}>
		{rows}
	</div>;

};
