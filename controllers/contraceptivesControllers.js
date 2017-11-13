const Contraceptive = require('../models/Contraceptive.js');
const Assessment = require('../models/Assessment.js');
const Answer = require('../models/Answer.js');


module.exports = {

    getAllContraceptives: (req, res) => {
        Contraceptive.find({ published: true })
        .populate('shippingMethods')
        .populate('releatedContraceptives', 'id, name')
        .exec((err, contraceptives) => {
            if (err) return handleError(err);
            if (contraceptives) {
                res.json({ success: true, contraceptives: contraceptives, status: 200 })
            }
        })
    },

    getAllContraceptivesForAdmin: (req, res) => {
        Contraceptive.find()
        .populate('shippingMethods')
        .exec((err, contraceptives) => {
            if (err) return handleError(err);
            if (contraceptives) {
                res.json({ success: true, contraceptives: contraceptives, status: 200 })
            }
        })
    },

    getContraceptive: (req, res) => {
        let id = req.params.id;
        Contraceptive.findOne({_id: id}).populate('shippingMethods').exec((err, contraceptive) => {
            if (err) return handleError(err);
            if (contraceptive) {
                res.json({ success: true, contraceptive, status: 200 })
            }
        })
    },

    createContraceptives: (req, res) => {
        let contraceptive = new Contraceptive(req.body);
        contraceptive.save((err) => {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, message: 'Contraceptive has been saved!', status: 200 })
            }
        })
    },


    contraceptiveAssessments: (req, res) => {
        let id = req.params.id;

        Contraceptive.findOne({ _id: id }).exec(function(err, contraceptive) {
            if (err) return handleError(err);
            Assessment.find({ contraceptive: id, published:  true })
                .populate({path: '_answers', match: { published: { $eq: true }}})
                .exec(function(err, assesments) {
                    if (err) return handleError(err);
                    res.json({ success: true, assesments, contraceptive, status: 200 });
                });
        })
    },

    contraceptiveAssessmentsForAdmin: (req, res) => {
        let id = req.params.id;

        Contraceptive.findOne({ _id: id }).exec(function(err, contraceptive) {
            if (err) return handleError(err);
            Assessment.find({ contraceptive: id })
                .populate({path: '_answers'})
                .exec(function(err, assesments) {
                    if (err) return handleError(err);
                    res.json({ success: true, assesments, contraceptive, status: 200 });
                });
        })
    },

    deleteContraceptive: (req, res) => {
        let id = req.params.id;
        Contraceptive.remove({ _id: id }).exec(function(err) {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, msg: 'Contraceptive has been removed', status: 200 })
            }
        })
    },


    updateContraceptive: (req, res) => {
        let id = req.params.id;
        let contraceptive = req.body;  
        Contraceptive.update({_id: id }, contraceptive,  (err, contraceptive) => {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, contraceptive, status: 200 })
            }
        })
    },
}
