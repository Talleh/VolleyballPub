import http from './http';
import { localStorageKeys } from "../../constants";
import Player from "../../entities/player";
import localStorageService from "../localStorageService";
import PlayerService from '../interfaces/playerService';

const basePath = 'player';

function getPlayerId(){
    let id = -1;
    if(localStorageService.getItem(localStorageKeys.playerId))
    id = +(localStorageService.getItem(localStorageKeys.playerId) ?? -1);
    return id;
}

function get(){
    return http.get<Player>(basePath);
}

function updateProfile(player:Player){
    return http.post<string>(`${basePath}profile`, player);
}

function updateProfilePic(picData: any): Promise<string> {
    return http.post<string>(`${basePath}uploadFile`, picData);
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