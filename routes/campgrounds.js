var express = require("express");
var router = express.Router()   
var Campground = require ("../models/campground");
var middleware = require ("../middleware");



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
router.post("/", middleware.isLoggedIn, function (req, res){
    
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
            res.redirect("/campgrounds");
        }else {
            console.log(err);
        }
    })
})




//NEW - show form to make new campground
router.get("/new", middleware.isLoggedIn, function (req, res){
res.render("campgrounds/new")
     
    //res.render("campgrounds/new");

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

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundSite){
            res.render("campgrounds/edit",{campground:foundSite})
                
                })
    })
  



//UPDATE ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
            
        }else{
            console.log("updated");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })

    //take ID of the blog
    //update it with the new data.
})


//DESTORY ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
Campground.findByIdAndRemove(req.params.id, function(err,removedCampground){
    if(!err){
        console.log("campground removed")
        res.redirect("/campgrounds");
    }else{
        res.redirect("/campgrounds");
        console.log(err);

    }
})    
})



 



module.exports = router;
