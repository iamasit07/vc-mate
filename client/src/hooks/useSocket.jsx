import React from "react";
import { SocketContext } from "../context/socketProvider";

export const useSocket = () => React.useContext(SocketContext);