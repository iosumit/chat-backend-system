const jwt = require("jsonwebtoken");
const { unauthorization_access } = require("./strings");
const { SERVER_SECRET } = require("../../env");
const async = require('async');

module.exports = function verifyToken(req, res, next) {
    let model = {};
    async.series([
        cb => {
            if (!req.headers) return cb(unauthorization_access)
            let token = req.headers.authorization;
            if (!token) return cb(unauthorization_access)

            token = token.split(' ');
            if (token.length != 2) return cb(unauthorization_access)

            jwt.verify(token[1], SERVER_SECRET, (err, res) => {
                if (err) return cb(unauthorization_access)

                model.user = res
                return cb()
            })
        }
    ], err => {
        if (err) {
            return res.status(403).json({
                message: err
            })
        } else {
            req.user = model.user;
            next()
        }
    })
}