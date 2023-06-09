// const async = require('async');
const users = require("../db/db");
const jwt = require('jsonwebtoken');
const env = require('../../env');
const async = require('async');

const userAuthenticateHandler = (input, next) => {
    var modelName = {};
    async.series([
        cb => {
            const userList = users.filter(u => u.pin === '1111' && u.username === 'chat.io' && u.active);
            if (userList.length > 0) {
                modelName.user = userList[0];
                const ujwt = { _id: modelName._id, first_name: modelName.first_name, last_name: modelName.last_name, created_at: modelName.created_at };
                modelName.token = jwt.sign(ujwt, env.SERVER_SECRET);
                return cb();
            } else {
                return cb("Unsuccessful Attempt!");
            }
        },
    ], err => {
        if (err) {
            next(err)
        } else {
            next(null, modelName)
        }
    })
}

module.exports = {
    userAuthenticateHandler
}