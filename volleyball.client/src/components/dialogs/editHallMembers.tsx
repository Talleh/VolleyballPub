import { MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import GamePlayer from '../../entities/gamePlayer';
import { PlayerStatus } from '../../entities/playerStatus';
import AppButton from '../common/appButton';
import AccountOperation from './accountOperation'; 
import open, {ContentComponentProps, DialogConfig, DialogResult} from './dialogComponent';
const dialogColor = "#fee9d7";
interface EditHallMembersProps{
    hallId:number,
    player:GamePlayer,
    isPublic:boolean
}

export function Edit(props:EditHallMembersProps):DialogConfig<EditHallMembersProps, any> {
    return {
        inputModel:props,
        dialogColor:dialogColor,
        Content:EditDialog,
        resolvedResult:Promise.resolve,
        CancelTitle:"Close"
    }
}

function EditDialog(props:ContentComponentProps<EditHallMembersProps>) {
    const {isPublic, player} = props.model;

    return <div style={{display:'flex', flexDirection:"column", minWidth:250, minHeight:200, padding:20, backgroundColor:dialogColor}}>
        <div style={{alignSelf:"center"}} >
        <img src={player.picture ?? require('../../assets/avatar.jpg')} className="avatar"/>
        <Typography>{player.name}</Typography>
        </div>
        {player.status !== PlayerStatus.Blocked && <div style={{display:'flex', flexDirection:"row", marginBottom:20, marginTop:20}}>
        <TextField type="number" label="Player Amount" />
        <AppButton label = "Update" variant="contained" color="primary" style={{marginLeft:20}}/>
        </div>}
        {!isPublic && player.status !== PlayerStatus.Blocked && <AppButton  variant="contained" color="primary" style={{ marginBottom:20, marginTop:20}}
         label={`Change status to ${player.status == PlayerStatus.Member ? 'Special Guest' : 'Member'}`}/>}
        {player.status !== PlayerStatus.Blocked && <AppButton label="Block Player" variant="contained" color="secondary"
        confirmationMessage="Will be removed from all registered games. Are you sure you what to block this player?"/>}
        {player.status === PlayerStatus.Blocked && <AppButton label="Unlock Player" variant="contained" color="secondary"/>}
    </div>
}