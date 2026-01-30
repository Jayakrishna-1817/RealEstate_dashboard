import React, { useState, useEffect } from 'react';

function ViewSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/newsletter');
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        const response = await fetch(`/api/newsletter/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Subscription deleted successfully!');
          fetchSubscriptions();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete subscription');
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
        <h1>Newsletter Subscriptions</h1>
        <p>View all newsletter email subscriptions</p>
      </div>

      <div className="card">
        <h2>All Subscriptions ({subscriptions.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Subscribed Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription._id}>
                  <td>{subscription.email}</td>
                  <td>{formatDate(subscription.createdAt)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(subscription._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {subscriptions.length === 0 && (
            <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-light)' }}>
              No subscriptions yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewSubscriptions;
