const AssessmentResponse = require('../models/Response.js');
module.exports = {
    getAssessmentResponse: (req, res) => {
        AssessmentResponse.find()
            .exec(function(err, assessment) {
                if (err) res.json(err);
                res.json(assessment);
            })
    },

    createAssessmentResponse: (req, res) => {
        let requestBody = req.body();
        let user = requestBody.user;
        let contraceptive = requestBody.contraceptive;
        let answer = requestBody.name;


        AssessmentResponse.find()
            .exec(function(err, assessment) {
                if (err) res.json(err);
                res.json(assessment);
            })
    }
}