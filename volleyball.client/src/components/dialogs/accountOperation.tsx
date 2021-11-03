import React from 'react';
import { TextField } from '@material-ui/core/';
import { ContentComponentProps, DialogConfig, DialogResult } from './dialogComponent';
import localizationService from '../../services/localizationService';


const dialogConfig:DialogConfig<any, number> = {
Content:Dialog,
inputModel:{amount: 0},
resolvedResult:(model) =>
{
    if(model.amount < 0)
    return Promise.resolve({succeeded:false, errors:['Insert valid amount']});
    return Promise.resolve({succeeded:true, result: model.amount});
},
title:"Input an amount",
SubmitTitle:"Submit",
CancelTitle:"Cancel"
}

function Dialog(props:ContentComponentProps<any>){
 return <div style={{margin:20}}><TextField defaultValue={props.model.amount} onChange={(e) => props.onModalChange({ammount:+e.target.value})} type="number" /></div>
}

export default dialogConfig;