import React, { useEffect, useCallback, useState } from "react";
import { useSocket } from "../context/socketProvider";

export const Room = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handlerUserJoined = useCallback(({ name, email, id }) => {
        console.log(`A new User joined with Name : ${name} and Email : ${email} `);
        setRemoteSocketId(id);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        setMyStream(stream);
    });

    useEffect(() => {
        if (!socket) return;
        socket.on('user:joined', handlerUserJoined);

        return () => {
            socket.off("user:joined", handlerUserJoined);
        }
    }, [socket, handlerUserJoined]);

    return (<>
        <div>
            <h1>Room Id</h1>
            {remoteSocketId ? <>
                <h4>Connected</h4>
                <button onClick={handleCallUser}>Call</button>
            </> : <>
                <h4>No one is present</h4>
            </>}
            {myStream && (
                <video
                    ref={(video) => {
                        if (video) video.srcObject = myStream;
                    }}
                    autoPlay
                    muted
                    style={{ width: '500px', height: '300px' }}
                />
            )}
        </div>
    </>)
};