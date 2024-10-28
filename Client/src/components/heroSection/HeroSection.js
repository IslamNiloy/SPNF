// src/HeroSection.js
import React from 'react';
import { useSelector } from "react-redux";
import './HeroSection.css';
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { BackendAPI } from "../../api/server";

const HeroSection = () => {
    const userDetails = useSelector((state) => state.userInfo);
    const { loading, error, userInfo } = userDetails;
    const localUserInfo = localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
    const [cookies, setCookie] = useCookies(['subscription']);
    return (
        <div>
            <section className="hero-section">
                <div className="hero-content">
                    <button className="btn hero-btn1">
                        Smart Phone Number Formatter
                    </button>
                    <h1 className='heading_hero_main'><span style={{ color: "#000000" }}>Format</span> HubSpot Phone Numbers 
                    <span style={{ color: "#000000" }}> with Ease</span></h1>
                    <p>Automatically format phone numbers from any country, from your HubSpot portal!</p>
                    <div className="buttons">
                        <Link to={`${BackendAPI}/install`}>
                            <button className="btn hero-btn2">
                                Get Your Formatter Now!
                            </button>
                        </Link>



                        <ScrollLink to="hubspotMeeting" smooth={true} duration={500}>
                            <button className="btn hero-btn2 book-a-meeting">
                                Book A Meeting Now!
                            </button>
                        </ScrollLink>
                    
                    </div>
                </div>
            </section>
        </div>
    );
};


export default HeroSection;
