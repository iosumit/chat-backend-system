const async = require('async');
const { makeUsername } = require("../utils/shared.module");
const MessageHelper = require('../helper/message.helper');
const ChannelHelper = require('../helper/channel.helper');
const ObjectId = require('mongodb').ObjectId;
const _ = require("lodash");
const channelMap = require('../cache/channel.users.map')
const socketInstances = require("../cache/socket.user.instance");
const { strings } = require('../utils/strings');

const socketMessageSend = function (users, message, next) {
    console.log("Send", message);
    for (const u of users) {
        socketInstances.getSocketInstance(u)?.emit(message);
    }
    next()
};

const socketMessageDelete = function (input) {
    console.log("Delete", input);
};
const socketMessageUpdate = function (input) {
    console.log("Update", input);
};

const newMessage = (input, next) => {
    let response = {};
    let users = [];
    async.series([
        cb => {
            // Message Add to DB
            MessageHelper.addObject(input).then(res => {
                response = res;
                return cb()
            }).catch(err => cb(err));
        },
        cb => {
            // Get Users From Cache | DB
            if (channelMap.isExist(input.channel_id)) {
                users = channelMap.getUsers(input.channel_id);
                cb()
            } else {
                // Get All the Users of current channel and Add to cache
                ChannelHelper.getObjectById({ _id: input.channel_id }).then(res => {
                    if (!res) return cb(strings.channel_not_found)
                    users = res.participated_users;
                    channelMap.setUsers(input.channel_id, users);
                    return cb()
                }).catch(err => cb(err));
            }
        },
        cb => {
            // Send to all Users
            socketMessageSend(users, response, (err, result) => {
                if (err) cb(err)
                cb()
            })
        },
    ], err => {
        if (err) {
            next(err)
        } else {
            next(null, response)
        }
    })
}

function messageOmit(msg) {
    return _.omit(msg, ['active', 'is_deleted', 'is_deleted_by_user',
        'is_updated_by_user', 'tagged_user', 'seen_by', '__v'])
}

function isValidMessage(obj) {
    if (!obj.channel_id ||
        !obj.message ||
        !ObjectId.isValid(obj.channel_id)) return false
    return true
}
module.exports = {
    socketMessageDelete, socketMessageSend, socketMessageUpdate, newMessage, isValidMessage
}