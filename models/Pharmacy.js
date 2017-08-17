var mongoose = require('mongoose'),
    Schema = mongoose.Schema
var mongodbErrorHandler = require('mongoose-mongodb-errors');
const User = require('./User.js');


// Schema defines how the user data will be stored in MongoDB
var PharmacySchema = new mongoose.Schema({  

  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: {
        type: String,
        default: 'point'
    },

    coordinates: [{
        type: Number,
        required: 'You must supply a coordinate'
    }],

    address: {
        type: String,
        required: 'You must supply an address'
    }
  },

  contact: {

    type: { type: String },

    phoneNumber:[ {
        type: String,
        required: true
    }],

    email: {
        type: String,
        required: 'Please enter an email address'
    }
     
  },

  verify: {
      type: Boolean,
      required: true,
      default: false
  },

  registeredBy: { type: String, ref: 'User' },
  verifiedBy: { type: String, ref: 'User' },
  employees: [{ type: Number, ref: 'User' }],

});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
