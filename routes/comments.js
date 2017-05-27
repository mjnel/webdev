var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment")


//Comments New
router.get("/new", isLoggedIn, function(req, res){
    console.log(req.params.id);
   Campground.findById(req.params.id, function(err, foundcampground){
            if(!err){
                res.render("comments/new", {campground: foundcampground});
            }else{
                console.log(err);
            }
  })
     
})


//POST new comment

//find the campsite 
// add the comment to that campsites comment array

//My Go 

//comments create 
router.post("/", isLoggedIn, function (req, res){

    Campground.findById(req.params.id, function(err, foundSite){
     Comment.create(req.body.comment, function(err, comment){
         if(!err){
                    foundSite.comments.push(comment);
                    foundSite.save(function(err, data){
                        if(!err){
                            console.log(data);
                            
                        res.redirect("/campgrounds/" + data._id);
                        }else{
                            console.log(err);
                        }
                    })
         
     }
 })
})
})


//middleware - used
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else {res.redirect("/login")}
}



module.exports = router;