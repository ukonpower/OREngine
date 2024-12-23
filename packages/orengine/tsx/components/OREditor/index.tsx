import { useLayout } from '../../hooks/useLayout';
import { MouseMenu } from '../MouseMenu';
import { useMouseMenu, MouseMenuContext } from '../MouseMenu/useMouseMenu';
import { Panel } from '../Panel';
import { PanelContainer } from '../PanelContainer';
import { EntityProperty } from '../Panels/EntityProperty';
import { Timer } from '../Panels/GPUTimer';
import { Hierarchy } from '../Panels/Hierarchy';
import { ProjectControl } from '../Panels/ProjectControl';
import { Screen } from '../Panels/Screen';
import { Timeline } from '../Panels/Timeline';

import { OREditorContext } from './Context';
import { useOREditorContext } from './Hooks';
import style from './index.module.scss';

export const OREditor = () => {

	const editorContext = useOREditorContext();
	const layout = useLayout();
	const mouseMenuContext = useMouseMenu();

	let editorElm = null;

	if ( layout.isPC ) {

		editorElm = (
			<>
				<div className={style.vert}>
					<div className={`${style.horiz} ${style.flex}`}>
						<div className={style.vert} style={{ width: '300px' }}>
							<div className={style.flex}>
								<PanelContainer>
									<Panel title='Scene'>
										<Hierarchy />
									</Panel>
									<Panel title='Project'>
										<ProjectControl />
									</Panel>
								</PanelContainer>
							</div>
							<div style={{ height: '20vh' }}>
								<PanelContainer>
									<Panel title='Timer' noPadding>
										<Timer />
									</Panel>
								</PanelContainer>
							</div>
						</div>
						<div className={`${style.flex}`}>
							<Screen />
						</div>
						<div style={{ width: '300px' }}>
							<PanelContainer>
								<Panel title='Property'>
									<EntityProperty />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div style={{ height: '150px' }}>
						<PanelContainer>
							<Panel title='Timeline' noPadding>
								<Timeline />
							</Panel>
						</PanelContainer>
					</div>
				</div>
				<MouseMenu />
			</>
		);

	} else {

		editorElm = (
			<div className={style.editor}>
				<div className={style.vert}>
					<div className={`${style.flex}`}>
						<Screen />
					</div>
					<div className={style.horiz} style={{ height: '55vh' }}>
						<div className={style.vert} style={{ width: '45vw' }}>
							<div style={{ flex: '1' }}>
								<PanelContainer>
									<Panel title='Scene'>
										<Hierarchy />
									</Panel>
									<Panel title='Project'>
										<ProjectControl />
									</Panel>
								</PanelContainer>
							</div>
							<div style={{ height: '15vh' }}>
								<PanelContainer>
									<Panel title='Timer' noPadding>
										<Timer />
									</Panel>
								</PanelContainer>
							</div>
						</div>
						<div className={`${style.flex}`}>
							<PanelContainer>
								<Panel title='Property'>
									<EntityProperty />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div style={{ height: '12vh' }}>
						<PanelContainer>
							<Panel title='Timeline' noPadding>
								<Timeline />
							</Panel>
						</PanelContainer>
					</div>
				</div>
				<MouseMenu />
			</div>
		);

	}

	return <OREditorContext.Provider value={editorContext}>
		<MouseMenuContext.Provider value={mouseMenuContext}>
			<div className={style.editor}>
				{editorElm}
			</div>
		</MouseMenuContext.Provider>;
	</OREditorContext.Provider>;

};
