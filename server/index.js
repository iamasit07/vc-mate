import express from 'express';
import { Server, Socket } from 'socket.io';
import bodyParser from 'body-parser';

const app = express();
const io = new Server();

app.use(bodyParser.json());

io.on("connection", (socket) => {

});

app.listen(8000, () => {
    console.log(`Server is listening to Port : 8000`);
});

io.listen(8001);