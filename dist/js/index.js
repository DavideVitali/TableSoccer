// per ora i giocatori hanno tutti lo stesso sprite
import { Board } from "./board.js";
import { Formation } from "./formations.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { PlayerRenderer } from "./renderers/player-renderer.js";
import { Team } from "./team.js";
import { FormationType } from "./types.js";
//const leftUserCard = new Card({ x: 10, y: 10 });
const playerRenderer = new PlayerRenderer(1000, 16);
const blueTeam = new Team(
/* _formation */ new Formation("443", FormationType.OFFENSE), 
/* _player */ [
    new Player("img/ita_playerDown.png", "Donnarumma"),
    new Player("img/ita_playerDown.png", "Di Lorenzo"),
    new Player("img/ita_playerDown.png", "Bonucci"),
    new Player("img/ita_playerDown.png", "Chiellini"),
    new Player("img/ita_playerDown.png", "Emerson"),
    new Player("img/ita_playerDown.png", "Barella"),
    new Player("img/ita_playerDown.png", "Jorginho"),
    new Player("img/ita_playerDown.png", "Verratti"),
    new Player("img/ita_playerDown.png", "Insigne"),
    new Player("img/ita_playerDown.png", "Immobile"),
    new Player("img/ita_playerDown.png", "Chiesa"),
], 
/* name */ "ITALIA");
const tableSoccer = new Game(new Board(blueTeam, playerRenderer));
//promises.push(leftUserCard);
// Promise.all(
//   tableSoccer.board.team.players.map((element) => element.loadImage)
// ).then(() => {
//   tableSoccer.board.drawTeam();
//   tableSoccer.board.drawAvailabilityCursors();
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbURBQW1EO0FBRW5ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTNDLGtEQUFrRDtBQUNsRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJO0FBQ3ZCLGdCQUFnQixDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDO0FBQzVELGFBQWEsQ0FBQztJQUNaLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFlBQVksQ0FBQztJQUNsRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxZQUFZLENBQUM7SUFDbEQsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFdBQVcsQ0FBQztJQUNqRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUM7SUFDL0MsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQztJQUNoRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLENBQUM7SUFDaEQsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQztJQUNoRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUM7Q0FDL0M7QUFDRCxVQUFVLENBQUEsUUFBUSxDQUNuQixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQzFCLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FDcEMsQ0FBQztBQUVGLDhCQUE4QjtBQUU5QixlQUFlO0FBQ2YsdUVBQXVFO0FBQ3ZFLGlCQUFpQjtBQUNqQixrQ0FBa0M7QUFDbEMsaURBQWlEO0FBQ2pELE1BQU0ifQ==