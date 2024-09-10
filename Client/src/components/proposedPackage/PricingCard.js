import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Link } from 'react-router-dom';
import { allPackages } from '../../action/packageAction';
import { BackendAPI } from "../../api/server";
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import './PricingCards.css'; // Import the CSS file
import { subscriptionInfoByID } from "../../action/subscriptionAction";
import { paymentInfoByEmail } from "../../action/paymentAction";

const PricingCard = ({ id, planName, monthlyPrice, yearlyPrice, limit, countries, buttonText, isPopular, isChosen, isMonthly }) => {
  const today = new Date();
  const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
  const [old_price, setOld_Price] = useState("");
  const [apiCallCount, setAPICallCount] = useState("");
  const [UserPackageName, setUserPackageName] = useState("");
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
      //const emailForPaymentInfo = localStorage.getItem("spPhk44lI519pJ");
      dispatch(subscriptionInfoByID(portalID));
      dispatch(paymentInfoByEmail(portalID));
    }

    if(infos){
   
        const userPackage = allPackageInfo.filter(pkg => pkg._id === infos.package);
        setUserPackageName(userPackage[0].packageName);
      
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
        !portalID ?
        <Link to={`${BackendAPI}/install`}>
          <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
            Get Your Formatter
          </button>
        </Link>
        :
        (endDate!="" && today > endDate && 
          UserPackageName=="Free" && 
          UserPackageName != "Installation Package")?
        ( 
          <Link to='/profile'>
              <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                  upgrade plan 1
              </button>
            </Link>
        
  
        ):
        (UserPackageName=="Free" 
          && UserPackageName == "Free" 
          && UserPackageName != "Installation Package") ||
          (status != 'cancelled' 
            && UserPackageName == "Enterprise" 
            && UserPackageName != "Installation Package") ||
          (status != 'cancelled' 
            && (UserPackageName=="Free" || UserPackageName=="Pro") 
            && UserPackageName == "Pro" && UserPackageName != "Installation Package") ||
          (apiCallCount >= 500 && UserPackageName=="Free" 
            && status == 'cancelled' && UserPackageName != "Installation Package")
          ?
          (
            <Link to='/profile'>
            <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                upgrade plan
            </button>
          </Link>
        ):
        (status == "cancelled" && 
          (UserPackageName == "Pro" || UserPackageName == "Enterprise" || /custom/i.test(UserPackageName) 
          && UserPackageName != "Installation Package") 
          && UserPackageName=="Free" 
          && parseInt(apiCallCount) < parseInt(limit)
          && today < endDate
          && UserPackageName != "Installation Package"
      )
        ||
        (endDate > today && UserPackageName=="Free" && UserPackageName != "Installation Package" 
          && status != "cancelled" && parseInt(apiCallCount) < parseInt(limit))
        ?
        (
          <>
            <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                upgrade plan
            </button>
          </>
        ):
        (status == "cancelled" 
          && UserPackageName == "Pro" && UserPackageName!="Free" 
          && UserPackageName != "Installation Package") ||
        (status == "cancelled" && apiCallCount < 500 
          && endDate > today && UserPackageName != "Installation Package")
        ?
        (
          <>
          <form action= {`${BackendAPI}/charge/create-checkout-session/${id}/${portalID}`} method="POST">
          <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
              Proceed to Checkout
            </button>
          </form>  
          </>
        ):
        (status != "cancelled" && 
          status != "" && 
          UserPackageName != "Free" && 
          UserPackageName != "Installation Package")?
              (<Link to='/profile'>
               <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                  cancel subscription to Proceed 1 {UserPackageName}
                </button>
                </Link>)
        :                (
          <>
            <form action= {`${BackendAPI}/charge/create-checkout-session/${id}}/${portalID}`} method="POST">
            <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                Proceed to Checkout
              </button>
          </form>  
          </>
        )

      }
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
                id={pkg._id}
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
