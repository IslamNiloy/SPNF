import React from 'react';
import './Footer.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <div className="logo">
            <Link to="/">
                <img style={{alignItems:"start"}} src="logo.webp" alt="HubXpert Logo" />
            </Link>
          </div>
          <div className="content">
            Hubxpert is an independent company and is not affiliated with or endorsed by HubSpot, Inc. HubSpot, Inc. shall not have any liability with respect to Hubxpert or any of Hubxpert's offerings.
          </div>
          <div className="upwork-section">
            <img src="upwork.webp" alt="Upwork Logo" className="upwork-logo" />
          </div>
          <Link to="https://www.upwork.com/freelancers/rahmanratul?mp_source=share" target='_black'>
            <button className="upwork-profile-btn">Visit Our Upwork Profile</button>
          </Link>
         
        </div>
        
        <div className="footer-section gold-section">
          <img src="/Footer/gold.png" alt="HubSpot Gold Partner Logo" className="gold-logo" />
          <p>We're a HubSpot <br/> GOLD Partner Agency.</p>
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
        
        <div className="footer-section" style={{marginTop: "30px"}}>
          <div className="social-media">
            <a href="https://www.linkedin.com/company/hubxpert" target='_blank'><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.facebook.com/hubxpert"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://x.com/hubxpert_crm" target='_blank'><i class="fa-brands fa-twitter"></i></a>
            <a href="https://www.youtube.com/@hubxpertcrm" target='_blank'><i class="fa-brands fa-youtube"></i></a>
          </div>
          <div>
            <img src="/Footer/GF-Blue-2.webp" alt="GoodFirms Verified"  className="GF-Blue"/>
            
          </div>
          <p>Verified <img style={{marginLeft:"1px", width:"30px"}} src="/Footer/verified.webp" alt="HubXpert Logo" /> </p>
          
        </div>
      </div>
      <div className="footer-copyright">
        &copy; 2024 HubXpert. | All Rights Reserved. | All the other third parties logos and mentions are their Copyright.
      </div>
    </footer>
  );
}

export default Footer;
