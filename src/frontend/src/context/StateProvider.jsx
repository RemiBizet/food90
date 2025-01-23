import React, {createContext,useContext,useReducer} from "react";

/* Creating and providing context for App */

export const StateContext = createContext();

export const StateProvider = ({reducer,initialState,children}) =>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext)