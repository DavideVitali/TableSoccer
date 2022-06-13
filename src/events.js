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

let mouseEventsCanvas = document.getElementById('MouseEvents');

mouseEventsCanvas.addEventListener('click', (e) => {
    let coords = { x: e.pageX - Board.leftUserCanvas.width, y: e.pageY };
    let bluePlayer = blueTeam.findPlayerByCoordinates(coords);
    let bluePlayerIndex = blueTeam.findPlayerIndexByCoordinates(coords);
    let redPlayer = redTeam.findPlayerByCoordinates(coords);
    let redPlayerIndex = redTeam.findPlayerIndexByCoordinates(coords);
    
    /** Codice per animare un giocatore 
     * 
     */
    let animationManager;
     
    if (bluePlayerIndex || bluePlayerIndex == 0) {
        animationManager = Board.blueTeamAnimationManager[bluePlayerIndex];
        Board.selectedPlayerIndex = bluePlayerIndex;
    } else if (redPlayerIndex || redPlayerIndex == 0) {
        animationManager = Board.redTeamAnimationManager[redPlayerIndex];
        Board.selectedPlayerIndex = redPlayerIndex;
    } 

    if (bluePlayer || redPlayer) {
        // if (animationManager.isPlaying()) {
        //     animationManager.cancelAnimation();
        // } else {
        //     animationManager.startAnimation();
        // }
        let selected = bluePlayer ? bluePlayer : redPlayer
        
        Board.drawPlayerCard(leftUserCard, selected);
        animationManager.setTargetCoordinates(coords);
    }

    if (!bluePlayer && !redPlayer && Board.selectedPlayerIndex)
    {
        animationManager = Board.blueTeamAnimationManager[Board.selectedPlayerIndex];
        animationManager.startAnimation();
    }
        
});