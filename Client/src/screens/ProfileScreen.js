import Footer from '../components/Footer/Footer';
import Header from '../components/header/Header';

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
      if(portalID){
        dispatch(userInfoByID(portalID));
        //dispatch(insertIntoSubscriptionCollection(portalID,cookies.subscription));
      } 
  }, [dispatch]);
    return(
        <div>
            <Header />
             <UserProfile/>
             <SubscriptionInfo/>
            {/*<UserProfile/>*/}
            <Footer/>
        </div>
    )
}

export default ProfileScreen;