const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReviewModel", reviewSchema);
