import { MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import AddAgendaModel from '../../models/addAgendaModel';
import Hall from '../../entities/hall';
import {DialogConfig, ContentComponentProps} from './dialogComponent';

const config:DialogConfig<AddAgendaModel, boolean> = {
    Content:Content,
    resolvedResult:(model) =>{
        return Promise.resolve({succeeded:true});
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