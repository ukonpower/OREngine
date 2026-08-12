import { ValueProps } from '../../Value';

import style from './index.module.scss';

// 0..1 の RGB 配列を <input type="color"> の16進表記へ変換する
const toHex = ( value: number[] ) => {

	return '#' + value.slice( 0, 3 ).map( ( v ) => {

		return Math.round( Math.min( Math.max( v, 0 ), 1 ) * 255 ).toString( 16 ).padStart( 2, '0' );

	} ).join( '' );

};

// 16進表記を 0..1 の RGB 配列へ戻す
const fromHex = ( hex: string ) => {

	return [ 1, 3, 5 ].map( ( i ) => parseInt( hex.slice( i, i + 2 ), 16 ) / 255 );

};

export const InputColor = ( props: ValueProps<number[]> ) => {

	const value = props.value || [ 1, 1, 1 ];

	return <div className={style.inputColor}>
		<input className={style.input} type="color" value={toHex( value )} disabled={props.disabled || props.readOnly}
			onChange={( e ) => {

				if ( props.onChange ) {

					props.onChange( fromHex( e.target.value ) );

				}

			}}
		/>
	</div>;

};
