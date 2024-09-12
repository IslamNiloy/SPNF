import Footer from '../components/Footer/Footer';
import Header from '../components/header/Header';
import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { userInfoByID } from '../action/userAction';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { insertIntoSubscriptionCollection } from '../action/subscriptionAction';
import UserProfile from '../components/UserProfile/Version2/UserProfile';
import SubscriptionInfo from '../components/UserProfile/Version2/SubscriptionInfo';

const ProfileScreen = () => {
  const [cookies, setCookie] = useCookies(['subscription']);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
    if (portalID) {
      dispatch(userInfoByID(portalID));
      //dispatch(insertIntoSubscriptionCollection(portalID,cookies.subscription));
    }
  }, [dispatch]);
  return (
    <div>
      <Helmet>
        <title>User Profile - Smart Phone Number Formatter</title>
        <meta
          name="description"
          content="Manage your user profile and subscription details for the Smart Phone Number Formatter app. Update your profile, view subscription info, and customize your experience in HubSpot workflows."
        />
        <meta
          name="keywords"
          content="User profile, Smart Phone Number Formatter, subscription management, HubSpot workflows, account settings, phone number formatting"
        />
        <meta property="og:title" content="User Profile - Smart Phone Number Formatter" />
        <meta
          property="og:description"
          content="View and manage your user profile and subscription settings for the Smart Phone Number Formatter app. Customize your phone number formatting experience in HubSpot workflows."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.formatphonenumber.com/" />
        <meta property="og:image" content="https://www.formatphonenumber.com/app-image.pnghttps://www.formatphonenumber.com/WorkflowSection/image.png" />
        <link rel="canonical" href="*" />
      </Helmet>
      <Header />
      <UserProfile />
      <SubscriptionInfo />
      {/*<UserProfile/>*/}
      <Footer />
    </div>
  )
}

export default ProfileScreen;