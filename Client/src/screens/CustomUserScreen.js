import React, { useEffect } from "react";
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
            <Header />
            <CustomUser />
            <PricingPlan />
            <FeaturesAndBenefits />
            <FAQ />
            <Footer />
        </div>
    )
}

export default CustomUserScreen;