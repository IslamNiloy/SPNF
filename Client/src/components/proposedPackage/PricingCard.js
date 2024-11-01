import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { allPackages } from '../../action/packageAction';
import { BackendAPI } from "../../api/server";
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import './PricingCards.css'; // Import the CSS file
import { subscriptionInfoByID, cancelSubscription } from "../../action/subscriptionAction";
import { paymentInfoByEmail } from "../../action/paymentAction";
import CancelModal from '../UserProfile/CancelModal';
import { useLocation } from 'react-router-dom';

const PricingCard = ({ id, planName, monthlyPrice, yearlyPrice, limit, countries, buttonText, isPopular, isChosen, isMonthly, pathName }) => {
  const today = new Date();
  const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
  const [old_price, setOld_Price] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const [apiCallCount, setAPICallCount] = useState("");
  const [UserPackageName, setUserPackageName] = useState("");
  const [UserPackageID, setUserPackageID] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [chosenPackageId, setChosenPackageId] = useState();
  const [endDate, setEndDate] = useState("");
  const Subscription = useSelector((state) => state.getSubscriptionByID);
  const { loading, error, infos } = Subscription;

  const paymentInfoFromAction = useSelector((state) => state.paymentInfoByEmail);
  const { loading: paymentLoading, error: paymentErr, paymentInfo } = paymentInfoFromAction;

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const allPackageInfo = useMemo(() => JSON.parse(localStorage.getItem('lSYs~K@jx}DS1YG>/57Kuj')), []);

  const cancelSubscriptionInfo = useSelector((state) => state.cancelSubscription);
  const { loading: cancelSubscriptionLoading,
    error: cancelSubscriptionErr,
    infos: subInfo } = cancelSubscriptionInfo;

  useEffect(() => {
    if (!infos) {
      //const emailForPaymentInfo = localStorage.getItem("spPhk44lI519pJ");
      dispatch(subscriptionInfoByID(portalID));
      dispatch(paymentInfoByEmail(portalID));
    }
    if (infos) {
     
      const userPackage = allPackageInfo.filter(pkg => pkg._id === infos.package);
      setUserPackageName(userPackage[0].packageName);
      setUserPackageID(userPackage[0]._id);

      setAPICallCount(infos.apiCallCount);
      setEndDate(new Date(infos.packageEndDate));
      if (paymentInfo)
        setStatus(paymentInfo.status);
    }
  }, [dispatch, infos, portalID, allPackageInfo]);

  const handleCancelSubscription = (e,id) => {
    e.preventDefault();
    setshowPopup(true);
    setChosenPackageId(id);
  };

  const handleClosePopup = () => {
    setshowPopup(false);
  };

  const handleConfirmModal = (e, packageToBeChosen) => {
    setshowPopup(false);
  
    const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
  
    if (!portalID) {
      console.error("Portal ID is not available in localStorage");
      return;
    }
  
    dispatch(cancelSubscription(portalID));
    setStatus("cancelled");
    setModalVisible(true);
  
    // Create a form dynamically
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${BackendAPI}/charge/create-checkout-session/${packageToBeChosen}/${portalID}`;
    
    // Append the form to the document and submit it
    document.body.appendChild(form);
    form.submit();
    
    // Optionally, remove the form from the DOM after submission
    document.body.removeChild(form);
  };
  
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };


  return (
    <>
      <CancelModal
        show={showPopup}
        handleClose={handleClosePopup}
        packageToBeChosen = {chosenPackageId}
        handleConfirm={(e) => handleConfirmModal(e, chosenPackageId)}
      />
      <div  className={`pricing-main ${planName == "Enterprise" ? 'most-popular' : ''}`}>
      {planName == "Enterprise" && <span className="popular-badge">
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.9317 9.93301C13.7159 10.1422 13.6167 10.4447 13.6659 10.7413L14.4067 14.8413C14.4692 15.1888 14.3226 15.5405 14.0317 15.7413C13.7467 15.9497 13.3676 15.9747 13.0567 15.808L9.36591 13.883C9.23758 13.8147 9.09508 13.778 8.94925 13.7738H8.72341C8.64508 13.7855 8.56841 13.8105 8.49841 13.8488L4.80675 15.783C4.62425 15.8747 4.41758 15.9072 4.21508 15.8747C3.72175 15.7813 3.39258 15.3113 3.47341 14.8155L4.21508 10.7155C4.26425 10.4163 4.16508 10.1122 3.94925 9.89967L0.940079 6.98301C0.688412 6.73884 0.600912 6.37217 0.715912 6.04134C0.827579 5.71134 1.11258 5.47051 1.45675 5.41634L5.59841 4.81551C5.91341 4.78301 6.19008 4.59134 6.33175 4.30801L8.15674 0.566341C8.20008 0.483008 8.25591 0.406341 8.32341 0.341341L8.39841 0.283008C8.43758 0.239674 8.48258 0.203841 8.53258 0.174674L8.62341 0.141341L8.76508 0.0830078H9.11591C9.42924 0.115508 9.70508 0.303008 9.84925 0.583008L11.6984 4.30801C11.8317 4.58051 12.0909 4.76967 12.3901 4.81551L16.5317 5.41634C16.8817 5.46634 17.1742 5.70801 17.2901 6.04134C17.3992 6.37551 17.3051 6.74217 17.0484 6.98301L13.9317 9.93301Z" fill="white" />
        </svg>
        Most Popular</span>}
      <div className={`pricing-card ${planName == "Enterprise" ? 'most-popular' : ''}`}>

        <div className="plan-header">

          <h2 className="plan-name">{planName}</h2>
          <div>
            {planName == "Free" &&
              <img src='/PricingPlan/Free.png' width="35px" />
            }
            {planName == "Starter" &&
              <img src='/PricingPlan/Starter.png' width="50px" />
            }
            {planName == "Pro" &&
              <img src='/PricingPlan/Pro.png' width="50px" />
            }
            {planName == "Pro Plus" &&
              <img src='/PricingPlan/ProPlus.png' width="60px" />
            }
            {planName == "Enterprise" &&
              <img src='/PricingPlan/Enterprise.png' width="48px" />
            }
            {planName == "Custom" &&
              <img src='/PricingPlan/Custom.png' width="50px" />
            }

          </div>
        </div>
        <div className="plan-pricing">
          <span className="price-amount" >
            {isMonthly ?
              (
                <>
                  <sup className='dollar'>
                    {
                      [monthlyPrice.slice(0, 1), price.slice(1)]
                    }
                  </sup>
                  {
                    [monthlyPrice.slice(1, 5), price.slice(1)]
                  }
                  {
                    planName != "Custom" &&
                    (
                      <>
                        .00
                      </>
                    )
                  }
                </>
              )
              :
              (
                <>
                  <sup className='dollar'>
                    {
                      [yearlyPrice.slice(0, 1), price.slice(1)]
                    }
                  </sup>
                  {
                    [yearlyPrice.slice(1, 5), price.slice(1)]
                  }
                  {
                    planName != "Custom" &&
                    (
                      <>
                        .00
                      </>
                    )
                  }
                </>
              )
            }
            {
              planName === "Custom" && (<span className='custom_pricing'>Custom pricing</span>)
            }
          </span>
          <span className="price-duration">
            {planName !== 'Custom' ? (isMonthly ? ' /month' :
            
                ' /year') : ''}
          </span>
          <hr style={{ color: "#001B3440" }} />
        </div>
        <ul className="plan-features">
          <li style={{ color: "#200335" }}><span style={{ color: "#66CD51" }}>✔ </span> Actions {limit}
            {planName !== 'Custom' ? (isMonthly ? '/month' : '/year') : ''}
      
          </li>
          <li style={{ color: "#200335" }}><span style={{ color: "#66CD51" }}>✔ </span> {countries}</li>
        </ul>

        {
          pathName == "/all-pricing-plans" ?
          <Link to={`${BackendAPI}/install`}>
          <button className={`plan-button hero-btn2 ${isChosen ? 'chosen' : ''}`}>
            Get Your Formatter Now!
          </button>
        </Link>
          :
          UserPackageID == id ?
        
            <button className={`plan-button choose_plan ${isChosen ? 'chosen choose_plan' : ''}`}>
              Chosen Plan
            </button>
      
          :
          !portalID ?
            <></>
            :
            planName == "Custom" ?
              <Link to='/custom'>
                <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                  Contact Us
                </button>
              </Link> :
              UserPackageName == "Free" && planName != "Free" ?
                (
                <>
                  <form action={`${BackendAPI}/charge/create-checkout-session/${id}/${portalID}`} method="POST">
                    <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                      Choose Plan
                    </button>
                  </form>
                </>
                ) :
                (endDate != "" && today > endDate &&
                  UserPackageName == "Free" &&
                  UserPackageName != "None") ?
                  (
                      <button className={`plan-button choose_plan ${isChosen ? 'chosen choose_plan' : ''}`}>
                        Chosen Plan
                      </button>
                  ) :
                  status == "cancelled" && planName == "Free" && isMonthly?
                      <button className={`plan-button choose_plan ${isChosen ? 'chosen choose_plan' : ''}`}>
                        Chosen Plan
                      </button>
                  :
                  (status == "cancelled" &&
                    (UserPackageName == "Pro" || UserPackageName == "Enterprise" || /custom/i.test(UserPackageName)
                      && UserPackageName != "None")
                    && UserPackageName == "Free"
                    && parseInt(apiCallCount) < parseInt(limit)
                    && today < endDate
                    && UserPackageName != "None"
                  )
                    ||
                    (endDate > today && UserPackageName == "Free" && UserPackageName != "None"
                      && status != "cancelled")
                    ?
                    (
                      <>
                        <button className={`plan-button choose_plan ${isChosen ? 'chosen ' : ''}`}>
                          Chosen Plan
                        </button>
                      </>
                    ) :
                    (status == "cancelled"
                      && UserPackageName != "Free"
                      && UserPackageName != "None") ||
                      (status == "cancelled" && apiCallCount < 100
                        && endDate > today && UserPackageName != "None")
                      ?
                      (
                        <>
                          <form action={`${BackendAPI}/charge/create-checkout-session/${id}/${portalID}`} method="POST">
                            <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                              Choose Plan
                            </button>
                          </form>
                        </>
                      ) :
                      (status != "cancelled" &&
                        status != "" &&
                        UserPackageName != "Free" &&
                        UserPackageName != "None") ?
                        (
                          <>
                            <button className={`plan-button ${isChosen ? 'chosen' : ''}`} onClick={(e) => handleCancelSubscription(e, id)}>
                              Change Plan
                            </button>
                          </>
                        )
                        : (
                          <>
                            <form action={`${BackendAPI}/charge/create-checkout-session/${id}/${portalID}`} method="POST">
                              <button className={`plan-button ${isChosen ? 'chosen' : ''}`}>
                                Choose Plan
                              </button>
                            </form>
                          </>
                        )
          }
        </div>
      </div>
    </>
  );
};

const PricingCards = () => {
  const location = useLocation(); 
  const dispatch = useDispatch();
  const [isMonthly, setIsMonthly] = useState(true); // State for toggling between monthly/yearly
  const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
  // Redux selector to fetch the packages from state
  const AllPackages = useSelector((state) => state.getAllPackage);
  const { loading, error, packages } = AllPackages;

  // Fetch packages when the component mounts
  useEffect(() => {
    dispatch(allPackages()); // Fetch all packages on component mount
  }, [dispatch]);

  // Ensure packages is an array and handle loading and error states
  return (
    <section className="pricing-section"  id='PricingCards'>

      <div className='title-div'>
        <div className='title-div-1'>
          <h2 className="pricing-title">Our <span className="highlight">Pricing</span> Plan</h2>
        </div>
        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button
            className={`toggle-button ${isMonthly ? 'active' : ''}`}
            onClick={() => setIsMonthly(true)}>
            Monthly
          </button>
          <button
            className={`toggle-button ${!isMonthly ? 'active' : ''}`}
            onClick={() => setIsMonthly(false)}>
            Yearly
          </button>
        </div>
        <div className='proxy_div'>
          {!portalID &&
            <div>
            <Link to={`${BackendAPI}/install`}>
                  <button className={`hero-btn2`}>
                  Get Your Formatter Now!
              </button>
            </Link>
            </div>
          }

        </div>
      </div>


      {/* Loading/Error Handling */}
      {loading ? (
        <LoadingBox>Loading...</LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : packages && Array.isArray(packages) && packages.length > 0 ? (
        <div className="pricing-container"
        >
          {packages
            .filter(pkg => pkg.subscription === (isMonthly ? 'monthly' : 'yearly')) // Filter based on subscription type
            .map((pkg, index) => (
              <PricingCard
                key={index}
                id={pkg._id}
                planName={pkg.packageName}
                monthlyPrice={pkg.packageName === 'Custom' ? "" : `$${pkg.price}`}
                yearlyPrice={pkg.packageName === 'Custom' ? "" : `$${pkg.price}`}
                limit={pkg.Limit}
                countries="All countries"
                buttonText={pkg.packageName === 'Custom' ? 'Proceed' : 'Choose Plan'}
                isPopular={pkg.mostPopular}
                isChosen={pkg.isChosen}
                isMonthly={isMonthly}
                pathName={location.pathname}
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