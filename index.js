require('dotenv').config()
console.log(process.env)
const http = require('http');
const app = require('./app.js');
const { Server } = require('socket.io');
const { verifyToken } = require('./server/utils/authorization.token.js');
const socketInstant = require('./server/cache/socket.user.instance.js');
const { strings } = require('./server/utils/strings.js');

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
            next(new Error(strings.unauthorization_access));
            return socket.disconnect()
        }
        console.log("User connected", result._id)
        socket.user = result;
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