import React from 'react';
import './PreferredChoice.css'; // Import the CSS file for styling
import { BackendAPI } from "../../api/server";
import {Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
  
const PreferredChoice = () => {
  const companies = [
    { name: 'Great Question', logo: '/PreferredChoice/1.png', style: { width: '200px' }, className: 'Great_Question' },
    { name: 'Spectra Lending', logo: '/PreferredChoice/2.png', style: { width: '100px' }, className: 'Spectra_Lending' },
    { name: 'Mobile Action', logo: '/PreferredChoice/3.png', style: { width: '150px' }, className: 'Mobile_Action' },
    { name: 'Pool Shark', logo: '/PreferredChoice/4.png', style: { width: '100px' }, className: 'Pool_Shark' },
    { name: 'OIDZ', logo: '/PreferredChoice/5.png', style: { width: '100px' }, className: 'OIDZ' },
    { name: 'Spectra Capital', logo: '/PreferredChoice/6.png', style: { width: '100px' }, className: 'Spectra_Capital' },
    { name: '4G Clinical', logo: '/PreferredChoice/7.png', style: { width: '60px' }, className: 'fourG_Clinical' },
    { name: 'Lyrebird Health', logo: '/PreferredChoice/8.png', style: { width: '150px' }, className: 'Lyrebird_Health' },
    { name: 'Semiprobe', logo: '/PreferredChoice/9.png', style: { width: '150px' }, className: 'Semiprobe' },
    { name: 'Art & Display', logo: '/PreferredChoice/10.png', style: { width: '120px' }, className: 'Art_Display' },
    { name: 'Amata', logo: '/PreferredChoice/11.png', style: { width: '120px' }, className: 'Amata' },
    { name: 'Home Service', logo: '/PreferredChoice/12.png', style: { width: '120px' }, className: 'Home_Service' }
  ];


  return (
    <section className="preferred-choice-container">
      <div className="preferred-choice-text">
        <h2 style={{color:"#001b34", marginBottom:"25px"}}>Our <span className="highlight">Users</span></h2>
      </div>

      <div className="company-logos">
      {companies.map((company, index) => (
        <div key={index} className="company-logo">
          <img style={company.style} src={company.logo} alt={company.name} className={company.className}/>
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
