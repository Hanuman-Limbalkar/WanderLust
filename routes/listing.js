const express = require("express");
const router = express.Router({ mergeParams: true });
const { listingSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,  // This should match the form's `name` attribute
    // (req, res) => {
    //     console.log(req.file); // Debugging: Log the uploaded file
    //     res.send("File uploaded successfully!");
    // }
    wrapAsync(listingController.createListing)
);


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
.route("/:id")
.get(wrapAsync(listingController.show))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));



module.exports = router;
