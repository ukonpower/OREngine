import { ReactNode, useContext } from 'react';

import style from './index.module.scss';

import { useLayout } from '~/ts/hooks/useLayout';
import { useEditor, EditorContext } from '~/tsx/gl/useEditor';
import { GLContext, useGL } from '~/tsx/gl/useGL';
import { Hierarchy } from '~/tsx/panel/Hierarchy';
import { MouseMenu } from '~/tsx/panel/MouseMenu';
import { MouseMenuContext, useMouseMenu } from '~/tsx/panel/MouseMenu/useMouseMenu';
import { ProjectControl } from '~/tsx/panel/ProjectControl';
import { Property } from '~/tsx/panel/Property';
import { Screen } from '~/tsx/panel/Screen';
import { Timeline } from '~/tsx/panel/Timeline';
import { Timer } from '~/tsx/panel/Timer';
import { Panel } from '~/tsx/ui/Panel';
import { PanelContainer } from '~/tsx/ui/PanelContainer';

export const EditorProvider = ( { children } :{children: ReactNode} ) => {

	const glContext = useContext( GLContext );

	const editorContext = useEditor( glContext );
	const mouseMenuContext = useMouseMenu();

	return <EditorContext.Provider value={editorContext}>
		<MouseMenuContext.Provider value={mouseMenuContext} >
			{children}
		</MouseMenuContext.Provider>
	</EditorContext.Provider>;

};

export const EditorPage = () => {

	const glContext = useGL();
	const layout = useLayout();

	let editorElm = null;

	if ( layout.isPC ) {

		editorElm = <EditorProvider>
			<div className={style.editor}>
				<div className={style.vert}>
					<div className={`${style.horiz} ${style.flex}`}>
						<div className={style.vert} style={{ width: "300px" }}>
							<div className={style.flex}>
								<PanelContainer >
									<Panel title="Scene" >
										<Hierarchy />
									</Panel>
									<Panel title="Project" >
										<ProjectControl />
									</Panel>
								</PanelContainer>
							</div>
							<div style={{ height: "20vh" }}>
								<PanelContainer >
									<Panel title="Timer" noPadding >
										<Timer />
									</Panel>
								</PanelContainer>
							</div>
						</div>
						<div className={`${style.flex}`} >
							<Screen />
						</div>
						<div style={{ width: "300px" }}>
							<PanelContainer >
								<Panel title="Property" >
									<Property />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div style={{ height: "150px" }}>
						<PanelContainer >
							<Panel title="Timeline" noPadding>
								<Timeline />
							</Panel>
						</PanelContainer>
					</div>
				</div>
			</div>
			<MouseMenu />
		</EditorProvider>;

	} else {

		editorElm = <EditorProvider>
			<div className={style.editor}>
				<div className={style.vert}>
					<div className={`${style.flex}`}>
						<Screen />
					</div>
					<div className={style.horiz} style={{ height: "55vh" }}>
						<div className={style.vert} style={{ width: "45vw" }}>
							<div style={{ flex: "1" }}>
								<PanelContainer >
									<Panel title="Scene" >
										<Hierarchy />
									</Panel>
									<Panel title="Project" >
										<ProjectControl />
									</Panel>
								</PanelContainer>

							</div>
							<div style={{ height: "15vh" }}>
								<PanelContainer >
									<Panel title="Timer" noPadding >
										<Timer />
									</Panel>
								</PanelContainer>
							</div>
						</div>
						<div className={`${style.flex}`}>
							<PanelContainer >
								<Panel title="Property" >
									<Property />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div style={{ height: "12vh" }} >
						<PanelContainer >
							<Panel title="Timeline" noPadding>
								<Timeline />
							</Panel>
						</PanelContainer>
					</div>
				</div>
			</div>
			<MouseMenu />
		</EditorProvider>;

	}

	return <GLContext.Provider value={glContext}>
		{editorElm}
	</GLContext.Provider>;

};
