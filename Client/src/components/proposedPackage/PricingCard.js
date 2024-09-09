import React, { useState } from 'react';
import './PricingCards.css'; // Import the CSS file

const PricingCard = ({ planName, monthlyPrice, yearlyPrice, limit, countries, buttonText, isPopular, isChosen, isMonthly }) => {
  return (
    <div className={`pricing-card ${isPopular ? 'most-popular' : ''}`}>
      <div className="plan-header">
        {isPopular && <span className="popular-badge">Most Popular</span>}
        <h2 className="plan-name">{planName}</h2>
      </div>
      <div className="plan-price">
        <span className="price-amount">
          {isMonthly ? monthlyPrice : yearlyPrice}
        </span>
        <span className="price-duration">{planName !== 'Custom' ? (isMonthly ? '/month' : '/year') : ''}</span>
      </div>
      <ul className="plan-features">
        <li>✔ {limit}</li>
        <li>✔ {countries}</li>
      </ul>
      <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
        {buttonText}
      </button>
    </div>
  );
};

const PricingCards = () => {
  const [isMonthly, setIsMonthly] = useState(true); // State for toggling between monthly/yearly

  const plans = [
    { planName: 'Free', monthlyPrice: '$ 0.00', yearlyPrice: '$ 0.00', limit: '100 formatting/month', countries: 'All countries', buttonText: 'Change Plan', isPopular: false, isChosen: false },
    { planName: 'Pro', monthlyPrice: '$ 15.00', yearlyPrice: '$ 150.00', limit: '20,000 formatting/month', countries: 'All countries', buttonText: 'Change Plan', isPopular: false, isChosen: false },
    { planName: 'Pro Plus', monthlyPrice: '$ 30.00', yearlyPrice: '$ 300.00', limit: '50,000 formatting/month', countries: 'All countries', buttonText: 'Change Plan', isPopular: false, isChosen: false },
    { planName: 'Enterprise', monthlyPrice: '$ 50.00', yearlyPrice: '$ 500.00', limit: '100,000 formatting/month', countries: 'All countries', buttonText: 'Chosen Plan', isPopular: true, isChosen: true },
    { planName: 'Custom', monthlyPrice: 'Custom Pricing', yearlyPrice: 'Custom Pricing', limit: 'Custom formatting/month', countries: 'All countries', buttonText: 'Proceed', isPopular: false, isChosen: false }
  ];

  return (
    <section className="pricing-section">
      <h2 className="pricing-title">Our <span className="highlight">Pricing</span> Plan</h2>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={`toggle-button ${isMonthly ? 'active' : ''}`}
          onClick={() => setIsMonthly(true)}
        >
          Monthly
        </button>
        <button
          className={`toggle-button ${!isMonthly ? 'active' : ''}`}
          onClick={() => setIsMonthly(false)}
        >
          Yearly
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-container">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            planName={plan.planName}
            monthlyPrice={plan.monthlyPrice}
            yearlyPrice={plan.yearlyPrice}
            limit={plan.limit}
            countries={plan.countries}
            buttonText={plan.buttonText}
            isPopular={plan.isPopular}
            isChosen={plan.isChosen}
            isMonthly={isMonthly}
          />
        ))}
      </div>
    </section>
  );
};

export default PricingCards;
