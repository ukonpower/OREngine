import { DrawType } from "maxpower";

import { gl } from "~/ts/gl/GLGlobals";

const drawType = {
	"TRIANGLES": gl.TRIANGLES,
	"LINES": gl.LINES,
	"POINTS": gl.POINTS,
};

export const getDrawType = ( type: DrawType ) => {

	return drawType[ type ];

};
