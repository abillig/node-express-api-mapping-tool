var Map = require('../models/map');
var async = require('async');
var parse = require('csv-parse/lib/sync');
var d3 = require("d3"),
jsdom = require("jsdom");
const { JSDOM } = jsdom;
var ObjectID = require('mongodb').ObjectID;
var db = require('../app.js')


exports.map_create_get = function(req, res, next) {
    var counties = ["Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua", "Chemung", "Chenango", "Clinton", "Columbia", "Cortland",
    "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene", "Hamilton", "Herkimer", "Jefferson", "Kings", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery", "Nassau",
    "New York", "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans", "Oswego", "Otsego",
    "Putnam", "Queens", "Rensselaer", "Richmond", "Rockland", "Saratoga", "Schenectady", "Schoharie",
    "Schuyler", "Seneca", "St Lawrence", "Steuben", "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster",
    "Warren", "Washington", "Wayne", "Westchester", "Wyoming", "Yates"]
    res.render('map_form', { title: 'Crjeate Map', counties: counties});
};


exports.map_create_post = function(req, res, next) {

console.log(req.body)
// console.log(req.body.counties)

    //Check that the name field is not empty
    req.checkBody('title', 'Title required').notEmpty();
    req.checkBody('color', 'Color required').notEmpty();
    req.checkBody('counties', 'Data required').notEmpty();


    //Trim and escape the name field.
    req.sanitize('title').escape();
    req.sanitize('title').trim();

    //Run the validators
    var errors = req.validationErrors();
      // console.log(req.body.counties)
    //Create a genre object with escaped and trimmed data.
    var map = new Map(
      { title: req.body.title,
        color: req.body.color,
        countyData: req.body.counties
        // countyData: JSON.parse("[" + req.body.countyData + "]")
        // countyData: parse(req.body.counties, {columns: true})

      }
    );

    // console.log(maptest)

    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('map_form', { title: 'Create Map', map: map, errors: errors});
    return;
    }
    else {
        // Data from form is valid.
        //Check if Map with same name already exists
                     map.save(function (err) {
                       if (err) { return next(err); }
                       console.log(err)
                       //Genre saved. Redirect to genre detail page
                       res.redirect('http://45.55.226.50/mapping-tool/dynamic_index.html?' + map.id);
                     });
             };
    }

    exports.map_display2 = function(req, res, next) {
      const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    console.log(details)

    // console.log(req)
    Map.findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log(item)
        res.send(item);
      }
    })

    }
