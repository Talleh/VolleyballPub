import { Button, ButtonProps } from '@material-ui/core';
import React from 'react';
import {Confirmation} from '../dialogs/confirmationDialog';

export interface AppButtonProps extends ButtonProps {
    label?:string,
    confirmationMessage?:string,
    onClick?:() => void
}

export default function AppButton(props:AppButtonProps){
    const {confirmationMessage, onClick, label} = props;
    const handleClick = async () => {
        const userHasConfirmed = confirmationMessage ? await Confirmation(confirmationMessage) : true;
        if(userHasConfirmed)
        onClick?.();
    }
return <Button {...props} onClick={handleClick}>{label}</Button>
}