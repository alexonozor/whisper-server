const Assessment = require('../models/Assessment');
const Answer = require('../models/Answer.js');

module.exports = {
    create: (req, res) => {
        let params = req.body;
        assesment = new Assessment(params);
        assesment.save((err) => {
            if (err) {
                res.json({ success: false, err });
            } else {
                res.json({ success: true, message: 'Added Assessment', status: 200 });
            }
        })
    },


    getAssessments: (req, res) => {
        Assessment.find()
            .populate('_answers')
            .exec(function(err, assesments) {
                if (err) return handleError(err);
                res.json({ success: true, assesments, status: 200 });
            });
    },


    createAssessmentAnswer: (req, res) => {
        let params = req.body;
        let answer = new Answer(params)
        let id = req.params.id;
        Assessment.findOne({ _id: id })
            .exec(function(err, assesment) {
                if (!assesment) res.json({ success: false, message: 'Could not find assessment', status: 401 });
                answer._assessment = assesment._id;
                answer.save((err) => {
                    if (err) res.json(err);
                    assesment._answers.push(answer);
                    assesment.save((err) => {
                        if (err) return handleError(err);
                            res.json({ success: true, status: 200 });
                    })
                })
            });
    },


    getAssessmentAnswers: (req, res) => {
        const id = req.params.id;
        Assessment.findOne({ _id: id })
            .populate({path: '_answers', match: { published: { $eq: true }}})
            .exec(function(err, assesments) {
                if (err) res.json({ success: false, message: err, status: 401 });
                  res.json({ success: true, assesments, status: 200 });
            })
    },

    getAssessmentAnswersAdmin: (req, res) => {
        const id = req.params.id;
        Assessment.findOne({ _id: id })
            .populate('_answers')
            .exec(function(err, assesments) {
                if (err) {
                     res.json({ success: false, message: err, status: 401 });
                } else {
                    Assessment.find({contraceptive: assesments.contraceptive}, "_id, question")
                    .exec(function(err, assesmentQuestions) {
                        res.json({ success: true, assesments, assesmentQuestions, status: 200 });
                    })
                }
            })
    },

    deleteAssessment: (req, res) => {
        let id = req.params.id;
        Assessment.remove({ _id: id }).exec(function(err) {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, msg: 'Assessment has been removed', status: 200 })
            }
        })
    },


    updateAssessment: (req, res) => {
        let id = req.params.id;
        let assessment = req.body;
        Assessment.update({_id: id }, assessment,  (err, assessment) => {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, assessment, status: 200 })
            }
        })
    },
};