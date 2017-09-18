var User = require('../models/User.js');
var Pharmacy = require('../models/Pharmacy.js');
var jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

module.exports = {

    registerUser: function(req, res) {
        if (!req.body.contact.email && !req.body.password) {
            res.json({ success: false, message: 'Please enter email and password.' })
        } else {
            var newUser = new User(req.body);
             newUser.contact.coordinates = [newUser.contact.lng, newUser.contact.lat];
            newUser.save((err) => {
                if (err) {
                    return res.json({ success: false, message: err });
                } else {
                    var token = jwt.sign(newUser, process.env.SECRET, {
                        expiresIn: 10080 // in seconds
                    });
                    res.json({ success: true, user: newUser, token: token, message: 'Successfully created new user.' });
                }
            })
        }
    },

     updateUser: function(req, res) {
            let id = req.params.id;
            let updateParams = req.body;
            User.findOneAndUpdate({_id: id}, updateParams).exec((err, user) => {
                if (user) {
                    res.json({ success: true, user, message: 'Successfully update user.' });
                }
            })
    },

    getAllUsers: (req, res) => {
        User.find()
            .exec(function(err, users) {
                if (err){
                     res.json({ success: false, err, status: 401 });
                } else {
                    res.json({ success: true, users, status: 200 });
                }
            })
    },

    getAUser: (req, res) => {
        const id = req.params.id;
        User.findById(id).populate('pharmacies')
            .exec(function(err, user) {
                if (err){
                     res.json({ success: false, err, status: 401 });
                } else {
                    res.json({ success: true, user, status: 200 });
                }
            })
    },


    permanentlyDeleteUser: (req, res) => {
        let id = req.params.id;
        User.remove({ _id: id }).exec(function(err) {
            if (err) {
                res.json({ success: false, error: err, status: 401 });
            } else {
                res.json({ success: true, msg: 'User has been pamanetly deleted', status: 200 });
            }
        })
    },


    toggleAdminShip: (req, res) => {
        let userId = req.body.userId;
        User.findById(userId).exec((err, user) => {
            if (user) {
                user.admin = !user.admin
                let msg = user.admin? 'User is now an admin': 'User has been remove as an admin'
                user.save((err) => {
                    res.json({success: true, message: msg, status: 200});
                })
            } else {
               res.json({success: false, message: 'No user found', status: 200});
            }
           
        });
    },

    toggleBan: (req, res) => {
        let userId = req.body.userId;
        User.findById(userId).exec((err, user) => {
            if (user) {
                user.ban = !user.ban
                user.banAt = Date.now();
                let msg = user.ban? 'User has been banned': 'User has been unbaned'
                user.save((err) => {
                    res.json({success: true, message: msg, status: 200});
                })
            } else {
               res.json({success: false, message: 'No user found', status: 200});
            }
           
        });
    },

    toggleDelete: (req, res) => {
        let userId = req.body.userId;
        User.findById(userId).exec((err, user) => {
            if (user) {
                user.deleted = !user.deleted
                let msg = user.deleted? 'User has been deleted': 'User has been undelete'
                user.save((err) => {
                    res.json({success: true, message: msg, status: 200});
                })
            } else {
               res.json({success: false, message: 'No user found', status: 200});
            }
           
        });
    },


    addUserToPhamarcy: (req, res) => {
        let pharmacyId = req.body.pharmacyId; // the pharmacy which the which the user wants to be added to.
        let pharmacyOwnerId = req.body.pharmacyOwnerId; // the owner or the admin of a pharmacy
        let userId = req.body.userId; // the user to that's to be added to the pharmacy

        // make sure all params a supplied
        if (!pharmacyId) { 
            res.json({ success: false, message: 'Supply a pharmacy id', status: 401 });
            return false
        }

        if (!pharmacyOwnerId) {
             res.json({ success: false, message: 'Supply a pharmacyOwner id', status: 401 }); 
             return false
        }

        if (!userId) { 
            res.json({ success: false, message: 'Supply a user id', status: 401 });
            return false
        }



        User.findById(pharmacyOwnerId).exec((err, pharmacyOwner) => {
            if (pharmacyOwner) { // find pharmacy ownwer
                User.findById(userId).exec((err, user) => { // find the user we wnat to add
                    if (user) { // find user and and check for duplicate. 
                        Pharmacy.findById(pharmacyId).exec((err, pharmacy) => {
                            if (err) { res.json({ success: false, err, status: 401 }) } 
                            if (pharmacy) {
                                pharmacy.employees.push(user._id)
                                pharmacy.save((err) => {
                                    if (err) {
                                        res.json({ success: false, err, status: 501 });
                                    } else {
                                      res.json({ success: true, message: 'Added', status: 200 });  
                                    }
                                })
                            } else {
                                res.json({ success: false, message: 'Paramcy was no found', status: 501 });
                            } 
                        })
                    } else {    
                        res.json({ success: false, message: 'User has already been added or not found', status: 401 });
                    }
                });
            } else {
                res.json({ success: false, message: 'Cannot find the pharmacy owner', status: 401 });
            }
        });
    },



    removeUserFromPharmacy: (req, res) => {
        let pharmacyId = req.body.pharmacyId; // the pharmacy which the which the user wants to be added to.
        let pharmacyOwnerId = req.body.pharmacyOwnerId; // the owner or the admin of a pharmacy
        let userId = req.body.userId; // the user to that's to be added to the pharmacy

        Pharmacy.findById(pharmacyId).exec((err, pharmacy) => {
            if (pharmacy) {
                pharmacy.employees.pull({_id: userId})
                pharmacy.save((err) => {
                    res.json({ success: true, message: 'removed', status: 200 });
                })
            } else {
                res.json({ success: false, message: 'Pharmacy not found', status: 401 });
            }
        })
    }
    

}