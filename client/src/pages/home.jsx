import React, { useCallback, useState } from "react";
import { useSocket } from "../context/socketProvider.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [roomId, setRoomId] = useState("");

    const navigate = useNavigate();

    const socket = useSocket();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join', { name, email, roomId })
    }, [name, email, roomId, socket]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleRoomJoin = useCallback((data) => {
        const { name, email, roomId } = data;
        navigate(`/room/${roomId}`);
    }, [navigate]);

    useEffect(() => {
        if (!socket) return;
        socket.on('room:join', handleRoomJoin);

        // Cleanup to avoid duplicate listeners
        return () => {
            socket.off('room:join', handleRoomJoin);
        };
    }, [socket, handleRoomJoin]);


    return <div className="flex justify-center items-center h-screen">
        <div className="grid gap-2">
            <form>
                <label htmlFor="name">Name : </label>
                <input id="name"
                    className=" border-black border-2 rounded"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}></input>
                <br />
                <label htmlFor="email" >Email : </label>
                <input id="email"
                    className=" border-black border-2 rounded"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}></input>
                <br />
                <label htmlFor="roomid">Room ID : </label>
                <input id="roomid"
                    className=" border-black border-2 rounded"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => { setRoomId(e.target.value) }}></input>
                <br />
                <button type="submit" onClick={handleSubmitForm}>Enter Room</button>
            </form>
        </div >
    </div >
};

export default Home;