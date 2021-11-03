import { Button, Table, TableBody, TableContainer, Typography, TextField, TablePagination } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import Hall from '../entities/hall';
import HallTax from '../entities/hallTax';
import Player from '../entities/player';
import HallPlayer from '../entities/hallPlayer';
import strings from '../services/localizationService';
import HallSubscriber from './hallPlayer';
import openDialog from './dialogs/dialogComponent';
import {modify} from './dialogs/addHallDialog';
import AppTable from './common/table';
import HallItemComponent from './hallItemComponent';
import hallService from '../services/hallService';
import HallModel from '../models/hallModel';

const HallComponent: FunctionComponent<RouteComponentProps> = (props: RouteComponentProps) => {
    const { id } = props.match.params as any;
    
    const [hall, setHall] = useState({} as Hall);
    const [hallTax, setHallTax] = useState({regularPlayerTax:45} as HallTax);
    const [allPlayers, setAllPlayers] = useState([] as HallPlayer[]);
    const [hallPlayers, setHallPlayers] = useState([] as HallPlayer[]);

    const fetch = async () => {
        try {
            const _hall = await hallService.get(id as number);
            setHall(_hall);
            const _hallTax = await hallService.getTax(hall.id);
            setHallTax(_hallTax);
            const _members = await hallService.getMembers(hall.id);
            setAllPlayers(_members);
            setHallPlayers(_members);
        } catch (error) {
            
        }
    };

    const handlePlayerUpdate = (updatedPlayer:HallPlayer) =>{
        const _players = [...hallPlayers];
        const player = _players.find(p => p.id === updatedPlayer.id) as HallPlayer;
        player.status = updatedPlayer.status;
        setHallPlayers(_players);
    }

    const modifyHallData = async () =>{  
        const model = {Hall:{...hall}, HallTax:{...hallTax}};
        if(await openDialog(modify(model))) await fetch();
    };

    const handleSeach = async (seach:string) =>{
        try {
        const _newItems = allPlayers.filter(p => p.player.name.startsWith(seach));
        setHallPlayers(_newItems);
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        fetch();
    }, []);



    return <div style={{ display: "flex", marginTop:20, width:"70%", alignItems:"center", flexDirection:"row", justifyContent:"space-between"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
            <div>Hall Name: {hall.name}</div>
            <div>Hall Address: {hall.address}</div>
            <div>Min Players: {hall.minPlayers}</div>
            <div>Max Players: {hall.maxPlayers}</div>
            <div>Tax for a game: {hallTax.isRegularTaxDinamic ? "Calculated based on registered players" : hallTax.regularPlayerTax}</div>
<div>{hall.isPublic ? ("Tax for subscription:" + hallTax.isMemberTaxDinamic ? "Calculated based on member players" : hallTax.memberPlayerTax):""}</div>
        </div>
        {!hall.isPublic && <Typography>{`Codes: MemberCode - ${hall.code?.memberCode} SpecialGuestCode - ${hall.code?.specialGuestCode}`}</Typography>}
        {!hall.isPublic && <Typography>{`Members can replace guests till - ${hall.code?.guestReplacementHours} hours before game`}</Typography>}
<Button variant="contained" color="primary" onClick={modifyHallData}>Modify</Button>
        </div>
        <AppTable items={hallPlayers} itemTemplate={(e => <HallSubscriber entity={e} onUpdate={handlePlayerUpdate} />)} onSearch={handleSeach} />
    </div>;
}

export default HallComponent;