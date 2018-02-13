var mongoose = require('mongoose'),
    Schema = mongoose.Schema
var Contraceptive = require('./Contraceptive.js');
var Answer = require('./Answer.js');

// Schema defines how the Contraceptive data will be stored in MongoDB
var AssessmentSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    position: Number,
    contraceptive: { type: String, ref: 'Contraceptive' },
    published: { type: Boolean, default: false },
    _answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});


module.exports = mongoose.model('Assessment', AssessmentSchema);