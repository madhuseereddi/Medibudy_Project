import React, { useState, useEffect } from "react";
import "./index.css";

const ResponsiveImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config')
      .then((response) => response.json())
      .then((data) => {
        const imageData = data[0]?.page_config?.[0]?.props?.map(item => ({
          iconUrl: item.iconUrl,
          iconText: item.iconText,
          deeplink: item.deeplink
        }));
        
        if (imageData) {
          setImages(imageData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = (deeplink) => {
    window.open(deeplink, '_blank');
  };

  return (
    <div className="image-gallery">
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="image-item" onClick={() => handleClick(image.deeplink)}>
            <img
              src={image.iconUrl}
              alt={`Thumbnail ${index + 1}`}
              className="gallery-image"
            />
            <p className="icon-text">{image.iconText}</p>
          </div>
        ))
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default ResponsiveImageGallery;
