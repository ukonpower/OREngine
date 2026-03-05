
import { useOREditor } from '../../../hooks/useOREditor';
import { useSerializableField } from '../../../hooks/useSerializableProps';
import { Label } from '../../Label';
import { Value } from '../../Value';

import style from './index.module.scss';

export const RendererSettings = () => {

	const { editor } = useOREditor();

	const renderer = editor.engine.renderer;

	// resolution

	const [ resWidth, setResWidth ] = useSerializableField<number>( editor, "resolution/width" );
	const [ resHeight, setResHeight ] = useSerializableField<number>( editor, "resolution/height" );

	// pipeline

	const [ motionBlur, setMotionBlur ] = useSerializableField<boolean>( renderer, "pipeline/motionBlur/enabled" );
	const [ motionBlurPower, setMotionBlurPower ] = useSerializableField<number>( renderer, "pipeline/motionBlur/power" );
	const [ ssr, setSSR ] = useSerializableField<boolean>( renderer, "pipeline/ssr/enabled" );
	const [ ssao, setSSAO ] = useSerializableField<boolean>( renderer, "pipeline/ssao/enabled" );
	const [ lightShaft, setLightShaft ] = useSerializableField<boolean>( renderer, "pipeline/lightShaft/enabled" );

	return <div className={style.renderer}>
		<div className={style.renderer_inner}>
			<Label title='Width'>
				<Value value={resWidth} onChange={( value ) => {

					if ( setResWidth ) setResWidth( value );

				}} step={1}/>
			</Label>
			<Label title='Height'>
				<Value value={resHeight} onChange={( value ) => {

					if ( setResHeight ) setResHeight( value );

				}} step={1}/>
			</Label>
			<Label title='MotionBlur'>
				<Value value={motionBlur} onChange={( value ) => {

					if ( setMotionBlur ) setMotionBlur( value );

				}}/>
			</Label>
			<Label title='MB Power'>
				<Value value={motionBlurPower} onChange={( value ) => {

					if ( setMotionBlurPower ) setMotionBlurPower( value );

				}} step={0.1}/>
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
