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

  longitude: {
    type: Number
  },

  latitude: {
    type: Number
  },

  location: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
  },

  contact: {
    tel :[ {
        type: String,
        required: true
    }],

    email: {
        type: String,
        lowercase: true,
        required: 'Please enter an email address'
    },
    
    website: {
        type: String,
        lowercase: true,
    },

     address: {
        type: String,
        required: 'You must supply an address'
    },

     city: String,
     officeNumber: String
  },

  verify: { type: Boolean, default: false },
  verifiedBy: { type: String, ref: 'User' },

  registeredBy: { type: String, ref: 'User',  required: true },
  employees: [{ type: String, ref: 'User', unique: true }],

  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }

});

PharmacySchema.index({name: 'text', description: 'text'});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
