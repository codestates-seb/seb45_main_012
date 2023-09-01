import { createContext, useState, useEffect } from 'react';


export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [ session, setSession ] = useState();

    useEffect(() => {
        if (session) {
            localStorage.setItem("authToken", session.autoToken);
            localStorage.setItem("refreshToken", session.refreshToken);
        }
    }, [session]);

    useEffect(() => {
        const localStorageAuthToken = localStorage.getItem("authToken");
        const localStorageRefreshToken = localStorage.getItem("refreshToken");
    
        if ( localStorageAuthToken && localStorageRefreshToken ) {
            setSession({
                authToken: localStorageAuthToken,
                refreshToken: localStorageRefreshToken,
            });
        }
    }, []);

    return (
        <SessionContext.Provider
            value={{
                session,
                setSession
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}