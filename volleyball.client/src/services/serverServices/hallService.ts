import http from "./http";
import Hall from "../../entities/hall";
import AddHallModel from '../../models/hallModel';
import AddAgendaModel from '../../models/addAgendaModel';
import HallPlayer from "../../entities/hallPlayer";
import HallService from '../interfaces/hallService';
import HallTax from "../../entities/hallTax";

const baseUrl = "hall";
function getAll(): Promise<Hall[]> {
    return http.get(baseUrl);
}

function getAvailable(): Promise<Hall[]> {
    return http.get(`${baseUrl}/availableHalls`);
}

function removeHall(id: number): Promise<any> {
    return http._delete(baseUrl + `/delete/${id}`);
}

function get(id: number): Promise<Hall> {
    return http.get(`${baseUrl}/${id}`);
}

function allowSubsciption(hallId: number): Promise<boolean> {
    return Promise.resolve(true);
}

function getMembers(id:number):Promise<HallPlayer[]>{
    return http.get(`${baseUrl}/${id}/hallPlayers`);
}

function add(model: AddHallModel): Promise<Hall> {
    return http.post(baseUrl + '/create', model);
}

function addAgenda(model:AddAgendaModel): Promise<any> {
    return http.post(baseUrl + "/agenda", model);
}
function hallNameFree(name:string, hallId?:number) {
    return http.get<boolean>(`${baseUrl}/hallNameFree?name=${name}${hallId && ("&hallId=" + hallId)}`);
}


const hallService:HallService = {
    getAll,
    removeHall,
    get,
    addAgenda,
    add,
    allowSubsciption,
    getMembers,
    getAvailable,
    getTax:() => Promise.resolve({ } as HallTax),
    hallNameFree
};
export default hallService;