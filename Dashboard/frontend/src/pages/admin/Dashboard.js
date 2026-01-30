import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscriptions: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const responses = await Promise.all([
        fetch(`${BASE_URL}/api/projects`),
        fetch(`${BASE_URL}/api/clients`),
        fetch(`${BASE_URL}/api/contacts`),
        fetch(`${BASE_URL}/api/newsletter`),
      ]);

      for (const res of responses) {
        if (!res.ok) throw new Error();
      }

      const [projects, clients, contacts, subscriptions] = await Promise.all(
        responses.map((res) => res.json())
      );

      setStats({
        projects: projects.length || 0,
        clients: clients.length || 0,
        contacts: contacts.length || 0,
        subscriptions: subscriptions.length || 0,
      });
    } catch {
      setStats({
        projects: 0,
        clients: 0,
        contacts: 0,
        subscriptions: 0,
      });
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
        <p style={{ color: "var(--text-light)", lineHeight: "1.6" }}>
          Use the sidebar navigation to manage your projects, clients, view contact
          form submissions, and track newsletter subscriptions. All data is
          synchronized with your MongoDB database.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
