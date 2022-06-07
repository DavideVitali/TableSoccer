class Team {
    /**
     * 
     * @param {Formation} formation - A `Formation` class instance
     * @param {Player[]} players - A `Player` class Array 
     */
    constructor({formation, players}){
        this.formation = formation;
        this.players = players;

        this.team = [];
        for (let i = 0; i < 11; i++) {
            this.team.push({ player: players[i].player, position: formation.positions[i] });
        }

        console.log(this.team);
    }

    findPlayerByCoordinates = (coordinates) => {
        this.formation.positions.reduce()
    }
}