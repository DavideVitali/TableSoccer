class Formation {
    constructor() {
        this.positions = [];
    }

    m433 = function() {
        this.positions.push({x: 10, y: 50});
        this.positions.push({x: 35, y: 20});
        this.positions.push({x: 35, y: 40});
        this.positions.push({x: 35, y: 60});
        this.positions.push({x: 35, y: 80});
        this.positions.push({x: 65, y: 25});
        this.positions.push({x: 65, y: 50});
        this.positions.push({x: 65, y: 75});
        this.positions.push({x: 95, y: 25});
        this.positions.push({x: 95, y: 50});
        this.positions.push({x: 95, y: 75});
        return this.positions;
    }
} 