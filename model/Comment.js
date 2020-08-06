var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content : {type:String, require:true},
    articleId :{type:Schema.Types.ObjectId, require:true, ref:"Article"},
    author : {type:Schema.Types.ObjectId,require:true, ref:'User'}
},{timestamps:true});

module.exports = mongoose.model('Comment', commentSchema);
