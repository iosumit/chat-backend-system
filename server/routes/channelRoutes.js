const express = require('express');



const channelController = require('../controller/channel.controller');
const authorizationToken = require('../utils/authorization.token');
const router = express.Router();


router.get('/list', authorizationToken.verifyApiAuth, channelController.getChannels);

router.post('/create', authorizationToken.verifyApiAuth, channelController.createChannels);


module.exports = router;