import React, { useState, useRef, useEffect } from 'react';
import './HowToUse.css';

const HowToUseSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepsContainerRef = useRef(null);
  const videoContainerRef = useRef(null);

  const steps = [
    { title: "Choose Workflow Actions", description: "Choose An Action", imgSrc: "/HowToUse/step1.png", label: "STEP 01" },
    { title: "Check Phone Number", description: "Check Phone Number", imgSrc: "/HowToUse/step2.png", label: "STEP 02" },
    { title: "Validate Phone", description: "Insert Data", imgSrc: "/HowToUse/step3.png", label: "STEP 03" },
    { title: "Save Workflow", description: "Format Phone Number", imgSrc: "/HowToUse/step4.png", label: "STEP 04" },
  ];

  const syncScroll = (source) => {
    const stepsContainer = stepsContainerRef.current;
    const videoContainer = videoContainerRef.current;

    if (!stepsContainer || !videoContainer) return;

    const stepsHeight = stepsContainer.scrollHeight - stepsContainer.clientHeight;
    const videoHeight = videoContainer.scrollHeight - videoContainer.clientHeight;

    let videoContainerScrollTop = videoContainer.scrollTop;

    if (source === 'video') {
      const ratio = videoContainerScrollTop / videoHeight;
      console.log(videoContainerScrollTop);
      stepsContainer.scrollTop = ratio * stepsHeight;

      // Keep scrolling stepsContainer until it reaches the end
      if (stepsContainer.scrollTop < stepsHeight) {
        stepsContainer.scrollTop += 2; // Adjust the increment as needed
        //videoContainer.scrollTop = 1;
      }
    }
  };

  useEffect(() => {
    const videoContainer = videoContainerRef.current;

    const handleVideoScroll = () => syncScroll('video');

    if (videoContainer) {
      videoContainer.addEventListener('scroll', handleVideoScroll);
    }

    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener('scroll', handleVideoScroll);
      }
    };
  }, []);

  return (
    <div className="how-to-use-dev" id="howToUse">
      <div className="main-title">
        <h2>How to <span className="highlight">Use the App</span></h2>
      </div>
      <section className="how-to-use-section">
        <div
          className="steps-container"
          ref={stepsContainerRef}
          style={{ overflowY: 'auto', height: '500px' }}
        >
          {steps.map((step, index) => (
            <div
              className={`step-item ${index === currentStep ? 'active' : ''}`}
              key={index}
              onClick={() => setCurrentStep(index)}
            >
              <div className="step-label">
                <span className="step-label_sub">{step.label}</span> <span id="mobile_disp_none">:</span>
                <span className="step-description">{step.description}</span>
              </div>
              <img src={step.imgSrc} alt={step.title} />
            </div>
          ))}
        </div>

        <div
          className="video-container"
          ref={videoContainerRef}
          style={{
            overflowY: 'auto',
            position: 'sticky',
            top: '20px', // Adjust this value as needed
            height: '350px',
          }}
        >
          <iframe
            width="100%"
            height="100%"
            style={{
              position: 'sticky',
              top: '0px', // Stick at the top of the video container
              zIndex: 1, // Ensures it stays on top of other elements
            }}
            className='MainIfrime'
            src="https://www.youtube.com/embed/oLSVMLAtBto?si=qBLa4jOumErXLoAM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>


        <iframe
            width="100%"
            height="100%"

            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

        <iframe
            width="100%"
            height="100%"
          
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

        <iframe
            width="100%"
            height="100%"
           
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default HowToUseSection;
