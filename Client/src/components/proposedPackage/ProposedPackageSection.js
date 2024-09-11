import React, { useState, useEffect} from 'react';
import { useDispatch,useSelector } from "react-redux";
import './ProposedPackageSection.css';
import { Link } from "react-router-dom";
import { allPackages } from '../../action/packageAction';
import LoadingBox from '../LoadingBox'
import MessageBox from '../MessageBox'
import { BackendAPI } from '../../api/server';


const ProposedPackageSection = () => {
    const dispatch = useDispatch();
    const [isMonthly, setIsMonthly] = useState(true); // Toggle state for Monthly/Yearly
    const AllPackages = useSelector((state) => state.getAllPackage);
    const { loading, error, packages } = AllPackages;
    //const monghtPackages = packages.find({ subscription: 'monthly' }).sort({ index: 1 });

    const portalID = localStorage.getItem("I8PD56?#C|NXhSgZ0KE");
    useEffect(() => {
        dispatch(allPackages());
      }, [dispatch]);
    
      return (
        <section className="pricing-section">
            <h2 className="header">Our <span className="highlight">Pricing</span> Plan</h2>

            {/* Toggle Button */}
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

            <div className="package-container">
            {error ? (
                <div className="error-box">{error}</div>
            ) : loading ? (
                <div className="loading-box">Loading...</div>
            ) : packages ? (
                packages
                    .filter(pkg => pkg.subscription === (isMonthly ? 'monthly' : 'yearly'))
                    .map((pkg, index) => (
                        <div className={`package-card ${pkg.mostPopular ? 'most-popular' : ''}`} key={index}>
                            <div className="package-details">
                                <span className="package-name">{pkg.packageName}</span>
                                <span className="package-price">
                                    {pkg.packageName === 'Custom'
                                        ? 'Custom Pricing'
                                        : `$${pkg.price}/month`}
                                </span>
                            </div>
                            <p className="package-content1">{pkg.packageName === 'Custom' ? 'Custom formatting/month' : `${pkg.Limit} formatting/month`}</p>
                            <p className="package-content2">All countries</p>

                            {portalID ? (
                                <Link to={pkg.packageName === 'Custom' ? '/custom' : '/payment'} state={{ selectedPackage: pkg }}>
                                    <button className="install-button">{pkg.packageName === 'Custom' ? 'Proceed' : 'Choose Plan'}</button>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <button className="install-button">Login to Continue</button>
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No Packages Available</div>
                )}
            </div>
        </section>
    );
};


export default ProposedPackageSection;