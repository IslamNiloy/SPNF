import React from 'react';
import './QualityCheck.css'; // Import the CSS for styling
import '../WorkFlowFunctionality/Workflow.css';

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
        <p className="workflow-description">
            Don’t want automated formatting? No worries! Our app can also find out what is
            wrong with your HubSpot phone numbers.
            <br />
            <br />
            With our Smart Phone Number Check, you can find the specific formatting issues
            happening with your contacts. Sometimes, your contacts can give you false
            numbers. Sometimes, an integration can insert additional data into the phone
            number field, making them unusable.
            <br />
            <br />
            With Smart Phone Number Formatter, you can get detailed reports on common
            misformatting scenarios. With this report, you can identify patterns, correct
            recurring issues, and ensure that your database remains clean and reliable.
        </p>

        <div className="quality-check-features">
          <h3>Comprehensive Error Detection</h3>
          <p className="workflow-description">Generate reports that identify phone numbers with incorrect or missing country
            codes, invalid characters within the property, too short or too long phone
            numbers, and other common issues.</p>
          <hr />
          <h3>Data Quality Insights</h3>
          <p className="workflow-description"> Get a clear overview of your data&#039;s health with visual representations of
            common misformatting issues, helping you take corrective action.</p>
          <hr />
          <h3>Actionable Intelligence</h3>
          <p className="workflow-description">Use these reports to refine your data entry processes, update training for
          your team, or even adjust your CRM workflows to minimise future errors.</p>
        </div>
      </div>
    </section>
  );
};

export default QualityCheckSection;
