import { MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import AddAgendaModel from '../../models/addAgendaModel';
import Hall from '../../entities/hall';
import {DialogConfig, ContentComponentProps} from './dialogComponent';
import gameService from '../../services/gameService';
import CreateGameModel from '../../models/createGameModel';

const config:DialogConfig<CreateGameModel, boolean> = {
    Content:Content,
    resolvedResult:async(model) =>{
        try {
            await gameService.createGame(model);
            return {succeeded:true};
        } catch (error) {
            return {succeeded:false, errors:['Something went wrong - please try later']}
        }
    }
}

function Content(props:ContentComponentProps<AddAgendaModel>){
    const [hallId, setHallId] = useState(-1);
    const [halls, setHalls] = useState([] as Hall[]);
    return <div>
        <Select
        value={hallId}
        style={{marginBottom:10}}
        >
            <MenuItem value="-1">Select Hall</MenuItem>
            {halls.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
        </Select>
        <TextField 
        type="date"
        label="Select Game Date"
        />
        <TextField 
        label="Game Starts"
        type="time"
        />
        <TextField 
        label="Game Ends"
        type="time"
        />
    </div>
}