import React from 'react';
import './PreferredChoice.css'; // Import the CSS file for styling

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
        <h2>The <span className="highlight">Preferred Choice</span> of 200s <br /> of Leading <span className="highlight">B2B SaaS</span> Companies</h2>
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
      <div className="cta-container">
        <button className="cta-button">Get Your Formatter Now!</button>
      </div>
    </section>
  );
};

export default PreferredChoice;
