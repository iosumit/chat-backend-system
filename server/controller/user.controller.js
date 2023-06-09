const userHandler = require('../handler/userHandler');

const authenticate = (req, res, next) => {
    console.log(req.body);
    if (!req.body || !req.body.username || !req.body.pin) {
        return res.status(400).json({
            status: 'Error',
            message: "Unauthorised Access!",
        });
    }
    const inputs = req.body;
    userHandler.userAuthenticateHandler(inputs, (err, result) => {
        if (err) {
            res.status(500)
            res.json({
                status: 'Error',
                data: err
            })
        } else {
            res.status(200)
            res.json({
                status: 'Success',
                message: "User Authenticated!",
                data: result
            })
        }
    });




}
const getUser = (req, res, next) => {
    console.log(consts);

    res.status(200).json({
        // consts.,
        message: "User Detail!"
    })
}
const createNewUser = (req, res, next) => {
    console.log(consts);
    res.status(200).json({
        // consts.,
        message: "User Detail!"
    })
}
module.exports = {
    getUser,
    authenticate
};

