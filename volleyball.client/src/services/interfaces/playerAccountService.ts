import PlayerAccount from '../../entities/playerAccount';
export default interface PlayerAccountService{
    supply(account:PlayerAccount) : Promise<any>,
    withdraw(account:PlayerAccount) : Promise<any>
}