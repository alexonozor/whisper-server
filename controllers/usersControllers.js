var User = require('../models/User.js');
var jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = {

    registerUser: function(req, res) {
        if (!req.body.email && !req.body.password) {
            res.json({ success: false, message: 'Please enter email and password.' })
        } else {
            var newUser = new User(req.body);
            newUser.save((err) => {
                if (err) {
                    return res.json({ success: false, message: err });
                } else {
                    var token = jwt.sign(newUser, process.env.SECRET, {
                        expiresIn: 10080 // in seconds
                    });
                    res.json({ success: true, token: token, message: 'Successfully created new user.' });
                }
            })
        }
    },

    

    profile: function(req, res, next) {
        res.json(req.user._id)
    }

}