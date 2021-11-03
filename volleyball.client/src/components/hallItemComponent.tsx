import React, { FunctionComponent, useEffect, useState } from 'react';
import Hall from '../entities/hall';
import strings from '../services/localizationService';
import PlayerItemComponent from './playerItemComponent';
import Fab from '@material-ui/core/Fab';
import { Remove, Add, Edit } from '@material-ui/icons/';
import GameAgenda from '../entities/gameAgenda';
import GamePlayer from '../entities/gamePlayer';
import { Typography } from '@material-ui/core';
import { PlayerStatus } from '../entities/playerStatus';

export interface HallItemComponentProps {
    item: Hall,
    deleteHall: (id: number) => void,
    onPlayerClick: (player:GamePlayer, hallId: number) => void,
    onAddGameAgenda: (id: number) => void,
    onRemoveAgendaItem: (hallId: number, agendaId: number) => void,
    onEdit:(id:number) => void
}

interface AgandaItemProps {
    item: GameAgenda,
    hallId: number
    remove: (hallId: number, agendaId: number) => void;
}

function AgandaItem({ item, remove, hallId }: AgandaItemProps) {
    return <div key={item.Id} style={{ display: "flex", flexDirection: "row", backgroundColor: "rosybrown", marginTop: 20, borderRadius: 25, paddingLeft: 10 }}>
        <div>{strings.DayOfWeek} {strings.daysOfWeek[item.Day]}</div>
        <div>{strings.StartAt} {item.Start.toLocaleTimeString(undefined, { hour12: false, hour: "2-digit", minute: "2-digit" })}</div>
        <div>{strings.EndAt} {item.End.toLocaleTimeString(undefined, { hour12: false, hour: "2-digit", minute: "2-digit" })}</div>
        <div style={{ marginLeft: 40 }}><Fab style={{ position: "absolute", right: "0%" }} size="small" onClick={() => remove(hallId, item.Id)} color="secondary"><Remove /></Fab></div>
    </div>;
}

const HallItemComponent: FunctionComponent<HallItemComponentProps> = (props) => {
    const { id, address, maxPlayers, minPlayers, gamesAgenda, code } = props.item;
    const [members, setMembers] = useState([{name:"Taleh 2", id:1, playerId:1, status:PlayerStatus.Blocked}] as GamePlayer[]);
    const loadMembers = async() =>{

    };

    useEffect(() =>{
        loadMembers();
    }, []);

    const onPlayerClick = (playerId:number) => { 
        console.log(playerId);
        const player = members.find(x => x.playerId == playerId) as GamePlayer;
        console.log(player);
        props.onPlayerClick(player, id);
    }

    return <div style={{
        backgroundColor: "turquoise", width: "100%", flexWrap: "wrap", display: "flex", marginBottom: 35, flexDirection: "column", borderRadius: 15,
        paddingBottom: 20, flex:1
    }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", width: "100%", flexDirection: "row", position: "relative" }}>
            <Typography variant="h5" style={{ width: "100%"}}>{props.item.name}</Typography>
            <Fab style={{ position: "absolute", right: "-2%" }} onClick={() => props.deleteHall(id)} color="secondary"><Remove /></Fab>
            <Fab style={{ position: "absolute", left: "-2%" }} onClick={() => props.onEdit(id)} color="primary"><Edit /></Fab>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flexWrap: "wrap", flex: 0.7, marginLeft: 15 }}>
                <Typography  variant="h6">Adress:{address}</Typography>
                <Typography variant="h6">Max Players: {maxPlayers}</Typography>
                <Typography variant="h6">Min Players: {minPlayers}</Typography>
                {code?.memberCode && <Typography variant="h6">Member Code: {code.memberCode}</Typography>}
                {code?.specialGuestCode && <Typography variant="h6">Special Guest: {code.specialGuestCode}</Typography>}
                {code && <Typography variant="h6">Guests may be replaced: {code.guestReplacementHours} hours</Typography>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 0.7 }}>
                    <Typography variant="h6">Members</Typography>
                <div className="playerItemContainer">
                    {members?.map(p => <HallMember key={p.id} item={p} onItemClick={onPlayerClick} />) ?? <div>{strings.NoPlayerYet}</div>}
                </div>
            </div>
            <div style={{ display: "flex", flex: 0.7, flexDirection: "column", paddingRight: 5, position: "relative" }}>
                <Fab style={{ position: "absolute", right: "8%" }} size="small" onClick={() => props.onAddGameAgenda(id)} color="primary"><Add /></Fab>
                <Typography variant="h5">{strings.GamesAgenda}</Typography>
                {gamesAgenda?.map(a => <AgandaItem key={a.Id} item={a} remove={props.onRemoveAgendaItem} hallId={id} />)}

            </div>
        </div>
    </div>;
}

interface HalMemberProps{
    item:GamePlayer,
    onItemClick:(id:number) => void
}

function HallMember(props:HalMemberProps) {
    const status = props.item.status == undefined ? '' : strings.PlayerStatus[props.item.status];
    return <div style={{display:'flex', flexDirection:"column"}}>
        <PlayerItemComponent item={props.item} onItemClick={props.onItemClick} />
        <Typography color="textSecondary">{status}</Typography>
    </div>
}

export default HallItemComponent;