import React from 'react';
import './NotYourAverage.css';

function NotYourAverage() {
  return (
    <section className="not-average section">
      <div className="container">
        <div className="not-average-content">
          <div className="not-average-text">
            <div className="blue-dot"></div>
            <h2>Not Your Average Realtor</h2>
            <p>
              Real estate is our passion and we're passionate about helping you find your dream home. We'll work with you every step of the way to ensure you're satisfied with the results.
            </p>
          </div>
          
          <div className="not-average-images">
            <img src="/assets/images/Ellipse_13.svg" className="circle-img circle-img-1" alt="Agent 1" />
            <img src="/assets/images/Ellipse_29.svg" className="circle-img circle-img-2" alt="Agent 2" />
            <img src="/assets/images/Ellipse_33.svg" className="circle-img circle-img-3" alt="Agent 3" />
            <div className="orange-dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotYourAverage;
