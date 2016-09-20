var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');


/* GET users listing. */
router.get('/', function(req, res, next) {
    Restaurant.find({}, function(e, restaurants) {
        res.json(restaurants);
    })
});

/* GET users listing. */
router.post('/', function(req, res, next) {
    var body = req.body;
    var newRestaurant = Restaurant(body);
  
    newRestaurant.save(function(e) {
        if(e) throw err;
        console.log('Restaurant created');
        res.json({ message : 'ok'});
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Restaurant.remove( { _id : id }, function(err) {
        if(err) {
            return res.status(500).send();
        }
        else {
            return res.status(200).send();
        }
    });
});


module.exports = router;
