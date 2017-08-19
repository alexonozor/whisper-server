var mongoose = require('mongoose');  
var Assessment = require('./Assessment.js');
var User = require('./User.js');
var Contraceptive = require('./Contraceptive.js');

// Schema defines how the Contraceptive data will be stored in MongoDB
var AcceptedAnswerSchema = new mongoose.Schema({  
  name: {
    type: String,
    required: true,
    index: true
  },
  assessment: { type: String, ref: 'Assessment' },
  contraceptive: { type: String, ref: 'Contraceptive' },
  user: { type: String, ref: 'User' }
});

module.exports = mongoose.model('AcceptedAnswer', AcceptedAnswerSchema);