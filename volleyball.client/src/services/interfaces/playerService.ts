import Player from "../../entities/player";

export default interface PlayerService{
    getPlayerId():number,
    get():Promise<Player>,
    updateProfile(player:Player):Promise<unknown>,
    updateProfilePic(picData: any): Promise<string>,
    registerToMembership(hallId: number): Promise<void>
}