const express = require("express");
const router = express.Router();

//Insert Model

const Review = require("../Model/ReviewModel");

//Insert Controller

const ReviewController = require("../Controllers/Review");

router.get("/", ReviewController.getReviews);
router.post("/", ReviewController.createReview);
router.get("/:id", ReviewController.getReviewById);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);


module.exports = router;