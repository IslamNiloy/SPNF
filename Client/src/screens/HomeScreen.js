import React from 'react';
import { Helmet } from 'react-helmet';
import FAQ from '../components/FAQ/FAQ';
import FeaturesAndBenefits from '../components/FeaturesAndBenefits/FeaturesAndBenefits';
import Footer from '../components/Footer/Footer';
import FunctionalitySection from '../components/Functionality/Functionality';
import Header from '../components/header/Header';
import HeroSection from '../components/heroSection/HeroSection';
import OverviewSection from '../components/overview/OverviewSection';
import PreferredChoice from '../components/PreferredChoice/PreferredChoice';
import PricingPlan from '../components/proposedPackage/PricingCard';
import ProposedPackageSection from '../components/proposedPackage/ProposedPackageSection';
import QualityCheckSection from '../components/QualityCheckSection/QualityCheckSection';
import Testimonials from '../components/TestimonialsSection/TestimonialsSection';
import HowToUseSection from '../components/UsingTheAppSection/HowToUseSection';
import UsingTheAppSection from '../components/UsingTheAppSection/UsingTheAppSection';
import WorkflowSection from '../components/WorkFlowFunctionality/WorkflowSection';
import HubSpotMeeting from '../components/Meeting/MeetingFrame';


const HomeSreen = () => {
    return (
        <div style={{overflowX: "hidden"}}>
            <Helmet>
                <title>Smart Phone Number Formatter - HubSpot Workflow App</title>
                <meta
                    name="description"
                    content="Smart Phone Number Formatter is a HubSpot app that allows users to format and validate phone numbers in workflows. Improve data accuracy and enhance HubSpot workflows with real-time phone number checks."
                />
                <meta
                    name="keywords"
                    content="HubSpot app, phone number formatting, phone number validation, HubSpot workflows, data validation, Smart Phone Number Formatter"
                />
                <meta property="og:title" content="Smart Phone Number Formatter - HubSpot Workflow App" />
                <meta
                    property="og:description"
                    content="Easily format and validate phone numbers in HubSpot workflows with the Smart Phone Number Formatter app. Ensure data accuracy in CRM processes."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.formatphonenumber.com/" />
                <meta property="og:image" content="https://www.formatphonenumber.com/app-image.pnghttps://www.formatphonenumber.com/WorkflowSection/image.png" />
                <link rel="canonical" href="" />
            </Helmet>

            <Header />
            <HeroSection />
            <FeaturesAndBenefits />
            <PreferredChoice />
            <WorkflowSection />
            <QualityCheckSection />
            <HowToUseSection />
            <Testimonials />
            <PricingPlan />
            <FAQ />
            <HubSpotMeeting/>
            <Footer />
        </div>
    );
};

export default HomeSreen;
