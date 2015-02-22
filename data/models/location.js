var mongoose = require('mongoose');
var Schema = mongoose.Schema;
   
 var LocationSchema = new Schema({
    name: String,
    area: String,
    intelUrl: String,
    mapsUrl: String,
    shortCode: String
});

LocationSchema.index({ name: 'text', area: 'text', shortCode: 'text' })
module.exports = mongoose.model('Location', LocationSchema);