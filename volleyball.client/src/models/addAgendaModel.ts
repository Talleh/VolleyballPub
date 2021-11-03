import { DayOfWeek } from "../entities/gameAgenda";

export default interface AddAgendaModel{
    hallId: number,
    schedule:Agenda
}
export interface Agenda{
    day:DayOfWeek,
    start:string,
    end:string
}