import React from 'react';
import './UserProfile.css'; // CSS file for the styles

const UserProfile = () => {
  const userInfo = {
    name: 'John Doe',
    company: 'Hubxpert Limited',
    phone: '01925141425',
    countryCode: '+88',
    email: 'john.doe@gmail.com'
  };

  return (
    <section className="user-profile-section">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-title">
            User <span className="highlight">Profile</span> Information
          </h2>
          <div className="edit-icon">
            <img src="/path-to-edit-icon.png" alt="Edit" />
          </div>
        </div>
        
        <div className="profile-details">
          <div className="profile-item">
            <span className="item-title">Name</span>
            <span className="item-value">{userInfo.name}</span>
          </div>
          
          <div className="profile-item">
            <span className="item-title">Company Name</span>
            <span className="item-value">{userInfo.company}</span>
          </div>
          
          <div className="profile-item split">
            <div>
              <span className="item-title">Phone Number</span>
              <span className="item-value">{userInfo.phone}</span>
            </div>
            <div>
              <span className="item-title">Country Code</span>
              <span className="item-value">{userInfo.countryCode}</span>
            </div>
          </div>
          
          <div className="profile-item">
            <span className="item-title">Email</span>
            <span className="item-value">{userInfo.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
