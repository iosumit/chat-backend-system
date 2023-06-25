const ChannelModel = require('../model/channel');
const BaseHelper = require('./base.helper');

const ChannelHelper = new BaseHelper(ChannelModel);

module.exports = ChannelHelper;