import { OREditor, OREngine } from "orengine";

import { gl } from "~/ts/Globals";
import { initResouces } from "~/ts/Resources";

initResouces();

export const EditorPage = () => {

	return (
		<OREngine gl={gl} >
			<OREditor />
		</OREngine>
	);

};
