import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate } from 'react-router-dom';
import { allPackages } from '../../action/packageAction';
import { BackendAPI } from "../../api/server";
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import './PricingCards.css'; // Import the CSS file
import { subscriptionInfoByID } from "../../action/subscriptionAction";
import { paymentInfoByEmail } from "../../action/paymentAction";

const PricingCard = ({ planName, monthlyPrice, yearlyPrice, limit, countries, buttonText, isPopular, isChosen, isMonthly }) => {
  const today = new Date();
  const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
  const [old_price, setOld_Price] = useState("");
  const [apiCallCount, setAPICallCount] = useState("");
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const Subscription = useSelector((state) => state.getSubscriptionByID);
  const { loading, error, infos } = Subscription;

  const paymentInfoFromAction = useSelector((state) => state.paymentInfoByEmail);
  const { loading : paymentLoading, error: paymentErr, paymentInfo } = paymentInfoFromAction;
   
  const dispatch = useDispatch();
  const allPackageInfo = useMemo(() => JSON.parse(localStorage.getItem('lSYs~K@jx}DS1YG>/57Kuj')), []);

  useEffect(() => {
    if (!infos) {
      const emailForPaymentInfo = localStorage.getItem("spPhk44lI519pJ");
      dispatch(subscriptionInfoByID(portalID));
      dispatch(paymentInfoByEmail(emailForPaymentInfo));
  }
  if(infos){
      const filteredPackages = allPackageInfo.filter(packages => packages._id === infos.package);
      setOld_Price(filteredPackages[0].price);
      setPackageName(filteredPackages[0].packageName);
      setPrice(filteredPackages[0].price);
      setAPICallCount(infos.apiCallCount);
      setEndDate(new Date(infos.packageEndDate));
      if(paymentInfo)
        setStatus(paymentInfo.status);
  }
}, [dispatch, infos, portalID, allPackageInfo]);

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







      {
        (endDate!="" && today > endDate && 
          planName=="Free" && 
          planName != "Installation Package")?
        ( 
          <Link to='/profile'>
              <Link to='/profile'>
              <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                  upgrade plan
              </button>
            </Link>
          </Link>
  
        ):
        (planName=="Free" 
          && planName == "Free" 
          && planName != "Installation Package") ||
          (status != 'cancelled' 
            && planName == "Enterprise" 
            && planName != "Installation Package") ||
          (status != 'cancelled' 
            && (planName=="Free" || planName=="Pro") 
            && planName == "Pro" && planName != "Installation Package") ||
          (apiCallCount >= 500 && planName=="Free" 
            && status == 'cancelled' && planName != "Installation Package")
          ?
          (
            <Link to='/profile'>
            <button type="submit" className="install-button">
                upgrade plan
            </button>
          </Link>
        ):""

      }














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
