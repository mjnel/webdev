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


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else {res.redirect("/login")}
}




module.exports = router;
