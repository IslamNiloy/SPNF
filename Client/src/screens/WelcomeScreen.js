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

const WelcomeScreen = () => {
    const [cookies, setCookie] = useCookies(['subscription']);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const portalID = queryParams.get('portalID');
      localStorage.setItem('I8PD56?#C|NXhSgZ0KE', portalID);

      if(portalID){
        dispatch(userInfoByID(portalID));
        //dispatch(insertIntoSubscriptionCollection(portalID,cookies.subscription));
        //navigate('/');
      } 
  }, [dispatch]);

    return(
        <div>
            <ProposedPackageSection/>
            <Footer/>
        </div>
    )
}

export default WelcomeScreen;