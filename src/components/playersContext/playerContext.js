import React from "react";
import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
    
const [howManyPlayers, setHowManyPlayers ] = useState(2);

const setMultiplayer = (number) => {
    setHowManyPlayers(number)
}
 return (
    <PlayerContext.Provider value={{howManyPlayers, setMultiplayer}}>
        {children}
    </PlayerContext.Provider>
 )
}