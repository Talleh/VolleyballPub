import Game from './game';
import { PlayerStatus } from './playerStatus';

export default interface GamePlayer
{
    id?:number,
    name:string,
    picture?:string,
    playerId?:number,
    status?:PlayerStatus
}