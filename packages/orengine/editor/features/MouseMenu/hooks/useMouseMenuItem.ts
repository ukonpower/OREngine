import { useContext } from "react";
import { MouseMenuItemContext } from "../components/MouseMenu/contexts/MouseMenuItemContext";

export const useMouseMenuItem = () => {
  return useContext(MouseMenuItemContext);
};
