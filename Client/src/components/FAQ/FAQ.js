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
      <h2 className="faq-header">Our <span className="highlight">FAQs</span></h2>
      
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => handleToggle(index)}>
              <span>{faq.question}</span>
              <span className="toggle-icon">{openIndex === index ? '✖' : '➕'}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
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
