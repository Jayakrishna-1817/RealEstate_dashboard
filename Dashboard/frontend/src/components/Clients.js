import React, { useState, useEffect } from 'react';
import './Clients.css';

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('https://real-estate-backend-y094.onrender.com/api/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  return (
    <section className="clients section" id="testimonials">
      <div className="container">
        <h2 className="section-title">Happy Clients</h2>

        <div className="clients-grid">
          {clients.map((client) => (
            <div key={client._id} className="client-card">
              <div className="client-image">
                <img src={client.image} alt={client.name} />
              </div>
              <p className="client-description">{client.description}</p>
              <h4 className="client-name">{client.name}</h4>
              <p className="client-designation">{client.designation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
