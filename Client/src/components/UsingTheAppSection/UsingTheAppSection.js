import React from 'react';
import './UsingTheAppSection.css';

const UsingTheAppSection = () => {
    const steps = [
        { id: 1, text:"Setup a workflow", imgSrc: '/usingTheApp/1.png' },
        { id: 2, text:"Define the input", imgSrc: '/usingTheApp/3.png' },
        { id: 3, text:"Select the action", imgSrc: '/usingTheApp/2.png' },
        { id: 4,  text:"Using the action outpur",imgSrc: '/usingTheApp/4.png' },
        { id: 5,  text:"Running the workflow and inspecting the output", imgSrc: '/usingTheApp/5.png' },
    ];

    return (
        <section className="app-section" id="using-the-app">
            <h2 className="section-heading">Using the App</h2>
            <div className="steps-container">
                {steps.map((step, index) => (
                    <div className={`step ${index % 2 === 0 ? 'odd' : 'even'}`} key={step.id}>
                        <div className={`step-image ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="indexing">
                            <div className="index-number">
                                {step.id}
                            </div>
                            <div className="step-name">
                                {step.text}
                            </div>
                        </div>
                            <img src={step.imgSrc} alt={`Step ${step.id}`} />
                        </div>
                        <div className="step-index">    
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UsingTheAppSection;
