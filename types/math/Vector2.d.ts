export declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    set(x: number, y: number): this;
    copy(v: Vector2): this;
    clone(): Vector2;
    add(v: Vector2): this;
    addScaler(n: number): this;
    sub(v: Vector2): this;
    subScaler(n: number): this;
    multiply(v: Vector2): this;
    multiplyScaler(n: number): this;
    divide(v: Vector2): this;
    divideScaler(n: number): this;
}
