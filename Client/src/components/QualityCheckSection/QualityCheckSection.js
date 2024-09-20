import React from 'react';
import './QualityCheck.css'; // Import the CSS for styling

const QualityCheckSection = () => {
  return (
    <section className="quality-check-container">
      {/* Left side image */}
      <div className="image-wrapper_qc">
        <div className="image-back_qc">
          <img src="/WorkflowSection/background.png" alt="Background Image" />
        </div>
        <div className="image-front_qc">
          <img src="/QualityCheck/image.png" alt="Background Image" />
        </div>
      </div>

      {/* Right side content */}
      <div className="quality-check-content">
        <button className="btn hero-btn1">
          Gain Insights into Your Data Integrity
        </button>
        <h2 className="quality-check-title">
          Phone Number <span>Quality Check</span>
        </h2>
        <p className="quality-check-description">
          Understanding and maintaining data integrity is crucial for any business. The HubSpot Phone Number Formatter not only formats phone numbers but also provides detailed reports on common misformatting scenarios. With these insights, you can identify patterns, correct recurring issues, and ensure that your database remains clean and reliable.
        </p>

        <div className="quality-check-features">
          <h3>Comprehensive Error Detection</h3>
          <p>Automatically generate reports that identify phone numbers with incorrect or missing country codes, invalid formats, and other common issues.</p>
          <hr />
          <h3>Data Quality Insights</h3>
          <p>Get a clear overview of your data's health with visual representations of common misformatting issues, helping you take corrective action.</p>
          <hr />
          <h3>Actionable Intelligence</h3>
          <p>Use these reports to refine your data entry processes, update training for your team, or even adjust your CRM workflows to minimize future errors.</p>
        </div>
      </div>
    </section>
  );
};

export default QualityCheckSection;
