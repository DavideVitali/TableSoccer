class Team {
    constructor(formation, players){
        this.team = [];
        for (let i = 0; i < 11; i++) {
            this.team.push({ player: players[i].player, position: formation.positions[i] });
        }
    }

    findPlayerIndexByCoordinates = (coordinates) => {
        let teamIndex;
        for (let i = 0; i < this.team.length; i++) {
            let position = this.team[i].position;
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
        for (let i = 0; i < this.team.length; i++) {
            let position = this.team[i].position;
            if (position.x < coordinates.x && (position.x + 32) > coordinates.x
            && position.y < coordinates.y && (position.y + 32) > coordinates.y) {
                player = this.team[i].player;
                break;
            }
        }
        return player;
    }
}