import React, { FunctionComponent } from 'react';
import GamePlayer from '../entities/gamePlayer';
import Player from '../entities/player';
import './css/playerItemComponent.css';

export interface PlayerItemComponentProps {
    item: GamePlayer,
    onItemClick: (id: number) => void;
}

const PlayerItemComponent: FunctionComponent<PlayerItemComponentProps> = (props) => {
    const { name, playerId } = props.item;
    const picture = props.item.picture ?? require('../assets/avatar.jpg');
    const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        props.onItemClick(playerId as number);
    };

    return <div className="playerItemComponentContainer" onClick={onClick}>
        <img src={picture} className="avatar" />
        <div style={{ textAlign: "center" }}>{name}</div>
    </div>;
}

export default PlayerItemComponent;