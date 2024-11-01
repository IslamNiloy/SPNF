import React from 'react';
import './Workflow.css'; // CSS for styling

const WorkflowSection = () => {
  return (
    <section className="workflow-container">
      {/* Left side content */}
      <div className="workflow-content">
        <button className="btn hero-btn1 header-btns-automate-formatting_title ">
          Automate Your Phone Number Formatting
        </button>
        <h2 className="workflow-title_P">Workflow <span> &nbsp;Functionality</span></h2>

        <p className="workflow-description_txt">
            No need to export data! Just add the Smart Phone Number Formatter to your
            HubSpot workflow, and it’ll automatically format all phone numbers to the
            correct standards.
          </p>
        <div className="workflow-features">
          <h3>Automated Operations</h3>
          <p className="workflow-description_txt">No more manual phone number formatting—reduce errors and boost HubSpot
          efficiency.</p>
          <hr/>
          <h3 className='workflow-features_h3'>Customisable Triggers and Actions</h3>
          <p className="workflow-description_txt">Use triggers like new contacts or data imports to format numbers automatically
          in real-time.</p>
          <hr/>
          <h3 className='workflow-features_h3'>Enhanced Data Consistency</h3>
          <p className="workflow-description_txt">Ensure consistent phone formatting across your CRM for accurate communication
          and reporting.</p>
        </div>
      </div>

      {/* Right side image */}
      <div className="image-wrapper">
        <div className="image-back">
          <img src="/WorkflowSection/background.png" alt="Background Image" />
        </div>
        <div className="image-front">
          <img src="/WorkflowSection/image.png" alt="Background Image" />
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
