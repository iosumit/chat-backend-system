const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const err = require('./server/utils/error')
const bodyParser = require('body-parser')
const mongodb = require('./server/db/mongodb')
const { ERROR } = require('./server/utils/consts')

const userRoutes = require('./server/routes/userRoutes');
const chatRoutes = require('./server/routes/chatRoutes');
const channelRoutes = require('./server/routes/channelRoutes');


app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/user', userRoutes);
app.use('/channel', channelRoutes);
app.use('/chat', chatRoutes);
// app.use('/setting', userRoute);

app.use((req, res, next) => {
    const error = new err('Not found', 404);
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        status: ERROR,
        message: error.message
    })
})

module.exports = app;