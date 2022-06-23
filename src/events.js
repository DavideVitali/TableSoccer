// window.addEventListener('mousemove', (e) => {


// });

let mouseEventsCanvas = document.getElementById('MouseEvents');

mouseEventsCanvas.addEventListener('click', (e) => {
    let coords = { x: e.pageX - board.leftUserCanvas.width, y: e.pageY };
    let player = team.findPlayerByCoordinates(coords);
    let controller;
     
    if (player) {
        controller = board.controller.find(e => e.player.name == player.name);

        let playerClick = new CustomEvent('playerclick', {
            detail: {
                player: player
            }
        });

        // order matters!!!
        player.dispatchEvent(playerClick);
        board.dispatchEvent(playerClick);
        
        if (player.selected === true) {
            game.selectedPlayer = player;
        } else {
            /** giocatore deselezionato */
        }
        
    } else {
        
        let waitingPlayer;
        try {
            waitingPlayer = board.findWaitingPlayer();
        } catch (error) {
            alert(error);
        }

        controller = board.controller.find(e => e.player.name == game.selectedPlayer.name);
        if (controller.player.moveDone === true) {
            alert(`Hai già mosso ${controller.player.name}.`);
            return;
        }

        controller.setTargetCoordinates(coords);
        controller.startAnimation();
        
        // let playerClick = new CustomEvent('playerclick', {
            //     detail: {
                //         player: game.selectedPlayer
                //     }
                // });
                
        game.clearSelectedPlayer();
        // board.dispatchEvent(playerClick);
    }
});