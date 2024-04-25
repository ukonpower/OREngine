import { ReactNode, useContext } from 'react';

import style from './index.module.scss';

import { Hierarchy } from '~/ts/components/panel/Hierarchy';
import { MouseMenu } from '~/ts/components/panel/MouseMenu';
import { MouseMenuContext, useMouseMenu } from '~/ts/components/panel/MouseMenu/useMouseMenu';
import { ProjectControl } from '~/ts/components/panel/ProjectControl';
import { Property } from '~/ts/components/panel/Property';
import { Screen } from '~/ts/components/panel/Screen';
import { Timeline } from '~/ts/components/panel/Timeline';
import { Panel } from '~/ts/components/ui/Panel';
import { PanelContainer } from '~/ts/components/ui/PanelContainer';
import { EditorContext, useEditor } from '~/ts/gl/React/useEditor';
import { useGL, GLContext } from '~/ts/gl/React/useGL';

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

	return <GLContext.Provider value={glContext}>
		<EditorProvider>
			<div className={style.editor}>
				<div className={style.vert}>
					<div className={style.horiz}>
						<div className={style.hierarchy}>
							<PanelContainer >
								<Panel title="Scene" >
									<Hierarchy />
								</Panel>
								<Panel title="Project" >
									<ProjectControl />
								</Panel>
							</PanelContainer>
						</div>
						<div className={style.preview}>
							<Screen />
						</div>
						<div className={style.property}>
							<PanelContainer >
								<Panel title="Property" >
									<Property />
								</Panel>
							</PanelContainer>
						</div>
					</div>
					<div className={style.bottom}>
						<PanelContainer >
							<Panel title="Timeline" noPadding>
								<Timeline />
							</Panel>
						</PanelContainer>
					</div>
				</div>
			</div>
			<MouseMenu />
		</EditorProvider>
	</GLContext.Provider>;

};
