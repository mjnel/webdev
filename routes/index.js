var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res){

    res.render("landing");

    
});
    




router.get("/register", function(req, res){
    
    res.render("register")
})


router.post("/register", function(req, res){
    
    User.register(new User({username: req.body.username}),req.body.password , function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
            
            passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");

        });
        
    });
    
});

//Login

router.get("/login", function (req, res){
    console.log(res.locals.error);
    res.render("login");
    
})

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login" 
}))
    
    
    
//Logout

router.get("/logout", function(req, res){
    //passport is destroying data in the session 
      req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
})


//not using the this middleware in this code snippet - hence out. 
//function isLoggedIn(req, res, next){
//    if(req.isAuthenticated()){
//        return next();
//    }else {res.redirect("/login")}
//}

module.exports = router;
