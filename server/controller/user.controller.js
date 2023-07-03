const userHandler = require('../handler/userHandler');
const { ERROR, SUCCESS } = require('../utils/consts');
const { strings } = require('../utils/strings')

const authenticate = (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.pin) {
        return res.status(400).json({
            status: ERROR,
            message: strings.unauthorization_access,
        });
    }
    const inputs = req.body;
    userHandler.userAuthenticateHandler(inputs, (err, result) => {
        if (err) {
            res.status(500)
            res.json({
                status: ERROR,
                message: err
            })
        } else {
            res.status(200)
            res.json({
                status: SUCCESS,
                message: strings.user_authenticated_successfully,
                data: result
            })
        }
    });

}
const getUser = (req, res, next) => {
    const inputs = req.user;
    userHandler.getUserInfo(inputs, (err, result) => {
        if (err) {
            res.status(500)
            res.json({
                status: ERROR,
                message: err
            })
        } else {
            res.status(200)
            res.json({
                status: SUCCESS,
                message: strings.fetched_successfully,
                data: result
            })
        }
    });
}
const createNewUser = (req, res, next) => {
    const inputs = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        pin: req.body.pin,
        phone: req.body.phone,
    }

    userHandler.createNewUser(inputs, (err, result) => {
        if (err) {
            res.status(500)
            res.json({
                status: ERROR,
                data: err
            })
        } else {
            res.status(201)
            res.json({
                status: SUCCESS,
                message: strings.user_created_successfully,
                data: result
            })
        }
    });
}

const getUserList = (req, res, next) => {
    

    res.status(200).json(
        res.advancedResult
    )
 }
module.exports = {
    getUser,
    authenticate, createNewUser, getUserList
};

