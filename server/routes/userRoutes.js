const express = require('express');
const router = express.Router();
const usersCon = require('../controller/user.controller');
const authorizationToken = require('../utils/authorization.token');
const advancedResult = require('../utils/advancedResult');
const User = require('../model/user');

router.post('/authenticate', usersCon.authenticate);
router.post('/new', usersCon.createNewUser);
router.get('/info', authorizationToken.verifyApiAuth, usersCon.getUser);
router.get('/list', authorizationToken.verifyApiAuth, advancedResult(User),usersCon.getUserList)

module.exports = router;

