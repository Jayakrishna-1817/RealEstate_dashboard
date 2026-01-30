import React from 'react';
import './WhyChooseUs.css';

function WhyChooseUs() {
  return (
    <section className="why-choose-us section" id="why-choose-us">
      <div className="container">
        <h2 className="section-title">Why Choose Us?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/icons/circle-dollar-sign.svg" alt="Potential ROI" />
            </div>
            <h3>Potential ROI</h3>
            <p>
              We understand that buying a home is one of the biggest investments you'll make in your lifetime. That's why we work hard to ensure you get the best ROI.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/icons/paintbrush-2.svg" alt="Design" />
            </div>
            <h3>Design</h3>
            <p>
              Our design team works with you to create a home that reflects your personality and style. We'll work with you every step of the way to ensure you're satisfied.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/assets/icons/Frame.svg" alt="Marketing" />
            </div>
            <h3>Marketing</h3>
            <p>
              We'll help you market your home to the right audience. Our team of experts will work with you to create a marketing strategy that gets results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
