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
    const AllPackages = useSelector((state) => state.getAllPackage);
    const { loading, error, packages } = AllPackages;
    const portalID = localStorage.getItem("I8PD56?#C|NXhSgZ0KE");
    useEffect(() => {
        dispatch(allPackages());
      }, [dispatch]);
    
    return (
        <section className="package-section" id="features">
            <h2 className='header'>Packages</h2>
            {
            <div className="package-container">
                {error? <MessageBox>{error}</MessageBox>:
                loading? <LoadingBox>Loading</LoadingBox>: packages?(
                packages.slice(0, 6).map((pkg, index) => (
                    <div className="package-card" key={index}>
                        <div className="package-details">
                            <span className="package-name">{pkg.packageName}</span>
                            {pkg.packageName=='Custom' ? 
                                <button className="package-price">Custom</button>:
                                <button className="package-price">${pkg.price}/month</button>
                            }
                        </div>
                        <p className="package-content1">API Call Limit</p>
                        {pkg.packageName=='Custom' ? 
                                <p className="package-content2">15000+/month</p>:
                                <p className="package-content2">{pkg.Limit}/month</p>
                        }

                         { portalID? 
                                <Link to="/payment"  state={{ selectedPackage: pkg }}>
                                <button className="install-button">Checkout</button>
                            </Link>:
                         pkg.packageName=='Custom' ? 
                                <Link to="/custom"  state={{ selectedPackage: pkg }}>
                                    <button className="install-button">Install</button>
                                </Link>:
                                 <Link to={`${BackendAPI}/install`}  state={{ selectedPackage: pkg }}>
                                    <button className="install-button">Install</button>
                                </Link>
                        }
                       
                       
                    </div>
                ))):""}
            </div>
        }
        </section>
    );
};

export default ProposedPackageSection;
