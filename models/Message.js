var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var User = require('./User.js');
var Response = require('./Response.js');
var ResponseConversation = require('./ResponseConversation.js');
var Thread = require('./Thread.js');

// Schema defines how the Contraceptive data will be stored in MongoDB
var MessageMethodSchema = new mongoose.Schema({
    conversation: { type: Schema.Types.ObjectId, ref: 'ResponseConversation' },
    thread: { type: Schema.Types.ObjectId, ref: 'Thread' },    
    content: { type: String,  required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    sent: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageMethodSchema);