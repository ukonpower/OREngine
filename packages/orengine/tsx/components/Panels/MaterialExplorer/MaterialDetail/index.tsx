
import { useCallback, useEffect, useState } from 'react';

import { Engine } from '../../../../../ts/Engine';
import { Button } from '../../../Button';
import { InputBoolean } from '../../../Input/InputCheckBox';
import { InputSelect } from '../../../Input/InputSelect';

import style from './index.module.scss';

const PHASE_OPTIONS = [ "deferred", "forward", "shadowMap", "envMap", "ui" ];

type MaterialConfig = Record<string, string | string[] | boolean | { [key: string]: string } | undefined>;

type MaterialDetailProps = {
	name: string;
};

export const MaterialDetail = ( { name }: MaterialDetailProps ) => {

	const [ config, setConfig ] = useState<MaterialConfig>( {} );

	useEffect( () => {

		fetch( `/api/materials/${encodeURIComponent( name )}` )
			.then( r => r.json() )
			.then( data => setConfig( data.config || {} ) );

	}, [ name ] );

	const updateConfig = useCallback( ( key: string, value: string | string[] | boolean | { [key: string]: string } | undefined ) => {

		setConfig( prev => {

			const next = { ...prev };

			if ( value === undefined || value === "" || ( Array.isArray( value ) && value.length === 0 ) ) {

				delete next[ key ];

			} else {

				next[ key ] = value;

			}

			fetch( `/api/materials/${encodeURIComponent( name )}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify( next ),
			} );

			Engine.resources.updateMaterialInstance( name, next );

			return next;

		} );

	}, [ name ] );

	const shaderList = Engine.resources.shaderList;

	const onPhaseToggle = useCallback( ( phase: string, checked: boolean ) => {

		const current = ( config.phase as string[] ) || [];

		const next = checked
			? [ ...current, phase ]
			: current.filter( p => p !== phase );

		updateConfig( "phase", next );

	}, [ config.phase, updateConfig ] );

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
			<div className={style.row_label}>phase</div>
			<div className={style.row_value}>
				<div className={style.phaseGroup}>
					{PHASE_OPTIONS.map( p => (

						<label key={p} className={style.phaseItem}>
							<InputBoolean
								checked={( ( config.phase as string[] ) || [] ).includes( p )}
								onChange={( v ) => onPhaseToggle( p, v )}
							/>
							{p}
						</label>

					) )}
				</div>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>drawType</div>
			<div className={style.row_value}>
				<InputSelect
					value={( config.drawType as string ) || ""}
					selectList={[
						{ label: "(Default)", value: "" },
						"TRIANGLES", "LINES", "POINTS",
					]}
					onChange={( v ) => updateConfig( "drawType", v )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>blending</div>
			<div className={style.row_value}>
				<InputSelect
					value={( config.blending as string ) || ""}
					selectList={[
						{ label: "(Default)", value: "" },
						"NORMAL", "ADD", "DIFF",
					]}
					onChange={( v ) => updateConfig( "blending", v )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>useLight</div>
			<div className={style.row_value}>
				<InputBoolean
					checked={!! config.useLight}
					onChange={( v ) => updateConfig( "useLight", v )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>depthTest</div>
			<div className={style.row_value}>
				<InputBoolean
					checked={!! config.depthTest}
					onChange={( v ) => updateConfig( "depthTest", v )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>depthWrite</div>
			<div className={style.row_value}>
				<InputBoolean
					checked={!! config.depthWrite}
					onChange={( v ) => updateConfig( "depthWrite", v )}
				/>
			</div>
		</div>
		<div className={style.row}>
			<div className={style.row_label}>cullFace</div>
			<div className={style.row_value}>
				<InputBoolean
					checked={!! config.cullFace}
					onChange={( v ) => updateConfig( "cullFace", v )}
				/>
			</div>
		</div>
		<div className={style.uniformSection}>
			<div className={style.uniformHeader}>
				<span>Texture Uniforms</span>
				<Button onClick={() => {

					const uniName = prompt( "Uniform name:" );
					if ( ! uniName ) return;
					const textureUniforms = ( config.uniforms as { [key: string]: string } ) || {};
					updateConfig( "uniforms", { ...textureUniforms, [ uniName ]: "" } );

				}}>+</Button>
			</div>
			{Object.keys( ( config.uniforms as { [key: string]: string } ) || {} ).map( ( uniformName ) => (

				<div key={uniformName} className={style.row}>
					<div className={style.row_label}>{uniformName}</div>
					<div className={style.row_value}>
						<InputSelect
							value={( ( config.uniforms as { [key: string]: string } ) || {} )[ uniformName ] || ""}
							selectList={[
								{ label: "(None)", value: "" },
								...Engine.resources.textureList.map( t => ( { label: t.name, value: t.name } ) ),
							]}
							onChange={( v ) => {

								const textureUniforms = { ...( ( config.uniforms as { [key: string]: string } ) || {} ) };

								if ( v ) {

									textureUniforms[ uniformName ] = v;

								} else {

									delete textureUniforms[ uniformName ];

								}

								updateConfig( "uniforms", Object.keys( textureUniforms ).length > 0 ? textureUniforms : undefined );

							}}
						/>
					</div>
				</div>

			) )}
		</div>
	</div>;

};
