import http from "./http";
import Game from "../../entities/game";
import GameRegisterModel from '../../models/gameRegisterModel';
import GameService from '../interfaces/gameService';
import GamePlayer from "../../entities/gamePlayer";
import localStorageService from "../localStorageService";
import { localStorageKeys } from "../../constants";
import PaginatedResult from "../../models/paginatedResult";
import PaginationModel from "../../models/paginationModel";

const baseUrl = "game";
function getGame(id: number): Promise<Game> {
    return http.get(baseUrl + `/${id}`);
}

function getTax(id:number):Promise<number>{
    return http.get(baseUrl + `/${id}/tax`);
}

function getAll(model:PaginationModel): Promise<PaginatedResult<Game>> {
    return http.get(baseUrl + `?pagination=${model}`);
}

function registerToGame(model:GameRegisterModel){
    return http.post<number>(baseUrl + '/register', model);
}

function unregisterFromGame(model:GameRegisterModel){
    return http.post(baseUrl + '/unregister', model);
}

function getGamePlayers(gameId:number): Promise<GamePlayer[]>{
    
    return http.get(baseUrl + `/${gameId}/gamePlayers`);
}

function getFreePlayers(gameId:number): Promise<GamePlayer[]>{
    
    return http.get(baseUrl + `/${gameId}/freePlayers`);
}

function canRegister(gameId: number): Promise<boolean> {
    if(!localStorageService.getItem(localStorageKeys.token))
    return Promise.resolve(false);
    return http.get(`${baseUrl}/${gameId}/canRegister`);
}

const implemenation:GameService =
{
    getGame,
    getPaginated: getAll,
    getGamePlayers,
    registerToGame,
    unregisterFromGame,
    getFreePlayers,
    getTax,
    canRegister
};
export default implemenation;