var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Assessment = require('./Assessment.js');
var User = require('./User.js');
var Contraceptive = require('./Contraceptive.js');
var Pharmacy = require('./Pharmacy.js');
var ShippingMethod = require('./ShippingMethod.js');
var ResponseConversation = require('./ResponseConversation.js');
const STATUS = ['Pending', 'Shipping', 'Delivered', 'Failed'];
// Schema defines how the Contraceptive data will be stored in MongoDB
var ResponseSchema = new mongoose.Schema({
    createdAt: { type: Date },
    grandTotal: Number,
    selectedPharmacy: { type: Schema.Types.ObjectId, ref: 'Pharmacy' },
    shippingMethod: { type: Schema.Types.ObjectId, ref: 'ShippingMethod' },
    user: { type: Schema.Types.ObjectId, ref: 'User',  required: true  },
    contraceptive: { type: Schema.Types.ObjectId, ref: 'Contraceptive', required: true  },
    note: String,
    assesments: [ {
            acceptedAnswer: String,
            question: { type: Schema.Types.ObjectId, ref: 'Assessment' }
        }
    ],
    appointment: {
        appointmentNote: String,
        isAppointment: { type: Boolean, default: false },
        appointmentTime: String,
        appointmentDate: Date
    },
    hasConversation: {  type: Boolean, default: false },
    conversation: { type: Schema.Types.ObjectId, ref: 'ResponseConversation' },
    isDeleted: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    orders: [{
        reOrderedAt: { type: Date },
        qunatity: { type: Number, default: 0 }
    }],
    responseStatus: {
        type: String,
        enum: STATUS,
        default: 'Pending'
    }
});


module.exports = mongoose.model('Response', ResponseSchema);