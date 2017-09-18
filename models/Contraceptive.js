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
    shippingMethods:  [{ type: Schema.Types.ObjectId, ref: 'ShippingMethod' }],
    appointment: Boolean
});

module.exports = mongoose.model('Contraceptive', ContraceptiveSchema);