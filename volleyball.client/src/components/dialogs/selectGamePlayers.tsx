import { Fab, Typography } from '@material-ui/core';
import { Remove, Add } from '@material-ui/icons';
import {ActionType} from '../../context/gamePlayersContext';
import React, { useEffect, useState } from 'react';
import GamePlayer from '../../entities/gamePlayer';
import gameService from '../../services/gameService';
import {ContentComponentProps, DialogConfig, DialogResult} from './dialogComponent';

export interface SelectPlayersProps{
    items:GamePlayer[],
    action:ActionType,
    gameId:number
}

function Config(model:SelectPlayersProps):DialogConfig<SelectPlayersProps, GamePlayer[]>
{

    return{
    inputModel:model,
    resolvedResult: (model) =>{
        if(!model.items || model.items.length == 0) return Promise.resolve({succeeded:false, errors:['No players selected']});
        return Promise.resolve({succeeded:true, result:model.items});
    },
    Content:Content,
    title:"Select Players",
    SubmitTitle:model.action == ActionType.Add ? "Register" : "Remove",
    CancelTitle:"Cancel"
}
}

function Content(props:ContentComponentProps<SelectPlayersProps>) {
    const [allPlayer, setAllPlayer] = useState([] as GamePlayer[]);

    const loadList = async() =>{
        let players:GamePlayer[] = [];
        if(props.model.action == ActionType.Add)
        players = await gameService.getFreePlayers(props.model.gameId);
        else players = await gameService.getGamePlayers(props.model.gameId);
        setAllPlayer(players);
    }

    useEffect(() => {
        loadList();
    }, []);

    const onPlayerClick = (player:GamePlayer, selected:boolean) =>{
        let players:GamePlayer[] = [];
        if(selected){
            players = [...props.model.items];
            players.push(player);
        }
        else
        players = props.model.items.filter(x => x.playerId !== player.playerId);
        props.onModalChange({items:players} as SelectPlayersProps);
    };

    return <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly', flex:'1',
     justifyItems:'stretch', flexWrap:"wrap", maxWidth:450}}>
        {allPlayer.map(x => <PlayerItem item={x} onPlayerClick={onPlayerClick}/>)}
    </div>
}

interface PlayerItemProps{
 item:GamePlayer,
 onPlayerClick:(player:GamePlayer, selected:boolean) => void
}

function PlayerItem(props:PlayerItemProps) {
    const [selected, setSelected] = useState(false);
    const onPlayerClick = () =>{
        const state = !selected;
        setSelected(state);
        props.onPlayerClick(props.item, state);
    }
    return <div style={{display:'flex', position:"relative", flexDirection:"column", margin:5, alignItems:"center",
    width:60
    }}>
        <Fab style={{ position: "absolute", right: "-2%" }} onClick={onPlayerClick}
        color={selected ? "secondary" : "primary"}
        size="small">
            {selected && <Remove />}
            {!selected && <Add />}
            </Fab>
        <img src={props.item.picture ?? require('../../assets/avatar.jpg')}/>
        <Typography>{props.item.name}</Typography>
    </div>
}

export default Config;