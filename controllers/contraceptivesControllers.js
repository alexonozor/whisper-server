const Contraceptive = require('../models/contraceptive');
const Assessment = require('../models/assessment');
const Answer = require('../models/answer');


module.exports = {
    
    getAllContraceptives: (req, res) => {
        Contraceptive.find((err, contraceptives) => {
            if (err) return handleError(err);
            if (contraceptives) {
                res.json({ success: true, contraceptives: contraceptives, status: 200 })
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

        Contraceptive.findOne({_id: id}).exec(function(err, contraceptive) {
            if (err) return handleError(err);
                Assessment.find({ contraceptive: id })
                    .populate('_answers')
                        .exec(function (err, assesments) {
                            if (err) return handleError(err);
                                res.json({ success: true, assesments, contraceptive, status: 200 });
                    });
        })
    }
}