var User = require('../models/User.js');
var Thread = require('../models/Thread.js');
var Message = require('../models/Message.js');

module.exports = {
    createThread: (req, res) => {
        let params = req.body;
        let thread = new Thread(params)
        thread.save((err)=> {
            if (err) {
                res.json({success: false, err, status: 500})
            } else {
                res.json({ success: true, thread, status: 200 })
            }
        })
    },

    getThreads: (req, res) => {
        Thread.find().exec((err, threads) => {
            if (err) {
                res.json({success: false, err, status: 500})                
            } else {
                res.json(threads)
            }
        })
    },

    isThreadAvalilable: (req, res) => {
        let reciepaint = req.params.reciepaint;
        let sender = req.params.sender;

        Thread.findOne({ reciepaint: reciepaint, startedBy: sender }).exec((err, thread) => {
            if (err) {
                res.json({success: false, err, status: 500})
            } else if(thread)  {
                res.json({ success: true, hasThread: true, _id: thread._id,  status: 200 })
            } else {
                res.json({ success: true, hasThread: false,  status: 200 })
            }
        })
    },

    getUserThreads: (req, res) => {
        let userId = req.params.userId;
        Thread.find()
        .or([{ reciepaint: userId }, { startedBy: userId }])
        .populate('reciepaint')
        .populate('messages', '_id, content')
        .exec((err, thread) => {
            if (err) {
                res.json({success: false, err, status: 500})
            }  else {
                res.json({ success: true, thread,  status: 200 })
            }
        })
    },

    getThread: (req, res) => {
        let threadId = req.params.threadId;
        Thread.findOne({_id: threadId})
        .populate('messages')
        .populate('reciepaint')
        .populate({ path: 'messages',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
        .exec((err, thread) => {
            if (err) {
                res.json({ success: false, err, status: 500 })
            } else {
                res.json({ success: true, thread,  status: 200 })
            }
        })
    },

    createThreadMessage: (req, res) => {
        let messageParams = new Message(req.body);
        Thread.findById(messageParams.thread).exec((err, thread) => {
            if (err) {
                res.json(err)
            } else {
                thread.messages.push(messageParams);
                messageParams.save((err) => {
                    thread.save((err) => {
                        if (err) {
                            res.json(err)
                        } else {
                            res.json({ sucess: true, thread, status: 200 })
                        }
                    })
                })
            }
        })
    }

    
}