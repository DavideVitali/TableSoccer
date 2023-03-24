// per ora i giocatori hanno tutti lo stesso sprite
import { Board } from "./board.js";
import { Formation } from "./formations.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { PlayerRenderer } from "./renderers/player-renderer.js";
import { Team } from "./team.js";
import { FormationModule, FormationType } from "./types.js";
//const leftUserCard = new Card({ x: 10, y: 10 });
const playerRenderer = new PlayerRenderer(1000, 16);
const blueTeam = new Team(
/* _formation */ new Formation(FormationModule._442, FormationType.OFFENSE), 
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbURBQW1EO0FBRW5ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU1RCxrREFBa0Q7QUFDbEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksSUFBSTtBQUN2QixnQkFBZ0IsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUM7QUFDM0UsYUFBYSxDQUFDO0lBQ1osSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsWUFBWSxDQUFDO0lBQ2xELElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFlBQVksQ0FBQztJQUNsRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUM7SUFDL0MsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsV0FBVyxDQUFDO0lBQ2pELElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFNBQVMsQ0FBQztJQUMvQyxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUM7SUFDL0MsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDO0lBQ2hELElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQztJQUNoRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUM7SUFDL0MsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDO0lBQ2hELElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFFBQVEsQ0FBQztDQUMvQztBQUNELFVBQVUsQ0FBQSxRQUFRLENBQ25CLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FDMUIsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUNwQyxDQUFDO0FBRUYsOEJBQThCO0FBRTlCLGVBQWU7QUFDZix1RUFBdUU7QUFDdkUsaUJBQWlCO0FBQ2pCLGtDQUFrQztBQUNsQyxpREFBaUQ7QUFDakQsTUFBTSJ9