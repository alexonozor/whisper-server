const Message = require('../models/Message.js');
const Conversation = require('../models/ResponseConversation.js');
let io = null;

module.exports =  {

    socket: (ioParams) => {
        io = ioParams;
    },

    create: (req, res) => {
        const message = new Message(req.body);
       
        Conversation.findOne({_id: message.conversation}).exec((err, conversation) => {
            if (!conversation) {
                res.json({ success: false, message: 'No conversation found!', status: 401 })
            }
            if (err) { return res.json({ success: false, err, status: 501 }) }

                message.save((err) => {
                    if (err) {
                        res.json({ success: false, err, status: 501 });
                    } else {
                        conversation.messages.push(message);
                        conversation.save((err) => {
                            if (err) return  res.json({ success: false, err, status: 501 });
                                res.json({ success: true, message: 'saved!', status: 200 });
                        })
                    }
                })
        })
    },

    
    conversationMessages: (req, res) => {

        let conversationId = req.params.conversationId;
        if (!conversationId) {
            res.json({ success: false, message: "No Conversation id" })
        } else {
            Conversation.findOne({_id: conversationId})
            .populate('users', '_id, userName')
            .populate('messages')
            .exec((err, conversation) => {
                if (err) {
                    res.json({ success: false, err, status: 501 });
                } else if(!conversation) {
                    res.json({ success: false, message: "No conversation found!", status: 401 });
                } else {
                    res.json({ success: true, conversation, status: 200 })
                }
            })
        }
    },

    deleteMessage: (req, res) => {
        const id = req.params.id;
        Conversation.findByIdAndRemove({_id: id})
        .exec((err, message) => {
            if (err) {
                res.json({ success: false, err, status: 501 });
            } else {
                res.json({ success: true, conversation, status: 200 });
            }
        })
    }
}