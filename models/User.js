var mongoose = require('mongoose'),
    Schema = mongoose.Schema 
var bcrypt = require('bcrypt');
var mongodbErrorHandler = require('mongoose-mongodb-errors')
var Pharmacy = require('../models/Pharmacy.js');

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new mongoose.Schema({  

  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true
  },

  userName: {
    type: String,
    required: true,
    unique: true
  },

  ban: {
    type: Boolean,
    default: false
  },

  banAt: {
    type: Date
  },

  admin: {
    type: Boolean,
    default: false
  },

  password: {
    type: String,
    required: true
  },

  pharmacies: [{ type: Schema.Types.ObjectId, ref: 'Pharmacy' }]
  
  
});


// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {  
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {  
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

UserSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', UserSchema);  