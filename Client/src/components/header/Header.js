import React, { useState, useEffect } from 'react';
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
    scroller.scrollTo(target, {
      smooth: true,
      duration: 500,
      offset: -10, // Adjust for headers if necessary
    });
  };

  // Scroll to the section if the URL contains a hash
  useEffect(() => {
    const hash = location.hash; // Get the hash from the URL (e.g., "#features")
    if (hash) {
      const target = hash.substring(1); // Remove the "#" to get the target ID
      scroller.scrollTo(target, {
        smooth: true,
        duration: 500,
        offset: -10, // Adjust for headers if necessary
      });
    }
  }, [location]);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to close the dropdown menu
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
      <nav className={isMenuOpen ? 'nav-links active' : 'nav-links'} style={{ marginLeft: "60px" }}>
        <ul>
          <li><Link to="/#features" onClick={() => handleScrollTo("features")}>Features</Link></li>
          <li><Link to="/#howToUse" onClick={() => handleScrollTo("howToUse")}>How To Use</Link></li>
          <li><Link to="/#PricingCards" onClick={() => handleScrollTo("PricingCards")}>Pricing</Link></li>
          <li><Link to="/#FAQs" onClick={() => handleScrollTo("FAQs")}>FAQs</Link></li>
          <li className='mobile_li'>
            <div className="logout-container">
              <div className="dropdown">
                {portalID && (
                    <button className="dropdown-btn_mbl" onClick={toggleDropdown}>
                        Profile <i className="fas fa-chevron-down"></i>
                    </button>
                )}
                {dropdownOpen && portalID &&(

                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">Your Profile</Link>
                    <Link to="/profile" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </nav>
      {(portalID) ? (
        <div className="logout-container">
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
      ) : (
        <div className="get-formatter-container">
          <Link to={`${BackendAPI}/install`}>
            <button className="hero-btn2">Get Your Formatter Now!</button>
          </Link>
        </div>
      )}
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
    </header>
  );
};

export default Header;
