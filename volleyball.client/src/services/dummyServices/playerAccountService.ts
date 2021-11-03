import PlayerAccountService from '../interfaces/playerAccountService';
function supply() : Promise<any> {
    return Promise.resolve();
}

function withdraw() : Promise<any> {
    return Promise.resolve();
}

const playerAccountService:PlayerAccountService = { supply, withdraw}
export default playerAccountService;