import React, { useState, useEffect } from "react";
import "./index.css";

const ImageWithTitleDisplay = () => {
  const [data] = useState([
    {
      title: "Hyper-Tension",
      image: "/Frame 189963_page-0001.jpg"
    },
    {
      title: "Obesity",
      image: "/Frame 190046 (1)_page-0001.jpg"
    },
    {
      title: "Smoking",
      image: "/Frame 190047_page-0001.jpg"
    },
    {
      title: "Hyper-Tension",
      image: "/Frame 189963 (1)_page-0001.jpg"
    },
    {
      title: "Diabetic",
      image: "/Frame 190048_page-0001.jpg"
    },
    {
      title: "Obesity",
      image: "/Frame 190046_page-0001.jpg"
    }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <p></p>
      </div>
    );
  }

  return (
    <div className="image-with-title-display">
      <h3>LifeStyle Health Check Packages</h3>
      <div className="image-grid">
        {data?.map((item, index) => (
          <div key={index} className="image-item">
            <img src={item.image} alt={item.title} className="image1" />
            <p className="image-title">{item?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageWithTitleDisplay;
