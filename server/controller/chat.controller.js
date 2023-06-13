const { SUCCESS } = require("../utils/consts");

const getMessages = (req, res, next) => {
    return res.status(200).json({ status: SUCCESS });
}


module.exports = {
    getMessages
}