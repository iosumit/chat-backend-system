// const async = require('async');
const db = require("../db/db");
const jwt = require('jsonwebtoken');
const env = require('../../env');
const async = require('async');

const userAuthenticateHandler = (input, next) => {
    var modelName = {};
    async.series([
        cb => {
            const userList = db.users.filter(u => u.pin === input.pin && u.username === input.username && u.active);
            if (userList.length > 0) {
                const usr = userList[0];
                const ujwt = { _id: usr._id, first_name: usr.first_name, last_name: usr.last_name, created_at: usr.created_at, username: usr.username };
                modelName.token = jwt.sign(ujwt, env.SERVER_SECRET, {
                    expiresIn: '7d'
                });
                modelName.user = ujwt;
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