const express = require('express');
const chatController = require('../controller/chat.controller');
const router = express.Router();

router.get('/getMessages', chatController.getMessages)

module.exports = router;