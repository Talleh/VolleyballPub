import http from "./http";
import AuthService from '../interfaces/authService';
import AuthResult from '../../models/authResult';
import localStorageService from "../localStorageService";
import RegistrationModel from "../../models/registrationModel";
import { localStorageKeys } from "../../constants";
const basepath = "account/";

async function facebookLogin(accessToken:string) : Promise<boolean>{
    var authResult = await http.get<AuthResult>(basepath + `login/external?accessToken=${accessToken}`);
    storeToken(authResult);
    return authResult.succeeded;
}

async function emailRegistration(model:RegistrationModel) {
    return emailAuth(model, 'register');
}

function logout(){
    localStorageService.removeItem(localStorageKeys.token);
    localStorageService.removeItem(localStorageKeys.playerId);
    http.updateAccessToken('');
}

async function emailLogin(model:RegistrationModel) {
    return emailAuth(model, 'login');
}

async function emailAuth(model:RegistrationModel, path:string) {
    var auth = await http.post<AuthResult>(basepath + path, model);
    storeToken(auth);
    return auth;
}

function storeToken(auth:AuthResult){
    if(auth.succeeded){
        localStorageService.setItem(localStorageKeys.playerId, auth.id);
        localStorageService.setItem(localStorageKeys.token, auth.accessToken);
        http.updateAccessToken(auth.accessToken);
    }
}
const authImplemtation:AuthService = {
    facebookLogin, emailRegistration, emailLogin, logout
}
export default authImplemtation;