class Formation {
    constructor() {
        this.positions = [];
    }

    m433 = function(type) {
        this.positions.push({x: 10, y: 50});
        this.positions.push({x: 35, y: 20});
        this.positions.push({x: 35, y: 40});
        this.positions.push({x: 35, y: 60});
        this.positions.push({x: 35, y: 80});
        this.positions.push({x: 65, y: 30});
        this.positions.push({x: 65, y: 50});
        this.positions.push({x: 65, y: 70});
        if (type === 'offense') {
            this.positions.push({x: 101, y: 48});
            this.positions.push({x: 85, y: 50});
            this.positions.push({x: 99, y: 53});     
        } else {
            this.positions.push({x: 95, y: 30});
            this.positions.push({x: 85, y: 50});
            this.positions.push({x: 95, y: 70});
        }
        return this.positions;
    }
} 