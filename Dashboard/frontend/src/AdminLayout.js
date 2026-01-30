import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageClients from './pages/admin/ManageClients';
import ViewContacts from './pages/admin/ViewContacts';
import ViewSubscriptions from './pages/admin/ViewSubscriptions';
import './AdminApp.css';

function AdminLayout() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="admin-app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/admin"
            className={activeMenu === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveMenu('dashboard')}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/projects"
            className={activeMenu === 'projects' ? 'active' : ''}
            onClick={() => setActiveMenu('projects')}
          >
            Manage Projects
          </Link>
          <Link
            to="/admin/clients"
            className={activeMenu === 'clients' ? 'active' : ''}
            onClick={() => setActiveMenu('clients')}
          >
            Manage Clients
          </Link>
          <Link
            to="/admin/contacts"
            className={activeMenu === 'contacts' ? 'active' : ''}
            onClick={() => setActiveMenu('contacts')}
          >
            View Contacts
          </Link>
          <Link
            to="/admin/subscriptions"
            className={activeMenu === 'subscriptions' ? 'active' : ''}
            onClick={() => setActiveMenu('subscriptions')}
          >
            View Subscriptions
          </Link>
          <Link
            to="/"
            className=""
            onClick={() => setActiveMenu('')}
            style={{ marginTop: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px' }}
          >
            ← Back to Website
          </Link>
        </nav>
      </div>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ManageProjects />} />
          <Route path="/clients" element={<ManageClients />} />
          <Route path="/contacts" element={<ViewContacts />} />
          <Route path="/subscriptions" element={<ViewSubscriptions />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminLayout;
