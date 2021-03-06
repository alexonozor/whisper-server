const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const authenticationController = require('../controllers/authentication');
const ContraceptivesController = require('../controllers/contraceptivesControllers');
const AssessmentsController = require('../controllers/assessmentsControllers');
const AnswersController = require('../controllers/answersControllers');
const AssessmentsResonseController = require('../controllers/responsesController');
const PharmaciesController = require('../controllers/pharmaciesControllers');
const HospitalsController = require('../controllers/hospitalsControllers');
const shippingMethodsController = require('../controllers/shippingMethodsControllers');
const messagesController = require('../controllers/messagesControllers');
const notificationsController = require('../controllers/notificationsControllers');
const threadsController = require('../controllers/threadsControllers');
const configController = require('../controllers/configController');
const passport = require('passport');

// Do work here
router.post('/register', usersController.registerUser);
router.post('/login', authenticationController.login);
router.put('/user/:id', usersController.updateUser);
router.get('/users', usersController.getAllUsers);
router.get('/user/:id', usersController.getAUser);
router.get('/searchUsers', usersController.searchUsers)
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
router.get('/assessments-response', AssessmentsResonseController.getAssessmentResponse);
router.post('/assessments', AssessmentsController.create);
router.post('/assessment/:id/answers', AssessmentsController.createAssessmentAnswer);
router.get('/assessment/:id/answers', AssessmentsController.getAssessmentAnswers);
router.delete('/assessment/:id', AssessmentsController.deleteAssessment);
router.put('/assessment/:id', AssessmentsController.updateAssessment);

// Answers
router.get('/answers', AnswersController.getAllAnswers);
router.delete('/answer/:id', AnswersController.deleteAnswer);
router.put('/answer/:id', AnswersController.updateAnswer);

// pharmacies
router.get('/hospitals', HospitalsController.getAllHospitals); // get all pharmacies
router.get('/hospital/:id', HospitalsController.getHospital); // get a single pharmacy
router.post('/hospitals', HospitalsController.createHospital); // create a pharmacy
router.delete('/hospital/:id', HospitalsController.deleteHospital); // delete a pharmacy
router.put('/hospital/:id', HospitalsController.updateHospital); // update pharmacy
router.get('/get-nearer-hospitals', HospitalsController.getNearerHospitals);
router.get('/search-hospitals', HospitalsController.search)

router.get('/pharmacies', PharmaciesController.getAllPharmacies); // get all hospital
router.get('/pharmacy/:id', PharmaciesController.getPharmacy); // get a single hospital
router.post('/pharmacies', PharmaciesController.createPharmacies); // create a hospital
router.delete('/pharmacy/:id', PharmaciesController.deletePharmacy); // delete a hospital
router.put('/pharmacy/:id', PharmaciesController.updatePharmacy); // update hospital
router.get('/get-nearer-pharmacies', PharmaciesController.getNearerPhamacies);
router.get('/search-pharmacies', PharmaciesController.search)


// assessment response
router.put('/delete-assessment-responses/:id', AssessmentsResonseController.deleteAssessmentResponse); // create assesment response
router.post('/assessment-responses', AssessmentsResonseController.createAssessmentResponse); // create assesment response
router.get('/assessment-responses', AssessmentsResonseController.getResponses);
router.get('/user-assessment-responses/:userId', AssessmentsResonseController.getUserResponses);
router.get('/assessment-responses/:assesmentResponseId', AssessmentsResonseController.getAssesmentResponse);
router.put('/update-assessment-responses/:id', AssessmentsResonseController.updateAssessmentResponse);
router.post('/create-conversation', AssessmentsResonseController.createResponseConversation);
router.put('/conversation/:conversationId/user/:userId', AssessmentsResonseController.addUserToConversation);
router.delete('/conversation/:conversationId/user/:userId', AssessmentsResonseController.removeUserFromConversation);


//create message
router.get('/shipping-methods', shippingMethodsController.getShippingMethods);
router.get('/shipping-method/:id', shippingMethodsController.getAshippingMethod);
router.post('/shipping-methods', shippingMethodsController.createShippingMethod);
router.put('/shipping-method/:id', shippingMethodsController.updateShippingMethod);
router.delete('/shipping-method/:id', shippingMethodsController.deleteShippingMethod);

router.post('/messages', messagesController.create);
router.get('/conversation/:conversationId/messages', messagesController.conversationMessages);


//notifications
router.post('/notifications', notificationsController.create);
router.get('/getuser-notifications/:userId', notificationsController.getUserNotifications);
router.put('/notification/:notificationId', notificationsController.updateNotifications);
router.delete('/notification/:notificationId', notificationsController.deleteNotification);
router.get('/notification-count/:userId', notificationsController.getUserNotificationsCount)

//threads
router.post('/threads', threadsController.createThread);
router.get('/threads', threadsController.getThreads);
router.get('/thread-available/:reciepaint/:sender', threadsController.isThreadAvalilable);
router.get('/user-threads/:userId', threadsController.getUserThreads);
router.get('/thread/:threadId', threadsController.getThread);
router.post('/threads-message', threadsController.createThreadMessage);

//config
router.get('/app-config', configController.getConfig);

module.exports = router;
