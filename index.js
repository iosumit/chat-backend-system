const http = require('http');
const app = require('./app.js');
const { Server } = require('socket.io');
const { verifyToken } = require('./server/utils/authorization.token.js');

const server = http.createServer(app.restApp);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
});

io.on('connection', app.onSocketConnection);

const port = process.env.port || 8300;
server.listen(port);