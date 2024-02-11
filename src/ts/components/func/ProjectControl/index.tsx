import { Button } from '../../ui/Button';
import { PropertyBlock } from '../../ui/Property/PropertyBlock';
import { Value } from '../../ui/Property/Value';

import style from './index.module.scss';

export const ProjectControl = () => {

	return <div className={style.controls}>
		<PropertyBlock label="Project" accordion >
			<Value label='current' value="ProjectA" readOnly />
			<PropertyBlock label="controls" >
				<Button >Rename</Button>
				<Button >Save</Button>
			</PropertyBlock>
		</PropertyBlock>
	</div>;

};
