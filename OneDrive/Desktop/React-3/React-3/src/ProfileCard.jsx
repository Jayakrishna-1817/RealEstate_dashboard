import React from 'react';

function ProfileCard({ image, title, price, username, location, skills, lastSeenHours, lastSeenDays }) {
  const getLastSeen = () => {
    if (lastSeenHours) {
      return `Last seen ${lastSeenHours} hour(s) ago`;
    } else if (lastSeenDays) {
      if (lastSeenDays > 7) {
        return 'Last seen several days ago';
      } else {
        return `Last seen ${lastSeenDays} day(s) ago`;
      }
    }
    return 'Online';
  };

  return (
    <div className="card">
      <div className="card-header">
        <img src={image} alt={username} />
        <div className="card-title">{title}</div>
        <div className="card-price">{price}</div>
      </div>
      <div className="card-body">
        <div className="card-username">{username}</div>
        <div className="card-location">{location}</div>
        <div className="card-skills">
          {skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
        <div className="btns">
          <button className="btn-outline">Message</button>
          <button className="btn-filled">Hire</button>
        </div>
        <div className="card-status">{getLastSeen()}</div>
      </div>
    </div>
  );
}

export default ProfileCard;
