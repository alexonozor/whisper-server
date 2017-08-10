var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Assessment = require('./Assessment.js');
var User = require('./User.js');
var Contraceptive = require('./Contraceptive.js');

// Schema defines how the Contraceptive data will be stored in MongoDB
var ResponseSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    // contraceptive: { type: String, ref: 'Contraceptive' },  
    // answeredBy : { type: String, ref: 'User' },
    // // replies:  [
    // //     { type: Schema.Types.ObjectId, ref: 'Assessment' }, 
    // //     { type: String }
    // // ]
});

module.exports = mongoose.model('Response', ResponseSchema);