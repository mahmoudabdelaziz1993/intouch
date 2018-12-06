const keys = require('./keys');
var mongoose = require('mongoose');
mongoose.connect(keys.mongo.url);
module.exports = {mongoose};
