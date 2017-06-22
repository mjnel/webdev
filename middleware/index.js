var Campground = require ("../models/campground")
var Comment  = require ("../models/comment")    


var middlewareObj = {}
    
    middlewareObj.checkCampgroundOwnership = function(req,res,next){
        if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundSite){
            if(err){
                res.redirect("back");
                
                }else{
                    //comparing the id from the found site and comparing against the request ID .equals is used as foundSite = object
                    if(foundSite.author.id.equals(req.user._id)){
                        next();                    }
                else{
                    res.redirect("back");
                }
                }
        })
        
        }
        
    } 
    
    
    
    middlewareObj.checkCommentOwnership= function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
                
                }else{
                    //comparing the id from the found site and comparing against the request ID .equals is used as foundSite = object
                    if(foundComment.author.id.equals(req.user._id)){
                        next();                    }
                else{
                    res.redirect("back");
                }
                }
        })
        
    }else {
        res.redirect("back"); 
    }
}
    
    
    
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else {
        //flash only works on the next page - do it before you redirect. 
        // error = key. Please login.. = value 
        req.flash("error", "Please Login First!")
        res.redirect("/login")}
}
    
    
    
module.exports = middlewareObj