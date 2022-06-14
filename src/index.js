let Module = new Formation();

// per ora i giocatori hanno tutti lo stesso sprite
let bluePlayers = [
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

let redPlayers = [
    { player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Pickford'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Walker'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Stones'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Maguire'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Trippier'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Shaw'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Phillips'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Rice'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Mount'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Sterling'
        }),
    },{ player: new Player({
        imageUrl: "img/uk_playerDown.png",
        name: 'Kane'
        }),
    }];

let blueFormation = new Formation('443', 'offense');
const blueTeam = new Team(blueFormation, bluePlayers);
let leftUserCard = new Card({x: 10, y: 10});

let redFormation = new Formation('343', 'defense');
const redTeam = new Team(redFormation, redPlayers);
let rightUserCard = new Card({x: 1458, y:10});

let Board = new Gameboard(blueTeam, redTeam);

let promises = blueTeam.team.map(element => element.player.loadImage).concat(redTeam.team.map(element => element.player.loadImage));
promises.push(leftUserCard);
promises.push(rightUserCard);

Promise.all(promises)
.then(done => {
    Board.drawTeam(blueTeam);
    Board.drawTeam(redTeam);
    Board.drawMoveCursors();
});