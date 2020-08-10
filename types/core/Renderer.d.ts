declare interface RendererParams {
    canvas: HTMLCanvasElement;
}
export declare class Renderer {
    private gl;
    canvas: HTMLCanvasElement;
    constructor(params: RendererParams);
}
export {};
