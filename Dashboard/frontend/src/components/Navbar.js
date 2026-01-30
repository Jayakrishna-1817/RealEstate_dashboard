import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
  e.preventDefault();

  if (!email) {
    alert("Please enter your email");
    return;
  }

  try {
    const response = await fetch(
      "https://real-estate-backend-y094.onrender.com/api/newsletter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error("Subscription failed");
    }

    let data = {};
    const text = await response.text();
    if (text) {
      data = JSON.parse(text);
    }

    alert("Subscribed successfully!");
    setEmail("");
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to subscribe. Please try again.");
  }
};


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/assets/images/logo.svg" alt="Real Trust Logo" />
        </div>
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#why-choose-us">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#home">Contact</a></li>
        </ul>
        <div className="navbar-subscribe">
          <input 
            type="email" 
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-subscribe" onClick={handleSubscribe}>Subscribe</button>
        </div>
        <Link to="/admin" className="btn-admin">
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
