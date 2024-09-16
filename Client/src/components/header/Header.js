import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { BackendAPI } from '../../api/server';
import { useLocation } from 'react-router-dom';


const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

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
                    <li><ScrollLink to="features" smooth={true} duration={500}>Features</ScrollLink></li>
                    <li><ScrollLink to="howToUse" smooth={true} duration={500}>How To Use</ScrollLink></li>
                    <li><ScrollLink to="Pricing" smooth={true} duration={500}>Pricing</ScrollLink></li>
                    <li><ScrollLink to="FAQs" smooth={true} duration={500}>FAQs</ScrollLink></li>
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
