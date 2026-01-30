import React, { useState } from 'react';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');

  const newsletterStyle = {
    backgroundImage: `linear-gradient(rgba(26, 26, 46, 0.5), rgba(22, 33, 62, 0.5)), url(${process.env.PUBLIC_URL}/assets/images/Rectangle.svg)`
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <section className="newsletter section" style={newsletterStyle}>
      <div className="newsletter-overlay"></div>
      <div className="container newsletter-container">
        <h2>Learn more about our listing process, as well as our additional staging and design work.</h2>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-subscribe-footer">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
