import { Coordinates, Point } from "./coords.js";
import { FormationType } from "./types.js";

export class Formation {
  constructor(
    public coordinates: Point[],
    module: string,
    type: FormationType
  ) {
    this.coordinates = [];

    switch (module) {
      case "443":
        if (type === FormationType.OFFENSE) {
          this.coordinates.push(new Point(5, 50));
          this.coordinates.push(new Point(17, 20 ));
          this.coordinates.push(new Point(17, 40 ));
          this.coordinates.push(new Point(17, 60 ));
          this.coordinates.push(new Point(17, 80 ));
          this.coordinates.push(new Point(32, 30 ));
          this.coordinates.push(new Point(32, 50 ));
          this.coordinates.push(new Point(32, 70 ));
          this.coordinates.push(new Point(50, 47 ));
          this.coordinates.push(new Point(41, 50 ));
          this.coordinates.push(new Point(49, 52 ));
        } else {
          this.coordinates.push(new Point(95, 50 ));
          this.coordinates.push(new Point(83, 20 ));
          this.coordinates.push(new Point(83, 40 ));
          this.coordinates.push(new Point(83, 60 ));
          this.coordinates.push(new Point(83, 80 ));
          this.coordinates.push(new Point(68, 30 ));
          this.coordinates.push(new Point(68, 50 ));
          this.coordinates.push(new Point(68, 70 ));
          this.coordinates.push(new Point(53, 35 ));
          this.coordinates.push(new Point(59, 50 ));
          this.coordinates.push(new Point(53, 65 ));
        }
        break;
      // case '343':
      //     if (type === FormationType.OFFENSE) {
      //         this.Coordinatess.push({x: 5, 50});
      //         this.Coordinatess.push({x: 17, 30});
      //         this.Coordinatess.push({x: 17, 50});
      //         this.Coordinatess.push({x: 17, 70});
      //         this.Coordinatess.push({x: 32, 20});
      //         this.Coordinatess.push({x: 32, 40});
      //         this.Coordinatess.push({x: 32, 60});
      //         this.Coordinatess.push({x: 32, 80});
      //         this.Coordinatess.push({x: 50, 47});
      //         this.Coordinatess.push({x: 41, 50});
      //         this.Coordinatess.push({x: 49, 52});
      //     } else {
      //         this.Coordinatess.push({x: 95, 50});
      //         this.Coordinatess.push({x: 83, 30});
      //         this.Coordinatess.push({x: 83, 50});
      //         this.Coordinatess.push({x: 83, 70});
      //         this.Coordinatess.push({x: 68, 20});
      //         this.Coordinatess.push({x: 68, 40});
      //         this.Coordinatess.push({x: 68, 60});
      //         this.Coordinatess.push({x: 68, 80});
      //         this.Coordinatess.push({x: 53, 35});
      //         this.Coordinatess.push({x: 59, 50});
      //         this.Coordinatess.push({x: 53, 65});
      //     }
      // case '442':
      // default:
      //     if (type === FormationType.OFFENSE) {
      //         this.Coordinatess.push({x: 5, 50});
      //         this.Coordinatess.push({x: 17, 20});
      //         this.Coordinatess.push({x: 17, 40});
      //         this.Coordinatess.push({x: 17, 60});
      //         this.Coordinatess.push({x: 17, 80});
      //         this.Coordinatess.push({x: 37, 25});
      //         this.Coordinatess.push({x: 32, 40});
      //         this.Coordinatess.push({x: 32, 60});
      //         this.Coordinatess.push({x: 37, 75});
      //         this.Coordinatess.push({x: 50, 47});
      //         this.Coordinatess.push({x: 49, 52});
      //     } else {
      //         this.Coordinatess.push({x: 95, 50});
      //         this.Coordinatess.push({x: 83, 20});
      //         this.Coordinatess.push({x: 83, 40});
      //         this.Coordinatess.push({x: 83, 60});
      //         this.Coordinatess.push({x: 83, 80});
      //         this.Coordinatess.push({x: 68, 20});
      //         this.Coordinatess.push({x: 68, 40});
      //         this.Coordinatess.push({x: 68, 60});
      //         this.Coordinatess.push({x: 68, 80});
      //         this.Coordinatess.push({x: 55, 35});
      //         this.Coordinatess.push({x: 55, 65});
      //     }
      // break;
    }
  }
}
