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

//     if (hoveringPlayer != null || Board.selectedPlayer != null) {
//         if (!body.classList.contains('selected-player')) {
//             body.classList.add('selected-player');
//         } 
//     } else {
//         body.classList.remove('selected-player');
//     }

// });

window.addEventListener('mouseup', (e) => {
    let coords = { x: e.pageX - Board.leftUserCanvas.width, y: e.pageY };
    let bluePlayerIndex = blueTeam.findPlayerByCoordinates(coords);
    let redPlayerIndex = redTeam.findPlayerByCoordinates(coords);
    let animationManager;


    if ((bluePlayerIndex || bluePlayerIndex == 0) /** && Board.selectedPlayer == null */) {
        animationManager = Board.blueTeamAnimationManager[bluePlayerIndex];
    } else if ((redPlayerIndex || redPlayerIndex == 0) /** && Board.selectedPlayer == null */) {
        animationManager = Board.redTeamAnimationManager[redPlayerIndex];
    } 

    console.log(animationManager);
    if (animationManager) {
        //Board.selectedPlayer = selectedTeamElement;
        /** 
         * inizia l'animazione del player selezionato
         * 
         */
         animationManager.cancelAnimationRequest = false;
         window.requestAnimationFrame(animationManager.animateSprite);
    } else if (animationManager.player.name == Board.selectedPlayer.player.name) {
        Board.selectedPlayer = null;
        /**
         * annulla l'animazione del player 
         Board.cancelAnimationRequest = true;
         Board.selectedPlayer = null;
         */
    }
});