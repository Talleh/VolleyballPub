import AuthService from '../interfaces/authService';
import AuthResult from '../../models/authResult';
import localStorageService from "../localStorageService";
import RegistrationModel from "../../models/registrationModel";
import { localStorageKeys } from "../../constants";

async function facebookLogin(accessToken:string) : Promise<boolean>{
    return Promise.resolve(true);
}

async function emailRegistration(model:RegistrationModel) {
    return Promise.resolve(storeToken({id:"1", accessToken:"blalbla", succeeded:true, error:''}));
}

function logout(){
}

async function emailLogin(model:RegistrationModel) {
    return Promise.resolve(storeToken({id:"1", accessToken:"blalbla", succeeded:true, error:''}));
}

function storeToken(auth:AuthResult){
    if(auth.succeeded){
        localStorageService.setItem(localStorageKeys.playerId, auth.id);
        localStorageService.setItem(localStorageKeys.token, auth.accessToken);
    }
    return auth;
}
const authImplemtation:AuthService = {
    facebookLogin, emailRegistration, emailLogin, logout
}
export default authImplemtation;