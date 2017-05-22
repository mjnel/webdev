var express = require("express");
var app = express();
var passport = require("passport");
var LocalStrategy = require ("passport-local");
var mongoose = require("mongoose");
var bodyParser = require ("body-parser");
var Campground = require ("./models/campground");
var Comment = require ("./models/comment");
var User = require ("./models/user");
var seedDB = require ("./seeds")



//**APP CONFIG** 

//adding campgrounds to the database
seedDB();
mongoose.connect ("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
// serving tjhe public directory - dirName is the directory which is served --> yelpcamp 
app.use(express.static(__dirname + "/public")); 





//**PASSPORT CONFIG**
app.use(require ("express-session")({
    secret: "Once again Rusty wins",
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser); 









//**ROUTES**


app.get("/", function(req, res){
    
    res.render("landing");
})


//INDEX- show all campgrounds  
app.get("/campgrounds", function(req, res){
    Campground.find({},function (err, allCampgrounds){
        if(!err){
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }else {
            console.log(err);
        }
    })
})


// CREATE - add new campground to db
app.post("/campgrounds", function (req, res){
    
    var campname = req.body.name;
    var campImage = req.body.image;
    var desc = req.body.description;
    
    var newCampGround = {
        name : campname,
        image: campImage,
        description: desc
    }
    
    Campground.create(newCampGround, function (err, newlyCreated){
        if (!err){
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }else {
            console.log(err);
        }
    })
})


//NEW - show form to make new campground
app.get("/campgrounds/new", function (req, res){
res.render("campgrounds/new");

})


// SHOW - shows more info about one campground
app.get("/campgrounds/:id",function(req, res){
    // find the campground with the ID.
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
         if(!err){
            res.render("campgrounds/show", {campground: foundCampground})
         }else {
             console.log(err);
         }
    })

    
})


app.get("/test/:var/yes", function(req, res){
    console.log("you hit test")
    res.send("Test");
    
})

//====================
// Comment routes    
//====================

// GET the comment form

app.get("/campgrounds/:id/comments/new", function(req, res){
    
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
app.post("/campgrounds/:id/comments", function (req, res){

    



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







app.listen(3000, function () {
  console.log('up on localhost:3000')
})

