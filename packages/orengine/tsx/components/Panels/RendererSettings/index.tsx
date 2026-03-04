
import { useOREditor } from '../../../hooks/useOREditor';
import { useSerializableField } from '../../../hooks/useSerializableProps';
import { Label } from '../../Label';
import { Value } from '../../Value';

import style from './index.module.scss';

export const RendererSettings = () => {

	const { editor } = useOREditor();

	const renderer = editor.engine.renderer;
	const [ motionBlur, setMotionBlur ] = useSerializableField<boolean>( renderer, "pipeline/motionBlur" );
	const [ ssr, setSSR ] = useSerializableField<boolean>( renderer, "pipeline/ssr" );
	const [ ssao, setSSAO ] = useSerializableField<boolean>( renderer, "pipeline/ssao" );
	const [ lightShaft, setLightShaft ] = useSerializableField<boolean>( renderer, "pipeline/lightShaft" );

	return <div className={style.renderer}>
		<div className={style.renderer_inner}>
			<Label title='MotionBlur'>
				<Value value={motionBlur} onChange={( value ) => {

					if ( setMotionBlur ) setMotionBlur( value );

				}}/>
			</Label>
			<Label title='SSR'>
				<Value value={ssr} onChange={( value ) => {

					if ( setSSR ) setSSR( value );

				}}/>
			</Label>
			<Label title='SSAO'>
				<Value value={ssao} onChange={( value ) => {

					if ( setSSAO ) setSSAO( value );

				}}/>
			</Label>
			<Label title='LightShaft'>
				<Value value={lightShaft} onChange={( value ) => {

					if ( setLightShaft ) setLightShaft( value );

				}}/>
			</Label>
		</div>
	</div>;

};
