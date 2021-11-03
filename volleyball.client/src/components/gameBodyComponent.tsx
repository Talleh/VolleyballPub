import React, { FunctionComponent } from "react";
import Game from '../entities/game';
import PlayboardComponent from './playboardComponent';
import PlayerItemComponent from './playerItemComponent';
import './css/gameItemComponent.css';
import strings from '../services/localizationService';

export interface GameBodyComponentProps {
    item: Game
    onPlayerClick: (id: number) => void;
    onItemClick?: (id: number) => void;
}

const GameBodyComponent: FunctionComponent<GameBodyComponentProps> = (props) => {
    const { agenda, id, allPlayers } = props.item;
    const cover = require(`../assets/game_${((id ?? 1) % 5 + 1)}.jpg`);
    const playerCount = allPlayers?.length ?? 0;
    const date = new Date(props.item.date);
    return <div className="bodyContainer">
        <img src={cover} className="gameCover" onClick={(event: any) => props.onItemClick?.(id)} />
        <div className="timeContainer">
            <div>{strings.Day} {date.toLocaleDateString("ro")}</div>
            <div>{strings.StartAt} {agenda.start}</div>
            <div>{strings.EndAt} {agenda.end}</div>
        </div>
        <div className="playerItemContainer">
            {allPlayers?.map(p => <PlayerItemComponent key={p.id} item={p} onItemClick={props.onPlayerClick} />) ?? <div>{strings.NoPlayerYet}</div>}
        </div>
        <PlayboardComponent numberOfPlayers={playerCount} />
    </div>;
}

export default GameBodyComponent;