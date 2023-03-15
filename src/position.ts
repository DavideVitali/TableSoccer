export type PositionType = 'RELATIVE' | 'PERCENT';
export type Point = {
    x: number,
    y: number
};
export type Dimension = {
    width: number,
    height: number
};


export class PositionTransformer {
    constructor(private d: Dimension) {}
    
    toPercent(point: Point, type: PositionType) {
        if (type === 'PERCENT') {
            return point;
        } else {
            return {
                x: Math.round(point.x * 100 / this.d.width),
                y: Math.round(point.y * 100 / this.d.height)
            } as Point;
        }
    }

    toRelative(point: Point, type: PositionType) {
        if (type === 'PERCENT') {
            return {
                x: Math.round(this.d.width * point.x / 100),
                y: Math.round(this.d.height * point.y / 100)
            } as Point;
        } else {
            return point;
        }
    }
}

export class Position<TTRansformer extends PositionTransformer> {
    constructor(
        private point: Point,
        private transformer: TTRansformer
    ) { }

    toPercent(type: PositionType) {
        return this.transformer.toPercent(this.point, type);    
    }

    toRelative(type: PositionType) {
        return this.transformer.toRelative(this.point, type);
    }
}
