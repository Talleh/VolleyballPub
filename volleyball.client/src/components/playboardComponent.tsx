import React, { FunctionComponent } from "react";
import './css/playboard.css';
import strings from '../services/localizationService';

export interface PlayboardProps {
    numberOfPlayers: number;
}

interface PlayerProps {
    active: boolean;
    key: number;
}

interface BoardRow {
    players: PlayerProps[];
}

const PlayboardComponent: FunctionComponent<PlayboardProps> = (props) => {
    const numberOfPlayers = props.numberOfPlayers;

    return (
        <div className="container">
            <img src={require("../assets/volleyball.jpg")} />
            <div className="playSurface">
                <Row
                    players={[
                        { key: 1, active: numberOfPlayers > 8 },
                        {
                            key: 2,
                            active: numberOfPlayers > 2,
                        },
                        { key: 3, active: false },
                        { key: 4, active: false },
                        {
                            key: 5,
                            active: numberOfPlayers > 3,
                        },
                        { key: 6, active: numberOfPlayers > 9 },
                    ]}
                />
                <Row
                    players={[
                        {
                            key: 1,
                            active:
                                numberOfPlayers > 6 &&
                                numberOfPlayers !== 9 &&
                                numberOfPlayers !== 10,
                        },
                        { key: 2, active: false },
                        {
                            key: 3,
                            active: numberOfPlayers !== 3 && numberOfPlayers !== 4 && numberOfPlayers > 0,
                        },
                        {
                            key: 4,
                            active:
                                numberOfPlayers > 1 &&
                                numberOfPlayers !== 4 &&
                                numberOfPlayers !== 5,
                        },
                        { key: 5, active: false },
                        {
                            key: 6,
                            active:
                                numberOfPlayers > 7 &&
                                numberOfPlayers !== 10 &&
                                numberOfPlayers !== 11,
                        },
                    ]}
                />
                <Row
                    players={[
                        { key: 1, active: numberOfPlayers > 8 },
                        {
                            key: 2,
                            active: numberOfPlayers > 2,
                        },
                        { key: 3, active: false },
                        { key: 4, active: false },
                        {
                            key: 5,
                            active: numberOfPlayers > 3,
                        },
                        { key: 6, active: numberOfPlayers > 9 },
                    ]}
                />
                <div style={{ flex: 1 }}>
                    <div>{numberOfPlayers <= 12 ? numberOfPlayers : strings.Extra}</div>
                </div>
            </div>
        </div>
    );
};

const Row: FunctionComponent<BoardRow> = (props) => {
    return (
        <div className="playerRow">
            {props.players.map((p) => (
                <div
                    key={p.key}
                    className={p.active ? "player playerActive" : "player"}
                />
            ))}
        </div>
    );
};

export default PlayboardComponent;