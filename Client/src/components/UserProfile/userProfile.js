import React, { useState}  from 'react';
import UserProfileForm from './userProfileForm';
import SubscriptionForm from './SubscriptionForm';
import ProposedPackageSection from '../proposedPackage/ProposedPackageSection';
import './userProfile.css'


const UserProfile = () => {
  return (
    <div className='profile_form-main'>
       
        <div className="forms-container">
            {/* User Profile Form */}
            <UserProfileForm/>
            {/* Subscription Information Form */}
            <SubscriptionForm/>
        </div>
            <ProposedPackageSection/>
    </div>
  );
};

export default UserProfile;
