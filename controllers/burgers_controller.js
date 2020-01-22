var express = require("express");

var router = express.Router();

var db = require('../models/');


// ****** Create routes ********

// get route - read or retrieve ✅ 
router.get('/', function (req, res) {
  db.Burger.findAll({})
    .then(function (data) {
      var plainData = JSON.parse(JSON.stringify(data));
      console.log('plainData', plainData);
      // console.log(data)
      var hbsObj = {
        burgers: plainData
      };
      console.log('hbsObj from controllers', hbsObj);
      res.render('index', hbsObj)

    });
});

// post route - create burger - sequelize format ✅ 
router.post('/api/burgers', function (req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name,
    devoured: req.body.devoured
  }).then(function (data) {
    res.json(data);
  })
})

// put route - sequelize ✅ 
router.put('/api/burgers', function (req, res) {
  console.log('req.body', req.body);
  db.Burger.update({
    // burger_name: req.body.burger_name,
    devoured: req.body.devoured
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(function (data) {
      res.json(data);
    });
});

// delete route - sequelize ✅ 
router.delete('/api/burgers/:id', function (req, res) {
  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (data) {
      res.json(data)
    });
});

// Export routes for server.js to use.
module.exports = router;
