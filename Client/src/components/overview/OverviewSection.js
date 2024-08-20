import React from 'react';
import './OverviewSection.css';
import { OverviewData } from './OverViewData';

const OverviewSection = () => {
    return (
        <section className="overview" id="overview">
            <div className="overview-text">
                <h2>Overview</h2>
                <p>
                    {OverviewData}
                </p>
            </div>
            <div className="overview-video">
                <iframe 
                    src="https://www.youtube.com/embed/VIDEO_ID"  
                    allowFullScreen
                    title="YouTube video"
                ></iframe>
            </div>
        </section>
    );
};

export default OverviewSection;
