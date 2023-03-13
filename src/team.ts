import { FormationPosition } from "./formations.js";
import { Player } from "./player.js";
import { Point } from "./types.js";

export type TeamElement = {
    player: Player,
    position: Point
}

export class Team {
    private _elements: TeamElement[];

    constructor(formation: FormationPosition, players: Player[], private _name: string){
        this._elements = [];
        for (let i = 0; i < 11; i++) {
            let element: TeamElement = {
                player: players[i], 
                position: formation.positions[i]
            };
            this._elements.push(element);
        }
    }

    get elements() {
        return this._elements;
    }

    get name() {
        return this._name;
    }
    
    findPlayerIndexByPoint(point: Point) {
        let teamIndex: number | null = null;
        for (let i = 0; i < this.elements.length; i++) {
            let position = this.elements[i].position;
            if (position.x < point.x && (position.x + 32) > point.x
            && position.y < point.y && (position.y + 32) > point.y) {
                teamIndex = i;
                break;
            }
        }
        return teamIndex;
    }

    findPlayerByPoint(point: Point) {
        let p: Player | null = null;
        for (let i = 0; i < this.elements.length; i++) {
            let width = this.elements[i].player.htmlImage.width / 4;
            let height = this.elements[i].player.htmlImage.height;
            let position = this.elements[i].position;
            if (position.x < point.x && (position.x + width) > point.x
            && position.y < point.y && (position.y + height) > point.y) {
                p = this.elements[i].player;
                break;
            }
        }
        return p;
    }
}
