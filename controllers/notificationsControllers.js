const Notification = require('../models/Notification.js');
const Assessment = require('../models/Assessment.js');
const Answer = require('../models/Answer.js');


module.exports =  {

   create: (req, res) => {
    const notification = new Notification(req.body);
	  notification.save((err) => {
	    if (err) {
		    res.json({ success: false, err, status: 401 })	
	    } else {
		    res.json({ success: true, notification, status: 200 });
	    }
     })
    },

    
   getUserNotifications: (req, res) => {
    const userId = req.params.userId;
     Notification.find({receiver: userId, isDeleted: false})
     .populate('receiver', 'id, firstName')
     .populate('sender', 'id, firstName')
     .sort({createdAt: 'desc'})
     .exec((err, notifications) => {
		   if (err) {
          res.json({ success: false, err, status: 401 });
       } else {
          res.json({ success: true, notifications, status: 200 })
       }  
	   })
   },
   
   updateNotifications: (req, res) => {
     const notificationId = req.params.notificationId;
     let params = req.body;
     Notification.findByIdAndUpdate(notificationId, params)
     .exec((err, notification) => {
        if (err) {
          res.json({ success: false, err, status: 401 });
        } else {
          res.json({ success: true, notification, status: 200 })
        }
     })
   },

   deleteNotification: (req, res) => {
     const notificationId = req.params.notificationId;
     Notification.findByIdAndRemove(notificationId)
     .exec((err, notification) => {
        if (err) {
          res.json({ success: false, err, status: 401 });
        } else {
          res.json({ success: true, notification, status: 200 })
        }
     })
   },

   getUserNotificationsCount: (req, res) => {
    const userId = req.params.userId;
     Notification.find({receiver: userId, seen: false})
     .exec((err, notifications) => {
       let count = notifications.length
		   if (err) {
          res.json({ success: false, err, status: 401 });
       } else {
          res.json({ success: true, count: count, status: 200 })
       }  
	   })
   },

}
