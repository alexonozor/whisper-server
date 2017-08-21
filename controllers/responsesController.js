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
        AssessmentResponse.find().populate('assessments.question').populate('assessments._answers')
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
            assessments: response.questions
        });
       
        assessmentResponse.save((err) => {
            if (err) {
                res.json({ success: false, err, status: 401 });
            } else {
              res.json({ success: true, message: 'saved', status: 200 });
            }
        })
    }
}