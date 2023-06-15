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
    console.log('a user connected');
    // console.log(socket.id)
    // console.log(socket.data.use)
    // console.log(socket.request)
    verifyToken(socket.handshake.auth.token, (err, result) => {
        if (err) {
            console.log("Not Verified")
            socket.disconnect()
        }
        else
            console.log("Verified User")
    })

    socket.on("chat", (arg) => {
        console.log(arg)
    })
}

// --------!Web Socket-----------//


module.exports = { restApp, onSocketConnection };