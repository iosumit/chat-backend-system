const express = require('express');
const channelController = require('../controller/channel.controller');
const router = express.Router();

router.get('/channels', channelController.getChannels)

module.exports = router;