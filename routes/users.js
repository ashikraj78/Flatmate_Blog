var express = require('express');
var router = express.Router();
var User = require('../model/User');
var auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res, next)=>{
  res.render('register',{ message: req.flash('Error')})
});


router.post('/register', (req,res,next)=>{
  var{email, password} = req.body;
  if(password.trim()=== ""){
    req.flash('Error', 'Password required'); 
      return res.redirect('/users/register')

  }


  User.create(req.body, (err, createdUser)=>{
    if(err) return next(err)
    res.redirect('/users/login');
  })
})

router.get('/login', (req,res,err)=>{

  res.render('loginForm',{ message: req.flash('Error')});
})


router.post('/login', (req,res,next)=>{
  var{email, password} = req.body;

  if(!email || !password){
    req.flash('Error', 'Email & Password required'); 
      return res.redirect('/users/login')
  }
 

  User.findOne({email},(err, user)=>{
    // condition 1
    if(err) return next(err);

    // condition 2
    if(!user){
      req.flash('Error', 'Email is not register'); 
      return res.redirect('/users/login')
    }
    // condition 3 - verify the password
    if(!user.verifyPassword(password)){ 
      req.flash('Error', 'Password wrong')
      return res.redirect('/users/login');
    }
    // loggin User
    // creating a session on server side
    req.session.userId = user.id;
    res.redirect('/articles')
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/users/login')
})

module.exports = router;
