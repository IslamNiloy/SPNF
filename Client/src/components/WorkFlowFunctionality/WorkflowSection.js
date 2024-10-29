import React from 'react';
import './Workflow.css'; // CSS for styling

const WorkflowSection = () => {
  return (
    <section className="workflow-container">
      {/* Left side content */}
      <div className="workflow-content">
        <button className="btn hero-btn1 header-btns-automate-formatting" style={{marginBottom: "-5px"}}>
          Automate Your Phone Number Formatting
        </button>
        <h2 className="workflow-title" style={{marginBottom: "-5px"}}>Workflow <span>Functionality</span></h2>
        <p className="workflow-description" style={{marginBottom: "-5px"}}>
          With the Smart Phone Number Formatter, you don’t have to export your data to
          another platform! You can just add a simple action to a HubSpot workflow, and
          Smart Phone Number Formatter will take care of all your number formatting
          issues!
          <br/> <br/>
          
          Whether you&#039;re dealing with incoming leads, customer data updates, or
          bulk data imports, our app ensures that every phone number is automatically
          formatted according to the correct international standards, all within your
          HubSpot workflow.
          </p>
        <div className="workflow-features">
          <h3 style={{marginBottom: "-5px"}}>Automated Operations</h3>
          <p className="workflow-description" style={{marginBottom: "-25px"}}>You’ll never have to manually format phone numbers anymore. So you’ll reduce
          the risk of errors, and make your HubSpot work more efficiently.</p>
          <hr />
          <h3 style={{marginBottom: "-5px"}}>Customisable Triggers and Actions</h3>
          <p className="workflow-description" style={{marginBottom: "-25px"}}> Set up triggers based on specific actions, such as new contact creation or
          data import, to automatically format phone numbers in real-time.</p>
          <hr />
          <h3 style={{marginBottom: "-5px"}}>Enhanced Data Consistency</h3>
          <p className="workflow-description" style={{marginBottom: "-5px"}}>The app ensures that all phone numbers across your CRM are consistently
          formatted, improving the accuracy of your communications and reporting.</p>
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
