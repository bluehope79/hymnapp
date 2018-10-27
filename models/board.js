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

boardSchema.find().sort({'seq':1}).limit(645).exec(function(err,users){

      console.log("q2");


      return;

});

module.exports = mongoose.model('hymndata', boardSchema);
