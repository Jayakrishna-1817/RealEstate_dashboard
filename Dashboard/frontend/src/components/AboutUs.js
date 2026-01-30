import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <section className="about-us section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        
        <div className="about-content">
          <p>
            3 years of experience in real estate and an emphasis on customer service and a commitment to providing quality results. We understand that finding the perfect home can be a daunting task, which is why we offer personalized service with a focus on transparency and honesty. Our goal is to make the real estate process as smooth as possible for our clients.
          </p>
          <button className="btn-secondary">Learn More</button>
        </div>

        <div className="about-images">
          <div className="about-image-wrapper">
            <img src="/assets/images/pexels-brett-sayles-2881232-1.svg" className="about-img-1" alt="Team meeting" />
            <img src="/assets/shapes/Subtract-4.svg" className="orange-frame frame-1" alt="" />
          </div>
          <div className="about-image-wrapper">
            <img src="/assets/images/pexels-brett-sayles-2881232-2.svg" className="about-img-2" alt="Property discussion" />
          </div>
          <div className="about-image-wrapper">
            <img src="/assets/images/pexels-brett-sayles-2881232-3.svg" className="about-img-3" alt="Client consultation" />
            <img src="/assets/shapes/Subtract.svg" className="blue-frame frame-2" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
