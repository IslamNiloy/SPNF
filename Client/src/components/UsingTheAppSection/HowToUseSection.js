import React, { useState } from 'react';
import './HowToUse.css';

const HowToUseSection = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Choose Workflow Actions",
      description: "Choose An Action",
      imgSrc: "/HowToUse/step1.png", // Replace with actual paths
      label: "STEP 01",
    },
    {
      title: "Check Phone Number",
      description: "Check Phone Number.",
      imgSrc: "/HowToUse/step2.png",
      label: "STEP 02",
    },
    {
      title: "Validate Phone",
      description: "Insert Data",
      imgSrc: "/HowToUse/step3.png",
      label: "STEP 03",
    },
    {
      title: "Save Workflow",
      description: "Format Phone Number",
      imgSrc: "/HowToUse/step4.png",
      label: "STEP 04",
    },
  ];

  return (
    <div className="how-to-use-dev">
         {/* Main Title */}
      <div className="main-title">
        <h2>How to <span className="highlight">Use</span> the App</h2>
      </div>
       <section className="how-to-use-section">
      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            className={`step-item ${index === currentStep ? 'active' : ''}`}
            key={index}
            onClick={() => setCurrentStep(index)}
          >
            <div className="step-label"><span className='step-label_sub'>{step.label}</span> : {step.description}</div>
            <img src={step.imgSrc} alt={step.title} />
          </div>
        ))}
      </div>

      <div className="video-container">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/your-video-id"
          title="How to use the app"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
    </div>
  );
};

export default HowToUseSection;
