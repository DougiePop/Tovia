const User = require("./database");
const userController = {};

userController.createMessage = (req, res, next) => {
    console.log('you are now in userController.createMessage function')
    User.create(req.body, (err, user) => {
        if (err) return res.send(false);
        else {
            res.status(200);
            req.body.user = user.user;
            req.body.message = user.message;
            next();
        }
    })
}

userController.getMessage = (req, res, next) => {
    console.log('you are now in userController.getMessage function')
    console.log(req.body)
    User.findOne(req.body.user, (err, user) => {
        if (err) return res.send(false);
        else{
            res.status(200);
            res.send(user.body)
        }
    })
}

module.exports = userController;