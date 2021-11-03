import React, { useContext, useEffect, useRef, useState } from 'react';
import { Fab, MenuItem, Select, TableCell, TableRow, TextField } from '@material-ui/core';
import Hall from '../../entities/hall';
import Game from '../../entities/game';
import GamePlayer from '../../entities/gamePlayer';
import open, { ContentComponentProps, DialogConfig, DialogResult} from './dialogComponent';
import hallService from '../../services/hallService';
import gameService from '../../services/gameService';
import { Add } from '@material-ui/icons';
import { toast } from 'react-toastify';
import AppButton from '../common/appButton';
import SelectPlayers, { SelectPlayersProps } from './selectGamePlayers';
import GamePlayersContext, {ActionType} from '../../context/gamePlayersContext';

export interface ManageGamesPlayerResult{
    hallId?:number,
    gameId?:number
}

const dialogConfig:DialogConfig<ManageGamesPlayerResult, any> = {
    inputModel:{hallId:-1, gameId:-1},
    resolvedResult : () => Promise.resolve({succeeded:true, result:{}}),
    Content:ManageGamesPlayerDialogContent,
    title:'Manage Games Player',
    CancelTitle:"Close"
}

function ManageGamesPlayerDialogContent(props:ContentComponentProps<ManageGamesPlayerResult>){
    const [halls, setHalls] = useState([] as Hall[]);
    const [games, setGames] = useState([] as Game[]);
    const [hallSelected, setHallSelected] = useState(false);
    const [selectedActon ,setSelectedAction] = useState(ActionType.Add);
    
    const [selectedGame, setSelectedGame] = useState({} as Game);
    const {hallId, gameId } = props.model;
    const gamePlayersContext = useContext(GamePlayersContext)
    const onModalChange = props.onModalChange;
    const load = async () =>{
        try {
            const hallsFromServer = await hallService.getAll();
            setHalls(hallsFromServer);
        } catch (error) {
            
        }
    }

    const loadGames = async (hallId:number) =>{
        try {
            const result = await gameService.getPaginated({page:1, pageSize:20});
            setGames(result.items);
        } catch (error) {
            
        }
    }
    useEffect(() =>{
        load();
    },[]);

    const onHallSelected = async (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>{
        const selectedId = event.target.value as number;
        setHallSelected(selectedId > 0);
        await loadGames(selectedId);
        onModalChange({hallId:selectedId, gameId:-1});
    }

    const onGameSelected = (event: React.ChangeEvent<{ name?: string; value: unknown }>) =>{
        const selectedId = event.target.value as number;
        setSelectedGame(games.find(g => g.id == selectedId) as Game);
        onModalChange({gameId:selectedId});
    }

    const onGuestAdded=(player:GamePlayer) =>{
        selectedGame.allPlayers = selectedGame.allPlayers ?? [];
        selectedGame.allPlayers.push(player);
    }

    const onActionChanged = async (newAction:ActionType) =>{
        setSelectedAction(newAction);
    }

    const onSelectPlayers = async () =>{
        const players = await open(SelectPlayers({gameId:gameId ?? -1, action:selectedActon, items:[]}));
        if(players){
            //Emitter.emit('GameListUpdated', {gameId:selectedGame.id,items:players, action:selectedActon});
        }
    }

    return <div style={{display:"flex", margin:15, flexDirection:"column"}}>
        <Select
        value={hallId}
        onChange={onHallSelected}
        style={{marginBottom:10}}
        >
            <MenuItem value="-1">Select Hall</MenuItem>
            {halls.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
        </Select>
        {hallSelected && <Select
        value={gameId}
        onChange={onGameSelected}
        style={{marginBottom:10}}
        >
            <MenuItem value="-1">Select Game</MenuItem>
            {games.map(g => <MenuItem key={g.id} value={g.id} >{g.date.toLocaleString()}</MenuItem>)}
        </Select>}
        {gameId != -1 && <Select
        value={selectedActon}
        onChange={(e) => onActionChanged(e.target.value as ActionType)}
        style={{marginBottom:10}}
        label="Action Type"
        >
            <MenuItem value={ActionType.None}>No action selected</MenuItem>
            <MenuItem value={ActionType.Add}>Add Player</MenuItem>
            <MenuItem value={ActionType.Remove}>Remove Player</MenuItem>
        </Select>}
        {selectedActon == ActionType.Add && gameId != -1 && <AddGuest gameId={gameId} onAdded={onGuestAdded} />}
        {selectedActon != ActionType.None && gameId != -1 &&
        <AppButton label="Select Players" onClick={onSelectPlayers} /> }
    </div>;
}

interface GuestProps{
    gameId?:number,
    onAdded:(name:GamePlayer)=>void
}

function AddGuest(props:GuestProps) {
    const [guestName, setGuestName] = useState('');
    const textFieldRef = useRef<HTMLInputElement>(null);
    const onClick = async () =>{
        try {
            let playerId:number;
            if(guestName.trim() === '') {
                toast.error("Guest name cannot by empty");
                textFieldRef.current?.focus();
                return;
        }
        else playerId = await gameService.registerToGame({
            gameId:props.gameId as number,
            name:guestName
        });
        props.onAdded({playerId, name:guestName});
        toast.info("Data updated");
        setGuestName('');
        } catch (error) {
            
        }
        
    }
    return <div>
        <TextField
            label="Guest Name"
            placeholder="Enter name"
            value={guestName}
            InputLabelProps={{
                shrink: true,
            }}
            ref={textFieldRef}
            onChange={(event) =>  setGuestName(event.target.value)}
        />
        <Fab style={{ position: "absolute", right: "4%" }} size="small" onClick={onClick} color="primary">
    <Add />
</Fab>
    </div>
}

export default dialogConfig;