import { SkyBox } from "../../Scene/Resources/Components/SkyBox";

import { OREngineLogo } from "./Components/OREngineLogo";
import { OREnginePrimitiveSelector } from "./Components/OREnginePrimitiveSelector";

import { resource } from "~/ts/Globals";

export const initResouces = () => {

	resource.registerComponent( { name: "material", component: OREngineLogo } );
	resource.registerComponent( { name: "skybox", component: SkyBox } );
	resource.registerComponent( { name: "primitiveSelector", component: OREnginePrimitiveSelector } );

};
