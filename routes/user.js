const express=require("express");
const passport = require("passport");
const router=express.Router();
const User=require("../models/user.js");
const Listing = require("../models/listing.js");

const { savedRedirectUrl } = require("../middleware.js");

const userController = require("../controller/users.js");


router.route("/signup")
.get(userController.renderSignup)
.post(userController.signup);


router.route("/login")
.get(userController.renderLogin)
.post(
    savedRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    
    }),
   userController.login
);

router.get("/logout",userController.logout);


// router.route("/showsearch").post((req,res)=>{

//       // Use the name attribute of the input field

//     // Log the value to the console
//     console.log(req);
  
   



router.route('/showsearch')
.get(async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery;
        let listings = await Listing.find({ location: searchQuery })
            .populate('owner')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            });

        // Check if listings were found
        if (listings.length === 0) {
            req.flash('error', 'No listings found for the specified location');
            return res.redirect('/listings');
        }

        // Pass the data to the template
        res.render('users/showsearch', { allListings: listings, searchQuery });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal Server Error. Please try again later.');
        res.redirect('/listings');
    }
});


module.exports=router;
