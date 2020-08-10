var Renderer = /** @class */ (function () {
    function Renderer(params) {
        this.canvas = params.canvas || document.createElement('canvas');
    }
    return Renderer;
}());

export { Renderer };
