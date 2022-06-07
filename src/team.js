class Team {
    /**
     * 
     * @param {Formation} formation - A `Formation` class instance
     * @param {Player[]} players - A `Player` class Array 
     */
    constructor({formation, players}){
        this.team = [];
        for (let i = 0; i < 11; i++) {
            this.team.push({ player: players[i].player, position: formation[i] });
        }
    }

    findPlayerByCoordinates = (coordinates) => {
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


}