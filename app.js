const express = require('express');
const app = express();
const db = require('./server/db/db');
const cors = require('cors');

db.dbInit();

const userRoute = require('./server/routes/user');
const chatRoute = require('./server/routes/chat');


app.use(cors({
    origin: '*'
}));
app.use('/user', userRoute);
app.use('/chat', userRoute);
app.use('/setting', userRoute);

// app.use('/', (req, res, next) => {
//     res.status(200).json({
//         status: 'Success',
//         message: "Server is working!"
//     })
// });

module.exports = app;