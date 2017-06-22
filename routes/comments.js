var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require ("../middleware");



//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
//    var currentUser = req.username.username;
   Campground.findById(req.params.id, function(err, foundcampground){
            if(!err){
                res.render("comments/new", {campground: foundcampground});
            }else{
                console.log(err);
            }
  })
     
})


//EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
// looking up the comment which is URL. That gets there by cycling through each comment on the FE and exposing a link out including the comment ID in the URL.     
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            res.redirect("back")
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});    

        }
    })
    });




//UPDATE

router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(!err){
            console.log("updated")
            res.redirect("/campgrounds/" + req.params.id);            
        }else{
            console.log(err);
            res.redirect("back");
        }
    })
})



//Delete 


router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
        res.redirect("back");
        console.log(err);

    }else{
        console.log("comment removed")
        res.redirect("/campgrounds/"+ req.params.id);

    }
})     
})










//comments create 
router.post("/", middleware.isLoggedIn, function (req, res){

    Campground.findById(req.params.id, function(err, foundSite){
     Comment.create(req.body.comment, function(err, newComment){
         if(!err){
             // add username and ID to comment
              newComment.author.id = req.user._id;
              newComment.author.username = req.user.username;
              newComment.save();
              
              console.log(newComment);
             
             
             // save comment
             
                    foundSite.comments.push(newComment);
                    foundSite.save(function(err, data){
                        if(!err){
//                            console.log(data);
                            
                        res.redirect("/campgrounds/" + data._id);
                        }else{
                            console.log(err);
                        }
                    })
         
     }
 })
})
})



module.exports = router;