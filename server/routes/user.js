const express = require('express');
const router = express.Router();
const usersCon = require('../controller/user.controller');

router.post('/authenticate', usersCon.authenticate);
router.get('/new', usersCon.authenticate);
router.get('/info', usersCon.getUser);
router.post('/register', usersCon.createNewUser);

module.exports = router;

