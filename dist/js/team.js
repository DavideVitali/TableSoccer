class Team {
    #_elements;
    #_name;

    constructor(formation, players, name){
        this.#_elements = [];
        this.#_name = name;
        for (let i = 0; i < 11; i++) {
            this.#_elements.push({ player: players[i].player, position: formation.positions[i] });
        }
    }

    get elements() {
        return this.#_elements;
    }

    get name() {
        return this.#_name;
    }
    
    findPlayerIndexByCoordinates = (coordinates) => {
        let teamIndex;
        for (let i = 0; i < this.elements.length; i++) {
            let position = this.elements[i].position;
            if (position.x < coordinates.x && (position.x + 32) > coordinates.x
            && position.y < coordinates.y && (position.y + 32) > coordinates.y) {
                teamIndex = i;
                break;
            }
        }
        return teamIndex;
    }

    findPlayerByCoordinates = (coordinates) => {
        let player;
        for (let i = 0; i < this.elements.length; i++) {
            let width = this.elements[i].player.htmlImage.width / 4;
            let height = this.elements[i].player.htmlImage.height;
                        let position = this.elements[i].position;
            if (position.x < coordinates.x && (position.x + width) > coordinates.x
            && position.y < coordinates.y && (position.y + height) > coordinates.y) {
                player = this.elements[i].player;
                break;
            }
        }
        return player;
    }
}
