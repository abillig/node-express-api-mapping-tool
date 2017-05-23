var express = require('express');
var router = express.Router();

// Require controller modules
var map_controller = require('../controllers/mapController');


router.get('/', function(req, res) {
  res.redirect('/maps/create');
});

router.get('/maps/create', map_controller.map_create_get);

router.post('/maps/create', map_controller.map_create_post);

router.get('/map/:id', map_controller.map_display2);

module.exports = router;
