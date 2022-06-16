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
    let coords = { x: e.pageX - board.leftUserCanvas.width, y: e.pageY };
    let player = team.findPlayerByCoordinates(coords);
    let controller;
     
    if (player) {
        let playerClick = new Event('playerclick');
        player.dispatchEvent(playerClick);

        if (player.selected === false) {
            game.selectNewPlayer = player;
            board.drawPlayerCard(leftUserCard, player);
        } else {
            /** giocatore deselezionato */
        }
        
    }

    // è stato premuto un giocatore senza che ve ne fosse già uno selezionato prima
    if (player && !game.selectedPlayer) {
        controller = board.controller.find(e => e.player.name == player.name);
        let position = controller.position;
        if (controller.player.available) {
            board.drawMaximumMovement(player, position);
        }
    }
    
    // è stato premuto un punto del campo con un giocatore già selezionato, quindi si deve muovere il giocatore
    if (!player && game.selectedPlayer)
    {
        controller = board.controller.find(e => e.player.name == game.selectedPlayer.name);
        if (controller.player.available !== true) {
            alert(`Hai già mosso ${controller.player.name}.`);
            return;
        }

        controller.setTargetCoordinates(coords);
        controller.startAnimation();
        game.clearSelectedPlayer();
    }
});