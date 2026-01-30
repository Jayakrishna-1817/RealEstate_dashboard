import React, { useState } from 'react';
import './Hero.css';

function Hero() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({ fullName: '', email: '', mobile: '', city: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-shapes">
        <img src={`${process.env.PUBLIC_URL}/assets/shapes/Ellipse 1.svg`} className="shape shape-1" alt="" />
        <img src={`${process.env.PUBLIC_URL}/assets/shapes/Ellipse 7.svg`} className="shape shape-2" alt="" />
        <img src={`${process.env.PUBLIC_URL}/assets/shapes/Subtract.svg`} className="shape shape-3" alt="" />
      </div>
      
      <div className="hero-images">
        <img src={`${process.env.PUBLIC_URL}/assets/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home-1.svg`} alt="Real Estate Consultation" />
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1>Consultation,<br />Design,<br />& Marketing</h1>
          <p className="hero-subtitle">Not Your Average Realtor</p>
          <p className="hero-description">
            Real estate is our passion and we're passionate about helping you find your dream home. We'll work with you every step of the way to ensure you're satisfied with the results.
          </p>
        </div>

        <div className="hero-form-container">
          <div className="contact-form">
            <h2>Get a Free<br />Consultation</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Area, City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn-primary">Get Quick Quote</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
