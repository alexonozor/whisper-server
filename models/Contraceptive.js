var mongoose = require('mongoose');  
var Assessment = require('./assessment');

// Schema defines how the Contraceptive data will be stored in MongoDB
var ContraceptiveSchema = new mongoose.Schema({  
  name: {
    type: String,
    unique: true,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  _assessments: [{ type: Number, ref: 'Assessment' }]
});

module.exports = mongoose.model('Contraceptive', ContraceptiveSchema);