import React from 'react';
import Player from '../entities/player';
export interface UserContextValue {
    token: string | null;
    currentPlayer:Player | null;
    updatePlayer:(newPlayer:Player|null) => void;
    updateToken: (newToken: string) => void;
}
const UserContext = React.createContext({} as UserContextValue);
UserContext.displayName = "UserContext";

export default UserContext;