var express = require("express");
var router = express.Router()   
var Campground = require ("../models/campground")


router.get("/", function(req, res){
    Campground.find({},function (err, allCampgrounds){
        if(!err){
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }else {
            console.log(err);
        }
    })
})




// CREATE - add new campground to db
router.post("/", isLoggedIn, function (req, res){
    
    var campname = req.body.name;
    var campImage = req.body.image;
    var desc = req.body.description;
    var author = { 
            id: req.user._id,
            username: req.user.username
        
    }
    
    var newCampGround = {
        name : campname,
        image: campImage,
        description: desc,
        author: author 
    }
    
    Campground.create(newCampGround, function (err, newlyCreated){
        if (!err){
            console.log(newCampGround);
            res.redirect("/campgrounds");
        }else {
            console.log(err);
        }
    })
})




//NEW - show form to make new campground
router.get("/new", isLoggedIn, function (req, res){
res.render("campgrounds/new");

})

//render - needs the route
// in the router - takes the parameters which are specified in the app file.

// SHOW - shows more info about one campground
router.get("/:id",function(req, res){
    // find the campground with the ID.
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
         if(!err){
            res.render("./campgrounds/show", {campground: foundCampground})
         }else {
             console.log(err);
         }
        })

    
})


//EDIT CAMPGROUND ROUTE


router.get("/:id/edit", function(req,res){
        Campground.findById(req.params.id, function(err, foundSite){
            if(err){
                res.redirect("/");
                
            }else{
                console.log(foundSite)
                res.send("EDIT THIS CAMPGROUND")
            }
                }
          )}
          )



//UPDATE CAMPGROUND ROUTE

//app.put("/blogs/:id", function(req, res){
//    req.body.blog.body = req.sanitize(req.body.blog.body);
//    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
//        if(!err){
//            console.log("updated");
//            res.redirect("/blogs/"+req.params.id);
//        }else{
//            console.log(err);
//        }
//    })
//    
//    //take ID of the blog
//    //update it with the new data. 
//})





function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else {res.redirect("/login")}
}




module.exports = router;
