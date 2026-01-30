import React, { useState, useEffect } from 'react';

function ViewContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`https://real-estate-backend-y094.onrender.com/api/contacts/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Contact deleted successfully!');
          fetchContacts();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete contact');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Contact Form Submissions</h1>
        <p>View all contact form submissions from the landing page</p>
      </div>

      <div className="card">
        <h2>All Contact Submissions ({contacts.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.fullName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.mobile}</td>
                  <td>{contact.city}</td>
                  <td>{formatDate(contact.createdAt)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {contacts.length === 0 && (
            <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-light)' }}>
              No contact submissions yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewContacts;
