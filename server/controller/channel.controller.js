const { SUCCESS } = require("../utils/consts");

const getChannels = (req, res, next) => {
    return res.status(200).json({ status: SUCCESS });
}



module.exports = {
    getChannels
}