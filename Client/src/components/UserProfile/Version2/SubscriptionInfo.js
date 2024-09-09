import React from 'react';
import './SubscriptionInfo.css'; // Import the CSS file

const SubscriptionInfo = () => {
  const subscriptionData = {
    packageName: 'Pro Plus',
    price: '30.00',
    limit: '50,000 formatting/month',
    countries: 'All Countries',
    portalID: '456978852',
    apiCallUsage: '0',
    subscriptionStatus: 'Subscribed',
    joiningDate: '2024-09-05, 20:08:19.2902',
    packageStartDate: '2024-09-05, 20:08:19.2902',
    packageEndDate: '2024-09-05, 20:08:19.2902'
  };

  return (
    <section className="subscription-section">
      <div className="subscription-container">
        {/* Left Side - Plan Details */}
        <div className="plan-card">
          <h2 className="plan-name">{subscriptionData.packageName}</h2>
          <div className="plan-price">
            <span className="price-amount">${subscriptionData.price}</span>
            <span className="price-duration">/month</span>
          </div>
          <ul className="plan-features">
            <li>✔ {subscriptionData.limit}</li>
            <li>✔ {subscriptionData.countries}</li>
          </ul>
          <button className="change-plan-btn">Change Plan</button>
        </div>

        {/* Right Side - Subscription Info */}
        <div className="subscription-info">
          <h2 className="subscription-title">
            Subscription <span className="highlight">Information</span>
          </h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Portal ID</span>
              <span className="info-value">{subscriptionData.portalID}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Joining Date</span>
              <span className="info-value">{subscriptionData.joiningDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">API Call Usage</span>
              <span className="info-value">{subscriptionData.apiCallUsage}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Package Start Date</span>
              <span className="info-value">{subscriptionData.packageStartDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Subscription Status</span>
              <span className="info-value">{subscriptionData.subscriptionStatus}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Package End Date</span>
              <span className="info-value">{subscriptionData.packageEndDate}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionInfo;
