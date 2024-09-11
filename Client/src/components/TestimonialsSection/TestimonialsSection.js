import React from 'react';
import './TestimonialsSection.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      {/* First Testimonial */}
      <div className="testimonial-card">
        <div className="testimonial-quote">
          <p>
            <span className="quote-icon">“</span> This app has been a lifesaver for our customer service team.
            It's so easy to use and saves us a ton of time.
          </p>
          <p className="author-name">— John Abraham</p>
          <p className="author-title">Customer Service Manager, PinkCube</p>
        </div>
        <div className="testimonial-image">
          <img src="/Testimonials/1.png" alt="John Abraham" />
        </div>
      </div>

      {/* Second Testimonial */}
      <div className="testimonial-card reverse">
      <div className="testimonial-quote">
          <p>
            <span className="quote-icon">“</span> The phone number formatter is a must-have for anyone who deals
            with international phone numbers. It's accurate and reliable.
          </p>
          <p className="author-name">— Tomnoy Baidya</p>
          <p className="author-title">Sales Representative, HubXpert</p>
        </div>
        <div className="testimonial-image">
            <img src="/Testimonials/2.png" alt="John Abraham" />
        </div>
      </div>

      {/* Section Title */}
      <h2 className="section-title">Client's Testimonials</h2>
    </section>
  );
};

export default Testimonials;
