var Renderer = /** @class */ (function () {
    function Renderer(params) {
        this.canvas = params.canvas || document.createElement('canvas');
    }
    return Renderer;
}());

var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Vector2.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    Vector2.prototype.addScaler = function (n) {
        this.x += n;
        this.y += n;
        return this;
    };
    Vector2.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    Vector2.prototype.subScaler = function (n) {
        this.x -= n;
        this.y -= n;
        return this;
    };
    Vector2.prototype.multiply = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    };
    Vector2.prototype.multiplyScaler = function (n) {
        this.x *= n;
        this.y *= n;
        return this;
    };
    Vector2.prototype.divide = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    Vector2.prototype.divideScaler = function (n) {
        this.x /= n;
        this.y /= n;
        return this;
    };
    Vector2.prototype.copy = function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    return Vector2;
}());

var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    Vector3.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    };
    Vector3.prototype.addScaler = function (n) {
        this.x += n;
        this.y += n;
        this.z += n;
        return this;
    };
    Vector3.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    };
    Vector3.prototype.subScaler = function (n) {
        this.x -= n;
        this.y -= n;
        this.z -= n;
        return this;
    };
    Vector3.prototype.multiply = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    };
    Vector3.prototype.multiplyScaler = function (n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    };
    Vector3.prototype.divide = function (v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    };
    Vector3.prototype.divideScaler = function (n) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    };
    Vector3.prototype.copy = function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    };
    Vector3.prototype.clone = function () {
        return new Vector3(this.x, this.y, this.z);
    };
    return Vector3;
}());

var Matrix4 = /** @class */ (function () {
    function Matrix4(elm) {
        if (elm && elm.length == 16) {
            this.set(elm);
        }
    }
    Matrix4.prototype.identity = function () {
        this.elm = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
        return this;
    };
    Matrix4.prototype.multiply = function (mat) {
        this.matmul(this.elm, mat.elm);
    };
    Matrix4.prototype.matmul = function (a, b) {
        var a11 = a[0], a12 = a[4], a13 = a[8], a14 = a[12], a21 = a[1], a22 = a[5], a23 = a[9], a24 = a[13], a31 = a[2], a32 = a[6], a33 = a[10], a34 = a[14], a41 = a[3], a42 = a[7], a43 = a[11], a44 = a[15];
        var b11 = b[0], b12 = b[4], b13 = b[8], b14 = b[12], b21 = b[1], b22 = b[5], b23 = b[9], b24 = b[13], b31 = b[2], b32 = b[6], b33 = b[10], b34 = b[14], b41 = b[3], b42 = b[7], b43 = b[11], b44 = b[15];
        this.elm[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        this.elm[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        this.elm[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        this.elm[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        this.elm[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        this.elm[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        this.elm[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        this.elm[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        this.elm[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        this.elm[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        this.elm[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        this.elm[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        this.elm[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        this.elm[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        this.elm[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        this.elm[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    };
    Matrix4.prototype.set = function (elm) {
        this.elm = elm.concat();
        return this;
    };
    Matrix4.prototype.copy = function (mat) {
        this.elm = mat.elm.concat();
        return this;
    };
    Matrix4.prototype.clone = function () {
        return new Matrix4(this.elm);
    };
    return Matrix4;
}());

export { Matrix4, Renderer, Vector2, Vector3 };
