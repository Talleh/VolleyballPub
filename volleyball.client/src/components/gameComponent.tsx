import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from '@material-ui/core';
import gameService from '../services/gameService';
import Game from '../entities/game';
import GameBodyCompoent from './gameBodyComponent';
import strings from '../services/localizationService';
import './css/gameComponent.css';
import playerService from '../services/playerServices';
import Player from '../entities/player';
import { toast } from 'react-toastify';
import { routers } from '../constants';
import UserContext from '../context/userContext';

const GameComponent: FunctionComponent<RouteComponentProps> = (props) => {
    const { id } = props.match.params as any;
    const userContext = useContext(UserContext);
    const [game, setGame] = useState({} as Game);
    const [tax, setTax] = useState(0);
    const [canRegister, setCanRegister] = useState(false);
    const [canUnregister, setCanUnregister] = useState(false);
    const [address, setAddress] = useState('');
    const [administrator, setAdministrator] = useState({} as Player);

    const loadGame = async () => {
        try {
            const _game = await gameService.getGame(id);
            if(!_game) props.history.replace(routers.notFound);

            const _tax = await gameService.getTax(id);
            const _canUnregister = _game.allPlayers?.find(p => p.playerId == playerService.getPlayerId()) !== undefined;
            const _canRegiterToGame = !_canUnregister && await gameService.canRegister(id);
            console.log(_game.allPlayers);

            setCanRegister(_canRegiterToGame);
            setAddress(_game.hall.address);
            setAdministrator(_game.hall.administrator);
            setCanUnregister(_canUnregister);
            setTax(_tax);
            setGame(_game);

        } catch (error) {
            props.history.goBack();
        }
    };
    useEffect(() => {
        loadGame();
    }, []);
    const onPlayerClick = (id: number) => {
        props.history.push(`${routers.player}${id}`);
    };

    const unregister = async () => {
        try {
            const playerId = playerService.getPlayerId();
            await gameService.unregisterFromGame({
                gameId: id as number,
                playerId:playerService.getPlayerId()
            });
            const _game = { ...game };
            const _players = _game.allPlayers?.filter(p => p.playerId !== playerId);
            _game.allPlayers = _players;
            
            setGame(_game);
            setCanRegister(true);
            setCanUnregister(false);
        } catch (error) {

        }
    };

    const registerPlayerToGame = async () => {
        try {
            await gameService.registerToGame({
                gameId: id as number,
                playerId:playerService.getPlayerId()
            });
            const _game = { ...game };
            const players = _game.allPlayers ?? [];
            players.push({
                playerId:playerService.getPlayerId(),
                name:userContext.currentPlayer?.name as string,
                picture:userContext.currentPlayer?.picture
            });
            _game.allPlayers = players;
            setGame(_game);
            setCanRegister(false);
            setCanUnregister(true);
        } catch (error: any) {
            if (error.code === 403) {
                toast.error('Nu va puteti inregistra la joci in aceasta sala');
                setCanRegister(false);
                setCanUnregister(false);
            }
            if (error.code === 402) {
                toast.error('Lista este plina pentru acest joc');
                setCanRegister(false);
                setCanUnregister(false);
            }
        }
    };

    return <div style={{ display: "flex", width: "90%" }}>
        {game.id && <div className="gameItemContainer">
            <div className="buttonsContainer">
                {canRegister && <Button variant="contained"
                    color="primary"
                    className="button"
                    onClick={registerPlayerToGame}>{strings.RegisterToGame}</Button>}
                {canUnregister && <Button variant="contained"
                    color="primary"
                    className="button"
                    onClick={unregister}>{strings.Unregister}</Button>}
            </div>
            <GameBodyCompoent item={game} onPlayerClick={onPlayerClick} />
            <div>{tax == 0 ? "This game is free" : `${strings.Taxs} ${tax} MDL`}</div>
            <div>{strings.Location} {address}</div>
            <div>{strings.Administrator} {administrator.name}</div>
            <div>{strings.ForQuestion} {administrator.contactNumber}</div>
        </div>}
    </div>;
}

export default GameComponent;