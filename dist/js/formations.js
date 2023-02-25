class Formation {
    constructor(module, type) {
        this.positions = [];

        switch (module) {
            case '443':
                if (type === 'offense') {
                    this.positions.push({x: 5, y: 50});
                    this.positions.push({x: 17, y: 20});
                    this.positions.push({x: 17, y: 40});
                    this.positions.push({x: 17, y: 60});
                    this.positions.push({x: 17, y: 80});
                    this.positions.push({x: 32, y: 30});
                    this.positions.push({x: 32, y: 50});
                    this.positions.push({x: 32, y: 70});
                    this.positions.push({x: 50, y: 47});
                    this.positions.push({x: 41, y: 50});
                    this.positions.push({x: 49, y: 52});    
                } else {
                    this.positions.push({x: 95, y: 50});
                    this.positions.push({x: 83, y: 20});
                    this.positions.push({x: 83, y: 40});
                    this.positions.push({x: 83, y: 60});
                    this.positions.push({x: 83, y: 80});
                    this.positions.push({x: 68, y: 30});
                    this.positions.push({x: 68, y: 50});
                    this.positions.push({x: 68, y: 70});
                    this.positions.push({x: 53, y: 35});
                    this.positions.push({x: 59, y: 50});
                    this.positions.push({x: 53, y: 65});     
                }
            break;
            case '343':
                if (type === 'offense') {
                    this.positions.push({x: 5, y: 50});
                    this.positions.push({x: 17, y: 30});
                    this.positions.push({x: 17, y: 50});
                    this.positions.push({x: 17, y: 70});
                    this.positions.push({x: 32, y: 20});
                    this.positions.push({x: 32, y: 40});
                    this.positions.push({x: 32, y: 60});
                    this.positions.push({x: 32, y: 80});
                    this.positions.push({x: 50, y: 47});
                    this.positions.push({x: 41, y: 50});
                    this.positions.push({x: 49, y: 52});   
                } else {
                    this.positions.push({x: 95, y: 50});
                    this.positions.push({x: 83, y: 30});
                    this.positions.push({x: 83, y: 50});
                    this.positions.push({x: 83, y: 70});
                    this.positions.push({x: 68, y: 20});
                    this.positions.push({x: 68, y: 40});
                    this.positions.push({x: 68, y: 60});
                    this.positions.push({x: 68, y: 80});
                    this.positions.push({x: 53, y: 35});
                    this.positions.push({x: 59, y: 50});
                    this.positions.push({x: 53, y: 65});  
                }
            case '442':
            default:
                if (type === 'offense') {
                    this.positions.push({x: 5, y: 50});
                    this.positions.push({x: 17, y: 20});
                    this.positions.push({x: 17, y: 40});
                    this.positions.push({x: 17, y: 60});
                    this.positions.push({x: 17, y: 80});
                    this.positions.push({x: 37, y: 25});
                    this.positions.push({x: 32, y: 40});
                    this.positions.push({x: 32, y: 60});
                    this.positions.push({x: 37, y: 75});
                    this.positions.push({x: 50, y: 47});
                    this.positions.push({x: 49, y: 52});    
                } else {
                    this.positions.push({x: 95, y: 50});
                    this.positions.push({x: 83, y: 20});
                    this.positions.push({x: 83, y: 40});
                    this.positions.push({x: 83, y: 60});
                    this.positions.push({x: 83, y: 80});
                    this.positions.push({x: 68, y: 20});
                    this.positions.push({x: 68, y: 40});
                    this.positions.push({x: 68, y: 60});
                    this.positions.push({x: 68, y: 80});
                    this.positions.push({x: 55, y: 35});
                    this.positions.push({x: 55, y: 65});
                }
            break;
        }
    }
} 