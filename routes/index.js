var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res){
    
    res.render("landing");
})



router.get("/register", function(req, res){
    
    res.render("register")
})


router.post("/register", function(req, res){
    
    User.register(new User({username: req.body.username}),req.body.password , function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
            
            passport.authenticate("local")(req, res, function(){
            console.log("success!");
            res.redirect("/campgrounds");

        });
        
    });
    
});

//Login

router.get("/login", function (req, res){
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
    res.redirect("/campgrounds");
})


//not using the this middleware in this code snippet - hence out. 
//function isLoggedIn(req, res, next){
//    if(req.isAuthenticated()){
//        return next();
//    }else {res.redirect("/login")}
//}

module.exports = router;
