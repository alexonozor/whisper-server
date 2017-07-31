var mongoose = require('mongoose');  


// Schema defines how the Contraceptive data will be stored in MongoDB
var AnswerSchema = new mongoose.Schema({  
  name: {
    type: String,
    required: true,
    index: true
  },
  _assessment: { type: String, ref: 'Assessment' },
  nextQuestionNumber: { type: String },
  hasRelativeQuestion: { type: Boolean, required: true },
  hasWarning: { type: Boolean, required: true },
  warningMessage: { type: String },
  isEditedAnswer: { type: Boolean, required: true },
  editedAnswer: { type: String },
  editedAnswerLabel: { type: String }
});

module.exports = mongoose.model('Answer', AnswerSchema);