import style from './index.module.scss';

interface InputColorProps {
	value: number[] | undefined;
	onChange?: ( value: number[] ) => void;
	disabled?: boolean;
	readOnly?: boolean;
}

// 値はリニアの 0..1。ピッカーと16進表記は sRGB なので、表示するときだけ変換する
// 式は maxpower の common.module.glsl の linearToSrgb / srgbToLinear と同じ
const linearToSrgb = ( v: number ) => {

	if ( v < 0.0031308 ) {

		return v * 12.92;

	}

	return Math.pow( v, 1 / 2.4 ) * 1.055 - 0.055;

};

const srgbToLinear = ( v: number ) => {

	if ( v < 0.04045 ) {

		return v / 12.92;

	}

	return Math.pow( ( v + 0.055 ) / 1.055, 2.4 );

};

// リニアの RGB 配列を <input type="color"> の16進表記（sRGB）へ変換する
const toHex = ( value: number[] ) => {

	return '#' + value.slice( 0, 3 ).map( ( v ) => {

		const srgb = linearToSrgb( Math.min( Math.max( v, 0 ), 1 ) );

		return Math.round( srgb * 255 ).toString( 16 ).padStart( 2, '0' );

	} ).join( '' );

};

// 16進表記（sRGB）をリニアの RGB 配列へ戻す
const fromHex = ( hex: string ) => {

	return [ 1, 3, 5 ].map( ( i ) => srgbToLinear( parseInt( hex.slice( i, i + 2 ), 16 ) / 255 ) );

};

export const InputColor = ( props: InputColorProps ) => {

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
