import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import Hall from '../entities/hall';
import strings from '../services/localizationService';
import HallItemCompoent from './hallItemComponent';
import hallService from '../services/hallService';
import { RouteComponentProps } from 'react-router-dom';
import { routers } from '../constants';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import openDialog from './dialogs/dialogComponent';
import {Edit} from './dialogs/editHallMembers';
import AddAgendaDialog from './dialogs/addAgendaDialog';
import AddHallDialog, {modify} from './dialogs/addHallDialog';
import GameAgenda from '../entities/gameAgenda';
import UserContext from '../context/userContext';
import updatePhoneNumberConfig from './dialogs/updatePhoneNr';
import Player from '../entities/player';
import GamePlayer from '../entities/gamePlayer';


const HallsComponent: FunctionComponent<RouteComponentProps> = (props) => {
    const [halls, setHalls] = useState([] as Hall[]);
    const user = useContext(UserContext);
    const getHalls = async () => {
        const hallsFromServer = await hallService.getAll();
        setHalls(hallsFromServer);
    }
    useEffect(() => {
        getHalls();
        console.log("Get Halls Called");
    }, []);

    const hallsExists = halls?.length > 0;
    const onDeleteHall = async (id: number) => {
        const oldList = halls;
        try {
            setHalls(halls.filter(h => h.id != id));
            await hallService.removeHall(id);
        }
        catch {
            setHalls(oldList);

            toast.error("Couldn't remove hall, try latter");
        }
    }
    console.log(halls);
    const addHallHandle = async () => {
        if(!await checkPhoneNumber()) return;

        const result = await openDialog(AddHallDialog);
        if (result) {
            const newHalls = [...halls];
            newHalls.push(result);
            setHalls(newHalls);
        }
    }

    const checkPhoneNumber = async () =>{
        const player = user.currentPlayer as Player;
        if(!player.contactNumber){
            toast.error("You should add a contact number first");
            const newNumber = await openDialog(updatePhoneNumberConfig(player));
        if (newNumber) {
            user.updatePlayer({...player, contactNumber:newNumber});
            return true;
        }
    }
    return false;
}
const modifyHallData = async (id:number) =>{
    const hall = halls.find(x => x.id == id) as Hall;
    const index = halls.indexOf(hall);
    const hallTax = await hallService.getTax(id); 
    const model = {Hall:{...hall}, HallTax:{...hallTax}};
    const result = await openDialog(modify(model));
    if(result)
    {
        const newHall = [...halls.slice(0, index), result, ...halls.slice(index +1, halls.length)];
        setHalls(newHall);
    }
};

    const addAgendaItem = async (hallId: number) => {
        const result = await openDialog(AddAgendaDialog);
        if (result) {
            const oldHall = halls;
            const newHall = [...halls];
            try {
                let agenda = { ...result } as GameAgenda;
                const hall = newHall.find(h => h.id === hallId) as Hall;
                hall.gamesAgenda = hall.gamesAgenda ?? [];
                hall.gamesAgenda.push(agenda);
                setHalls(newHall);
                await hallService.addAgenda({hallId:hallId, schedule:{
                    day:agenda.Day,
                    start:agenda.Start.toLocaleTimeString(undefined, { hour12: false, hour: "2-digit", minute: "2-digit" }),
                    end: agenda.End.toLocaleTimeString(undefined, { hour12: false, hour: "2-digit", minute: "2-digit" })
                }});

            } catch (error) {
                setHalls(oldHall);
            }
        }
    };

    const onPlayerClick = async (player: GamePlayer, hallId:number) => {
        const isPublic = halls.find(x => x.id == hallId)?.isPublic ?? false;
        await openDialog(Edit({player:player, hallId, isPublic}))
    }
    const removeAgendaItem = async (hallId: number, agendaId: number) => {
        const oldHall = halls;
        const newHall = [...halls];
        try {
            const hall = newHall.find(h => h.id === hallId) as Hall;
            hall.gamesAgenda = hall.gamesAgenda?.filter(a => a.Id !== agendaId);
            setHalls(newHall);
        } catch (error) {
            console.log(error);
            setHalls(oldHall);
        }
    };
    console.log("Hall Ids");
    halls?.map(h => console.log(h.id));
    return <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row-reverse", paddingLeft: 15, paddingRight: 15, paddingTop: 35, paddingBottom: 35 }}>
            <Button variant="contained" color="primary" onClick={(enent: any) => addHallHandle()}>{strings.AddHall}</Button></div>
        {!hallsExists && <div>{strings.noHalls}</div>}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "15%", paddingRight: "15%" }}>
            {halls?.map(h =>
                <HallItemCompoent key={h.id}
                    item={h}
                    onPlayerClick={onPlayerClick}
                    onAddGameAgenda={addAgendaItem}
                    deleteHall={onDeleteHall}
                    onRemoveAgendaItem={removeAgendaItem}
                    onEdit={modifyHallData}
                />)}</div>
    </div>;
}

export default HallsComponent;