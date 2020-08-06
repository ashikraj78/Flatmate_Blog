var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var articleSchema = new Schema({
    title :{type: String , required :true},
    description :{type : String},
    author : {type:Schema.Types.ObjectId, required:true , ref:'User'},
    comments : [{type:Schema.Types.ObjectId, ref:'Comment'}]
}, {timestamps:true});

module.exports = mongoose.model('Article',articleSchema);