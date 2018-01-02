const Pharmacy = require('../models/Pharmacy.js');
const User = require('../models/User.js');
module.exports = {
    getAllPharmacies: (req, res) => {
        Pharmacy.find().populate('registeredBy')
            .exec(function(err, pharmacies) {
                if (err){
                     res.json({ success: false, err, status: 401 });
                } else {
                    res.json({ success: true, pharmacies, status: 200 });
                }
            })
    },
        

    getPharmacy: (req, res) => {
        let id = req.params.id;
        Pharmacy.findById(id).populate('registeredBy')
            .exec(function(err, pharmacy) {
                if (err) { 
                    res.json({ success: false, err, status: 401 });
                } else {
                  res.json({ success: true, pharmacy, status: 200 });
                }
            })
    },

    createPharmacies: (req, res) => {
        req.body.location = [req.body.longitude, req.body.latitude]
        let pharmacy = new Pharmacy(req.body);
        let registeredBy = req.body.registeredBy;
        User.findById(registeredBy).exec((err, owner) => {
            if (err) {
                res.json({ success: false, err, status: 501 });
                return false;
            }

            if (owner) {
                pharmacy.save((err) => {
                    if (err) {
                        res.json({ success: false,  err, status: 401 })
                    } else {
                        owner.pharmacies.push(pharmacy);
                        owner.save((err) => {
                          if (err) { 
                            res.json({success: true, err})
                          } else{
                            res.json({ success: true, message: 'Pharmacy has been saved!', status: 200 })
                          }
                        })
                    }
                })
            }
        })
    },



    deletePharmacy: (req, res) => {
        let id = req.params.id;
        Pharmacy.remove({ _id: id }).exec(function(err) {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, msg: 'Pharmacy has been removed', status: 200 })
            }
        })
    },

    updatePharmacy: (req, res) => {
        let id = req.params.id;
        let pharmacy = req.body;
        Pharmacy.update({_id: id }, pharmacy,  (err, pharmacy) => {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, pharmacy, status: 200 })
            }
        })
    },
    
     getNearerPhamacies: (req, res) => {
        var maxDistance = 1000 / 6371;

        let coords = [];
        coords[0] = req.query.longitude;
        coords[1] = req.query.latitude;
        Pharmacy.find({
            location: {
                $near: coords,
                $maxDistance: maxDistance
            }
        }).exec((err, pharmacies) => {
            if (err) {
                return res.json(err);
            }
            res.json({status: 200, pharmacies, success: true});
        })  
    },

    search: (req, res) => {
        let searchString = req.query.search;
        console.log(searchString)
        Pharmacy.find({$text: {$search: searchString}})
        .exec((err, results) => {
            if (err) {
                res.json({status: 404, err, success: false})
            } else {
                res.json({status: 200, results, success: true})
            }
        })
    }
}

