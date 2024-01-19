import style from './index.module.scss';

import { AssetBrowswer } from '~/ts/components/func/AssetBrowswer';
import { Hierarchy } from '~/ts/components/func/Hierarchy';
import { PropertyEditor } from '~/ts/components/func/PropertyEditor';
import { Screen } from '~/ts/components/func/Screen';
import { Panel } from '~/ts/components/ui/Panel';
import { PanelContainer } from '~/ts/components/ui/PanelContainer';
import { useGL, GLContext } from '~/ts/gl/useGL';

export const EditorPage = () => {

	const glContext = useGL();

	return <GLContext.Provider value={glContext}>
		<div className={style.editor}>
			<div className={style.vert}>
				<div className={style.horiz}>
					<div className={style.hierarchy}>
						<PanelContainer >
							<Panel title="Hierarchy" >
								<Hierarchy />
							</Panel>
						</PanelContainer>
					</div>
					<div className={style.preview}>
						<Screen />
					</div>
					<div className={style.property}>
						<PanelContainer >
							<Panel title="Property" >
								<PropertyEditor />
							</Panel>
						</PanelContainer>
					</div>
				</div>
				<div className={style.controls}>
					<PanelContainer >
						<Panel title="Asset" >
							<AssetBrowswer />
						</Panel>
					</PanelContainer>
				</div>
			</div>
		</div>
	</GLContext.Provider>;

};
