var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var User = require('./User.js');
var Response = require('./Response.js');
var Message = require('./Message.js');

// Schema defines how the Contraceptive data will be stored in MongoDB
var ResponseConversationMethodSchema = new mongoose.Schema({
    startedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    assessmentResponse: { type: Schema.Types.ObjectId, ref: 'Response' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResponseConversation', ResponseConversationMethodSchema);