import Hall from "../../entities/hall";
import AddHallModel from '../../models/hallModel';
import AddAgendaModel from '../../models/addAgendaModel';
import HallPlayer from "../../entities/hallPlayer";
import HallService from '../interfaces/hallService';
import HallTax from "../../entities/hallTax";
import { PlayerLevel } from "../../entities/playerLevel";
let halls:Hall[] = [{
    name:"UCCM",
    address:"I. Gagarin 8",
    administrator:{
        id:1,
        name:"Taleh",
        contactNumber:""
    },
    createGamesAutomatically:true,
    id:1,
    isPublic:true,
    maxPlayers:12,
    memberSeatsLimited:true,
    minPlayers:8,
    playersLevel:PlayerLevel.Medium
},
{
    name:"UCCM2",
    address:"I. Gagarin 8",
    administrator:{
        id:1,
        name:"Taleh",
        contactNumber:""
    },
    createGamesAutomatically:true,
    id:2,
    isPublic:false,
    maxPlayers:12,
    memberSeatsLimited:true,
    minPlayers:8,
    playersLevel:PlayerLevel.Medium,
    code:{
        guestReplacementHours:4,
        memberCode:"Test",
        specialGuestCode:"te"
    }
}];

export function getLocalHall(id:number) {
    return halls.find(x => x.id == id) as Hall;
}

function getAll(): Promise<Hall[]> {
    return Promise.resolve(halls);
}

function getAvailable(): Promise<Hall[]> {
    return Promise.resolve(halls);
}

function removeHall(id: number): Promise<any> {
    halls = halls.filter(x => x.id == id);
    return Promise.resolve();
}

function get(id: number): Promise<Hall> {
    return Promise.resolve(getLocalHall(id));
}

function allowSubsciption(hallId: number): Promise<boolean> {
    return Promise.resolve(true);
}

function getMembers(id:number):Promise<HallPlayer[]>{
    return Promise.resolve([]);
}

async function add(model: AddHallModel): Promise<Hall> {
    if(model.Hall.id)
    {
        await removeHall(model.Hall.id);
        const newHall = {...model.Hall};
        halls.push(newHall);
        return newHall;
    }
    halls.push(model.Hall);
    return model.Hall;
}

function addAgenda(model:AddAgendaModel): Promise<any> {
    const hall = halls.find(x => x.id == model.hallId) as Hall;
    hall.gamesAgenda = hall.gamesAgenda ?? [];
    hall.gamesAgenda.push({
        Id:hall.gamesAgenda.length + 1,
        Day:model.schedule.day,
        Start:new Date(model.schedule.start),
        End:new Date(model.schedule.end)
    })
    return Promise.resolve();
}

function hallNameFree(name:string, hallId?:number) {
    return Promise.resolve(halls.find(x => x.name == name && x.id !== hallId) == undefined);
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