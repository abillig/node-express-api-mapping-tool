var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MapSchema = Schema({
  title: {type: String, required: true},
  color: {type: String, required: true},
  countyData: {type: Object, required: true}
});


MapSchema
.virtual('url')
.get(function () {
  return '/map/' + this._id;
});




//Export model
module.exports = mongoose.model('Map', MapSchema);
