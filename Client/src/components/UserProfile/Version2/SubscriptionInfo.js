import React, { useEffect, useState,useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { cancelSubscription, subscriptionInfoByID } from "../../../action/subscriptionAction";
import { paymentInfoByEmail } from '../../../action/paymentAction';
import CancelModal from '../CancelModal';
import './SubscriptionInfo.css'; // Import the CSS file
import PricingCards from '../../proposedPackage/PricingCard';

const SubscriptionInfo = () => {
  const [showPopup, setshowPopup] = useState(false);

    const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
    const allPackageInfo = useMemo(() => JSON.parse(localStorage.getItem('lSYs~K@jx}DS1YG>/57Kuj')), []);

    const dispatch = useDispatch();
    const Subscription = useSelector((state) => state.getSubscriptionByID);
    const { loading, error, infos } = Subscription;

    const paymentInfoFromAction = useSelector((state) => state.paymentInfoByEmail);
    const { loading : paymentLoading, error: paymentErr, paymentInfo } = paymentInfoFromAction;

    const [modalVisible, setModalVisible] = useState(false);
    const [packageName, setPackageName] = useState("Loading...");
    const [apiCallCount, setAPICallCount] = useState("");
    const [apiCallLimit, setAPICallLimit] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [status, setStatus] = useState("");
    const [changePlan, setChangePlan] = useState(false);


    const toggleplanChange = () => {
      setChangePlan(!changePlan); // Toggles the state between true and false
    };
  

    const cancelSubscriptionInfo =  useSelector((state) => state.cancelSubscription);
    const { loading: cancelSubscriptionLoading, 
      error: cancelSubscriptionErr, 
      infos:  subInfo} = cancelSubscriptionInfo;

    useEffect(() => {
        if (!infos) {
            dispatch(subscriptionInfoByID(portalID)) 
            dispatch(paymentInfoByEmail(portalID));
        }
        if(infos){
            const filteredPackages = allPackageInfo.filter(packages => packages._id === infos.package);
            setPackageName(filteredPackages[0].packageName);
            setAPICallCount(parseInt(infos.apiCallCount) + parseInt(infos.checkPhoneNumberApiCallCount));
            setAPICallLimit(filteredPackages[0].Limit);
            setJoiningDate(infos.joiningDate);
            setStartDate(infos.packageStartDate);
            setEndDate(infos.packageEndDate);
            setPrice(filteredPackages[0].price);
            setDuration(filteredPackages[0].duration);
          if(paymentInfo){
              setStatus(paymentInfo.status);
          }        
        }
    }, [dispatch, infos, portalID, allPackageInfo]);
    
    const handleCancelSubscription = (e) => {
        e.preventDefault();
        setshowPopup(true);
        
    };

    const handleClosePopup = () => {
        setshowPopup(false);
      };
    
    const handleConfirmModal = (e) => {
      setshowPopup(false);
      //ancel subscription logic here
      const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
      dispatch(cancelSubscription(portalID));
      
      setStatus("cancelled");
      setModalVisible(true);
      //window.location.reload();
    };

    const handleCloseModal = () => {
      setModalVisible(false);
  };

  return (
    <div>
    <section className="subscription-section">
      <div className="subscription-container">
        {/* Left Side - Plan Details */}
        <div className="plan-card">
          <h2 className="plan-name">{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? packageName
                        : "Package not found"}</h2>
          <div className="plan-price">
            <span className="price-amount">{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? `$${price}`
                        : "Package not found"}</span>
            <span className="price-duration">
              {duration == '30' ?
                <>
                  /month
                </>
                :
                <>
                  /year
                </>
              }
              </span>
          </div>
          <ul className="plan-features">
            <li>✔ {loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? apiCallLimit
                        : "Package not found"}</li>
            <li>✔ All Countries</li>
          </ul>
          <button className="change-plan-btn" onClick={toggleplanChange}>Change Plan</button>
          {status == "cancelled" || packageName == "Free"?
            <></>:
            status && apiCallLimit!=0 && (
                <>
                <button className='cancel_subscription' onClick={handleCancelSubscription}>
                    Cancel Subscription
                </button> 
                <CancelModal
                    show={showPopup}
                    handleClose={handleClosePopup}
                    handleConfirm={(e) => handleConfirmModal (e)}
                /> 
                </>
            )}
        </div>

        {/* Right Side - Subscription Info */}
        <div className="subscription-info">
          <h2 className="subscription-title">
            Subscription <span className="highlight">Information</span>
          </h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Portal ID: </span>
              <span className="info-value">{portalID}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Joining Date: </span>
              <span className="info-value">{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? joiningDate.split("T")[0]
                        : "Package not found"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">API Call Usage: </span>
              <span className="info-value">{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? apiCallCount
                        : "Package not found"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Package Start Date: </span>
              <span className="info-value">{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? startDate.split("T")[0]
                        : "Package not found"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Subscription Status: </span>
              <span className="info-value">{
              status == 'successed' ?
              <>
                Succeed
              </>
              : status
              }</span>
            </div>
            <div className="info-item">
              <span className="info-label">Package End Date: </span>
              <span className="info-value">{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? endDate.split("T")[0]
                        : "Package not found"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

{changePlan &&
  <PricingCards/>
}
</div>
  );
};

export default SubscriptionInfo;
