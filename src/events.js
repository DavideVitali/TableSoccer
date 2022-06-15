// window.addEventListener('mousemove', (e) => {
//     let coords = { x: e.pageX, y: e.pageY };
//     let bluePlayerIndex = blueTeam.findPlayerByCoordinates(coords);
//     let redPlayerIndex = redTeam.findPlayerByCoordinates(coords);
//     let hoveringPlayer = null;
//     let body = document.querySelector('body');

//     if (bluePlayerIndex || bluePlayerIndex == 0) {
//         hoveringPlayer = blueTeam.team[bluePlayerIndex].player;
//     } else if (redPlayerIndex || redPlayerIndex == 0) {
//         hoveringPlayer = redTeam.team[redPlayerIndex].player;
//     }

//     if (hoveringPlayer != null || board.selectedPlayer != null) {
//         if (!body.classList.contains('selected-player')) {
//             body.classList.add('selected-player');
//         } 
//     } else {
//         body.classList.remove('selected-player');
//     }

// });

let mouseEventsCanvas = document.getElementById('MouseEvents');

mouseEventsCanvas.addEventListener('click', (e) => {
    let previousPlayer = game.selectedPlayer;
    let coords = { x: e.pageX - board.leftUserCanvas.width, y: e.pageY };
    let player = team.findPlayerByCoordinates(coords);
    let animationManager;
     
    // if (bluePlayerIndex || bluePlayerIndex == 0) {
    //     animationManager = board.blueTeamAnimationManager[bluePlayerIndex];
    //     board.selectedPlayerIndex = bluePlayerIndex;
    // } else if (redPlayerIndex || redPlayerIndex == 0) {
    //     animationManager = board.redTeamAnimationManager[redPlayerIndex];
    //     board.selectedPlayerIndex = redPlayerIndex;
    // } 

    if (player) {
        game.selectedPlayer = player;
        board.drawPlayerCard(leftUserCard, player);
    }

    if (player && previousPlayer && player.name === previousPlayer.name) {
        console.log('stesso giocatore');
        // cancella il cerchio di massimo movimento    
    }

    if (player && !game.selectedPlayer) {
        animationManager = board.animationManager.find(e => e.player.name == player.name);
        let position = animationManager.position;
        if (!player.moveDone && !player.moving && !player.moveRequest) {
            board.drawMaximumMovement(player, position);
        }
    }
    
    if (!player && game.selectedPlayer)
    {
        animationManager = board.animationManager.find(e => e.player.name == game.selectedPlayer.name);
        if (animationManager.isPlaying() === false) {
            try {
                animationManager.setTargetCoordinates(coords);
            } catch (error) {
                alert(error);
                return;
            }
            animationManager.startAnimation();
            game.clearSelectedPlayer();
        }
    }
});