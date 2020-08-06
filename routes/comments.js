var express = require('express');
var router = express.Router();
var Article = require('../model/Article');
var Comment = require('../model/Comment');

// delete comment
router.get('/:commentId/delete',(req,res,next)=>{
  var commentId = req.params.commentId;
  Comment.findByIdAndDelete(commentId,(err, comment)=>{
    res.redirect('/articles/'+comment.articleId)
  } )
})

// edit comment 
router.get('/:commentId/edit',(req,res,next)=>{
  var commentId = req.params.commentId;
  Comment.findById(commentId,{content:1},(err,comment)=>{
    if(err) return next(err);
    res.render('editComment',{comment})
  })
})
router.post('/:commentId',(req,res,next)=>{
  var commentId = req.params.commentId;
  Comment.findByIdAndUpdate(commentId,req.body,{new:true},(err,comment)=>{
    res.redirect('/articles/'+comment.articleId);
  } )
})



module.exports= router;
