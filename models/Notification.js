var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var User = require('./User.js');
const NOTIFICATION_TYPE = ['openConversation', 'joinConversation', 'closeConversation', 'message', 'announcment', 'AccountRequest'];

// Schema defines how the Contraceptive data will be stored in MongoDB
var NotificationSchema = new mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver:  { type: String, ref: 'User' },
    notification_type: { type: String, enum: NOTIFICATION_TYPE },
    notification_type_id: { type: String },
    seen:  { type: Boolean, default: false },
    content:  { type: String },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false } 
});
module.exports = mongoose.model('Notification', NotificationSchema);
