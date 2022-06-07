let Board = new Table();
let Module = new Formation();

// per ora i giocatori hanno tutti lo stesso sprite
let bluePlayers = [
    { player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Donnarumma'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Di Lorenzo'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Bonucci'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Chiellini'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Emerson'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Barella'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Jorginho'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Verratti'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Insigne'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Immobile'
        }),
    },{ player: new Player({
        imageUrl: "assets/ita_playerDown.png",
        name: 'Chiesa'
        }),
    }];

let redPlayers = [
    { player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Pickford'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Walker'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Stones'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Maguire'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Trippier'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Shaw'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Phillips'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Rice'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Mount'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Sterling'
        }),
    },{ player: new Player({
        imageUrl: "assets/uk_playerDown.png",
        name: 'Kane'
        }),
    }];


const blueTeam = new Team({
    formation: new Formation('443', 'offense'),
    players: bluePlayers
});

const redTeam = new Team({
    formation: new Formation('343', 'defense'),
    players: redPlayers
})

let promises = blueTeam.players.map(element => element.player.loadImage).concat(redTeam.players.map(element => element.player.loadImage));
Promise.all(promises)
.then(done => {
    Board.drawTeam(blueTeam);
    Board.drawTeam(redTeam);
});

window.addEventListener('mouseup', (e) => {
    console.log()
    console.log(`x:${e.pageX}, y:${e.pageY}`);
});
//Board.animatePlayer(blueTeam.players[8].player, blueTeam.formation.positions[8]);