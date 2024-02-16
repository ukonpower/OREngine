import { ReactNode } from 'react';

import style from './index.module.scss';

import { AssetBrowswer } from '~/ts/components/func/AssetBrowswer';
import { Hierarchy } from '~/ts/components/func/Hierarchy';
import { MouseMenu } from '~/ts/components/func/MouseMenu';
import { MouseMenuContext, useMouseMenu } from '~/ts/components/func/MouseMenu/useMouseMenu';
import { ProjectControl } from '~/ts/components/func/ProjectControl';
import { Property } from '~/ts/components/func/Property';
import { Screen } from '~/ts/components/func/Screen';
import { Button } from '~/ts/components/ui/Button';
import { Panel } from '~/ts/components/ui/Panel';
import { PanelContainer } from '~/ts/components/ui/PanelContainer';
import { Value } from '~/ts/components/ui/Property/Value';
import { EditorContext, useEditor } from '~/ts/gl/React/useEditor';
import { useGL, GLContext } from '~/ts/gl/React/useGL';

export const EditorProvider = ( { children } :{children: ReactNode} ) => {

	const editorContext = useEditor();
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
					<div className={style.controls}>
						<PanelContainer >
							<Panel title="Project" >
								<ProjectControl />
							</Panel>
						</PanelContainer>
					</div>
				</div>
			</div>
			<MouseMenu />
		</EditorProvider>
	</GLContext.Provider>;

};
