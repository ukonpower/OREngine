(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.OREngine = {}));
}(this, (function (exports) { 'use strict';

	var Renderer = /** @class */ (function () {
	    function Renderer(params) {
	        this.canvas = params.canvas || document.createElement('canvas');
	    }
	    return Renderer;
	}());

	exports.Renderer = Renderer;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
