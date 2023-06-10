const ErrorResponse = require('../utils/error');
const userHandler = require('../handler/userHandler');
const { users} = require('../db/db')

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

//@desc     Register User
//@route    Post Api '/user/register'
//@acess    public
const createNewUser = (req, res, next) => {
    console.log("xxxxxxx");
    console.log(req.body);
    const { name, username, pin } = req.body;
    if (name === undefined || username === undefined || pin === undefined) {

        return next(new ErrorResponse("Invalid input", 400));
    
        
    }
    // console.log(name);
    // console.log(username);
    // console.log(pin);

    userHandler.userAuthenticateHandler(inputs, (err, result) => {
        if (err) {
            var usert = users.join(
                req.body
            );
        
            res.status(200).json({
                // consts.,
                message: req.body
            });
        } else {
            res.status(400)
            res.json({
                status: 'Fail',
                message: "User Already Exist!",
                // data: result
            })
        }
    });


    // console.log(consts);
    // const { username, name, pin } = req.body;
    
}
module.exports = {
    getUser,
    authenticate,
    createNewUser
};

