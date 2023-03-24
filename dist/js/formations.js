import { Point } from "./coords.js";
import { FormationType } from "./types.js";
export class Formation {
    constructor(module, type) {
        this.coordinates = [];
        switch (module) {
            case "443":
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
                }
                else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQyxNQUFNLE9BQU8sU0FBUztJQUdwQixZQUNFLE1BQWMsRUFDZCxJQUFtQjtRQUVuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssS0FBSztnQkFDUixJQUFJLElBQUksS0FBSyxhQUFhLENBQUMsT0FBTyxFQUFFO29CQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDLENBQUM7aUJBQzNDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBRSxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQztpQkFDM0M7Z0JBQ0QsTUFBTTtZQUNSLGNBQWM7WUFDZCw0Q0FBNEM7WUFDNUMsOENBQThDO1lBQzlDLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQyxlQUFlO1lBQ2YsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQyxRQUFRO1lBQ1IsY0FBYztZQUNkLFdBQVc7WUFDWCw0Q0FBNEM7WUFDNUMsOENBQThDO1lBQzlDLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQyxlQUFlO1lBQ2YsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQywrQ0FBK0M7WUFDL0MsK0NBQStDO1lBQy9DLCtDQUErQztZQUMvQyxRQUFRO1lBQ1IsU0FBUztTQUNWO0lBQ0gsQ0FBQztDQUNGIn0=