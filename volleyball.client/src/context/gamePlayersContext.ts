import GamePlayer from '../entities/gamePlayer';
import React, { createContext } from 'react';

export enum ActionType{
    None,
    Add,
    Remove
}
export interface GamePlayerContex{
    updatePlayersGameList:(gameId:number, playersList:GamePlayer[], action:ActionType)=> void
}

const context = createContext({} as GamePlayerContex);

export default context;