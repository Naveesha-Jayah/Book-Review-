const Review = require("../Model/ReviewModel");

// Get all reviews display data
const getReviews = async (req, res, next) => {
  let Reviews;

  try {
    Reviews = await Review.find();
  } catch (err) {
    console.log(err);
  }

  if (!Reviews) {
    return res.status(404).json({ message: "Reviews not found" });
  }

  return res.status(200).json({ Reviews });
};

//Insert data function

const createReview = async (req, res, next) => {
  const { title, author, rating, reviewText } = req.body;

  let newReview;

  try {
    newReview = new Review({ title, author, rating, reviewText });
    await newReview.save();
  } catch (err) {
    console.log(err);
  }

  if (!newReview) {
    return res.status(404).json({ message: "Unable to add review" });
  }

  return res.status(200).json({ newReview });
};

//Get Review by id

const getReviewById = async (req, res, next) => {
  const { id } = req.params;

  let review;

  try {
    review = await Review.findById(id);
  } catch (err) {
    console.error("Error while fetching review:", err);
    return next(err);
  }

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  return res.status(200).json({ review });
};

//Update Review by id
const updateReview = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, rating, reviewText } = req.body;

  let review;

  try {
    // Find the review by ID
    review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review fields
    review.title = title || review.title;
    review.author = author || review.author;
    review.rating = rating !== undefined ? rating : review.rating; // Ensure 0 rating is not ignored
    review.reviewText = reviewText || review.reviewText;

    // Save the updated review
    await review.save();
  } catch (err) {
    console.error("Error while updating review:", err);
    return next(err); // Pass error to error-handling middleware
  }

  return res.status(200).json({ review });
};

//Delete User Details

const deleteReview = async (req, res, next) => {
  const { id } = req.params;

  let review;

  try {
    // Find the review by ID
    review = await Review.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!review) {
    return res.status(404).json({ message: "Unable to update review Details" });
  }
  return res.status(200).json({ review });
};



exports.getReviews = getReviews;
exports.createReview = createReview;
exports.getReviewById = getReviewById;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
