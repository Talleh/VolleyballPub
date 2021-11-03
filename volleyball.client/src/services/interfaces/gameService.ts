import Game from '../../entities/game';
import GameRegisterModel from '../../models/gameRegisterModel';
import CreateGameModel from '../../models/createGameModel';
import PaginationModel from '../../models/paginationModel';
import PaginatedResult from '../../models/paginatedResult';
import GamePlayer from "../../entities/gamePlayer";

export default interface GameService{
    getGame:(id: number) => Promise<Game>,
    getPaginated:(paginationModel:PaginationModel)=> Promise<PaginatedResult<Game>>,
    getGamePlayers:(gameId:number)=> Promise<GamePlayer[]>,
    registerToGame:(model:GameRegisterModel) => Promise<number>,
    unregisterFromGame:(model:GameRegisterModel) => Promise<unknown>,
    getFreePlayers:(gameId:number)=> Promise<GamePlayer[]>,
    getTax:(id:number)=>Promise<number>,
    canRegister:(gameId: number)=> Promise<boolean>,
    createGame:(game:CreateGameModel) => Promise<boolean>
}