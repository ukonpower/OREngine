import { useContext } from "react";

import { MouseMenuItemContext } from "../contexts/MouseMenuItemContext";

export const useMouseMenuItem = () => {

	return useContext( MouseMenuItemContext );

};
