import React, { useState, useEffect } from 'react';
import ImageCropper from '../../components/ImageCropper';

function ManageClients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    designation: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageCropped = (croppedBlob, fileName) => {
    setImageFile(new File([croppedBlob], fileName, { type: 'image/jpeg' }));
    setImagePreview(URL.createObjectURL(croppedBlob));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert('Please upload and crop an image');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('image', imageFile);

      const response = await fetch('/api/clients', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert('Client added successfully!');
        setFormData({ name: '', description: '', designation: '' });
        setImageFile(null);
        setImagePreview('');
        fetchClients();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add client');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await fetch(`/api/clients/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          alert('Client deleted successfully!');
          fetchClients();
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete client');
      }
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Manage Clients</h1>
        <p>Add and manage client testimonials</p>
      </div>

      <div className="card">
        <h2>Add New Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Client Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter client name"
              required
            />
          </div>

          <div className="form-group">
            <label>Testimonial/Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter client testimonial"
              required
            />
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g., CEO, Foreclosure"
              required
            />
          </div>

          <ImageCropper onCropComplete={handleImageCropped} aspectRatio={450 / 350} />

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <p>Image ready to upload (450 x 350 px)</p>
            </div>
          )}

          <button type="submit" className="btn btn-primary">Add Client</button>
        </form>
      </div>

      <div className="card">
        <h2>All Clients</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>
                    <img src={client.image} alt={client.name} className="item-image" style={{ borderRadius: '50%' }} />
                  </td>
                  <td>{client.name}</td>
                  <td>{client.designation}</td>
                  <td>{client.description.substring(0, 80)}...</td>
                  <td>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageClients;
