import React, { useState, useEffect } from "react";
import "./index.css";

const WhatUsersSay = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the provided API
    fetch('https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config')
      .then((response) => response.json())
      .then((data) => {
        // Extract the reviews data from the response
        const reviewsData = data[0]?.page_config?.[5]?.props || [];
        setReviews(reviewsData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p></p>;
  }

  return (
    <div className="what-users-say">
      <h2>What our Users say</h2>
      <div className="reviews-section">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-rating">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>
              <p className="review-content">{review.content}</p>
              <p className="review-author">
                <strong>{review.name}</strong> - <span>{review.days}</span>
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default WhatUsersSay;
