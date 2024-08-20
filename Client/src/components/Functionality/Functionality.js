import React from 'react';
import './Functionality.css';
import { FunctionalityData } from './FunctionalityData';

const FunctionalitySection = () => {
    return (
        <section className="functionality-section" id="functionality">
            <div className="functionality-content">
                <h2>Functionality</h2>
                <p>{FunctionalityData}</p>
       
            </div>
        </section>
    );
};

export default FunctionalitySection;
