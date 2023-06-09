const express = require('express');
const app = express();
const db = require('./server/db/db');
const cors = require('cors');
const morgan = require('morgan');
const err = require('./server/utils/error')
const bodyParser = require('body-parser')


db.dbInit();

const userRoute = require('./server/routes/user');
const chatRoute = require('./server/routes/chat');


app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/user', userRoute);
app.use('/chat', userRoute);
app.use('/setting', userRoute);

app.use((req, res, next) => {
    const error = new err('Not found', 404);
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    })
})

// app.use('/', (req, res, next) => {
//     res.status(200).json({
//         status: 'Success',
//         message: "Server is working!"
//     })
// });

module.exports = app;