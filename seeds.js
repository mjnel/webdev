var mongoose = require("mongoose");
var Campground = require ("./models/campground");
var Comment = require ("./models/comment");


var campData = [{
    name: "Clouds Rest", 
    image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel tortor mi. Nullam iaculis orci velit, ac laoreet justo euismod rhoncus. Proin lorem metus, tristique ac diam ac, porta sagittis felis. Ut vitae sagittis arcu. Duis tristique tempus urna id rutrum. Nulla bibendum ultricies mauris, sed elementum libero condimentum at. In vitae fermentum ipsum. In ultricies dignissim justo id laoreet. Sed risus nisl, sagittis quis nulla vel, semper dignissim nunc. Phasellus varius enim vel purus tincidunt scelerisque. Morbi non diam blandit, commodo eros nec, vestibulum lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque ut est eleifend, sollicitudin ante viverra, mattis enim. Quisque dui arcu, porttitor in ligula vitae, finibus malesuada nisi."
    
    
},{
    name: "Desert Mesa", 
    image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel tortor mi. Nullam iaculis orci velit, ac laoreet justo euismod rhoncus. Proin lorem metus, tristique ac diam ac, porta sagittis felis. Ut vitae sagittis arcu. Duis tristique tempus urna id rutrum. Nulla bibendum ultricies mauris, sed elementum libero condimentum at. In vitae fermentum ipsum. In ultricies dignissim justo id laoreet. Sed risus nisl, sagittis quis nulla vel, semper dignissim nunc. Phasellus varius enim vel purus tincidunt scelerisque. Morbi non diam blandit, commodo eros nec, vestibulum lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque ut est eleifend, sollicitudin ante viverra, mattis enim. Quisque dui arcu, porttitor in ligula vitae, finibus malesuada nisi."
    
    
},{
    name: "Beach", 
    image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel tortor mi. Nullam iaculis orci velit, ac laoreet justo euismod rhoncus. Proin lorem metus, tristique ac diam ac, porta sagittis felis. Ut vitae sagittis arcu. Duis tristique tempus urna id rutrum. Nulla bibendum ultricies mauris, sed elementum libero condimentum at. In vitae fermentum ipsum. In ultricies dignissim justo id laoreet. Sed risus nisl, sagittis quis nulla vel, semper dignissim nunc. Phasellus varius enim vel purus tincidunt scelerisque. Morbi non diam blandit, commodo eros nec, vestibulum lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque ut est eleifend, sollicitudin ante viverra, mattis enim. Quisque dui arcu, porttitor in ligula vitae, finibus malesuada nisi."
    
    
}]



function seedDB(){
    //Remove all campgrounds
      Campground.remove({}, function (err){})}
//        if(err){
//            console.log(err)
//                }else{
//                    console.log ("removed camgrounds");
//                    }
//                                        })
//      // add a new campgrounds
//      // seed = one object in the data array
//                    campData.forEach(function(seed){
//                    Campground.create(seed, function(err, campground){
//                   if(err){
//                       console.log(err);
//                   }else{
//                       console.log("added campground");
//                       //create a comment on each campground
//                       Comment.create({
//                                      text: "this place is great",
//                                      author: "Mark N"}, function(err, comment){
//                                    
//                                    if(!err){
//                                        campground.comments.push(comment);
//                                        campground.save();
//                                        console.log("Created Comments");           
//                                    }
//                            })
//                   }
//                })
//            })
//
//}





module.exports = seedDB;
                   