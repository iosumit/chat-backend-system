const { SUCCESS } = require("../utils/consts");
const channelSchema = require('../model/channel');

// Get Channels
const getChannels = (req, res, next) => {
    return res.status(200).json({ status: SUCCESS });
}

// Create Channels


// Delete Channels

// Get Single channel




module.exports = {
    getChannels
}