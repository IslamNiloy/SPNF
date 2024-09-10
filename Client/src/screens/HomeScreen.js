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

const HomeSreen = () => {
    return(
        <div>
            <Header />
            <HeroSection/>
            <FeaturesAndBenefits/>
            <WorkflowSection/>
            <QualityCheckSection/>
            <PreferredChoice/>
            <Testimonials/>
            <PricingPlan/>
            <HowToUseSection/>
            <FAQ/>



            <ProposedPackageSection/>

            <OverviewSection/>
            <FunctionalitySection/>
            
            <UsingTheAppSection/>
            <Footer/>
        </div>
    )
}

export default HomeSreen;