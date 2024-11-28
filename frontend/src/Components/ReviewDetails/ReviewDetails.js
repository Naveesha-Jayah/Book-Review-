import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./ReviewDetails.css"; // Import the custom CSS

const URL = "http://localhost:5000/reviews"; // API endpoint for getting reviews

// Fetch reviews
const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { Reviews: [] }; // Return an empty array if the request fails
  }
};

// Delete review
const deleteHandler = async (id, setReviews, setAverageRating) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this review?");
  if (!confirmDelete) return; // If user cancels, don't proceed with the delete

  try {
    const response = await axios.delete(`http://localhost:5000/reviews/${id}`);
    if (response.status === 200) {
      alert("Review deleted successfully!");
      setReviews((prevReviews) => {
        const updatedReviews = prevReviews.filter((review) => review._id !== id);
        setAverageRating(calculateAverageRating(updatedReviews)); // Update the average rating
        return updatedReviews;
      });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    alert("Failed to delete review");
  }
};

// Calculate average rating
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // Return average to 1 decimal place
};

// Update review handler (redirects to update page)
const updateHandler = (id, navigate) => {
  navigate(`/update-review/${id}`); // Redirects to the update page
};

function ReviewDetails() {
  const [Reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate

  // Fetch reviews on component mount
  useEffect(() => {
    fetchHandler()
      .then((data) => {
        if (data.Reviews) {
          setReviews(data.Reviews);
          setAverageRating(calculateAverageRating(data.Reviews)); // Set initial average rating
        } else {
          setError("Failed to load reviews.");
        }
      })
      .catch(() => setError("Error fetching reviews."));
  }, []);

  return (
    <div className="review-details-container">
      <Nav />
      <div className="reviews-table-container">
        <h1 className="title">Review Details</h1>
        {error && <p className="error-message">{error}</p>}
        <h2 className="average-rating">Average Rating: {averageRating}/5</h2>

        {/* Table for displaying reviews */}
        <div className="reviews-table-wrapper">
          <table className="reviews-table">
            <thead>
              <tr>
                <th className="table-header">Title</th>
                <th className="table-header">Author</th>
                <th className="table-header">Rating</th>
                <th className="table-header">Review Text</th>
                <th className="table-header">Created At</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Reviews.length > 0 ? (
                Reviews.map((review) => (
                  <tr key={review._id}>
                    <td className="table-data">{review.title}</td>
                    <td className="table-data">{review.author}</td>
                    <td className="table-data">{review.rating}/5</td>
                    <td className="table-data">{review.reviewText}</td>
                    <td className="table-data">{new Date(review.createdAt).toLocaleDateString()}</td>
                    <td className="table-data actions">
                      <button
                        onClick={() => updateHandler(review._id, navigate)} // Pass navigate to updateHandler
                        className="update-btn"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteHandler(review._id, setReviews, setAverageRating)} // Pass setReviews and setAverageRating
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-reviews">No reviews available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetails;
