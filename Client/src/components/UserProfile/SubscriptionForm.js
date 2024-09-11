import React, { useEffect, useState,useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { cancelSubscription, subscriptionInfoByID } from "../../action/subscriptionAction";
import { paymentInfoByEmail } from '../../action/paymentAction';
import CancelModal from './CancelModal';

const SubscriptionForm = () => {
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
        <form className="subscription-info-form">
            <h3>Subscription Information</h3>
            
            <div>
                <label>Portal ID:</label>
                <p>{portalID}</p>
            </div>
            <div>
                <label>Package:</label>
                <p>
                    {loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? packageName
                        : "Package not found"}
                </p>
            </div>
            <div>
                <label>API call usage:</label>
                <p>  {loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? apiCallCount
                        : "Package not found"}</p>
            </div>
            <div>
                <label>API Call Limit:</label>
                <p> {loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? apiCallLimit
                        : "Package not found"}</p>
            </div>
            <div>
                <label>Joining Date:</label>
                <p>{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? joiningDate
                        : "Package not found"}</p>
            </div>
            <div>
                <label>Package Start Date:</label>
                <p>{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? startDate
                        : "Package not found"}</p>
            </div>
            <div>
                <label>Package End Date:</label>
                <p>{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? endDate
                        : "Package not found"}</p>
            </div>
            <div>
                <label>Price:</label>
                <p>{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? `$${price}`
                        : "Package not found"}</p>
            </div>
            <div>
                <label>Validity:</label>
                <p>{loading
                        ? "loading"
                        : error
                        ? "NOT FOUND"
                        : infos
                        ? duration +" days"
                        : "Package not found"}</p>
            </div>

            <div>
                <label>Subscription Status:</label>
                <p>{status}</p>
            </div>
            {status == "cancelled" || packageName == "Free"?
            <></>:
            status && (
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
         
            {modalVisible && (
                
            <div className="modal">
                <div className="modal-content">
                  {cancelSubscriptionLoading?
                    <h4>Please wait...</h4>
                    :cancelSubscriptionErr?
                    <h4>Something Went Wrong</h4>
                    : subInfo?
                    <h4>Subscription Cancelled</h4>:
                    <h4>Something Went Wrong</h4>
                  }
                    <button type="submit" onClick={handleCloseModal}>Close</button>
                </div>
            </div>
        )}
        </form>
    );
}

export default SubscriptionForm;
