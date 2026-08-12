import { useMemo } from "react";

const isMobileUA = () => {

	if ( typeof navigator === 'undefined' ) return false;

	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );

};

export const useMobileDevice = () => {

	return useMemo( () => isMobileUA(), [] );

};
