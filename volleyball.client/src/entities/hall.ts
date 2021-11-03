import Player from "./player";
import GameAgenda from './gameAgenda';
import HallCode from './hallCode';
import {PlayerLevel} from './playerLevel';

export default interface Hall {
    id: number,
    name: string,
    address: string
    administrator: Player
    isPublic: boolean,
    gamesAgenda?: GameAgenda[],
    minPlayers: number,
    maxPlayers: number,
    playersLevel:PlayerLevel,
    memberSeatsLimited:boolean,
    code?:HallCode,
    createGamesAutomatically:boolean
}