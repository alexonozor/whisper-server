const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const authenticationController = require('../controllers/authentication');
const ContraceptivesController = require('../controllers/contraceptivesControllers');
const AssessmentsController = require('../controllers/assessmentsControllers');
const AnswersController = require('../controllers/answersControllers');
const AssessmentsResonseController = require('../controllers/responsesController');
const PharmaciesController = require('../controllers/pharmaciesControllers');
const shippingMethodsController = require('../controllers/shippingMethodsControllers');
const messagesController = require('../controllers/messagesControllers');
const passport = require('passport');

// Do work here
router.post('/register', usersController.registerUser);
router.post('/login', authenticationController.login);
router.put('/user/:id', usersController.updateUser);
router.get('/users', usersController.getAllUsers);
router.get('/user/:id', usersController.getAUser);
router.post('/adduser-to-pharmacies', usersController.addUserToPhamarcy);
router.delete('/removeuser-to-pharmacies', usersController.removeUserFromPharmacy);
router.delete('/permanetly-delete-users/:id', usersController.permanentlyDeleteUser);
router.post('/add-and-remove-user-as-admin', usersController.toggleAdminShip);
router.put('/delete-and-undelete-user', usersController.toggleDelete);
router.put('/ban-and-unban-user', usersController.toggleBan);


//contraceptives
router.get('/contraceptive/:id/assessments', ContraceptivesController.contraceptiveAssessments);
router.get('/admin-contraceptive/:id/assessments', ContraceptivesController.contraceptiveAssessmentsForAdmin);
router.get('/contraceptive/:id', ContraceptivesController.getContraceptive);
router.get('/contraceptives', ContraceptivesController.getAllContraceptives);
router.get('/admin-contraceptives', ContraceptivesController.getAllContraceptivesForAdmin);
router.post('/contraceptives', passport.authenticate('jwt', { session: false }), ContraceptivesController.createContraceptives);
router.delete('/contraceptive/:id', passport.authenticate('jwt', { session: false }), ContraceptivesController.deleteContraceptive);
router.put('/contraceptive/:id', ContraceptivesController.updateContraceptive);

// Assessments
router.get('/admin-assessment/:id/answers', AssessmentsController.getAssessmentAnswersAdmin);
router.get('/assessments', AssessmentsController.getAssessments);
router.get('/assessments-response', passport.authenticate('jwt', { session: false }), AssessmentsResonseController.getAssessmentResponse);
router.post('/assessments', passport.authenticate('jwt', { session: false }), AssessmentsController.create);
router.post('/assessment/:id/answers', AssessmentsController.createAssessmentAnswer);
router.get('/assessment/:id/answers', AssessmentsController.getAssessmentAnswers);
router.delete('/assessment/:id', AssessmentsController.deleteAssessment);
router.put('/assessment/:id', AssessmentsController.updateAssessment);

// Answers
router.get('/answers', AnswersController.getAllAnswers);
router.delete('/answer/:id', AnswersController.deleteAnswer);
router.put('/answer/:id', AnswersController.updateAnswer);

// pharmacies
router.get('/pharmacies', PharmaciesController.getAllPharmacies); // get all pharmacies
router.get('/pharmacy/:id', PharmaciesController.getPharmacy); // get a single pharmacy
router.post('/pharmacies', PharmaciesController.createPharmacies); // create a pharmacy
router.delete('/pharmacy/:id', PharmaciesController.deletePharmacy); // delete a pharmacy
router.put('/pharmacy/:id', PharmaciesController.updatePharmacy); // update pharmacy
router.get('/get-nearer-pharmacies', PharmaciesController.getNearerPhamacies);

// assessment response

router.put('/delete-assessment-responses/:id', AssessmentsResonseController.deleteAssessmentResponse); // create assesment response
router.post('/assessment-responses', AssessmentsResonseController.createAssessmentResponse); // create assesment response
router.get('/assessment-responses', AssessmentsResonseController.getResponses);
router.get('/user-assessment-responses/:userId', AssessmentsResonseController.getUserResponses);
router.put('/update-assessment-responses/:id', AssessmentsResonseController.updateAssessmentResponse);
router.post('/create-conversation', AssessmentsResonseController.createResponseConversation)

//create message
router.get('/shipping-methods', shippingMethodsController.getShippingMethods);
router.get('/shipping-method/:id', shippingMethodsController.getAshippingMethod);
router.post('/shipping-methods', shippingMethodsController.createShippingMethod);
router.put('/shipping-method/:id', shippingMethodsController.updateShippingMethod);
router.delete('/shipping-method/:id', shippingMethodsController.deleteShippingMethod);

router.post('/messages', messagesController.create);
router.get('/conversation/:conversationId/messages', messagesController.conversationMessages);





module.exports = router;
//DATABASE=mongodb://onozor:onozorgheneho1@ds117869.mlab.com:17869/whisper
