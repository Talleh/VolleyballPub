import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import localizationService from '../services/localizationService';
import { localStorageKeys, routers } from '../constants';
import LocalizationComponent from './localizationComponent';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppButton from './common/appButton';
import Register from './dialogs/register';
import manageGamesPlayerDialog from './dialogs/addPlayerToGame';
import profileDialog, { ProfileDialogProps } from './dialogs/profile';
import Login from './dialogs/login';
import open from './dialogs/dialogComponent';
import authService from '../services/authService';
import UserContext from '../context/userContext';
import playerServices from '../services/playerServices';

const NavigationBar: FunctionComponent = () => {
    const history = useHistory();
    const userContext = useContext(UserContext);
    const tabs = [
        { tabValue: 0, label: localizationService.Games, path: routers.games }
    ];
    if(userContext.token){
        tabs.push(
            { tabValue: 1, label: localizationService.MyHalls, path: routers.clubs });
    }
    
    const loadPlayerInfo = async() =>{
        try {
            if(userContext.token)
            {
                const player = await playerServices.get();
                userContext.updatePlayer(player);
            }
        } catch (error) {
            
        }
    }

    useEffect(() =>{
        loadPlayerInfo()
    },[]);

    const [value, setValue] = useState(tabs.findIndex((t) => history.location.pathname.match(t.path)));
    const onTabClick = async (path: string) => {
        history.replace(path);
    };
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    const profileClick = async () =>{
        await open(profileDialog({accessType:0, item:userContext.currentPlayer} as ProfileDialogProps));
    }
    const addPlayerToGame = async () =>{
        await open(manageGamesPlayerDialog);
    }

    const logout = () =>{
        authService.logout();
        userContext.updateToken('');
        userContext.updatePlayer(null);
        history.replace(routers.home);
    }

    const register = async() => {
        const token = await open(Register);
        if(token){
            userContext.updateToken(token);
            const player = await playerServices.get();
            userContext.updatePlayer(player);
            history.replace(routers.home);
        }
    }

    const login = async () =>{
        const result = await open(Login);
        if(result){
            userContext.updateToken(localStorage.getItem(localStorageKeys.token) ?? '');
            var player = await playerServices.get();
            userContext.updatePlayer(player);
            history.replace(routers.home);
        }
    }

    return <AppBar >
        <Tabs
            aria-label="nav tabs"
            value={value}
            onChange={handleTabChange}
        >
            
            {tabs.map(t => <Tab key={t.path} value={t.tabValue} label={t.label} onClick={() => onTabClick(t.path)} />)}
            {userContext.token && userContext.currentPlayer?.administrateHalls && <AppButton label={"Manage players game"} variant="text" style={{color:"white"}} onClick={addPlayerToGame}/>}
            <span style={{ flex: 1 }} />
            {userContext.token &&   <AppButton label={localizationService.Home} style={{marginRight:20, color:"ActiveBorder"}}
                       onClick={profileClick}/>}
            {userContext.token && <AppButton label="Logout" style={{marginRight:20, color:"ActiveBorder"}}
                       onClick={logout}
                       confirmationMessage={"Are you sure you want to logout?"}/>}
                       <div>
                    {!userContext.token &&   <AppButton label="Register" style={{marginRight:20, color:"ActiveBorder"}}
                       onClick={register}/>}
                       { !userContext.token && <AppButton label="Log in" style={{marginRight:20, color:"ActiveBorder"}}
                       onClick={login}/>}
                       </div>
            <LocalizationComponent />
        </Tabs>
    </AppBar >;
}

export default NavigationBar;