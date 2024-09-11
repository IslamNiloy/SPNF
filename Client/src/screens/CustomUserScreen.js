import CustomUser from '../components/Custom_User/customForm';
import Footer from '../components/Footer/Footer';
import FunctionalitySection from '../components/Functionality/Functionality';
import Header from '../components/header/Header';
import OverviewSection from '../components/overview/OverviewSection';
import ProposedPackageSection from '../components/proposedPackage/ProposedPackageSection';
import UsingTheAppSection from '../components/UsingTheAppSection/UsingTheAppSection';
import PricingPlan from '../components/proposedPackage/PricingCard';
import FeaturesAndBenefits from '../components/FeaturesAndBenefits/FeaturesAndBenefits';

const CustomUserScreen = () => {
    return (
        <div>
            <Header />
            <CustomUser />
            <FeaturesAndBenefits />
            <PricingPlan />
            <Footer />
        </div>
    )
}

export default CustomUserScreen;