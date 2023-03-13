import { Utils } from "./utils.js";
export class Card {
    constructor(position) {
        this.position = position;
        Utils.loadImage("img/bluePlayerCard.png").then(img => {
            this.template = img;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsTUFBTSxPQUFPLElBQUk7SUFHZixZQUFtQixRQUFlO1FBQWYsYUFBUSxHQUFSLFFBQVEsQ0FBTztRQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIn0=