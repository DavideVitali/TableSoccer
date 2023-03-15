/**
 * Coordinates are the elementary building blocks for determining the position of a Player.
 * There are two types of Coordinates:
 * - Point: Player position on x/y axis is represented in percentage value 
 * (0% = starting ponint of the axis, 100% ending point) 
 * - Position: defines the absolute position on the board.
 */
export type Coordinates = {
    x: number,
    y: number
};

/**
 * Defines the width and height of an object
 */
export type Dimension = {
    width: number,
    height: number
};


export static class CoordinatesTransformer {
    constructor(private d: Dimension) {}
    
    static toPoint(this: Coordinates, position: Coordinates) {
        return {
            x: Math.round(position.x * 100 / this.d.width),
            y: Math.round(position.y * 100 / this.d.height)
        } as Coordinates;
    }

    toPosition(point: Coordinates) {
        return {
            x: Math.round(this.d.width * point.x / 100),
            y: Math.round(this.d.height * point.y / 100)
        } as Coordinates;
    }
}

export class Position {
    constructor(
        private point: Coordinates,
        private transformer: CoordinatesTransformer
    ) { }

    toPercent(type: PositionType) {
        return this.transformer.toPoint(this.point, type);    
    }

    toRelative(type: PositionType) {
        return this.transformer.toPosition(this.point, type);
    }
}
