import { Agenda } from "../models/addAgendaModel";
import GameAgenda from "./gameAgenda";
import GamePlayer from "./gamePlayer";
import Hall from "./hall";
import Player from "./player";
import { PlayerStatus } from "./playerStatus";

export default interface Game {
    id: number,
    date: Date,
    agenda: Agenda,
    hall: Hall,
    allPlayers?: GamePlayer[]
}