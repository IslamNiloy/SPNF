import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { BackendAPI } from '../../api/server';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const portalID = localStorage.getItem("I8PD56?#C|NXhSgZ0KE");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("I8PD56?#C|NXhSgZ0KE");
        window.location.reload();
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
                    <li><ScrollLink to="overview" smooth={true} duration={500}>Features</ScrollLink></li>
                    <li><ScrollLink to="functionality" smooth={true} duration={500}>How To Use</ScrollLink></li>
                    <li><ScrollLink to="features" smooth={true} duration={500}>Pricing</ScrollLink></li>
                    <li><ScrollLink to="using-the-app" smooth={true} duration={500}>FAQs</ScrollLink></li>
                </ul>
                {portalID ? (
                    <div className="logout-container">
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
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
