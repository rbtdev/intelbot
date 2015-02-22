var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}};       
var mongodbUri = process.env.PROD_MONGODB;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var Location = require('./models/location.js');

mongoose.connect(mongooseUri, options);
console.log("MongoDB connection URI = " + mongodbUri)
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log("MongoDB opened.");
});

module.exports = {
  find: find,
  load: load
}

function find (searchText, cb) {
  if (searchText) {
    searchText = '\"' + searchText + '\"';
  }
  Location
    .find(searchText?{'$text':{'$search':searchText}}:{})
    .sort('name')
    .exec(function (err, links) {
      err?console.log("DB - find error: " + JSON.stringify(err)):null;
      cb(links?links:[]);
  })
}

function load(fileUrl, cb) {
  var fs = require('fs');
  var request = require('request');
  request(fileUrl).pipe(fs.createWriteStream('farm.csv'))
  cb("done");
}
// function load (url) {
//   var Tabletop = require('tabletop');

//   Tabletop.init( { key: url,
//                    callback: function(data, tabletop) { console.log(data) },
//                    simpleSheet: true } )
// };

