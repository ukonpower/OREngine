export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    set(x: number, y: number, z: number): this;
    copy(v: Vector3): this;
    clone(): Vector3;
    add(v: Vector3): this;
    addScaler(n: number): this;
    sub(v: Vector3): this;
    subScaler(n: number): this;
    multiply(v: Vector3): this;
    multiplyScaler(n: number): this;
    divide(v: Vector3): this;
    divideScaler(n: number): this;
}
