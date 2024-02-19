import { GlitchMeshMaterial } from "../../Scene/Resources/Components/GlitchMesh";
import { SkyBox } from "../../Scene/Resources/Components/SkyBox";

import { resource } from "~/ts/Globals";

export const initResouces = () => {

	resource.registerComponent( { name: "material", component: GlitchMeshMaterial } );
	resource.registerComponent( { name: "skybox", component: SkyBox } );

};
