const AssessmentResponse = require('../models/Response.js');
const AcceptedAnswer = require('../models/AcceptedAnswer.js');
const ResponseConversation = require('../models/ResponseConversation.js');
const User = require('../models/User.js');

module.exports = {
    getAssessmentResponse: (req, res) => {
        AssessmentResponse.find()
            .exec(function(err, assessment) {
                if (err) res.json(err);
                 res.json(assessment);
            })
    },


    getResponses: (req, res) => {
        AssessmentResponse.find().sort({createdAt: 'desc'})
        .populate('contraceptive', 'name')
        .populate('user')
        .populate('assesments.question')
        .populate('assessments._answers')
        .populate('shippingMethod')
            .exec(function(err, responses) {
                if (err) res.json(err);
                    res.json({ success: true, responses, status: 200 });
            })
    },

    
    getUserResponses: (req, res) => {
        let userId = req.params.userId;
        AssessmentResponse.find({ user: userId, isDeleted: false })
        .populate('contraceptive', 'name')
        .populate('assesments.question')
        .populate('assessments._answers')
        .sort({createdAt: 'desc'})
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
        let updateShipping = req.query.updatingShippingForm;
        let userId = req.query.userId;
        AssessmentResponse.findByIdAndUpdate(responseId, response)
        .exec((err, assessmentResponse) => {
            if (err) {
                res.json({ success: false, err, status: 401 });
            } else {
                if (updateShipping) {
                    User.findById(assessmentResponse.user).exec((err, user) => {
                        user.orders.push(assessmentResponse.contraceptive);
                        user.save((err) => {
                            if (err) throw err
                        })
                    })
                }
              res.json({ success: true, responseId: assessmentResponse._id, status: 200 });
            }
        })
    },


    deleteAssessmentResponse: (req, res) => {
        let responseId = req.params.id;
        if (!responseId) { res.json({ success: false, message: 'Response id not found', status: 401 }); }

        AssessmentResponse.findByIdAndUpdate(responseId, { isDeleted: true })
        .exec((err, response) => {
            if (err) {
                res.json({ success: false, err, status: 401 });
            } else {
                res.json({ success: true, msg: 'has been deleted!', status: 200 })
            }
        })
    },
    

    createResponseConversation: (req, res) => {
        let responseConversation = new ResponseConversation(req.body);
        responseConversation.save((err) => {
            if (err) {
                res.json({ success: false, err, status: 401 });
            } else {
              res.json({ success: true, responseId: responseConversation._id, status: 200 });
            }
        })
    },

    
}