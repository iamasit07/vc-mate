import { Server } from 'socket.io';

const io = new Server(8000, {
    cors: true
});

const emailToSocketMapping = new Map();
const socketIdToEmailMapping = new Map();

io.on("connection", (socket) => {
    console.log("Connection Success", socket.id);
    socket.on("room:join", (data) => {
        const { name, email, roomId } = data;

        emailToSocketMapping.set(email, socket.id);
        socketIdToEmailMapping.set(socket.id, email);

        io.to(roomId).emit('user:joined', { name, email, id: socket.id })

        socket.join(roomId);
        io.to(socket.id).emit('room:join', data);
    });
});