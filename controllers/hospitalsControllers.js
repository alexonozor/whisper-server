const Hospital = require('../models/Hospital.js');
const User = require('../models/User.js');
module.exports = {
  getAllHospitals: (req, res) => {
    Hospital.find().populate('registeredBy')
      .exec(function (err, hospitals) {
        if (err) {
          res.json({ success: false, err, status: 401 });
        } else {
          res.json({ success: true, hospitals, status: 200 });
        }
      })
  },

  getHospital: (req, res) => {
    let id = req.params.id;
    Hospital.findById(id).populate('registeredBy')
      .exec(function (err, hospital) {
        if (err) {
          res.json({ success: false, err, status: 401 });
        } else {
          res.json({ success: true, hospital, status: 200 });
        }
      })
  },

  createHospital: (req, res) => {
    req.body.location = [req.body.longitude, req.body.latitude]
    let hospital = new Hospital(req.body);
    let registeredBy = req.body.registeredBy;
    User.findById(registeredBy).exec((err, owner) => {
      if (err) {
        res.json({ success: false, err, status: 501 });
        return false;
      }

      if (owner) {
        hospital.save((err) => {
          if (err) {
            res.json({ success: false, err, status: 401 })
          } else {
            owner.hospitals.push(hospital);
            owner.save((err) => {
              if (err) {
                res.json({ success: true, err })
              } else {
                res.json({ success: true, message: 'Hospital has been saved!', status: 200 })
              }
            })
          }
        })
      }
    })
  },



  deleteHospital: (req, res) => {
    let id = req.params.id;
    Hospital.remove({ _id: id }).exec(function (err) {
      if (err) {
        res.json({ success: false, error: err, status: 401 })
      } else {
        res.json({ success: true, msg: 'Hospital has been removed', status: 200 })
      }
    })
  },

  updateHospital: (req, res) => {
    let id = req.params.id;
    let hospital = req.body;
    Hospital.update({ _id: id }, hospital, (err, hospital) => {
      if (err) {
        res.json({ success: false, error: err, status: 401 })
      } else {
        res.json({ success: true, hospital, status: 200 })
      }
    })
  },

  getNearerHospitals: (req, res) => {
    let coords = [];
    coords[0] = req.query.longitude;
    coords[1] = req.query.latitude;
    Hospital.find({
      location: {
        $near: coords
      }
    }).limit(10).exec((err, hospitals) => {
      if (err) {
        return res.json(err);
      }
      res.json({ status: 200, hospitals, success: true });
    })
  },

  search: (req, res) => {
    let searchString = req.query.search;
    Hospital.find({ 'name': new RegExp(searchString, 'i') })
      .exec((err, results) => {
        if (err) {
          console.log(err)
        } else {
          res.json({ success: true, results, status: 200 });
        }
      })
  }
}