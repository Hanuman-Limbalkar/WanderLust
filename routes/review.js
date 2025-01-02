const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const { validateReview, isLoggedIn, isReviewAuthor }  = require("../middleware.js");

const reviewController = require("../controller/reviews.js");

// Post Route for Reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
