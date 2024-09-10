import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allPackages } from '../../action/packageAction';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
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
        <li>✔ Actions {limit}</li>
        <li>✔ {countries}</li>
      </ul>
      <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
        {buttonText}
      </button>
    </div>
  );
};

const PricingCards = () => {
  const dispatch = useDispatch();
  const [isMonthly, setIsMonthly] = useState(true); // State for toggling between monthly/yearly

  // Redux selector to fetch the packages from state
  const AllPackages = useSelector((state) => state.getAllPackage);
  const { loading, error, packages } = AllPackages;

  // Fetch packages when the component mounts
  useEffect(() => {
    dispatch(allPackages()); // Fetch all packages on component mount
  }, [dispatch]);

  // Ensure packages is an array and handle loading and error states
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

      {/* Loading/Error Handling */}
      {loading ? (
        <LoadingBox>Loading...</LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : packages && Array.isArray(packages) && packages.length > 0 ? (
        <div className="pricing-container">
          {packages
            .filter(pkg => pkg.subscription === (isMonthly ? 'monthly' : 'yearly')) // Filter based on subscription type
            .map((pkg, index) => (
              <PricingCard
                key={index}
                planName={pkg.packageName}
                monthlyPrice={pkg.packageName === 'Custom' ? "" : `$${pkg.price}`}
                yearlyPrice={pkg.packageName === 'Custom'? "" :`$${pkg.price}`} 
                limit={pkg.Limit}
                countries="All countries"
                buttonText={pkg.packageName === 'Custom' ? 'Proceed' : 'Choose Plan'}
                isPopular={pkg.mostPopular}
                isChosen={pkg.isChosen}
                isMonthly={isMonthly}
              />
            ))}
        </div>
      ) : (
        <div>No Packages Available</div>
      )}
    </section>
  );
};

export default PricingCards;
