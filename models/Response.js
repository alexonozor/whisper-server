var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Assessment = require('./Assessment.js');
var User = require('./User.js');
var Contraceptive = require('./Contraceptive.js');

// Schema defines how the Contraceptive data will be stored in MongoDB
var ResponseSchema = new mongoose.Schema({
    createdAt: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User',  required: true  },
    contraceptive: { type: Schema.Types.ObjectId, ref: 'Contraceptive', required: true  },
    note: String,
    assesments: [ {
            acceptedAnswer: String,
            question: { type: Schema.Types.ObjectId, ref: 'Assessment' }
        }
    ]
});

module.exports = mongoose.model('Response', ResponseSchema);