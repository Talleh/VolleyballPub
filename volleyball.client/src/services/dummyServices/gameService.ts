import Game from "../../entities/game";
import GameRegisterModel from '../../models/gameRegisterModel';
import GameService from '../interfaces/gameService';
import GamePlayer from "../../entities/gamePlayer";
import localStorageService from "../localStorageService";
import { localStorageKeys } from "../../constants";
import {getLocalHall} from './hallService';
import { DayOfWeek } from "../../entities/gameAgenda";
import PaginatedResult from "../../models/paginatedResult";
const games:Game[] = [{
    id:1,
    date:new Date(2021, 4, 7),
    hall:getLocalHall(1),
    agenda:{
        day:DayOfWeek.Friday,
        start:"19:00",
        end:"21:00"
    }
},
{
    id:2,
    date:new Date(2021, 4, 14),
    hall:getLocalHall(1),
    agenda:{
        day:DayOfWeek.Friday,
        start:"19:00",
        end:"21:00"
    }
},
{
    id:3,
    date:new Date(2021, 4, 21),
    hall:getLocalHall(1),
    agenda:{
        day:DayOfWeek.Friday,
        start:"19:00",
        end:"21:00"
    }
}];

function getGame(id: number): Promise<Game> {
    return Promise.resolve(games.find(x => x.id == id) as Game);
}

function getTax(id:number):Promise<number>{
    return Promise.resolve(45);
}

function getAll(): Promise<PaginatedResult<Game>> {
    return Promise.resolve({hasMore:false, items:games});
}

async function registerToGame(model:GameRegisterModel){
    return Promise.resolve(model.playerId ?? 1);
}

function unregisterFromGame(model:GameRegisterModel){
    return Promise.resolve();
}

function getGamePlayers(gameId:number): Promise<GamePlayer[]>{
    return Promise.resolve(games.find(x => x.id == gameId)?.allPlayers ?? []);
}

function getFreePlayers(gameId:number): Promise<GamePlayer[]>{
    
    return Promise.resolve([{name:"Taleh", playerId:1},
    {name:"Iura", playerId:2},
    {name:"Cataev", playerId:3},
    {name:"Alex", playerId:4},
    {name:"Leoha", playerId:5},
    {name:"How", playerId:6},
    {name:"Last", playerId:7}
]);
}

function canRegister(gameId: number): Promise<boolean> {
    if(!localStorageService.getItem(localStorageKeys.token))
    return Promise.resolve(false);
    return Promise.resolve(true);
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