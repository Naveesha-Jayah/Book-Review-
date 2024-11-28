import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './AddReview.css'; // Import the CSS file for styling

const AddReview = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      title,
      author,
      rating,
      reviewText,
    };

    try {
      const response = await axios.post('http://localhost:5000/reviews', reviewData);
      if (response.status === 200) {
        setMessage('Review added successfully!');
        setTitle('');
        setAuthor('');
        setRating(1);
        setReviewText('');
      }
    } catch (error) {
      setMessage('Failed to add review');
      console.error(error);
    }
  };

  return (
    <div className="add-review-container">
      <Nav />
      <div className="form-container">
        <h1 className="form-title">Add Review</h1>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rating (1-5)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Review Text</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="form-textarea"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-btn">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
