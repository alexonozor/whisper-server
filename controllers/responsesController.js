const AssessmentResponse = require('../models/Response.js');
const AcceptedAnswer = require('../models/AcceptedAnswer.js');
var winston = require('winston');

module.exports = {
    getAssessmentResponse: (req, res) => {
        AssessmentResponse.find()
            .exec(function(err, assessment) {
                if (err) res.json(err);
                res.json(assessment);
            })
    },


    getResponses: (req, res) => {
        AssessmentResponse.find()
        .populate('contraceptive', 'name')
        .populate('user')
        .populate('assesments.question')
        .populate('assessments._answers')
            .exec(function(err, responses) {
                if (err) res.json(err);
                    res.json({ success: true, responses, status: 200 });
            })
    },



    createAssessmentResponse: (req, res) => {
        let response = req.body; 
        let assessmentResponse = new AssessmentResponse({
            user: response.user,
            contraceptive: response.contraceptive,
            note: response.note,
            assesments: response.questions,
            createdAt: Date.now()
        });

             
        assessmentResponse.save((err) => {
            if (err) {
                res.json({ success: false, err, status: 401 });
            } else {
              res.json({ success: true, responseId: assessmentResponse._id, status: 200 });
            }
        })
    },

    updateAssessmentResponse: (req, res) => {
        let response = req.body; 
        let responseId = req.params.id;
        AssessmentResponse.findByIdAndUpdate(responseId, response)
        .exec((err, assessmentResponse) => {
            if (err) {
                res.json({ success: false, err, status: 401 });
            } else {
              res.json({ success: true, responseId: assessmentResponse._id, status: 200 });
            }
        })
    }
}