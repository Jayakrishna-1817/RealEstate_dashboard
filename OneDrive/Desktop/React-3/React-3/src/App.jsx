import React from 'react';
import ProfileCard from './ProfileCard';
import './App.css';

function App() {
  return (
    <div className="cards-container">
      <ProfileCard
        image="OIP.jpeg"
        title="Full Stack Developer"
        price="$50/hr"
        username="Krishna"
        location="Madurai, Tamil Nadu, India"
        skills={['React', 'Node.js', 'CSS']}
        lastSeenHours={3}
      />
      <ProfileCard
        image="OIP1.jpeg"
        title="UI/UX Designer"
        price="$40/hr"
        username="Kavitha"
        location="Chennai, Tamil Nadu, India"
        skills={['Figma', 'Sketch', 'Photoshop']}
        lastSeenDays={2}
      />
      <ProfileCard
        image="OIP2.jpeg"
        title="Backend Developer"
        price="$60/hr"
        username="Kumar"
        location="Tenali, Andhra Pradesh ,India"
        skills={['Express', 'MongoDB', 'Docker']}
        lastSeenDays={10}
      />
    </div>
  );
}

export default App;
