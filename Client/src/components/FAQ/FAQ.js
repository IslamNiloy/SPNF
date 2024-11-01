import React, { useState } from 'react';
import './FAQ.css'; // Import the CSS file

const FAQ = () => {
  // Define the FAQ data
  const faqs = [
    {
      question: "What countries does your app support?",
      answer: "Our app supports phone numbers from over 200 countries worldwide.",
    },
    {
      question: "Can I customize the formatting options?",
      answer: "Yes, you can customize the formatting options based on your needs.",
    },
    {
      question: "How does the app handle international phone numbers?",
      answer: "The app automatically formats international numbers according to the correct international standards.",
    },
    {
      question: "Is the app compatible with different platforms?",
      answer: "Yes, the app is compatible with multiple platforms including web and mobile.",
    },
    {
      question: "How secure is my data with your app?",
      answer: "We take data security seriously and ensure all information is encrypted.",
    },
    {
      question: "Is there a bulk formatting option?",
      answer: "Yes, you can format multiple phone numbers at once using our bulk formatting feature.",
    },
  ];

  // State to track which FAQ is open
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if the same FAQ is clicked again
    } else {
      setOpenIndex(index); // Open the clicked FAQ
    }
  };

  return (
    <section className="faq-section">
      <h2 className="faq-header" style={{marginBottom: "0px"}}>Our <span className="highlight">FAQs</span></h2>
      
      <div className="faq-container" id='FAQs'>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => handleToggle(index)}>
              <span>{faq.question}</span>
              <span className="toggle-icon">{openIndex === index ? <><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2362 21.6112C21.9873 21.8602 21.6497 22 21.2976 22C20.9456 22 20.608 21.8602 20.359 21.6112L3.01378 4.26597C2.76485 4.01704 2.625 3.67942 2.625 3.32738C2.625 2.97533 2.76485 2.63771 3.01378 2.38878C3.26271 2.13985 3.60033 2 3.95238 2C4.30442 2 4.64204 2.13985 4.89097 2.38878L22.2362 19.734C22.4852 19.983 22.625 20.3206 22.625 20.6726C22.625 21.0247 22.4852 21.3623 22.2362 21.6112Z" fill="#001B34"/>
              <path d="M22.2362 4.26597L4.89097 21.6112C4.64204 21.8602 4.30442 22 3.95238 22C3.60033 22 3.26271 21.8602 3.01378 21.6112C2.76485 21.3623 2.625 21.0247 2.625 20.6726C2.625 20.3206 2.76485 19.983 3.01378 19.734L20.359 2.38878C20.608 2.13985 20.9456 2 21.2976 2C21.6497 2 21.9873 2.13985 22.2362 2.38878C22.4852 2.63771 22.625 2.97533 22.625 3.32738C22.625 3.67942 22.4852 4.01704 22.2362 4.26597Z" fill="#001B34"/>
              </svg>
              </>: <><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_772_7455)">
              <path d="M12.625 24C12.3142 24 12.0161 23.8765 11.7964 23.6568C11.5766 23.437 11.4531 23.1389 11.4531 22.8281V1.17188C11.4531 0.861074 11.5766 0.563003 11.7964 0.343234C12.0161 0.123465 12.3142 0 12.625 0C12.9358 0 13.2339 0.123465 13.4536 0.343234C13.6734 0.563003 13.7969 0.861074 13.7969 1.17188V22.8281C13.7969 23.1389 13.6734 23.437 13.4536 23.6568C13.2339 23.8765 12.9358 24 12.625 24Z" fill="#001B34"/>
              <path d="M23.4531 13.1719H1.79688C1.48607 13.1719 1.188 13.0484 0.968234 12.8286C0.748465 12.6089 0.625 12.3108 0.625 12C0.625 11.6892 0.748465 11.3911 0.968234 11.1714C1.188 10.9516 1.48607 10.8281 1.79688 10.8281H23.4531C23.7639 10.8281 24.062 10.9516 24.2818 11.1714C24.5015 11.3911 24.625 11.6892 24.625 12C24.625 12.3108 24.5015 12.6089 24.2818 12.8286C24.062 13.0484 23.7639 13.1719 23.4531 13.1719Z" fill="#001B34"/>
              </g>
              <defs>
              <clipPath id="clip0_772_7455">
              <rect width="24" height="24" fill="white" transform="translate(0.625)"/>
              </clipPath>
              </defs>
              </svg>
              </>}</span>
            </div>
            {openIndex === index && (
              <div className="workflow-description_txt">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
