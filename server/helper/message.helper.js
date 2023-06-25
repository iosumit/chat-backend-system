const MessageModel = require('../model/message');
const BaseHelper = require('./base.helper');

const MessageHelper = new BaseHelper(MessageModel);

module.exports = MessageHelper;