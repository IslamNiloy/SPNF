import React from 'react';
import './Footer.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import MarqueeEffect from './MarqueeEffect';

const Footer = () => {
  return (
    <>
      <MarqueeEffect/>
      <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <div className="logo">
            <Link to="/">
                <img style={{marginLeft: "0px"}} src="logo.webp" alt="HubXpert Logo" />
            </Link>
          </div>
          <div className="content">
            Hubxpert is an independent company and is not affiliated with or endorsed by HubSpot, Inc. HubSpot, Inc. shall not have any liability with respect to Hubxpert or any of Hubxpert's offerings.
          </div>
          <div className="upwork-section">
            <img src="upwork.webp" alt="Upwork Logo" className="upwork-logo" />
          </div>
          <div className="upwork-profile-btn1">
          <Link to="https://www.upwork.com/freelancers/rahmanratul?mp_source=share" target='_black'>
            <button className="upwork-profile-btn">Visit Our Upwork Profile</button>
          </Link>
          </div>

         
        </div>
        
        <div className="footer-section gold-section">
          <img src="/Footer/gold.png" alt="HubSpot Gold Partner Logo" className="gold-logo" />
          <div className='gold-partner-txt'>
            <p >We're a HubSpot <br/> GOLD Partner Agency.</p>
          </div>
          <Link to="https://www.hubxpert.com/white-label" target='_black'>
            <button className="white-label-btn">White Label Our Services!</button>
          </Link>
        </div>

        <div className="footer-section">
          <h2>Userful Links</h2>
          <ul className="useful-links">
            <li><a href="https://help.hubxpert.com/pricing_guide" target='_blank'>Pricing Guide</a></li>
            <li><a href="https://www.hubxpert.com/our-module" target='_blank'>Our Modules</a></li>
            <li><a href="https://www.hubxpert.com/about-us" target='_blank'>About Us</a></li>
            <li><a href="https://www.hubxpert.com/terms-and-conditions" target='_blank'>Terms and Conditions</a></li>
            <li><a href="https://www.hubxpert.com/privacy-policy" target='_blank'>Privacy Policy</a></li>
            <li><a href="https://www.hubxpert.com/careers" target='_blank'>Career</a></li>
            <li><a href="https://app.hubxpert.com/data-formator-app" target='_blank'>Data Formator App</a></li>
            <li><a href="https://blog.hubxpert.com/" target='_blank'>Blog</a></li>
          </ul>
        </div>
        
        <div className="footer-section" >
        <h2>Follow Us</h2>
          <div className="social-media">
            <a href="https://www.linkedin.com/company/hubxpert" target='_blank'><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.facebook.com/hubxpert"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://x.com/hubxpert_crm" target='_blank'><i class="fa-brands fa-twitter"></i></a>
            <a href="https://www.youtube.com/@hubxpertcrm" target='_blank'><i class="fa-brands fa-youtube"></i></a>
          </div>
          <div>
            <img src="/Footer/GF-Blue-2.webp" alt="GoodFirms Verified"  className="GF-Blue"/>   
          </div>

          <div className='verified'>
            <p>Verified </p>
            <img style={{width:"20%", height: "20%"}} src="https://static.wixstatic.com/media/2b3cd1_f477381ff4fe45b6be80821075ef3179~mv2.webp/v1/fill/w_60,h_60,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/verified.webp" alt="HubXpert Logo" /> 
          </div>
        </div>
      </div>
     
      <div className="footer-copyright">
      <hr style={{color:"#F2740E", backgroundColor:"#F2740E"}} className="footer-copyright-hr"/>
      Copyright &copy; 2024 HubXpert. | All Rights Reserved. | All the other third parties logos and mentions are their Copyright.
      </div>
    </footer>
    </>
 
  );
}

export default Footer;
