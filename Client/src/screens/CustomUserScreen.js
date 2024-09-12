import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import CustomUser from '../components/Custom_User/customForm';
import Footer from '../components/Footer/Footer';
import FunctionalitySection from '../components/Functionality/Functionality';
import Header from '../components/header/Header';
import OverviewSection from '../components/overview/OverviewSection';
import ProposedPackageSection from '../components/proposedPackage/ProposedPackageSection';
import UsingTheAppSection from '../components/UsingTheAppSection/UsingTheAppSection';
import PricingPlan from '../components/proposedPackage/PricingCard';
import FeaturesAndBenefits from '../components/FeaturesAndBenefits/FeaturesAndBenefits';
import FAQ from '../components/FAQ/FAQ';

const CustomUserScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Helmet>
                <title>Submit Custom Package - Smart Phone Number Formatter</title>
                <meta
                    name="description"
                    content="Submit your custom package request for the Smart Phone Number Formatter app, tailored to your specific phone number formatting and validation needs in HubSpot workflows."
                />
                <meta
                    name="keywords"
                    content="HubSpot app, custom package, phone number formatting, phone number validation, HubSpot workflows, custom request, Smart Phone Number Formatter"
                />
                <meta property="og:title" content="Submit Custom Package - Smart Phone Number Formatter" />
                <meta
                    property="og:description"
                    content="Request a custom package for the Smart Phone Number Formatter to meet your unique phone number formatting and validation needs in HubSpot workflows."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.formatphonenumber.com/" />
                <meta property="og:image" content="https://www.formatphonenumber.com/app-image.pnghttps://www.formatphonenumber.com/WorkflowSection/image.png" />
                <link rel="canonical" href="*" />
            </Helmet>

            <Header />
            <CustomUser />
            <PricingPlan />
            <FeaturesAndBenefits />
            <FAQ />
            <Footer />
        </div>
    );
}

export default CustomUserScreen;
