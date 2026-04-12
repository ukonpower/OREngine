
import React, { useCallback, useEffect, useState } from 'react';

import { InputNumber } from 'orengine/react';

import style from './index.module.scss';

export interface VJPreset {
	name: string;
	effectPattern: Record<string, ( string | null )[]>;
	intensity: number;
}

export interface VJDebugController {
	getEffectNames(): string[];
	getVariantIds( effectName: string ): string[];
	getActiveVariants(): Map<string, string | null>;
	setVariant( effectName: string, variantId: string | null ): void;
	getBeatIndex(): number;
	onChange( cb: () => void ): void;
	offChange( cb: () => void ): void;

	getPresets(): VJPreset[];
	getActivePresetIndex(): number;
	selectPreset( index: number ): void;
	addPreset( preset: VJPreset ): void;
	removePreset( index: number ): void;
	updatePreset( index: number, preset: VJPreset ): void;

	generateRandomPreset( intensity?: number ): VJPreset;
}

function createDefaultPreset(): VJPreset {

	return {
		name: "New",
		effectPattern: {},
		intensity: 0.5,
	};

}

export const VJDebug: React.FC<{ controller: VJDebugController }> = ( { controller } ) => {

	const [ , setState ] = useState( 0 );

	useEffect( () => {

		const onUpdate = () => setState( ( s ) => s + 1 );

		controller.onChange( onUpdate );

		const timer = setInterval( onUpdate, 200 );

		return () => {

			controller.offChange( onUpdate );
			clearInterval( timer );

		};

	}, [ controller ] );

	const effectNames = controller.getEffectNames();
	const activeVariants = controller.getActiveVariants();
	const beatIndex = controller.getBeatIndex();

	const presets = controller.getPresets() ?? [];
	const activeIdx = controller.getActivePresetIndex();
	const activePreset = activeIdx >= 0 ? presets[ activeIdx ] : undefined;

	const handleUpdateField = useCallback( ( field: Partial<VJPreset> ) => {

		if ( ! activePreset ) return;

		controller.updatePreset( activeIdx, { ...activePreset, ...field } );

	}, [ controller, activeIdx, activePreset ] );

	return <div className={style.container}>

		{/* Presets */}
		<div className={style.section}>
			<div className={style.sectionTitle}>Presets</div>
			<div className={style.controls}>
				<select value={activeIdx} onChange={( e ) => controller.selectPreset( Number( e.target.value ) )}>
					{presets.map( ( p, i ) => (
						<option key={i} value={i}>{p.name}</option>
					) )}
				</select>
				<button className={style.btn} onClick={() => controller.addPreset( createDefaultPreset() )}>Add</button>
				<button className={style.btn} onClick={() => controller.addPreset( controller.generateRandomPreset() )}>Rand</button>
				<button className={style.btn} onClick={() => controller.removePreset( activeIdx )}>Rm</button>
				<span className={style.beatLabel}>Beat: {beatIndex}</span>
			</div>
			{activePreset && <div className={style.presetFields}>
				<label className={style.label}>Name</label>
				<input className={style.textInput} value={activePreset.name}
					onChange={( e ) => handleUpdateField( { name: e.target.value } )} />
				<label className={style.label}>Intensity</label>
				<InputNumber step={0.05} value={activePreset.intensity}
					onChange={( v ) => handleUpdateField( { intensity: Math.min( 1, Math.max( 0, v ) ) } )} />
			</div>}
		</div>

		{/* Matrix */}
		<div className={style.section}>
			<div className={style.sectionTitle}>Matrix</div>
			<div className={style.matrix} style={{ gridTemplateColumns: `60px repeat(8, 1fr)` }}>

				<div className={style.matrixCorner} />
				{Array.from( { length: 8 }, ( _, i ) => (
					<div key={i} className={style.matrixHeader} data-current={i === beatIndex}>
						{i}
					</div>
				) )}

				{effectNames.map( ( name ) => {

					const ids = controller.getVariantIds( name );

					return <React.Fragment key={name}>
						<div className={style.matrixLabel}>{name.slice( 0, 7 )}</div>
						{Array.from( { length: 8 }, ( _, b ) => {

							const val = activePreset?.effectPattern?.[ name ]?.[ b ] ?? null;

							return <div key={b} className={style.matrixCell} data-current={b === beatIndex}>
								<select
									value={val ?? "_null"}
									onChange={( e ) => {

										if ( ! activePreset ) return;

										const v = e.target.value;
										const newPattern = { ...activePreset.effectPattern };
										newPattern[ name ] = [ ...( newPattern[ name ] ?? Array( 8 ).fill( null ) ) ];
										newPattern[ name ][ b ] = v === "_null" ? null : v;
										controller.updatePreset( activeIdx, { ...activePreset, effectPattern: newPattern } );

									}}
								>
									<option value="_null">-</option>
									{ids.map( ( id ) => (
										<option key={id} value={id}>{id}</option>
									) )}
								</select>
							</div>;

						} )}
					</React.Fragment>;

				} )}

			</div>
		</div>

		{/* Effects (manual fire) */}
		<div className={style.section}>
			<div className={style.sectionTitle}>Effects</div>
			<div className={style.effects}>
				{effectNames.map( ( name ) => {

					const active = activeVariants.get( name ) ?? null;
					const ids = controller.getVariantIds( name );

					return <EffectRow
						key={name}
						name={name}
						active={active}
						variantIds={ids}
						onFire={( id ) => controller.setVariant( name, id )}
						onClear={() => controller.setVariant( name, null )}
					/>;

				} )}
			</div>
		</div>

	</div>;

};

const EffectRow: React.FC<{
	name: string;
	active: string | null;
	variantIds: string[];
	onFire: ( id: string ) => void;
	onClear: () => void;
}> = ( { name, active, variantIds, onFire, onClear } ) => {

	const [ selected, setSelected ] = useState( variantIds[ 0 ] ?? "" );

	return <div className={style.effectRow}>
		<span className={style.effectName}>{name}</span>
		<span className={style.effectActive} data-on={active !== null}>{active ?? "OFF"}</span>
		<select
			className={style.effectSelect}
			value={selected}
			onChange={( e ) => setSelected( e.target.value )}
		>
			{variantIds.map( ( id ) => (
				<option key={id} value={id}>{id}</option>
			) )}
		</select>
		<button className={style.btn} onClick={() => { if ( selected ) onFire( selected ); }}>Fire</button>
		<button className={style.btn} onClick={onClear}>Clr</button>
	</div>;

};
