import style from './index.module.scss';

import { Hierarchy } from '~/tsx/panel/Hierarchy';
import { MouseMenu } from '~/tsx/panel/MouseMenu';
import {
	MouseMenuContext,
	useMouseMenu,
} from '~/tsx/panel/MouseMenu/useMouseMenu';
import { ProjectControl } from '~/tsx/panel/ProjectControl';
import { Property } from '~/tsx/panel/Property';
import { Screen } from '~/tsx/panel/Screen';
import { Timeline } from '~/tsx/panel/Timeline';
import { Panel } from '~/tsx/ui/Panel';
import { PanelContainer } from '~/tsx/ui/PanelContainer';
import { OREngineGUI } from '~/tsx/components/OREngineGUI';
import { useLayout } from '~/tsx/hooks/useLayout';
import { Timer } from '~/tsx/panel/GPUTimer';

export const EditorPage = () => {

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
									<Property />
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
									<Property />
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

	return <OREngineGUI>
		<MouseMenuContext.Provider value={mouseMenuContext}>
			<div className={style.editor}>
			{editorElm}
			</div>
		</MouseMenuContext.Provider>;
	</OREngineGUI>;

};
