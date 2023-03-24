import { Coordinates, Point } from "./coords.js";
import { FormationModule, FormationType } from "./types.js";

export class Formation {
  coordinates: Point[];

  constructor(module: FormationModule, type: FormationType) {
    this.coordinates = [];

    switch (module) {
      case FormationModule._433:
        if (type === FormationType.OFFENSE) {
          this.coordinates.push(new Point(5, 50));
          this.coordinates.push(new Point(17, 20));
          this.coordinates.push(new Point(17, 40));
          this.coordinates.push(new Point(17, 60));
          this.coordinates.push(new Point(17, 80));
          this.coordinates.push(new Point(32, 30));
          this.coordinates.push(new Point(32, 50));
          this.coordinates.push(new Point(32, 70));
          this.coordinates.push(new Point(50, 47));
          this.coordinates.push(new Point(41, 50));
          this.coordinates.push(new Point(49, 52));
        } else {
          this.coordinates.push(new Point(95, 50));
          this.coordinates.push(new Point(83, 20));
          this.coordinates.push(new Point(83, 40));
          this.coordinates.push(new Point(83, 60));
          this.coordinates.push(new Point(83, 80));
          this.coordinates.push(new Point(68, 30));
          this.coordinates.push(new Point(68, 50));
          this.coordinates.push(new Point(68, 70));
          this.coordinates.push(new Point(53, 35));
          this.coordinates.push(new Point(59, 50));
          this.coordinates.push(new Point(53, 65));
        }
        break;
      case FormationModule._343:
        if (type === FormationType.OFFENSE) {
          this.coordinates.push(new Point(5, 50));
          this.coordinates.push(new Point(17, 30));
          this.coordinates.push(new Point(17, 50));
          this.coordinates.push(new Point(17, 70));
          this.coordinates.push(new Point(32, 20));
          this.coordinates.push(new Point(32, 40));
          this.coordinates.push(new Point(32, 60));
          this.coordinates.push(new Point(32, 80));
          this.coordinates.push(new Point(50, 47));
          this.coordinates.push(new Point(41, 50));
          this.coordinates.push(new Point(49, 52));
        } else {
          this.coordinates.push(new Point(95, 50));
          this.coordinates.push(new Point(83, 30));
          this.coordinates.push(new Point(83, 50));
          this.coordinates.push(new Point(83, 70));
          this.coordinates.push(new Point(68, 20));
          this.coordinates.push(new Point(68, 40));
          this.coordinates.push(new Point(68, 60));
          this.coordinates.push(new Point(68, 80));
          this.coordinates.push(new Point(53, 35));
          this.coordinates.push(new Point(59, 50));
          this.coordinates.push(new Point(53, 65));
        }
        break;
      case FormationModule._442:
      default:
        if (type === FormationType.OFFENSE) {
          this.coordinates.push(new Point(5, 50));
          this.coordinates.push(new Point(17, 20));
          this.coordinates.push(new Point(17, 40));
          this.coordinates.push(new Point(17, 60));
          this.coordinates.push(new Point(17, 80));
          this.coordinates.push(new Point(37, 25));
          this.coordinates.push(new Point(32, 40));
          this.coordinates.push(new Point(32, 60));
          this.coordinates.push(new Point(37, 75));
          this.coordinates.push(new Point(50, 47));
          this.coordinates.push(new Point(49, 52));
        } else {
          this.coordinates.push(new Point(95, 50));
          this.coordinates.push(new Point(83, 20));
          this.coordinates.push(new Point(83, 40));
          this.coordinates.push(new Point(83, 60));
          this.coordinates.push(new Point(83, 80));
          this.coordinates.push(new Point(68, 20));
          this.coordinates.push(new Point(68, 40));
          this.coordinates.push(new Point(68, 60));
          this.coordinates.push(new Point(68, 80));
          this.coordinates.push(new Point(55, 35));
          this.coordinates.push(new Point(55, 65));
        }
        break;
    }
  }
}
