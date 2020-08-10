var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../model/User');
var auth = require('../middleware/auth')

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    var email = profile._json.email;
    User.findOne({ email }, (err, user) => {
        if(err) return cb(err, false);
        if(!email) {
            User.create({
                name: profile.displayName,
                email: profile._json.email,
            }, (err,user)=>{
                if(err) return cb(err,false);
                cb(null, user);
            })
        }
        cb(null, user);
    })
    
  }
));
passport.serializeUser((user, cb)=>{
    cb(null, user.id);
})

passport.deserializeUser(function(id, cb) {
    User.findById(id,(err, user)=>{
        if(err) return cb(err,false);
        cb(null, user);
    });
});
