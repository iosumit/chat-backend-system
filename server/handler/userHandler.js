const User = require('../model/user');
const async = require('async');
const authorization = require('../utils/authorization.token');
const mongoose = require('mongoose');
const { strings } = require('../utils/strings');

const userAuthenticateHandler = (input, next) => {
    var modelName = {};
    async.series([
        cb => {
            const query = { username: input.username, pin: input.pin, active: true, is_deleted: false }
            getObjectByQuery({ query }, (err, result) => {
                if (err || !result) { return cb(strings.unseccessful_attempt); }
                else {
                    const ujwt = { _id: result._id, first_name: result.first_name, last_name: result.last_name, created_at: result.created_at, username: result.username };
                    modelName.token = authorization.createToken(ujwt);
                    modelName.user = ujwt
                    return cb();
                }
            })
        },
    ], err => {
        if (err) {
            next(err)
        } else {
            next(null, modelName)
        }
    })
}

const createNewUser = (input, next) => {
    let modelName = {};
    async.series([
        cb => {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                first_name: input.first_name,
                last_name: input.last_name,
                username: input.username,
                pin: input.pin,
                phone: input.phone
            })

            user.save()
                .then(result => {
                    const ujwt = { _id: result._id, first_name: result.first_name, last_name: result.last_name, created_at: result.created_at, username: result.username };
                    modelName.token = authorization.createToken(ujwt);
                    modelName.user = ujwt
                    return cb()
                })
                .catch(err => {
                    if (err.code == 11000) {
                        return cb(strings.user_already_exist)
                    }
                    return cb(strings.unable_to_create_user_at_this_moment)
                })
        }
    ], err => {
        if (err) {
            next(err)
        } else {
            next(null, modelName)
        }
    })
}

const getUserInfo = (input, next) => {
    var modelName = {};
    async.series([
        cb => {
            const query = { _id: input._id, username: input.username, active: true, is_deleted: false }
            getObjectByQuery({ query }, (err, result) => {
                if (err || !result) { cb(strings.unauthorization_access); }
                else {
                    const user = {
                        _id: result._id,
                        first_name: result.first_name,
                        last_name: result.last_name,
                        username: result.username,
                        profile_image_url: result.profile_image_url,
                        created_at: result.created_at,
                        updated_at: result.updated_at,
                    };
                    modelName.user = user
                    return cb();
                }
            })
        },
    ], err => {
        if (err) {
            next(err)
        } else {
            next(null, modelName)
        }
    })
}

function getObjectByQuery(filters, next) {
    User.findOne(filters.query)
        .select(filters.selectFrom ? filters.selectFrom : {})
        .lean()
        .then((result) => next(null, result))
        .catch((err) => next(err));
}

module.exports = {
    userAuthenticateHandler, createNewUser, getUserInfo
}