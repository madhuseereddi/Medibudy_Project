import React, { useState, useEffect } from "react";
import "./index.css";

const FAQSection = () => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config')
      .then((response) => response.json())
      .then((data) => {
        const faqData = data[0]?.page_config?.[6]?.props || []; 
        setFaqData(faqData);
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id) => {
    setFaqData((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id ? { ...faq, isExpanded: !faq.isExpanded } : faq
      )
    );
  };

  if (loading) {
    return <p>Loading FAQs...</p>;
  }

  return (
    <div className="faq-section">
      <p className="faq-title">Frequently Asked Questions</p>
      <div className="faq-items">
        {faqData.map((faq) => (
          <div key={faq.id} className="faq-item">
            <div className="faq-question" onClick={() => toggleExpand(faq.id)}>
              <p className="faq-question-text">{faq.question}</p>
              <span className="toggle-icon">{faq.isExpanded ? "-" : "+"}</span>
            </div>
            {faq.isExpanded && (
              <div className="faq-answer">
                {faq.answer && <p>{faq.answer}</p>}
                {faq.points && (
                  <ul>
                    {faq.points.map((point, index) => (
                      <li key={index}>
                        {point.pnt}
                        {point.subpnt && (
                          <ul>
                            {point.subpnt.map((subpoint, subIndex) => (
                              <li key={subIndex} className="piii">{subpoint}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
