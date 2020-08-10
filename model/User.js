var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    name : String,
    email : { type:String, required:true, unique:true},
    password : { type:String}       
},{timestamps:true});

userSchema.pre('save', function(next){
    if(this.password && this.isModified('password')){
        // bcrypt.hash(this.password, 10, (err, hashed)=>{
        //     if(err) return next(err);
        //     this.password = hashed;
        //     return next();
        // })
        this.password = bcrypt.hashSync(this.password,10)
    }
    next();
});

userSchema.methods.verifyPassword = function (password){
    return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('User', userSchema);