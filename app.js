const express = require('express');
const restApp = express();
const cors = require('cors');
const morgan = require('morgan');
const err = require('./server/utils/error')
const bodyParser = require('body-parser')
const mongodb = require('./server/db/mongodb')
const { ERROR } = require('./server/utils/consts')

const userRoutes = require('./server/routes/userRoutes');
const channelRoutes = require('./server/routes/channelRoutes');
const messageRoutes = require('./server/routes/messageRoutes');
const socketRoutes = require('./server/routes/socketRoute');

//--------REST API-----------//
restApp.use(cors({
    origin: '*'
}));
restApp.use(bodyParser.urlencoded({ extended: false }))
restApp.use(bodyParser.json())
restApp.use(morgan('dev'))

restApp.use('/user', userRoutes);
restApp.use('/channel', channelRoutes);
restApp.use('/message', messageRoutes);

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

const onSocketConnection = socketRoutes

module.exports = { restApp, onSocketConnection };