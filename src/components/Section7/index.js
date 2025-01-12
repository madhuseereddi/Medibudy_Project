import React, { useState, useEffect } from "react";
import "./index.css";

const LabFeatures = () => {
  const [labFeatures, setLabFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config")
      .then((response) => response.json())
      .then((data) => {
        const features = data[0]?.page_config?.[7]?.props || [];
        console.log(features)
        setLabFeatures(features);
      })
      .catch((error) => {
        console.error("Error fetching lab features data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p></p>;
  }

  return (
    <div className="lab-features-section">
      <h2 className="section-title">Our Features</h2>
      <div className="features-container">
        {labFeatures.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={feature.img} alt={feature.title} className="feature-image" />
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-subtitle">{feature.subTitle}</p>
            <p className="feature-subtext">{feature.subText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabFeatures;
