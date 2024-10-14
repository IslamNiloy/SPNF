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
      description: "Check Phone Number",
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
    <div className="how-to-use-dev" id='howToUse'>
      {/* Main Title */}
      <div className="main-title">
        <h2>How to <span className="highlight">Use the App</span></h2>
      </div>
      <section className="how-to-use-section">
        <div className="steps-container">
          {steps.map((step, index) => (
            <div
              className={`step-item ${index === currentStep ? 'active' : ''}`}
              key={index}
              onClick={() => setCurrentStep(index)}
            >
              <div className="step-label"><span className='step-label_sub'>{step.label}</span> <span id='mobile_disp_none'>:</span>
                <span className='step-description'>{step.description}</span></div>
              <img src={step.imgSrc} alt={step.title} />
            </div>
          ))}
        </div>

        <div className="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/oLSVMLAtBto?si=qBLa4jOumErXLoAM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
      </section>
    </div>
  );
};

export default HowToUseSection;
