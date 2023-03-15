export type PositionType = 'RELATIVE' | 'PERCENT';
export type Point = {
    x: number,
    y: number
};
export type Dimension = {
    width: number,
    height: number
};

export interface IPositionTransformer {
    toRelative(p: Point): Point;
    toPercent(p: Point): Point;
}

export class PositionTransformer implements IPositionTransformer {
    constructor(private p: Point, private d: Dimension, private t: PositionType) {}
    
    toPercent(p: Point) {
        if (this.t === 'PERCENT') {
            return p;
        } else {
            return {
                x: Math.round(p.x * 100 / this.d.width),
                y: Math.round(p.y * 100 / this.d.height)
            } as Point;
        }
    }

    toRelative(p: Point) {
        if (this.t === 'PERCENT') {
            return {
                x: Math.round(this.d.width * p.x / 100),
                y: Math.round(this.d.height * p.y / 100)
            } as Point;
        } else {
            return p;
        }
    }
}

export class Position<
    TTRansformer extends IPositionTransformer
    > {
        constructor(
            private point: Point,
            private transformer: TTRansformer
        ) {
    }
}