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
        <button className="btn hero-btn1 header-btns-automate-formatting_title" style={{marginBottom: "-20px"}}>
          Gain Insights into Your Data Integrity
        </button>
        <h2 className="quality-check-title" style={{marginBottom: "-10px"}}>
          Phone Number <span>Quality Check</span>
        </h2>
        <p className="workflow-description_txt" >
            Our app helps you identify and fix HubSpot phone number issues quickly. With
            the Smart Phone Number Check, spot formatting errors and detect invalid
            numbers instantly.
        </p>

        <div className="quality-check-features">
          <h3 className='title_quality_check_h3' style={{marginBottom: "-10px"}}>Comprehensive Error Detection</h3>
          <p className="workflow-description_txt">Generate reports to spot issues like missing country codes, invalid
          characters, or incorrect phone number lengths.</p>
            <hr/>
          <h3 className='title_quality_check_h3' style={{marginBottom: "-10px"}}>Data Quality Insights</h3>
          <p className="workflow-description_txt">Generate reports to spot issues like missing country codes, invalid
          characters, or incorrect phone number lengths.</p>
            <hr />
          <h3 className='title_quality_check_h3' style={{marginBottom: "-10px"}}>Actionable Intelligence</h3>
          <p className="workflow-description_txt">Use these reports to improve data entry, team training, and CRM workflows,
          reducing future errors.</p>
        </div>
      </div>
    </section>
  );
};

export default QualityCheckSection;
