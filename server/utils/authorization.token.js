const jwt = require("jsonwebtoken");
const { strings } = require("./strings");
const { CONFIG } = require("../../env");
const async = require('async');

function verifyToken(req, res, next) {
    let model = {};
    async.series([
        cb => {
            if (!req.headers) return cb(strings.unauthorization_access)
            let token = req.headers.authorization;
            if (!token) return cb(strings.unauthorization_access)

            token = token.split(' ');
            if (token.length != 2) return cb(strings.unauthorization_access)

            jwt.verify(token[1], CONFIG.SERVER_AUTH_TOKEN_SECRET, (err, res) => {
                if (err) return cb(strings.unauthorization_access)

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
const createToken = (user) => jwt.sign(user, CONFIG.SERVER_AUTH_TOKEN_SECRET, {
    expiresIn: '7d'
})
module.exports = { verifyToken, createToken }