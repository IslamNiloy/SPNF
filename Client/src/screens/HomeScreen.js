import FeaturesAndBenefits from '../components/FeaturesAndBenefits/FeaturesAndBenefits';
import Footer from '../components/Footer/Footer';
import FunctionalitySection from '../components/Functionality/Functionality';
import Header from '../components/header/Header';
import HeroSection from '../components/heroSection/HeroSection';
import OverviewSection from '../components/overview/OverviewSection';
import ProposedPackageSection from '../components/proposedPackage/ProposedPackageSection';
import UsingTheAppSection from '../components/UsingTheAppSection/UsingTheAppSection';

const HomeSreen = () => {
    return(
        <div>
            <Header />
            <HeroSection/>
            <FeaturesAndBenefits/>
            <OverviewSection/>
            <FunctionalitySection/>
            <ProposedPackageSection/>
            <UsingTheAppSection/>
            <Footer/>
        </div>
    )
}

export default HomeSreen;