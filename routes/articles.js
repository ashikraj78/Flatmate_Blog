var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var Article = require("../model/Article");
var Comment = require('../model/Comment')

router.get('/new',auth.verifyUserLogin, (req,res)=>{
    res.render('articleForm');
});

router.get('/',(req,res)=>{
    Article.find().populate('author','name email').exec((err, articles)=>{
        res.render('listArticles',{articles, message: req.flash('Error')})
    })
})
router.post('/',(req,res,next)=>{

    req.body.author = req.user._id; 
    Article.create(req.body, (err,article)=>{
        if(err) return next(err);
        res.redirect('/articles');
    })
})

// single article

router.get('/:articleId',(req,res, next)=>{
    var articleId = req.params.articleId;
    Article.findById(articleId)
    .populate('author','name email')
    .populate({
        path:'comments',
        populate:{
            path:'author',
        }}).exec((err, article)=>{
        res.render('singleArticle', {article})
    })
} )

// article delete
router.get('/:articleId/delete',auth.verifyUserLogin, (req,res,next)=>{
    var articleId = req.params.articleId;
    Article.findById(articleId, (err,article)=>{
        var blogUserId = article.author.toString();
        if(req.user._id == blogUserId){
            Article.findByIdAndDelete(articleId, (err, article)=>{
                res.redirect('/articles')
            })
        }else{
            req.flash('Error', "Unauthorised")
            res.redirect('/articles')
        }

    })
})


// article update

router.get('/:articleId/update',auth.verifyUserLogin, (req,res,next)=>{
    var articleId = req.params.articleId;
    Article.findById(articleId, (err,article)=>{
        var blogUserId = article.author.toString();
        if(req.user._id == blogUserId){
            res.render('updateArticle', {article})
        }else{
            req.flash('Error', "Unauthorised")
            res.redirect('/articles')
        }

    })
})

router.post('/:articleId/update', (req,res,next)=>{
    var articleId = req.params.articleId;
    Article.findByIdAndUpdate(articleId,req.body,{new:true},(err,article)=>{
        if(err) return next(err);
        res.redirect('/articles')
    })
})

// comment create
router.post('/:articleId/comments',(req,res,next)=>{
    var articleId = req.params.articleId;
    req.body.articleId = articleId;
    req.body.author=req.user.id;
    Comment.create(req.body,(err,comment)=>{
      if(err) return next(err);
      Article.findByIdAndUpdate(articleId,{$push :{comments : comment._id}},(err, article) =>{
        res.redirect('/articles/'+ articleId)
      })
    })
  })


module.exports = router;