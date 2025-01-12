import React, { useState, useEffect } from "react";
import "./index.css";
import { FaClockRotateLeft } from "react-icons/fa6";

const HealthCheckupPackages = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    fetch("https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config")
      .then((response) => response.json())
      .then((data) => {
        const featuredPackageData = data?.[0]?.page_config?.[2];
        if (featuredPackageData) {
          setData(featuredPackageData);

          const popularPackages = featuredPackageData.props[0].packages.filter((item) =>
            item.subCategories.includes("POPULAR")
          );
          const updatedPopularPackages = popularPackages.map((pkg) => ({
            ...pkg,
            testCount: 1,
          }));
          setFilteredPackages(updatedPopularPackages);
        }
      })
      .catch((error) => {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = (category) => {
    const uppercaseCategory = category.toUpperCase();
    console.log(uppercaseCategory);

    const categoryPackages = data?.props?.[0]?.packages.filter((item) =>
      item.subCategories.some(subCategory => subCategory.toUpperCase() === uppercaseCategory)
    );

    setFilteredPackages(categoryPackages || []);
  };

  const handlePackageClick = (packageName) => {
  };

  const handleTestCountChange = (packageItem, action) => {
    const updatedPackages = filteredPackages.map((pkg) => {
      if (pkg.packageDisplayName === packageItem.packageDisplayName) {
        const updatedPackage = { ...pkg };
        const newTestCount =
          action === 'increment' ? updatedPackage.testCount + 1 : updatedPackage.testCount - 1;
        updatedPackage.testCount = newTestCount;

        updatedPackage.price = action === 'increment'
          ? updatedPackage.price + 0
          : updatedPackage.price - 0; 
        return updatedPackage;
      }
      return pkg;
    });
    setFilteredPackages(updatedPackages);
  };

  if (loading) {
    return <p>Loading packages...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="health-checkup-packages">
      <div className="pp">
        <p className="main-head">{data?.heading}</p>
        <p className="viewall">View all</p>
      </div>
      <div className="categories">
        {Object.keys(data?.categories || {}).map((categoryId) => (
          <div key={categoryId} className="category">
            <ul className="package-items">
              {data?.categories[categoryId].map((category, index) => (
                <li
                  key={index}
                  className="single-package"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="packages">
        <h3>Health Check-up Packages:</h3>
        <div className="items">
          {filteredPackages?.map((packageItem, index) => (
            <div key={index} className="package-item">
              <div
                className="package-card"
                onClick={() => handlePackageClick(packageItem.packageDisplayName)}
              >
                <p>{packageItem.isSponsored ? "Sponsored" : null}</p>
                <h4>{packageItem.packageDisplayName}</h4>
                <p className="reports-text">
                  <FaClockRotateLeft className="clocks" /> {packageItem.reportsTatText}
                </p>
                <div className="all-1">
                  <div className="div1">
                    <p className="tests">
                      {packageItem.testsSummary.length} Tests
                    </p>
                    <ul className="ul1">
                      {packageItem.testsSummary.slice(0, packageItem.testCount).map((test, testIndex) => (
                        <li key={testIndex}>{test}</li>
                      ))}
                    </ul>
                  </div>
                  {packageItem.isRadiologyIncluded && (
                    <div className="radiology-container">
                      <p className="tests">Includes</p>
                      <p className="r1">Radiology</p>
                    </div>
                  )}
                  <div className="full-d">
                    {packageItem.fastingHoursText && (
                      <div className="fasting-container">
                        <p className="tests">Fasting</p>
                        <p className="r1">{packageItem.fastingHoursText}</p>
                      </div>
                    )}
                    {packageItem.isHomeSampleAvailable && (
                      <div className="home-container">
                        <p className="tests">Available</p>
                        <p className="Home">Home</p>
                      </div>
                    )}
                  </div>
                  <div className="kk1">
                  <div className="price">
                    <p className="tests">Price: ₹{packageItem.price}</p>
                  </div>
                  <div className="price-adjustment">
                    <button
                      onClick={() => handleTestCountChange(packageItem, 'decrement')}
                      disabled={packageItem.testCount === 1}
                    className="pps">
                      -
                    </button>
                    <span className="ssp">{packageItem.testCount}</span> 
                    <button
                      onClick={() => handleTestCountChange(packageItem, 'increment')}
                    className="pps">
                      +
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthCheckupPackages;
