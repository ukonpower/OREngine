
import { useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../../ts/Engine';
import { InputBoolean } from '../../../Input/InputCheckBox';
import { InputSelect } from '../../../Input/InputSelect';

import style from './index.module.scss';

type TextureConfig = {
	shader?: string;
	resolution?: number[];
	filter?: string;
	updateEveryFrame?: boolean;
};

const RESOLUTION_OPTIONS = [
	{ label: "256", value: "256" },
	{ label: "512", value: "512" },
	{ label: "1024", value: "1024" },
	{ label: "2048", value: "2048" },
];

type TextureDetailProps = {
	name: string;
};

export const TextureDetail = ( { name }: TextureDetailProps ) => {

	const [ config, setConfig ] = useState<TextureConfig>( {} );

	useEffect( () => {

		const item = Engine.resources.getTextureResource( name );

		if ( item ) {

			const { name: _, ...config } = item;
			setConfig( config );

		}

	}, [ name ] );

	const updateConfig = useCallback( ( key: string, value: any ) => {

		setConfig( prev => {

			const next = { ...prev, [ key ]: value };

			Engine.resources.updateTextureResource( name, next );

			return next;

		} );

	}, [ name ] );

	const shaderList = Engine.resources.shaderList;

	return <div className={style.detail}>
		<div className={style.row}>
			<div className={style.row_label}>shader</div>
			<div className={style.row_value}>
				<InputSelect
					value={( config.shader as string ) || ""}
					selectList={[
						{ label: "(None)", value: "" },
						...shaderList.map( s => ( { label: s.name, value: s.name } ) ),
					]}
					onChange={( v ) => updateConfig( "shader", v )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>width</div>
			<div className={style.row_value}>
				<InputSelect
					value={String( config.resolution?.[ 0 ] || 1024 )}
					selectList={RESOLUTION_OPTIONS}
					onChange={( v ) => updateConfig( "resolution", [ Number( v ), config.resolution?.[ 1 ] || 1024 ] )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>height</div>
			<div className={style.row_value}>
				<InputSelect
					value={String( config.resolution?.[ 1 ] || 1024 )}
					selectList={RESOLUTION_OPTIONS}
					onChange={( v ) => updateConfig( "resolution", [ config.resolution?.[ 0 ] || 1024, Number( v ) ] )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>filter</div>
			<div className={style.row_value}>
				<InputSelect
					value={config.filter || "linear"}
					selectList={[
						{ label: "linear", value: "linear" },
						{ label: "nearest", value: "nearest" },
					]}
					onChange={( v ) => updateConfig( "filter", v )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>updateEveryFrame</div>
			<div className={style.row_value}>
				<InputBoolean
					checked={!! config.updateEveryFrame}
					onChange={( v ) => updateConfig( "updateEveryFrame", v )}
				/>
			</div>
		</div>
	</div>;

};
