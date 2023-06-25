const UserModel = require('../model/user');
const BaseHelper = require('./base.helper');

const UserHelper = new BaseHelper(UserModel);

module.exports = UserHelper;