/**
 * Created by ss on 2018-07-11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var boardSchema = new Schema({
    seq : Number, 
    title: String,
    contents: String
});



module.exports = mongoose.model('hymndata', boardSchema);
