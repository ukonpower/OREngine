export declare class Matrix4 {
    elm: number[];
    /**
     *Creates an instance of Matrix4.
     * @param {number} m11
     * @param {number} m12
     * @param {number} m13
     * @param {number} m14
     * @param {number} m21
     * @param {number} m22
     * @param {number} m23
     * @param {number} m24
     * @param {number} m31
     * @param {number} m32
     * @param {number} m33
     * @param {number} m34
     * @param {number} m41
     * @param {number} m42
     * @param {number} m43
     * @param {number} m44
     * @memberof Matrix4
     */
    constructor(m11?: number, m12?: number, m13?: number, m14?: number, m21?: number, m22?: number, m23?: number, m24?: number, m31?: number, m32?: number, m33?: number, m34?: number, m41?: number, m42?: number, m43?: number, m44?: number);
    /**
     *Copy the input matrix
     *
     * @param {Matrix4} mat
     * @returns {Matrix4}
     * @memberof Matrix4
     */
    copy(mat: Matrix4): this;
    /**
     *Clone this matrix
     *
     * @returns {Matrix4}
     * @memberof Matrix4
     */
    clone(): Matrix4;
    /**
     *Set identity matrix
     *
     * @returns
     * @memberof Matrix4
     */
    identity(): this;
    /**
     *Multiply the Matrix4
     *
     * @param {Matrix4} mat
     * @memberof Matrix4
     */
    multiplyMatrix4(mat: Matrix4): void;
    /**
     *Multiply the matrix elements
     *
     * @private
     * @param {number[]} a - elements of matrix a
     * @param {number[]} b - elements of matrix b
     * @returns {number[]} elements of matrix
     * @memberof Matrix4
     */
    private multiply;
    /**
     *Sets the elements of the matrix
     *
     * @param {number} [m11]
     * @param {number} [m12]
     * @param {number} [m13]
     * @param {number} [m14]
     * @param {number} [m21]
     * @param {number} [m22]
     * @param {number} [m23]
     * @param {number} [m24]
     * @param {number} [m31]
     * @param {number} [m32]
     * @param {number} [m33]
     * @param {number} [m34]
     * @param {number} [m41]
     * @param {number} [m42]
     * @param {number} [m43]
     * @param {number} [m44]
     * @returns {Matrix4}
     * @memberof Matrix4
     */
    set(m11?: number, m12?: number, m13?: number, m14?: number, m21?: number, m22?: number, m23?: number, m24?: number, m31?: number, m32?: number, m33?: number, m34?: number, m41?: number, m42?: number, m43?: number, m44?: number): this;
}
