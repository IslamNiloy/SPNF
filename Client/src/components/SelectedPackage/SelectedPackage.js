import React, { useState, useEffect, useMemo } from "react";
import './SelectedPackage.css'
import { useCookies } from 'react-cookie'
import { BackendAPI } from "../../api/server";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { subscriptionInfoByID } from "../../action/subscriptionAction";
import { paymentInfoByEmail } from "../../action/paymentAction";

const SelectedPackage = (props) => {
  const navigate = useNavigate();
  const today = new Date();
  const portalID = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
  const [cookies, setCookie] = useCookies(['subscription']);
  const [old_price, setOld_Price] = useState("");
  const [apiCallCount, setAPICallCount] = useState("");
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const Subscription = useSelector((state) => state.getSubscriptionByID);
  const { loading, error, infos } = Subscription;

  const paymentInfoFromAction = useSelector((state) => state.paymentInfoByEmail);
  const { loading: paymentLoading, error: paymentErr, paymentInfo } = paymentInfoFromAction;

  const dispatch = useDispatch();
  const allPackageInfo = useMemo(() => JSON.parse(localStorage.getItem('lSYs~K@jx}DS1YG>/57Kuj')), []);

  useEffect(() => {
    setCookie('subscription', props.data._id);
    if (!infos) {
      const emailForPaymentInfo = localStorage.getItem("spPhk44lI519pJ");
      dispatch(subscriptionInfoByID(portalID));
      dispatch(paymentInfoByEmail(emailForPaymentInfo));
    }
    if (infos) {
      const filteredPackages = allPackageInfo.filter(packages => packages._id === infos.package);
      setOld_Price(filteredPackages[0].price);
      setPackageName(filteredPackages[0].packageName);
      setPrice(filteredPackages[0].price);
      setAPICallCount(infos.apiCallCount);
      setEndDate(new Date(infos.packageEndDate));
      if (paymentInfo)
        setStatus(paymentInfo.status);
    }
  }, [dispatch, infos, portalID, allPackageInfo]);

  return (
    <section>
      <section className="package-section">
        <div className="package-container">
          <div className="package-card">
            <div className="package-details">
              <span className="package-name">{props.data.packageName}</span>
              <button className="package-price">${props.data.price}/month</button>
            </div>
            <p className="package-content1">API Call Limit</p>
            <p className="package-content2">{props.data.Limit}/month</p>
            {
              (endDate != "" && today > endDate && props.data.packageName == "Free" && packageName != "None") ?
                (
                  <Link to='/profile'>
                    <Link to='/profile'>
                      <button type="submit" className="install-button">
                        upgrade plan
                      </button>
                    </Link>
                  </Link>

                )
                :
                (props.data.packageName == "Free" && packageName == "Free" && packageName != "None") ||
                  (status != 'cancelled' && packageName == "Enterprise" && packageName != "None") ||
                  (status != 'cancelled' && (props.data.packageName == "Free" || props.data.packageName == "Pro") && packageName == "Pro" && packageName != "None") ||
                  (apiCallCount >= 500 && props.data.packageName == "Free" && status == 'cancelled' && packageName != "None")
                  ?
                  (
                    <Link to='/profile'>
                      <button type="submit" className="install-button">
                        upgrade plan
                      </button>
                    </Link>
                  ) :
                  (status == "cancelled" && (packageName == "Pro" || packageName == "Enterprise" || /custom/i.test(packageName) && packageName != "None")
                    && props.data.packageName == "Free"
                    && parseInt(apiCallCount) < parseInt(props.data.Limit)
                    && today < endDate
                    && packageName != "None"
                  )
                    ||
                    (endDate > today && props.data.packageName == "Free" && packageName != "None" && status != "cancelled" && parseInt(apiCallCount) < parseInt(props.data.Limit))
                    ?
                    (
                      <>
                        <button type="submit" className="install-button">
                          upgrade plan
                        </button>
                      </>
                    ) :
                    (status == "cancelled" && packageName == "Pro" && props.data.packageName != "Free" && packageName != "None") ||
                      (status == "cancelled" && apiCallCount < 500 && endDate > today && packageName != "None")
                      ?
                      (
                        <>
                          <form action={`${BackendAPI}/charge/create-checkout-session/${props.data._id}/${portalID}`} method="POST">
                            <button type="submit" className="install-button">
                              Proceed to Checkout
                            </button>
                          </form>
                        </>
                      ) :
                      (status != "cancelled" && status != "" && packageName != "Free" && packageName != "None") ?
                        (<Link to='/profile'>
                          <button type="submit" className="install-button">
                            cancel subscription to Proceed
                          </button>
                        </Link>)
                        :
                        (
                          <>
                            <form action={`${BackendAPI}/charge/create-checkout-session/${props.data._id}/${portalID}`} method="POST">
                              <button type="submit" className="install-button">
                                Proceed to Checkout
                              </button>
                            </form>
                          </>
                        )
            }
          </div>
        </div>
      </section>
    </section>
  )
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function PackageSelected(props) {
  const [message, setMessage] = useState("");

  //got info in props.price
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <SelectedPackage data={props.data} />
  );
}