import React, { FunctionComponent } from 'react';
import './css/gameItemComponent.css';
import GameBodyComponent, { GameBodyComponentProps } from './gameBodyComponent';

const GameItemComponent: FunctionComponent<GameBodyComponentProps> = (props) => {
    const { name: hallHame } = props.item.hall;
    return <div className="gameItemContainer">
        <div className="headerContainer">{hallHame}</div>
        <GameBodyComponent {...props} />
    </div>;
}

export default GameItemComponent;