const Pharmacy = require('../models/Pharmacy.js');
module.exports = {
    getAllPharmacies: (req, res) => {
        Pharmacy.find()
            .exec(function(err, pharmacies) {
                if (err){
                     res.json({ success: false, err, status: 401 });
                } else {
                    res.json({ success: false, pharmacies, status: 200 });
                }
            })
    },

    getPharmacy: (req, res) => {
        let id = req.params.id;
        Pharmacy.findById(id)
            .exec(function(err, pharmacy) {
                if (err) { 
                    res.json({ success: false,err, status: 401 });
                } else {
                  res.json({ success: true, pharmacy, status: 200 });
                }
            })
    },

    createPharmacies: (req, res) => {
        let pharmacy = new Pharmacy(req.body);
        pharmacy.save((err) => {
            if (err) {
                res.json({ success: false, error: err, status: 401 })
            } else {
                res.json({ success: true, message: 'Pharmacy has been saved!', status: 200 })
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
    }  
}

