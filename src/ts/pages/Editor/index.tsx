import { ReactNode } from 'react';

import style from './index.module.scss';

import { AssetBrowswer } from '~/ts/components/func/AssetBrowswer';
import { Hierarchy } from '~/ts/components/func/Hierarchy';
import { Property } from '~/ts/components/func/Property';
import { Screen } from '~/ts/components/func/Screen';
import { Panel } from '~/ts/components/ui/Panel';
import { PanelContainer } from '~/ts/components/ui/PanelContainer';
import { EditorContext, useEditor } from '~/ts/gl/React/useEditor';
import { useGL, GLContext } from '~/ts/gl/React/useGL';

export const EditorProvider = ( { children } :{children: ReactNode} ) => {

	const editorContext = useEditor();
	return <EditorContext.Provider value={editorContext}>{children}</EditorContext.Provider>;

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
							<Panel title="Asset" >
								<AssetBrowswer />
							</Panel>
							<Panel title="Timeline" >
							timeline
							</Panel>
						</PanelContainer>
					</div>
				</div>
			</div>
		</EditorProvider>
	</GLContext.Provider>;

};
