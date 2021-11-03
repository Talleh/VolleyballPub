import PlayerAccount from '../../entities/playerAccount';
import http from './http';
import PlayerAccountService from '../interfaces/playerAccountService';

const base = 'playerAccount/';
function supply(account:PlayerAccount) : Promise<any> {
    return http.post(`${base}supply`, account);
}

function withdraw(account:PlayerAccount) : Promise<any> {
    return http.post(`${base}withdraw`, account);
}

const playerAccountService:PlayerAccountService = { supply, withdraw}
export default playerAccountService;