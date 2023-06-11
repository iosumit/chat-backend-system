const express = require('express');
const router = express.Router();
const usersCon = require('../controller/user.controller');
const authorizationToken = require('../utils/authorization.token');

router.post('/authenticate', usersCon.authenticate);
router.get('/new', usersCon.authenticate);
router.get('/info', authorizationToken, usersCon.getUser);

module.exports = router;

