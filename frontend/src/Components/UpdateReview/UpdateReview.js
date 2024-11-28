import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateReview.css";

const UpdateReview = () => {
  const { id } = useParams(); // Get the review ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        console.log("Fetching review with ID:", id); // Debug log
        const response = await axios.get(`http://localhost:5000/reviews/${id}`);
        if (response.data && response.data.review) {
          console.log("Fetched review data:", response.data.review); // Debug log
          const review = response.data.review;
          setTitle(review.title);
          setAuthor(review.author);
          setRating(review.rating);
          setReviewText(review.reviewText);
        } else {
          setMessage("No data found for this review.");
        }
      } catch (error) {
        setMessage("Error fetching review data.");
        console.error("Error fetching review data:", error); // Debug log
      }
    };
    fetchReview();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedReview = { title, author, rating, reviewText };

    try {
      console.log("Updating review with data:", updatedReview); // Debug log
      const response = await axios.put(
        `http://localhost:5000/reviews/${id}`,
        updatedReview
      );
      if (response.status === 200) {
        setMessage("Review updated successfully!");
        navigate("/reviewDetails"); // Redirect to the review list
      }
    } catch (error) {
      setMessage("Failed to update review.");
      console.error("Error updating review:", error); // Debug log
    }
  };

  return (
    <div className="update-review-container">
      <h1>Update Review</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleUpdate} className="update-review-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rating (1-5)</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            required
          />
        </div>
        <div className="form-group">
          <label>Review Text</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Update Review
        </button>
      </form>
    </div>
  );
};

export default UpdateReview;
