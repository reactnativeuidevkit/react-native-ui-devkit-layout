import React, { useState, createContext } from 'react';

const defaultGlobal = {
    dark: null
}

export const GlobalContext = createContext({
    global: defaultGlobal,
    setGlobal: () => { }
});

export const GlobalContextProvider = ({ children }) => {
    const [global, setGlobal] = useState(defaultGlobal);
    const setGlobalContext = (global) => { setGlobal(global); }

    return (
        <GlobalContext.Provider
            value={{
                global,
                setGlobal: setGlobalContext
            }}>
            {children}
        </GlobalContext.Provider>
    );
};