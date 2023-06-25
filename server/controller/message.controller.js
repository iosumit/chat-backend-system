const { SUCCESS, ERROR } = require("../utils/consts");
const messageHandler = require('../handler/messageHandler');
const { strings } = require("../utils/strings");

const getMessages = (req, res, next) => {
    return res.status(200).json({ status: SUCCESS });
}

const newMessage = (req, res, next) => {
    if (!req.body || !messageHandler.isValidMessage(req.body)) {
        return res.status(400).json({
            status: ERROR,
            message: strings.unauthorization_access,
        });
    }
    req.input = {
        channel_id: req.body.channel_id,
        user_id: req.user._id,
        message: req.body.message
    }
    messageHandler.newMessage(req.input, (err, result) => {
        if (err) {
            res.status(500)
            res.json({
                status: ERROR,
                message: strings.unable_to_send_message
            })
        } else {
            res.status(200)
            res.json({
                status: SUCCESS,
                message: strings.sent_successfully,
                data: result
            })
        }
    })
}

const deleteMessage = (req, res, next) => {
    return res.status(200).json({ status: SUCCESS });
}

const updateMessage = (req, res, next) => {
    return res.status(200).json({ status: SUCCESS });
}


module.exports = {
    getMessages,
    newMessage,
    deleteMessage,
    updateMessage,
}