const express = require('express');
const messageController = require('../controller/message.controller');
const { verifyApiAuth } = require('../utils/authorization.token');
const router = express.Router();

router.post('/new', verifyApiAuth, messageController.newMessage)
router.get('/channel/:id', verifyApiAuth, messageController.getMessages)
router.delete('/delete/:id', verifyApiAuth, messageController.deleteMessage)
router.post('/update/:id', verifyApiAuth, messageController.updateMessage)

module.exports = router;