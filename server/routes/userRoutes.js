const express = require('express');
const router = express.Router();
const usersCon = require('../controller/user.controller');
const authorizationToken = require('../utils/authorization.token');

router.post('/authenticate', usersCon.authenticate);
router.post('/new', usersCon.createNewUser);
router.get('/info', authorizationToken.verifyApiAuth, usersCon.getUser);

module.exports = router;

