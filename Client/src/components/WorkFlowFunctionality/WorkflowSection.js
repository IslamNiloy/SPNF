import React from 'react';
import './Workflow.css'; // CSS for styling

const WorkflowSection = () => {
  return (
    <section className="workflow-container">
      {/* Left side content */}
      <div className="workflow-content">
        <h2 className="workflow-title">Workflow <span>Functionality</span></h2>
        <p className="workflow-description">
          With the HubSpot Phone Number Formatter, you can seamlessly integrate phone number formatting into your existing workflows, making your data management more efficient than ever. Whether you're dealing with incoming leads, customer data updates, or bulk data imports, our app ensures that every phone number is automatically formatted according to the correct international standards, all within your customized workflow.
        </p>

        <div className="workflow-features">
          <h3>Streamlined Operations</h3>
          <p>Eliminate the manual task of formatting phone numbers, reducing the risk of errors and saving your team valuable time.</p>

          <h3>Customizable Triggers and Actions</h3>
          <p>Set up triggers based on specific actions, such as new contact creation or data import, to automatically format phone numbers in real-time.</p>

          <h3>Enhanced Data Consistency</h3>
          <p>Ensure that all phone numbers across your CRM are consistently formatted, improving the accuracy of your communications and reporting.</p>
        </div>
      </div>

      {/* Right side image */}
      <div className="workflow-image">
        <img src="/WorkflowSection/image.png" alt="Workflow Example" />
      </div>
    </section>
  );
};

export default WorkflowSection;
