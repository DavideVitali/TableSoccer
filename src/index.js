let Module = new Formation();

// per ora i giocatori hanno tutti lo stesso sprite
let stats = {
    offense: 100,
    defense: 100,
    speed: 150,
    stamina: 100
};

let players = [
    { player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Donnarumma',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Di Lorenzo',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Bonucci',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Chiellini',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Emerson',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Barella',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Jorginho',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Verratti',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Insigne',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Immobile',
        stats: stats
        }),
    },{ player: new Player({
        imageUrl: "img/ita_playerDown.png",
        name: 'Chiesa',
        stats: stats
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