const Notification = require('../models/Notification.js');
const Assessment = require('../models/Assessment.js');
const Answer = require('../models/Answer.js');


module.exports =  {

   create: (req, res) => {
    const notification = new Notification(req.body);
	  notification.save((err) => {
	    if (err) {
		    res.json({ success: false, message: 'No conversation found!', status: 401 })	
	    } else {
		    res.json({ success: true, notification, status: 200 });
	    }
     })
    },

    
   getUserNotifications: (req, res) => {
    const userId = req.pramas.userId;
	   Notification.find({receiver: userId}).exec((err, notifications) => {
		   if (err) {
          res.json({ success: false, err, status: 401 });
       } else {
          res.json({ success: true, notifications, status: 200 })
       }  
	   })
   }	

}
