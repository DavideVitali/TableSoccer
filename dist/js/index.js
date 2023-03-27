// per ora i giocatori hanno tutti lo stesso sprite
import { Board } from "./board.js";
import { Formation } from "./formations.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { Team } from "./team.js";
import { FormationModule, FormationType } from "./types.js";
//const leftUserCard = new Card({ x: 10, y: 10 });
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
const board = new Board();
board.init(blueTeam);
window.tableSoccer = new Game(board);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbURBQW1EO0FBRW5ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVyQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBUTVELGtEQUFrRDtBQUNsRCxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUk7QUFDdkIsZ0JBQWdCLENBQUMsSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDO0FBQzNFLGFBQWEsQ0FBQztJQUNaLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFlBQVksQ0FBQztJQUNsRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxZQUFZLENBQUM7SUFDbEQsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFdBQVcsQ0FBQztJQUNqRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUM7SUFDL0MsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQztJQUNoRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLENBQUM7SUFDaEQsSUFBSSxNQUFNLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsQ0FBQztJQUNoRCxJQUFJLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxRQUFRLENBQUM7Q0FDL0M7QUFDRCxVQUFVLENBQUMsUUFBUSxDQUNwQixDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMifQ==