import React, { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Player from '../entities/player';
import { Button } from '@material-ui/core';
import playerService from '../services/playerServices';
import updatePhoneNumberConfig from './dialogs/updatePhoneNr';
import openDialog from './dialogs/dialogComponent';
import Hall from "../entities/hall";
import UserContext from "../context/userContext";

const ProfileComponent: FunctionComponent<RouteComponentProps> = (props) => {
    const context = useContext(UserContext);
    const [player, setPlayer] = useState(context.currentPlayer as Player);

    const fileInput = useRef<HTMLInputElement>(null);

    const selectFile = () => {
        fileInput.current?.click();
    };

    const loadProfile = async() =>{
        if(context.currentPlayer && context.currentPlayer.id)
        {
            return;
        }
        const _player = await playerService.get();
        context.updatePlayer(_player);
    }

    useEffect(() => {
        loadProfile()
    }, []);

    const onPhoneUpdate = async () => {
        const newNumber = await openDialog(updatePhoneNumberConfig(player));
        if (newNumber) {
            setPlayer({...player, contactNumber:newNumber});
        }
    };

    const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.item(0);
            if (file) {
                const data = new FormData();
                data.append('myFile', file, file.name);
                const picPath = await playerService.updateProfilePic(file);
                const _player = { ...player };
                _player.picture = picPath;
                setPlayer(_player);
            }
        } catch (error) {

        }
    }

    return <div style={{ flex: 1, display: "flex", width: "50%", justifyContent: "space-between", alignItems: "flex-start", marginTop: 40 }}>
        <div style={{ flex: 0.2, display: "flex", flexDirection: "column" }}>
            <img src={player.picture ?? require('../assets/avatar.jpg')}
                style={{ borderRadius: "50%", marginBottom: 15 }} />
            <div>{player.name}</div>
            <div style={{ marginTop: 15 }}>{player.contactNumber}</div>
            <Button variant="contained" color="primary"
                style={{ marginBottom: 15, marginTop: 15 }}
                onClick={selectFile}>Update Image</Button>
            <input type="file" accept="image, .jpg, .png" style={{ display: "none" }} ref={fileInput} onChange={onFileSelected} />
            <Button variant="contained" color="primary" onClick={onPhoneUpdate}>Update contact number</Button>
        </div>
        <div style={{ flex: 0.7 }}>
            <div>
            <Button variant="contained" color="primary" onClick={onPhoneUpdate}>Register to hall by code</Button>
            </div>
        </div>
    </div>;
}

export default ProfileComponent;