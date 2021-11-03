import Hall from './hall';
import Player from './player';
import { PlayerStatus } from './playerStatus';

export default interface HallPlayer{
    id?:number,
    player:Player,
    hall:Hall,
    status:PlayerStatus
}