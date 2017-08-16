const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const authenticationController = require('../controllers/authentication');
const ContraceptivesController = require('../controllers/contraceptivesControllers');
const AssessmentsController = require('../controllers/assessmentsControllers');
const AssessmentsResonseController = require('../controllers/responsesController');
const passport = require('passport');

// Do work here
router.post('/register', usersController.registerUser);
router.post('/login', authenticationController.login);

//contraceptives
router.get('/contraceptive/:id/assessments', passport.authenticate('jwt', { session: false }), ContraceptivesController.contraceptiveAssessments);
router.get('/contraceptives', passport.authenticate('jwt', { session: false }), ContraceptivesController.getAllContraceptives);
router.post('/contraceptives', passport.authenticate('jwt', { session: false }), ContraceptivesController.createContraceptives);


// Assessments
router.get('/assessments', passport.authenticate('jwt', { session: false }), AssessmentsController.getAssessments);
router.get('/assessments-response', passport.authenticate('jwt', { session: false }), AssessmentsResonseController.getAssessmentResponse);
router.post('/assessments', passport.authenticate('jwt', { session: false }), AssessmentsController.create);
router.post('/assessment/:id/answers', AssessmentsController.createAssessmentAnswer);
router.get('/assessment/:id/answers', AssessmentsController.getAssessmentAnswers);

module.exports = router;
//DATABASE=mongodb://onozor:onozorgheneho1@ds117869.mlab.com:17869/whisper