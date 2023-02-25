class Game {
    #_selectedPlayer;

    constructor() {}

    get selectedPlayer() {
        return this.#_selectedPlayer;
    }

    set selectedPlayer(player) {
        if (!player) {
            throw new Error("player can't be null");
        } 
        this.#_selectedPlayer = player;
    }

    clearSelectedPlayer = () => {
        this.#_selectedPlayer = null;
    }
}

Game.prototype.subscribe = function() {
    console.log('you have subscribed');
}