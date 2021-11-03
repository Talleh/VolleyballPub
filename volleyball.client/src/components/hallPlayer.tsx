import { Typography } from '@material-ui/core';

import AppButton from './common/appButton';
import React from 'react';
import { FunctionComponent } from "react";
import hallPlayer from "../entities/hallPlayer";
import open from './dialogs/dialogComponent';
import accountOperationDialog from './dialogs/accountOperation';
import playerAccountService from '../services/playerAccountService';

import './css/hallPlayer.css';
import PlayerAccount from '../entities/playerAccount';
import { PlayerStatus } from '../entities/playerStatus';
export interface HallPlayer {
    entity: hallPlayer,
    onUpdate:(newEntity:hallPlayer) => void;
}

enum OperationType{
Supply,
Withdraw
}

const HallSubscriber: FunctionComponent<HallPlayer> = (props) => {
    const {picture, name, id:PlayerId } = props.entity.player;
    const { status } = props.entity;
    const {id:HallId} = props.entity.hall;
    const onStatusUpdate = async (newStatus:PlayerStatus) => {
        const updatedPlayer = {...props.entity};
        updatedPlayer.status = newStatus;
        props.onUpdate(updatedPlayer);
    }

    const accountOperation = async(action:OperationType) =>{
        var amount = await open(accountOperationDialog);
        if(!amount) return;
        amount = amount ?? 0;
        try {
            const account : PlayerAccount = {playerId:PlayerId, hallId:HallId, amount};
            
            if(action == OperationType.Supply)
            await playerAccountService.supply(account);
            else
            await playerAccountService.withdraw(account);
        } catch (error) {
            
        }
    }

    return <div className="hallPlayer">
        <div>
        <img src={picture}/>
        <Typography variant="h4" >
            {name}
        </Typography>
        </div>
        {status !== PlayerStatus.Blocked && <div className="actionConainer">
        <Typography variant="h5" className="child">
            Player Account Operations
        </Typography>
            <AppButton className="child" variant="contained" color="primary" onClick={() => accountOperation(OperationType.Supply)} label="Supply Account" />
            <AppButton className="child" variant="contained" color="primary" onClick={() => accountOperation(OperationType.Withdraw)} label="Withdraw from Account" />
        </div>}
        <div className="actionConainer">
        <Typography className="child" variant="h5" >
            Player Status
        </Typography>
            {status === PlayerStatus.SpecialGuest &&
            <AppButton className="child"
                    variant="contained"
                    color="primary"
                    label="Add to members"
                    onClick={() => onStatusUpdate(PlayerStatus.Member)} />}
            {status === PlayerStatus.Member &&
            <AppButton className="child"
                    variant="contained"
                    color="primary"
                    label="Remove from Members"
                    confirmationMessage="Are you sure you want to remove subscription?"
                    onClick={() => onStatusUpdate(PlayerStatus.SpecialGuest)} />}
            {status !== PlayerStatus.Blocked  &&
            <AppButton className="child"
                    variant="contained"
                    color="secondary"
                    label="Block"
                    confirmationMessage="Are you sure you want to block"
                    onClick={() => onStatusUpdate(PlayerStatus.Blocked)} />}
            {status === PlayerStatus.Blocked  &&
            <AppButton className="child"
                    variant="contained"
                    color="primary"
                    label="Unlock"
                    onClick={() => onStatusUpdate(PlayerStatus.SpecialGuest)}/>}
        </div>
    </div>;
}

export default HallSubscriber;