var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Assessment = require('./Assessment.js');
var User = require('./User.js');
var Contraceptive = require('./Contraceptive.js');

// Schema defines how the Contraceptive data will be stored in MongoDB
var ResponseSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User',  required: true  },
    contraceptive: { type: Schema.Types.ObjectId, ref: 'Contraceptive', required: true  },
    assessments: [ {
            acceptedAnswer: String,
            question: { type: Schema.Types.ObjectId, ref: 'Assessment' }
        }
    ]
});

module.exports = mongoose.model('Response', ResponseSchema);