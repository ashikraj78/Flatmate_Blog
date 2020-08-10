var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var articleSchema = new Schema({
    title :{type: String , required :true},
    description :{type : String},
    author : {type:Schema.Types.ObjectId, required:true , ref:'User'},
    likes : {type:Number, default:0},
    likesUser:[{type:Schema.Types.ObjectId, ref:'User'}],
    followUser:[{type:Schema.Types.ObjectId, ref:'User'}],
    comments : [{type:Schema.Types.ObjectId, ref:'Comment'}]
}, {timestamps:true});

module.exports = mongoose.model('Article',articleSchema);