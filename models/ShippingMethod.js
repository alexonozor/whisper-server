var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Schema defines how the Contraceptive data will be stored in MongoDB
var ShippingMethodSchema = new mongoose.Schema({
    name: String,
    shippingFee: Number,
    createdAt: { type: Date } 
});

module.exports = mongoose.model('ShippingMethod', ShippingMethodSchema);