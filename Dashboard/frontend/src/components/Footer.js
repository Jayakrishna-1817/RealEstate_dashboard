import React, { useState } from 'react';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Subscribed successfully!');
        setEmail('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to subscribe');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <a href="#home"><h3>Home</h3></a>
          </div>
          <div className="footer-section">
            <a href="#why-choose-us"><h3>Services</h3></a>
          </div>
          <div className="footer-section">
            <a href="#projects"><h3>Projects</h3></a>
          </div>
          <div className="footer-section">
            <a href="#testimonials"><h3>Testimonials</h3></a>
          </div>
          <div className="footer-section">
            <a href="#home"><h3>Contact</h3></a>
          </div>
        </div>

        <div className="footer-subscribe">
          <h3>Subscribe Us</h3>
          <div className="footer-subscribe-form">
            <input 
              type="email" 
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn-subscribe" onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>All Rights Reserved 2026</p>
          <div className="footer-social">
            <a href="#"><img src="/assets/icons/Linkedin.svg" alt="LinkedIn" /></a>
            <a href="#"><img src="/assets/icons/Group.svg" alt="Facebook" /></a>
            <a href="#"><img src="/assets/icons/Group-1.svg" alt="Twitter" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
