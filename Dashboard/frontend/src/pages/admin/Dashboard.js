import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscriptions: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, clients, contacts, subscriptions] = await Promise.all([
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/clients').then(res => res.json()),
        fetch('/api/contacts').then(res => res.json()),
        fetch('/api/newsletter').then(res => res.json())
      ]);

      setStats({
        projects: projects.length,
        clients: clients.length,
        contacts: contacts.length,
        subscriptions: subscriptions.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to the admin panel</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <div className="stat-number">{stats.projects}</div>
        </div>
        <div className="stat-card">
          <h3>Total Clients</h3>
          <div className="stat-number">{stats.clients}</div>
        </div>
        <div className="stat-card">
          <h3>Contact Submissions</h3>
          <div className="stat-number">{stats.contacts}</div>
        </div>
        <div className="stat-card">
          <h3>Newsletter Subscribers</h3>
          <div className="stat-number">{stats.subscriptions}</div>
        </div>
      </div>

      <div className="card">
        <h2>Quick Overview</h2>
        <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
          Use the sidebar navigation to manage your projects, clients, view contact form submissions,
          and track newsletter subscriptions. All data is synchronized with your MongoDB database.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
