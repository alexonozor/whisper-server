const Answer = require('../models/Answer.js');

module.exports = {
    addAcceptedAnswer: (req, res) => {
        
    },

    getAllAnswers: (req, res) => {
        Answer.find((err, answers) => {
            if (err) return handleError(err);
            if (answers) {
                res.json({ success: true, answers: answers, status: 200 })
            }
        })
    },

    deleteAnswer: (req, res) => {
        let id = req.params.id;
        Answer.remove({ _id: id }).exec(function(err) {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, msg: 'Answer has been removed', status: 200 })
            }
        })
    },


    updateAnswer: (req, res) => {
        let id = req.params.id;
        let answer = req.body;
        Answer.update({_id: id }, answer,  (err, answer) => {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, answer, status: 200 })
            }
        })
    }
}