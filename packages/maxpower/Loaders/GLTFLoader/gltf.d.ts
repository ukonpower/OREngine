export interface GLTFFormat {
    asset?: GLTFAsset;
    scene?: number;
    scenes?: GLTFScene[];
    nodes?: GLTFNode[];
    materials?: GLTFMaterialElement[];
    meshes?: GLTFMesh[];
    textures?: GLTFTexture[];
    images?: GLTFImage[];
    accessors?: GLTFAccessor[];
    bufferViews?: GLTFBufferView[];
    samplers?: GLTFSampler[];
    buffers?: Buffer[];
}

export interface GLTFAccessor {
    bufferView: number;
    componentType: number;
    count: number;
    max?: number[];
    min?: number[];
    type: string;
}

export interface GLTFAsset {
    generator: string;
    version: string;
}

export interface GLTFBufferView {
    buffer: number;
    byteLength: number;
    byteOffset: number;
    target?: number;
}

export interface GLTFBuffer {
    byteLength: number;
}

export interface GLTFImage {
    bufferView: number;
    mimeType: string;
    name: string;
}

export interface GLTFMaterialElement {
    doubleSided: boolean;
    name: string;
    pbrMetallicRoughness?: GLTFPbrMetallicRoughness;
    emissiveTexture?: GLTFMaterialTexture;
    emissiveFactor?: number[],
    normalTexture?: GLTFMaterialTexture;
    extensions?: GLTFMaterialExtensions;
}

export interface GLTFPbrMetallicRoughness {
    baseColorTexture?: GLTFMaterialTexture;
    baseColorFactor?: number[]
    metallicRoughnessTexture?:GLTFMaterialTexture;
    metallicFactor?: number;
    roughnessFactor?: number;
}

export interface GLTFMaterialTexture {
    index: number;
}

export interface GLTFMaterialExtensions {
    KHR_materials_emissive_strength?: GLTFKHRMaterialsEmissiveStrength;
    KHR_materials_specular?: GLTFKHRMaterialsSpecular;
    KHR_materials_ior?: GLTFKHRMaterialsIor;
}

export interface GLTFKHRMaterialsEmissiveStrength {
    emissiveStrength: number;
}

export interface GLTFKHRMaterialsIor {
    ior: number;
}

export interface GLTFKHRMaterialsSpecular {
    specularColorFactor: number[];
}

export interface GLTFMesh {
    name: string;
    primitives: GLTFPrimitive[];
}

export interface GLTFPrimitive {
    attributes: GLTFAttributes;
    indices: number;
    material?: number;
}

export interface GLTFAttributes {
    POSITION: number;
    NORMAL: number;
    TEXCOORD_0: number;
    TANGENT: number;
}

export interface GLTFNode {
    extras: GLTFNodeExtras;
    mesh: number;
    name: string;
    rotation: number[];
    scale: number[];
    translation: number[];
    children?: number[];
}

export interface GLTFNodeExtras {
}

export interface GLTFSampler {
    magFilter: number;
    minFilter: number;
}

export interface GLTFScene {
    extras: GLTFSceneExtras;
    name: string;
    nodes?: number[];
}

export interface GLTFSceneExtras {
}

export interface GLTFTexture {
    sampler: number;
    source: number;
}
