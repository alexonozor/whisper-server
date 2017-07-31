var mongoose = require('mongoose'), Schema = mongoose.Schema  
var Contraceptive = require('./contraceptive');
var Answer = require('./answer');

// Schema defines how the Contraceptive data will be stored in MongoDB
var AssessmentSchema = new mongoose.Schema({  
  question: {
    type: String,
    required: true
  },
  contraceptive : { type: String, ref: 'Contraceptive' },
  _answers : [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model('Assessment', AssessmentSchema);