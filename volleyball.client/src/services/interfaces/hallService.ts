import Hall from "../../entities/hall";
import AddHallModel from '../../models/hallModel';
import AddAgendaModel from '../../models/addAgendaModel';
import HallPlayer from "../../entities/hallPlayer";
import HallTax from "../../entities/hallTax";

export default interface HallService{
    getAll(): Promise<Hall[]>,
    getAvailable(): Promise<Hall[]>,
    removeHall(id: number): Promise<any>,
    get(id: number): Promise<Hall>,
    allowSubsciption(hallId: number): Promise<boolean>,
    getMembers(id:number):Promise<HallPlayer[]>,
    add(model: AddHallModel): Promise<Hall>,
    addAgenda(model:AddAgendaModel): Promise<any>,
    getTax(hallId:number):Promise<HallTax>,
    hallNameFree(name:string, hallId?:number): Promise<boolean>
}