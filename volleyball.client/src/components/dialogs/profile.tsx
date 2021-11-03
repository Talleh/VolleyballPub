import React, { useRef } from 'react';
import openDialog, {ContentComponentProps, DialogConfig, DialogResult} from './dialogComponent';
import updatePhoneNumberConfig from './updatePhoneNr';
import { TextField, Typography } from '@material-ui/core';
import Player from '../../entities/player';
import AppButton from '../common/appButton';
import playerService from '../../services/playerServices';
enum AccessType{
    Owner,
    Visitator
}

export interface ProfileDialogProps{
    accessType:AccessType,
    item:Player
}

function config(props:ProfileDialogProps):DialogConfig<ProfileDialogProps, any>{
     return {
         inputModel:props,
resolvedResult:() => Promise.resolve({succeeded:true, result:{}}),
Content:ProfileDialog,
CancelTitle:"Close"
}
}

function ProfileDialog(props:ContentComponentProps<ProfileDialogProps>) {
    const {name, id, picture, contactNumber} = props.model.item;
    const fileInput = useRef<HTMLInputElement>(null);

    const selectFile = () => {
        fileInput.current?.click();
    };

    const onPhoneUpdate = async () => {
        const newNumber = await openDialog(updatePhoneNumberConfig(props.model.item));
        if (newNumber) {
            props.onModalChange({item:{...props.model.item, contactNumber:newNumber}} as ProfileDialogProps);
        }
    };

    const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.item(0);
            if (file) {
                const picPath = await playerService.updateProfilePic(file);
                const player = {...props.model.item};
                player.picture = picPath;
                props.onModalChange({item:player} as ProfileDialogProps);
            }
        } catch (error) {

        }
    }
    
    return <div style={{display:'flex', flexDirection:"column", minWidth:250, minHeight:200, padding:20}}>
    <div style={{alignSelf:"center"}} >
    <img src={picture ?? require('../../assets/avatar.jpg')} className="avatar"/>
    <Typography>{name}</Typography>
    <Typography>{contactNumber}</Typography>
    </div>
    {props.model.accessType == AccessType.Owner &&
    <div style={{display:'flex', flexDirection:"column"}}>
        <AppButton variant="contained" color="primary"
                style={{ marginBottom: 15, marginTop: 15 }}
                onClick={selectFile} label="Update Profile Pic"/>
            <input type="file" accept="image, .jpg, .png" style={{ display: "none" }} ref={fileInput} onChange={onFileSelected} />
    <AppButton variant="contained" color="primary" label="Update Phone number" onClick={onPhoneUpdate}/>
    </div>}
    </div>
}

export default config;