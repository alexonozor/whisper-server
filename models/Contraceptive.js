var mongoose = require('mongoose'), Schema = mongoose.Schema;
var Assessment = require('./Assessment.js');

// Schema defines how the Contraceptive data will be stored in MongoDB
var ContraceptiveSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    _assessments: [{ type: Number, ref: 'Assessment' }],

    minimumShippingQuantity: Number,
    maximumShippingQuantity: Number,
    price: Number,
    allowFirstTimerToUsePickUp: Boolean, default: false,
    shippingMethods:  [{ type: Schema.Types.ObjectId, ref: 'ShippingMethod' }],
    releatedContraceptives: [{ type: Schema.Types.ObjectId, ref: 'Contraceptive' }],
    appointment: Boolean,
    published: { type: Boolean, default: false }
});

module.exports = mongoose.model('Contraceptive', ContraceptiveSchema);