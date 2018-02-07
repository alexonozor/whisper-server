var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var User = require('./User.js');
var Message = require('./Message.js');


var ThreadSchema = new mongoose.Schema({
    startedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    subject: { type: String },
    reciepaint: { type: Schema.Types.ObjectId, ref: 'User' },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thread', ThreadSchema);