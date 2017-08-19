const AssessmentResponse = require('../models/Response.js');
const AcceptedAnswer = require('../models/AcceptedAnswer.js');
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
            .exec(function(err, responses) {
                if (err) res.json(err);
                    res.json({ success: true, responses, status: 401 });
            })
    },





    createAssessmentResponse: (req, res) => {
        let questions = req.body.questions;
       

        var questionIds = questions.map(function(obj) { 
            var rObj;
            rObj = obj.question;
            return rObj;
        });

    
        let response = new AssessmentResponse({
            user: req.body.user,
            contraceptive: req.body.contraceptive,
            questions: questionIds
        });

        response.save((err) => {
            if (err) {
                res.json({ success: false, err, status: 401 });
            } else {
              questions.forEach((el, i) => {
                var acceptedAnswer = new AcceptedAnswer(
                    { 
                      name: el.acceptedAnswer, 
                      assessment: el.question, 
                      contraceptive: response.contraceptive,
                      user: response.user
                    })
              
                    acceptedAnswer.save((err) => {
                        if (err) throw err
                            if (questions.length -1  == i) {
                                res.json({ success: true, message: 'added', status: 200 });
                            }
                    })
              }) // end of loop
            }
        })
    }
}