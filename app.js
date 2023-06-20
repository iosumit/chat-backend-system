const express = require('express');
const restApp = express();
const cors = require('cors');
const morgan = require('morgan');
const err = require('./server/utils/error')
const bodyParser = require('body-parser')
const mongodb = require('./server/db/mongodb')
const { ERROR } = require('./server/utils/consts')

const userRoutes = require('./server/routes/userRoutes');
const chatRoutes = require('./server/routes/chatRoutes');
const channelRoutes = require('./server/routes/channelRoutes');
const { verifyToken } = require('./server/utils/authorization.token');

const messageHandler = require('./server/handler/messageHandler')

//--------REST API-----------//
restApp.use(cors({
    origin: '*'
}));
restApp.use(bodyParser.urlencoded({ extended: false }))
restApp.use(bodyParser.json())
restApp.use(morgan('dev'))

restApp.use('/user', userRoutes);
restApp.use('/channel', channelRoutes);
restApp.use('/chat', chatRoutes);
// restApp.use('/setting', userRoute);

restApp.use((req, res, next) => {
    const error = new err('Not found', 404);
    next(error);
})
restApp.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        status: ERROR,
        message: error.message
    })
})
// --------!REST API-----------//
// --------Web Socket-----------//
const onSocketConnection = (socket) => {
    socket.on("message:send", messageHandler.socketMessageSend);
    socket.on("message:delete", messageHandler.socketMessageDelete);
    socket.on("message:update", messageHandler.socketMessageUpdate);

    socket.on("channel:block", () => { });
    socket.on("channel:unblock", () => { });
    socket.on("channel:update", () => { });
    socket.on("channel:new", () => { });

    socket.on("user:update", () => { });
    socket.on("user:delete", () => { });
    // User Connected

}
// --------!Web Socket-----------//


module.exports = { restApp, onSocketConnection };