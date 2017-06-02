var express = require("express");
var app = express();
var passport = require("passport");
var LocalStrategy = require ("passport-local");
var mongoose = require("mongoose");
var bodyParser = require ("body-parser");
var methodOverride = require ("method-override");


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
app.use(methodOverride("_method"));



//**PASSPORT CONFIG**
app.use(require ("express-session")({
    secret: "Once again Rusty wins",
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 



// setting the response to contain the current user name
app.use(function (req, res, next){
    res.locals.currentUser= req.user;
    next(); 
});


//requring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require ("./routes/index");


// pre-pending the routes with their relavent data
app.use("/campgrounds/:id/comments/", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);





app.listen(3000, function () {
  console.log('up on localhost:3000')
})

