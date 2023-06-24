const express = require('express');
const channelController = require('../controller/channel.controller');
const router = express.Router();
const authorizationToken = require('../utils/authorization.token');


router.get('/channels', channelController.getChannels);

router.post('/create', authorizationToken.verifyApiAuth,channelController.createChannels);

module.exports = router;