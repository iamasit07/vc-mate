import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client"

const SocketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

export const SocketProvide = (props) => {
    const socket = useMemo(() => io("http://localhost:8000"), []);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
};