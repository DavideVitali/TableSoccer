/**
 * Represents the player position on x/y axis as a percentage value
 */
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/**
 * Represents the player postion on x/y axis as the absolute position over the board
 */
export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export class CoordinatesTransformer {
    constructor(d) {
        this.d = d;
    }
    toPoint(position) {
        return {
            x: Math.round((position.x * 100) / this.d.width),
            y: Math.round((position.y * 100) / this.d.height),
        };
    }
    toPosition(point) {
        return {
            x: Math.round((this.d.width * point.x) / 100),
            y: Math.round((this.d.height * point.y) / 100),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vcmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Nvb3Jkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQTs7R0FFRztBQUNILE1BQU0sT0FBTyxLQUFLO0lBQ2hCLFlBQW1CLENBQVMsRUFBUyxDQUFTO1FBQTNCLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO0lBQUcsQ0FBQztDQUNuRDtBQUVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFFBQVE7SUFDbkIsWUFBbUIsQ0FBUyxFQUFTLENBQVM7UUFBM0IsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLE1BQUMsR0FBRCxDQUFDLENBQVE7SUFBRyxDQUFDO0NBQ25EO0FBVUQsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFvQixDQUFZO1FBQVosTUFBQyxHQUFELENBQUMsQ0FBVztJQUFHLENBQUM7SUFFcEMsT0FBTyxDQUFDLFFBQWtCO1FBQ3hCLE9BQU87WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDaEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ3pDLENBQUM7SUFDYixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVk7UUFDckIsT0FBTztZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM3QyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDbkMsQ0FBQztJQUNoQixDQUFDO0NBQ0YifQ==