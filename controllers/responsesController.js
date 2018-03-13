const AssessmentResponse = require('../models/Response.js');
const AcceptedAnswer = require('../models/AcceptedAnswer.js');
const ResponseConversation = require('../models/ResponseConversation.js');
const User = require('../models/User.js');
const nodemailer = require('nodemailer');

module.exports = {
  getAssessmentResponse: (req, res) => {
    AssessmentResponse.find()
      .exec(function (err, assessment) {
        if (err) res.json(err);
        res.json(assessment);
      })
  },


  getResponses: (req, res) => {
    AssessmentResponse.find().sort({ createdAt: 'desc' })
      .populate('contraceptive', 'name')
      .populate('user')
      .populate('assesments.question')
      .populate('assessments._answers')
      .populate('shippingMethod')
      .exec(function (err, responses) {
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
      .sort({ createdAt: 'desc' })
      .limit(6)
      .exec(function (err, responses) {
        if (err) res.json(err);
        res.json({ success: true, responses, status: 200 });
      })
  },

  getAssesmentResponse: (req, res) => {
    let assesmentResponseId = req.params.assesmentResponseId;
    AssessmentResponse.findById(assesmentResponseId)
      .populate('contraceptive', 'name')
      .populate('user')
      .populate('assesments.question')
      .populate('assessments._answers')
      .populate('shippingMethod')
      .sort({ createdAt: 'desc' })
      .exec(function (err, responses) {
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
    let dateSide = new Date(Date.now());
    assessmentResponse.save((err) => {
      if (err) {
        res.json({ success: false, err, status: 401 });
      } else {

        AssessmentResponse.findById(assessmentResponse._id)
          .populate('user')
          .populate('contraceptive').exec(function (err, response) {
            nodemailer.createTestAccount((err, account) => {
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: process.env.EMAIL, // generated ethereal user
                  pass: process.env.EMAIL_PASSWORD  // generated ethereal password
                }
              });

              // setup email data with unicode symbols
              let mailOptions = {
                from: `${response.user.firstName} <${response.user.email}>`, // sender address
                to: process.env.RECEIVER_EMAIL, // list of receivers
                subject: 'New Assements has been created!', // Subject line
                text: `Hi Reni, ${response.user.firstName} has just submited a new assesment.
                                       click here 
                                `, // plain text body
                html: `Hi Reni, ${response.user.firstName} has just submited a new assessment on ${response.contraceptive.name} contraceptive at ${dateSide}.
                                <a href="https://whisper-angular.herokuapp.com/dashboard/contraceptives">Click here to review</a> 
                         ` // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              });
            });
          })
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

  addUserToConversation: (req, res) => {
    let userId = req.params.userId;
    let conversationId = req.params.conversationId;
    ResponseConversation.findById(conversationId)
      .exec((err, conversation) => {
        if (err) {
          res.json({ success: false, meesage: "Conversation not found", status: 401 });
        } else {
          conversation.users.push(userId)
          conversation.save((err) => {
            if (err) {
              res.json({ success: false, err, status: 401 });
            } else {
              res.json({ success: true, msg: 'User has been added to conversation', status: 200 });
            }
          })
        }
      })
  },

  removeUserFromConversation: (req, res) => {
    let userId = req.params.userId;
    let conversationId = req.params.conversationId;
    ResponseConversation.findById(conversationId)
      .exec((err, conversation) => {
        if (err) {
          res.json({ success: false, meesage: "Conversation not found", status: 401 });
        } else {
          conversation.users.pull(userId)
          conversation.save((err) => {
            if (err) {
              res.json({ success: false, err, status: 401 });
            } else {
              res.json({ success: true, msg: 'User has been removed from conversation', status: 200 });
            }
          })
        }
      })
  },




}