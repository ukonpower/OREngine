import { useSerializableField } from '../../../../tsx/hooks/useSerializableProps';
import { useOREditor } from '../../../hooks/useOREditor';
import { Block } from '../../Block';
import { Button } from '../../Button';
import { ArrowIcon } from '../../Icons/ArrowIcon';
import { InputText } from '../../Input/InputText';
import { Label } from '../../Label';

import style from './index.module.scss';

export const ProjectControl = () => {

	const { editor } = useOREditor();
	const [ projectName, setProjectName ] = useSerializableField<string>( editor.engine, "name" );

	if ( ! editor ) return null;

	return <div className={style.project}>
		<div className={style.project_inner}>
			<Block label="Project" accordion >
				<Label title='Project Name'>
					<InputText value={projectName || ""} onChange={( value ) => {

						setProjectName( value );

					} } />
				</Label>
				<Button onClick={()=>{

					if ( editor ) {

						editor.save();

					}

				}}>Save</Button>
				<div className={style.export}>
					<Button onClick={()=>{

						if ( editor ) {

							editor.save();

							window.open( `/player`, '_blank' );

						}

					}} >Export & Play <ArrowIcon /></Button>
				</div>
			</Block>
		</div>
	</div>;

};
