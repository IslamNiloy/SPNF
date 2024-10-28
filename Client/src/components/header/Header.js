import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { scroller, Link as ScrollLink } from 'react-scroll';
import { BackendAPI } from '../../api/server';
import { useLocation } from 'react-router-dom';


const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleScrollTo = (target) => {
      // If already on the homepage, scroll directly
      if (location.pathname === "/") {
        scroller.scrollTo(target, {
          smooth: true,
          duration: 500,
          offset: -10, // Adjust for headers if necessary
        });
      } else {
        console.log("target= " + target);
        // Navigate to homepage first, then scroll
        navigate("/");
        setTimeout(() => {
          scroller.scrollTo(target, {
            smooth: true,
            duration: 500,
            offset: -50,
          });
        }, 100); // Delay to allow routing to complete
      }
    };
  

    // Function to extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const portalIDFromWeb = queryParams.get('portalID');

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Handle clicking outside of dropdown (optional)
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const portalID = localStorage.getItem("I8PD56?#C|NXhSgZ0KE");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("I8PD56?#C|NXhSgZ0KE");
        window.location.assign('/');
    };

    return (
        <header>
            <div className="logo">
                <Link to="/" smooth={true} duration={500}>
                    <img src="logo.webp" alt="Logo" />
                </Link>
            </div>
            <nav className={isMenuOpen ? 'nav-links active' : 'nav-links'}>
                <ul>
                <li>
                    <Link to="/" onClick={() => handleScrollTo("features")}>Features</Link>
                </li>
                <li>
                    <Link to="/" onClick={() => handleScrollTo("howToUse")}>How To Use</Link>
                </li>
                <li>
                    <Link to="/" onClick={() => handleScrollTo("PricingCards")}>Pricing</Link>
                </li>
                <li>
                    <Link to="/" onClick={() => handleScrollTo("FAQs")}>FAQs</Link>
                </li>
                </ul>
                {portalID || portalIDFromWeb ? (
                    <div className="logout-container">
                              {/* Dropdown for Profile */}
                        <div className="dropdown">
                            <button className="dropdown-btn" onClick={toggleDropdown}>
                            Profile <i className="fas fa-chevron-down"></i>
                            </button>

                            {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">Your Profile</Link>
                                <Link to="/profile" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                            </div>
                            )}
                        </div>
                    </div>
                ):
                    <Link to={`${BackendAPI}/install`}>
                            <button className="logIn-button">Get Your Formatter Now!</button>
                    </Link>
                }
            </nav>
            <div className="menu-icon" onClick={toggleMenu}>
                &#9776;
            </div>
        </header>
    );
};

export default Header;
