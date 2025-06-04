import { useContext } from "react";

import { MouseMenuItemContext } from "../../components/MouseMenu/Context/MouseMenuItemContext";

export const useMouseMenuItem = () => {

	return useContext( MouseMenuItemContext );

};
