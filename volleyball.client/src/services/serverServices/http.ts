import axios from 'axios';
import localStorageService from '../localStorageService';
import { localStorageKeys } from "../../constants";
axios.defaults.baseURL = 'https://localhost:44385/api';
axios.defaults.headers["Authorization"] = 'Bearer '+ localStorageService.getItem(localStorageKeys.token);
async function get<Result>(path: string): Promise<Result> {
    const { data } = await axios.get(path);
    return Promise.resolve(data);
}

async function _delete<Result>(path: string): Promise<Result> {
    const { data } = await axios.delete(path);
    return Promise.resolve(data);
}

async function post<Result>(path: string, body: any): Promise<Result> {
    const { data } = await axios.post(path, body);
    return Promise.resolve(data);
}

function updateAccessToken(token:string){
    axios.defaults.headers["Authorization"] = 'Bearer '+ token;
}

export default {
    get,
    post,
    updateAccessToken,
    _delete
}