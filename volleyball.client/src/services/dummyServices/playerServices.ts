import { localStorageKeys } from "../../constants";
import Player from "../../entities/player";
import localStorageService from "../localStorageService";
import PlayerService from '../interfaces/playerService';
const player:Player = {
    id:1,
    name:"Taleh",
    administrateHalls:true
}
function getPlayerId(){
    let id = -1;
    if(localStorageService.getItem(localStorageKeys.playerId))
    id = +(localStorageService.getItem(localStorageKeys.playerId) ?? -1);
    return id;
}

function get(){
    return Promise.resolve(player);
}

function updateProfile(player:Player){
    return Promise.resolve();
}

function updateProfilePic(picData: any): Promise<string> {
    return Promise.resolve('');
}

function registerToMembership(hallId: number): Promise<void> {
    return Promise.resolve();
}
const playerService:PlayerService = {
    registerToMembership,
    updateProfilePic,
    getPlayerId,
    get,
    updateProfile
};

export default playerService;