import React, { FunctionComponent } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { routers } from '../../constants';
import authService from '../../services/authService';
import AppButton from '../common/appButton';

const FacebookComponent: FunctionComponent = () => {
    const history = useHistory();
    const onClick = async (window: any) => {
        console.log(window.FB);
        window.FB.login(function(response: any){
            if(response.authResponse)
            onFbLogin(response.authResponse.accessToken);
        });
        
    const onFbLogin = async (fbAccessToken:string) =>{
        const auth = await authService.facebookLogin(fbAccessToken);
        if(auth)
        history.replace(routers.home);
        }
    }

    return <AppButton onClick={() => onClick(window)} label="Use Facebook" variant="contained" color="primary"/>;
}

export default FacebookComponent;