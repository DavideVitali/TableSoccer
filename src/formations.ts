import { Coordinates } from "./coords.js";
import { FormationType } from "./types.js";

export class Formation {
  constructor(
    public coordinates: Coordinates[],
    module: string,
    type: FormationType
  ) {
    this.coordinates = [];

    switch (module) {
      case "443":
        if (type === FormationType.OFFENSE) {
          this.coordinates.push(new Coordinates({ x: 5, y: 50 }));
          this.coordinates.push(new Coordinates({ x: 17, y: 20 }));
          this.coordinates.push(new Coordinates({ x: 17, y: 40 }));
          this.coordinates.push(new Coordinates({ x: 17, y: 60 }));
          this.coordinates.push(new Coordinates({ x: 17, y: 80 }));
          this.coordinates.push(new Coordinates({ x: 32, y: 30 }));
          this.coordinates.push(new Coordinates({ x: 32, y: 50 }));
          this.coordinates.push(new Coordinates({ x: 32, y: 70 }));
          this.coordinates.push(new Coordinates({ x: 50, y: 47 }));
          this.coordinates.push(new Coordinates({ x: 41, y: 50 }));
          this.coordinates.push(new Coordinates({ x: 49, y: 52 }));
        } else {
          this.coordinates.push(new Coordinates({ x: 95, y: 50 }));
          this.coordinates.push(new Coordinates({ x: 83, y: 20 }));
          this.coordinates.push(new Coordinates({ x: 83, y: 40 }));
          this.coordinates.push(new Coordinates({ x: 83, y: 60 }));
          this.coordinates.push(new Coordinates({ x: 83, y: 80 }));
          this.coordinates.push(new Coordinates({ x: 68, y: 30 }));
          this.coordinates.push(new Coordinates({ x: 68, y: 50 }));
          this.coordinates.push(new Coordinates({ x: 68, y: 70 }));
          this.coordinates.push(new Coordinates({ x: 53, y: 35 }));
          this.coordinates.push(new Coordinates({ x: 59, y: 50 }));
          this.coordinates.push(new Coordinates({ x: 53, y: 65 }));
        }
        break;
      // case '343':
      //     if (type === FormationType.OFFENSE) {
      //         this.Coordinatess.push({x: 5, y: 50});
      //         this.Coordinatess.push({x: 17, y: 30});
      //         this.Coordinatess.push({x: 17, y: 50});
      //         this.Coordinatess.push({x: 17, y: 70});
      //         this.Coordinatess.push({x: 32, y: 20});
      //         this.Coordinatess.push({x: 32, y: 40});
      //         this.Coordinatess.push({x: 32, y: 60});
      //         this.Coordinatess.push({x: 32, y: 80});
      //         this.Coordinatess.push({x: 50, y: 47});
      //         this.Coordinatess.push({x: 41, y: 50});
      //         this.Coordinatess.push({x: 49, y: 52});
      //     } else {
      //         this.Coordinatess.push({x: 95, y: 50});
      //         this.Coordinatess.push({x: 83, y: 30});
      //         this.Coordinatess.push({x: 83, y: 50});
      //         this.Coordinatess.push({x: 83, y: 70});
      //         this.Coordinatess.push({x: 68, y: 20});
      //         this.Coordinatess.push({x: 68, y: 40});
      //         this.Coordinatess.push({x: 68, y: 60});
      //         this.Coordinatess.push({x: 68, y: 80});
      //         this.Coordinatess.push({x: 53, y: 35});
      //         this.Coordinatess.push({x: 59, y: 50});
      //         this.Coordinatess.push({x: 53, y: 65});
      //     }
      // case '442':
      // default:
      //     if (type === FormationType.OFFENSE) {
      //         this.Coordinatess.push({x: 5, y: 50});
      //         this.Coordinatess.push({x: 17, y: 20});
      //         this.Coordinatess.push({x: 17, y: 40});
      //         this.Coordinatess.push({x: 17, y: 60});
      //         this.Coordinatess.push({x: 17, y: 80});
      //         this.Coordinatess.push({x: 37, y: 25});
      //         this.Coordinatess.push({x: 32, y: 40});
      //         this.Coordinatess.push({x: 32, y: 60});
      //         this.Coordinatess.push({x: 37, y: 75});
      //         this.Coordinatess.push({x: 50, y: 47});
      //         this.Coordinatess.push({x: 49, y: 52});
      //     } else {
      //         this.Coordinatess.push({x: 95, y: 50});
      //         this.Coordinatess.push({x: 83, y: 20});
      //         this.Coordinatess.push({x: 83, y: 40});
      //         this.Coordinatess.push({x: 83, y: 60});
      //         this.Coordinatess.push({x: 83, y: 80});
      //         this.Coordinatess.push({x: 68, y: 20});
      //         this.Coordinatess.push({x: 68, y: 40});
      //         this.Coordinatess.push({x: 68, y: 60});
      //         this.Coordinatess.push({x: 68, y: 80});
      //         this.Coordinatess.push({x: 55, y: 35});
      //         this.Coordinatess.push({x: 55, y: 65});
      //     }
      // break;
    }
  }
}
