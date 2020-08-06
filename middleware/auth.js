var User = require("../model/User");


exports.verifyUserLogin = (req,res,next)=>{
    if(req.session && req.session.userId){
        next();
    }else{
        req.flash('Error', 'unauthenticated' )
        return res.redirect('/');
    }
}

exports.userInfo = (req,res,next)=>{
    var userId = req.session && req.session.userId;
    if(userId){
        User.findById(userId,"-password",(err,user)=>{
            req.user = user;
            res.locals.user = user;
            next();
        })
    } else{
        req.user = null;
        res.locals.user = null ; 
        next();
    }

}

