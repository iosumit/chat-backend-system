const ChannelSchema = require('../model/channel');
const ChannelHandler = require('../handler/channelHandler');
const { ERROR, SUCCESS, CHANNEL_TYPE } = require('../utils/consts');
const { strings } = require('../utils/strings');
const { result } = require('lodash');


// Get Channels
const getChannels = (req, res, next) => {
    const input = req.user;

    ChannelHandler.getChannels(input, (err, result) => {
        if (err) {
            res.status(500)
            res.json({
                status: ERROR,
                data: err
            })
        } else {
            res.status(201)
            res.json({
                status: SUCCESS,
                message: strings.fetched_successfully,
                data: result
            })
        }
    })
}

// Create Channels
const createChannels = (req, res, next) => {
    if (!req.body || !req.body.name || !req.body.type) {
        return res.status(400).json({
            status: ERROR,
            message: strings.unseccessful_attempt,
        });
    }


    const inputs = {
        name: req.body.name,
        participated_users: [...req.body.participated_users, req.user._id],
        type: req.body.type,
        profile_image_url: req.body.profile_image_url,
    }
    if (inputs.type == CHANNEL_TYPE.single && inputs.participated_users.length > 2) {
        return res.status(400).json({
            status: ERROR,
            message: strings.Multiple_user_not_allowed_for_SINGLE_CHANNEL,
        });

    }
    ChannelHandler.createChannels(inputs, (err, result) => {

        if (err) {
            res.status(500)
            res.json({
                status: ERROR,
                data: err
            })
        } else {
            res.status(201)
            res.json({
                status: SUCCESS,
                message: strings.chat_created_successfully,
                data: result
            })
        }
    });
}


// Delete Channels

// Get Single channel




module.exports = {
    getChannels, createChannels
}