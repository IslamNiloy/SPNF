import React from 'react';
import './PreferredChoice.css'; // Import the CSS file for styling
import { BackendAPI } from "../../api/server";
import {Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
  
const PreferredChoice = () => {
  const companies = [
    { name: 'Lyrebird Health', logo: '/PreferredChoice/1.png' },
    { name: 'SEMIPROBE', logo: '/PreferredChoice/2.png' },
    { name: 'ArtDisplay', logo: '/PreferredChoice/3.png' },
    { name: 'AMATA', logo: '/PreferredChoice/4.png' },
    { name: 'Great Question', logo: '/PreferredChoice/5.png' },
    { name: 'Spectra Lending', logo: '/PreferredChoice/6.png' },
    { name: 'Mobile Action', logo: '/PreferredChoice/7.png' },
    { name: 'Pool Shark', logo: '/PreferredChoice/8.png' },
    { name: 'QIDZ', logo: '/PreferredChoice/9.png' },
    { name: 'Main & Legacy', logo: '/PreferredChoice/10.png' },
    { name: 'Main & Legacy', logo: '/PreferredChoice/11.png' },
    { name: 'Main & Legacy', logo: '/PreferredChoice/12.png' }
  ];

  return (
    <section className="preferred-choice-container">
      <div className="preferred-choice-text">
        <h2 style={{color:"#001b34"}}>Our <span className="highlight">Users</span></h2>
      </div>

      {/* Company logos */}
      <div className="company-logos">
        {companies.map((company, index) => (
          <div key={index} className="company-logo">
            <img src={company.logo} alt={company.name} />
          </div>
        ))}
      </div>

      {/* Call-to-action button */}
      <div className="buttons flex_two_btn">
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
    </section>
  );
};

export default PreferredChoice;
