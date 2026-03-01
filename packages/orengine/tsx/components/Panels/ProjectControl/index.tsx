import { useOREditor } from '../../../hooks/useOREditor';
import { Block } from '../../Block';
import { Button } from '../../Button';
import { ArrowIcon } from '../../Icons/ArrowIcon';

import style from './index.module.scss';

const projectName = new URLSearchParams( location.search ).get( 'project' ) || 'default';

export const ProjectControl = () => {

	const { editor } = useOREditor();

	if ( ! editor ) return null;

	return <div className={style.project}>
		<div className={style.project_inner}>
			<Block label={projectName} accordion >
				<Button onClick={()=>{

					if ( editor ) {

						editor.save();

					}

				}}>Save</Button>
				<Button onClick={() => {

				window.location.href = '/';

			}}>Projects</Button>
			<div className={style.export}>
					<Button onClick={()=>{

						if ( editor ) {

							editor.save();

							window.open( `/player`, '_blank' );

						}

					}} >Play <ArrowIcon /></Button>
				</div>
			</Block>
		</div>
	</div>;

};
