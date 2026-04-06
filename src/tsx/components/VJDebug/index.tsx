
import React, { useEffect, useState } from 'react';

import { InputBoolean } from 'orengine/react';
import { InputNumber } from 'orengine/react';

import style from './index.module.scss';

export interface VJDebugController {
	getAutoPattern(): boolean;
	setAutoPattern( v: boolean ): void;
	getManualIntensity(): number;
	setManualIntensity( v: number ): void;
	regeneratePattern(): void;

	getEffectNames(): string[];
	getVariantIds( effectName: string ): string[];
	getActiveVariants(): Map<string, string | null>;

	setVariant( effectName: string, variantId: string | null ): void;

	getBeatIndex(): number;
	getPatternCell( effectName: string, beatIdx: number ): string | null;
	setPatternCell( effectName: string, beatIdx: number, variantId: string | null ): void;

	onChange( cb: () => void ): void;
	offChange( cb: () => void ): void;
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
	const autoPattern = controller.getAutoPattern();

	return <div className={style.container}>

		<div className={style.section}>
			<div className={style.controls}>
				<label className={style.label}>Auto</label>
				<InputBoolean checked={autoPattern} onChange={( v ) => controller.setAutoPattern( v )} />
				{! autoPattern && <>
					<label className={style.label}>Intensity</label>
					<InputNumber step={0.05} value={controller.getManualIntensity()} onChange={( v ) => controller.setManualIntensity( Math.min( 1, Math.max( 0, v ) ) )} />
				</>}
				<button className={style.btn} onClick={() => controller.regeneratePattern()}>Regen</button>
				<span className={style.beatLabel}>Beat: {beatIndex}</span>
			</div>
		</div>

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

							const val = controller.getPatternCell( name, b );

							return <div key={b} className={style.matrixCell} data-current={b === beatIndex}>
								<select
									value={val ?? "_null"}
									onChange={( e ) => {

										const v = e.target.value;
										controller.setPatternCell( name, b, v === "_null" ? null : v );

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
