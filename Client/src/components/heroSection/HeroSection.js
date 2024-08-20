// src/HeroSection.js
import React from 'react';
import {  useSelector } from "react-redux";
import './HeroSection.css';
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection = () => {
    const userDetails = useSelector((state) => state.userInfo);
    const { loading, error, userInfo } = userDetails;
    const localUserInfo =  localStorage.getItem('I8PD56?#C|NXhSgZ0KE');
    const [cookies, setCookie] = useCookies(['subscription']);



    return (
        <div>
            <section className="hero-section">
                <div className="hero-content">
                    <h2>Welcome to</h2>
                    <h1>Phone Number Formator</h1>
                    <h2>App for HubSpot Ecosystem</h2>
                    {localUserInfo?
                        <h2>App is installed in <Link className='profile-link' to='/profile'>{localUserInfo}</Link></h2> : ""
                    }
                    <div className="buttons">
                            <ScrollLink to="features">
                                <button className="btn install-btn">
                                    Install The App
                                </button>
                            </ScrollLink>
                            
                        <button className="btn doc-btn">Read The Documentation</button>
                    </div>
                </div>
            </section>
            <svg id="wave" 
            className='waveCSS1' 
            viewBox="0 0 1440 280" 
            version="1.1" 
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                    <stop stop-color="#004080" offset="0%"></stop>
                    <stop stop-color="#004080" offset="100%"></stop>
                </linearGradient></defs>
            <path className='waveCSS2' fill="url(#sw-gradient-0)" d="M0,252L48,228.7C96,205,192,159,288,135.3C384,112,480,112,576,116.7C672,121,768,131,864,126C960,121,1056,103,1152,79.3C1248,56,1344,28,1440,14C1536,0,1632,0,1728,0C1824,0,1920,0,2016,42C2112,84,2208,168,2304,172.7C2400,177,2496,103,2592,93.3C2688,84,2784,140,2880,177.3C2976,215,3072,233,3168,214.7C3264,196,3360,140,3456,140C3552,140,3648,196,3744,210C3840,224,3936,196,4032,158.7C4128,121,4224,75,4320,60.7C4416,47,4512,65,4608,70C4704,75,4800,65,4896,60.7C4992,56,5088,56,5184,74.7C5280,93,5376,131,5472,135.3C5568,140,5664,112,5760,116.7C5856,121,5952,159,6048,186.7C6144,215,6240,233,6336,242.7C6432,252,6528,252,6624,247.3C6720,243,6816,233,6864,228.7L6912,224L6912,280L6864,280C6816,280,6720,280,6624,280C6528,280,6432,280,6336,280C6240,280,6144,280,6048,280C5952,280,5856,280,5760,280C5664,280,5568,280,5472,280C5376,280,5280,280,5184,280C5088,280,4992,280,4896,280C4800,280,4704,280,4608,280C4512,280,4416,280,4320,280C4224,280,4128,280,4032,280C3936,280,3840,280,3744,280C3648,280,3552,280,3456,280C3360,280,3264,280,3168,280C3072,280,2976,280,2880,280C2784,280,2688,280,2592,280C2496,280,2400,280,2304,280C2208,280,2112,280,2016,280C1920,280,1824,280,1728,280C1632,280,1536,280,1440,280C1344,280,1248,280,1152,280C1056,280,960,280,864,280C768,280,672,280,576,280C480,280,384,280,288,280C192,280,96,280,48,280L0,280Z">
            </path>
            </svg>
        </div>
    );
};


export default HeroSection;
