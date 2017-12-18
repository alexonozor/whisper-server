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
     Notification.find({receiver: userId})
     .populate('receiver', 'id, firstName')
     .populate('sender', 'id, firstName')
     .exec((err, notifications) => {
		   if (err) {
          res.json({ success: false, err, status: 401 });
       } else {
          res.json({ success: true, notifications, status: 200 })
       }  
	   })
   }	

}
