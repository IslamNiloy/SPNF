import Footer from '../components/Footer/Footer';
import FunctionalitySection from '../components/Functionality/Functionality';
import Header from '../components/header/Header';
import HeroSection from '../components/heroSection/HeroSection';
import OverviewSection from '../components/overview/OverviewSection';
import ProposedPackageSection from '../components/proposedPackage/ProposedPackageSection';
import UsingTheAppSection from '../components/UsingTheAppSection/UsingTheAppSection';
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { userInfoByID } from '../action/userAction';
import { useCookies } from 'react-cookie'
import { insertIntoSubscriptionCollection } from '../action/subscriptionAction';
import { useNavigate } from 'react-router-dom';
import PricingCards from '../components/proposedPackage/PricingCard';
import { Helmet } from 'react-helmet';

const PricingScreen = () => {
  const [cookies, setCookie] = useCookies(['subscription']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const portalID = queryParams.get('portalID');
    localStorage.setItem('I8PD56?#C|NXhSgZ0KE', portalID);

    if (portalID) {
      dispatch(userInfoByID(portalID));
      //dispatch(insertIntoSubscriptionCollection(portalID,cookies.subscription));
      //navigate('/');
    }
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Pricing - Smart Phone Number Formatter</title>
        <meta
          name="description"
          content="Explore the pricing options for the Smart Phone Number Formatter app. Choose a package that fits your needs for phone number formatting and validation in HubSpot workflows."
        />
        <meta
          name="keywords"
          content="Smart Phone Number Formatter pricing, HubSpot app pricing, phone number formatting, subscription plans, HubSpot workflows"
        />
        <meta property="og:title" content="Pricing - Smart Phone Number Formatter" />
        <meta
          property="og:description"
          content="View the different pricing packages for the Smart Phone Number Formatter app. Select a subscription plan that suits your phone number formatting needs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.example.com/pricing" />
        <meta property="og:image" content="https://www.example.com/pricing-image.png" />
        <link rel="canonical" href="https://www.example.com/pricing" />
      </Helmet>
      <Header />
      <PricingCards />
      <Footer />
    </div>
  )
}

export default PricingScreen;