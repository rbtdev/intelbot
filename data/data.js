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
  var query = {}
  if (searchText) {
    query = {'$text':{'$search':searchText}};
  }
  Location.find( query, function (err, links) {
    if (err) {
      console.log("DB - find error: " + JSON.stringify(err));
    }
    cb(links);
  })
}
// function find (searchText) {
//   var items = [];
//   for (var i = 0; i<links.length; i++) {
//     var linkText = links[i].name + " " + links[i].area + " " + links[i].shortCode;
//     if (searchText) {
//       if (linkText.toLowerCase().search(searchText) > -1) {
//         items.push(links[i]);
//       }
//     }
//     else {
//       items.push(links[i]);     
//     }
//   }
//   return items;
// };

function load (url) {
  var Tabletop = require('tabletop');

  Tabletop.init( { key: url,
                   callback: function(data, tabletop) { console.log(data) },
                   simpleSheet: true } )
};

