const authenticationController = {};
const User = require('../models/user_model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const config = require('../../config.js')

const tokenForUser = function(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

authenticationController.signup = function(req, res, next){
    const email = req.body.email;
    let password = req.body.password;

    if(!password || !email) return res.status(422).send( {error: "valid email and password are required"} );

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(password, salt, null, function(err, hash){
            password = hash;
        });
    });

    User.findOne({where: {email: email}}) 
    .then(function(emailFound){
        if(emailFound){
            res.status(422).send( {error: "Email is in use"} );
        }
        else {
            User.create({
                email: email,
                password: password
            }).then(function(response){
                res.json({token: tokenForUser(response)});
            });
        }
    }).catch(function(err){
        return next(err)
    });
}

authenticationController.signIn = function(req, res, next){
    res.send({ token: tokenForUser(req.user) })
}

module.exports = authenticationController;