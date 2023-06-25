const http = require('http');
const app = require('./app.js');
const { Server } = require('socket.io');
const { verifyToken } = require('./server/utils/authorization.token.js');
const socketInstant = require('./server/db/user.socket.instance.js');

const server = http.createServer(app.restApp);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
});

io.use((socket, next) => {
    verifyToken(socket.handshake.auth.token, (err, result) => {
        if (err) {
            next(new Error("Unauthorised User"));
            return socket.disconnect()
        }
        socketInstant.setSocketInstance(result._id, socket);
        socket.on("disconnect", (reason) => {
            socketInstant.removeSocketInstance(result._id);
        });
        next();
    });
});

io.on('connection', app.onSocketConnection);

const port = process.env.PORT || 8300;
server.listen(port, () => console.log(`Running on port ${port}`));