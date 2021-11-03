import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, Router } from 'react-router-dom';
import gameService from '../services/gameService';
import GameItemComponent from './gameItemComponent';
import Game from '../entities/game';
import { routers } from '../constants';
import { MenuItem, Select, Table, TableBody, TableContainer, TextField, Typography } from '@material-ui/core';
import Hall from '../entities/hall';
import hallService from '../services/hallService';
import AppButton from './common/appButton';
import PaginationModel from '../models/paginationModel';
import UserContext from '../context/userContext';
import GamePlayerContext, { ActionType } from '../context/gamePlayersContext';
import GamePlayer from '../entities/gamePlayer';
import { SelectPlayersProps } from './dialogs/selectGamePlayers';


const GamesComponent: FunctionComponent<RouteComponentProps> = (props) => {
    const [games, setGames] = useState([] as Game[]);
    const userContext = useContext(UserContext);
    const [hasMoreToLoad, setHasMoreToLoad] = useState(false);
    const [halls, setHalls] = useState([] as Hall[]);
    const [pageModel, setPageModel] = useState({page:1, pageSize:20} as PaginationModel);
    const [selectedDate, setSelectedDate] = useState({} as Date);
    const [hallId, setHallId] = useState(-1);
    const loadGames = async () => {
        try {
            const result = await gameService.getPaginated(pageModel);
            setHasMoreToLoad(result.hasMore);
            setGames(result.items);
        } catch (error) {

        }
    };

    const loadHalls = async() => {
        try {
            const _halls = await hallService.getAvailable();
            setHalls(_halls);
        } catch (error) {
            
        }
    }
    
    const loadMore = () =>{
        pageModel.page += 1;
    }

    const fetch = async() =>{
        await loadGames();
        await loadHalls();
    }

    useEffect(() => {
        fetch();
    }, []);
    const onGameClick = (id: number | undefined) => {
        props.history.push(`${routers.games}/${id}`);
    };

    const updatePlayersGameList = (props:SelectPlayersProps) => {
        const game = games.find(x => x.id == props.gameId);
        console.log(halls);
        if(game){
            console.log("found game");
        }
    }
    return <div style={{ display: "flex", width: "90%", height: "90%", flexDirection:"column" }}>
         {halls.length > 0 &&
         <div style={{ display: "flex", marginTop:20, flexDirection:"row",
        alignSelf:"center", alignItems:"center", justifyContent:"center", backgroundColor:"Highlight"}}>
            <Typography>
            Select games in hall
        </Typography>
        <Select
        value={hallId}
        onChange={(e) => setHallId(e.target.value as number)}
        style={{paddingLeft:40}}
        >
            <MenuItem value="-1">{"All Halls"}</MenuItem>
            {halls.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
        </Select>
        <Typography>
            Select games by date
        </Typography>
        <TextField 
        type="date"
        defaultValue={selectedDate}
        onChange = {async (e) => {
            setSelectedDate(new Date(e.target.value));
            const _pageModel:PaginationModel = {page:1, pageSize:20, filterCriterias:[...pageModel.filterCriterias ?? [], {
                field:'date',
                value:e.target.value
            }]}
            setPageModel(_pageModel);
            await loadGames();}}
        />

        {userContext.currentPlayer?.administrateHalls && <div>
        <AppButton label="Create Game" />
        </div>}

        </div>}
        {halls.length > 0 && <TableContainer>
            <Table>
                <TableBody>
                    {games.filter(x => (hallId != -1 && x.hall.id === hallId) || (hallId == -1 && x.hall.id !== undefined)).map(g => <GameItemComponent item={g} key={g.id} onItemClick={onGameClick} onPlayerClick={() => { console.log("player item clicked") }} />)}
                </TableBody>
            </Table>
        </TableContainer>}
        {hasMoreToLoad && <AppButton label="Load more" variant="text" color="secondary" onClick={loadMore}/>}
        {halls.length == 0 && <Typography style={{alignSelf:"center", marginTop:40, width:"100%"}} variant="h4"> No Available halls </Typography>}
    </div>;
}

export default GamesComponent;