var User = require('../models/User.js');
var jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });


module.exports = {
  login: function (req, res) {
    let params = req.body.email ? { 'email': req.body.email } : { 'contact.email': req.body.email }
    User.findOne(params, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, process.env.SECRET, {
              expiresIn: 10080 // in seconds
            });
            res.json({ success: true, user, token: token });
          } else {
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        });
      }
    });
  }
}