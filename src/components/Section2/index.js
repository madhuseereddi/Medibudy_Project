import React, { useState, useEffect } from "react";
import "./index.css";

const BannerGallery = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config')
      .then((response) => response.json())
      .then((data) => {
         const bannerData = data[0]?.page_config?.[1]?.props?.filter(item => item.isActive === true).map(item => ({
          bannerUrl: item.bannerUrl,
          deeplink: item.deeplink,
          order: item.order,
        }));
        
        if (bannerData) {
          setBanners(bannerData); 
        }
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (deeplink) => {

    window.open(deeplink, '_blank');
  };

  if (loading) {
    return <p>Loading banners...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="banner-gallery">
      {banners.length > 0 ? (
        banners.map((banner, index) => (
          <div key={index} className="banner-item" onClick={() => handleClick(banner.deeplink)}>
            <img
              src={banner.bannerUrl}
              alt={`Banner ${index + 1}`}
              className="gallery-banner"
            />
          </div>
        ))
      ) : (
        <p>No banners available.</p>
      )}
    </div>
  );
};

export default BannerGallery;
