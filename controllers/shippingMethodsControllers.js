const ShippingMethod = require('../models/ShippingMethod.js');

module.exports = {
    getShippingMethods: (req, res) => {
        ShippingMethod.find()
            .exec(function(err, shippingMethod) {
                if (err) res.json(err);
                res.json({ success: true, shippingMethod, status: 200 });
            })
    },


    getAshippingMethod: (req, res) => {
        let id = req.params.id
        ShippingMethod.findOne({ _id: id })
            .exec(function(err, responses) {
                if (err) res.json(err);
                    res.json({ success: true, responses, status: 200 });
            })
    },

    createShippingMethod: (req, res) => {
        let body = req.body;
        let shipping = new ShippingMethod(body);
        shipping.save((err) => {
            if (err) {
                return res.json(err);
            } else {
                res.json({ success: true, shipping, status: 200 })
            }
        })
    },


    updateShippingMethod: (req, res) => {
        let response = req.body; 
        let responseId = req.params.id;
        ShippingMethod.findByIdAndUpdate(responseId, response)
        .exec((err, shippingMethod) => {
            if (err) {
                res.json({ success: false, err, status: 401 });
            } else {
              res.json({ success: true,  shippingMethod, status: 200 });
            }
        })
    },

    deleteShippingMethod: (req, res) => {
        let id = req.params.id;
        ShippingMethod.remove({ _id: id }).exec(function(err) {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, msg: 'Shipping method has been removed', status: 200 })
            }
        })
    }
}