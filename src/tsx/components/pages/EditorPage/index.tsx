import { OREditor, OREngine } from "orengine";

import { gl } from "~/ts/Globals";

export const EditorPage = () => {

	return (
		<OREngine gl={gl}>
			<OREditor />
		</OREngine>
	);

};
