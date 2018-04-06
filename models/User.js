var mongoose = require('mongoose'),
    Schema = mongoose.Schema 
var bcrypt = require('bcrypt');
// var mongodbErrorHandler = require('mongoose-mongodb-errors')
var Pharmacy = require('../models/Pharmacy.js');
var Hospital = require('../models/Hospital.js');
var Contraceptive = require('../models/Contraceptive.js');

const GENDER = ['Male', 'Female'];
const ACCOUNT_TYPE = ['Member', 'Pharmacist', 'Doctor', 'Admin'];

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new mongoose.Schema({  

  accountType: {
    type: String,
    enum: ACCOUNT_TYPE
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true
  },

  dateOfBirth: {
    type: Date
  },

  
  userName: {
    type: String
  },

  gender: {
    type: String,
    enum: GENDER
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

  verified: {
    type: Boolean,
    default: false
  },

  deleted: {
    type: Boolean,
    default: false
  },

  recieveEmail: {
    type: Boolean,
    default: true
  },


  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true
  },

  contact: {
    type: {
        type: String,
        default: 'point'
    },

    coordinates: [{
        type: Number
    }],

    lng: {
        type: Number
    },

    lat: {
        type: Number
    },

    tel: {
        type: String
    },

    address: {
        type: String
    },

     city: String
  },

  pharmacies: [{ type: Schema.Types.ObjectId, ref: 'Pharmacy' }],
  hospitals: [{ type: Schema.Types.ObjectId, ref: 'Hospital' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Contraceptive' }]
  
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



// UserSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', UserSchema);  