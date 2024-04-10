import { DrawType } from "maxpower";

import { gl } from "~/ts/Globals";

const drawType = {
	"TRIANGLES": gl.TRIANGLES,
	"LINES": gl.LINES,
	"POINTS": gl.POINTS,
};

export const getDrawType = ( type: DrawType ) => {

	return drawType[ type ];

};
