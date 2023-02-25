let Module = new Formation();

// per ora i giocatori hanno tutti lo stesso sprite
let players = [
    { player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Donnarumma'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Di Lorenzo'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Bonucci'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Chiellini'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Emerson'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Barella'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Jorginho'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Verratti'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Insigne'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Immobile'
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Chiesa'
        }),
    }];

let formation = new Formation('443', 'offense');
let team = new Team(formation, players);
let leftUserCard = new Card({x: 10, y: 10});

let board = new Board(team);

let promises = team.elements.map(element => element.player.loadImage);
promises.push(leftUserCard);

Promise.all(promises)
.then(done => {
    board.drawTeam(team);
    board.drawMoveCursors();
});

let game = new Game();