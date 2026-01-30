import React, { useState, useEffect } from "react";
import ImageCropper from "../../components/ImageCropper";
import { BASE_URL } from "../../config";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ FIXED: correct backend URL + safe JSON handling
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/projects`);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageCropped = (croppedBlob, fileName) => {
    setImageFile(new File([croppedBlob], fileName, { type: "image/jpeg" }));
    setImagePreview(URL.createObjectURL(croppedBlob));
  };

  // ✅ FIXED: POST uses BASE_URL
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload and crop an image");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", imageFile);

      const response = await fetch(`${BASE_URL}/api/projects`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to add project");
      }

      alert("Project added successfully!");
      setFormData({ name: "", description: "" });
      setImageFile(null);
      setImagePreview("");
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project");
    }
  };

  // ✅ FIXED: DELETE uses BASE_URL
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to delete project");
      }

      alert("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Manage Projects</h1>
        <p>Add and manage your real estate projects</p>
      </div>

      <div className="card">
        <h2>Add New Project</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              required
            />
          </div>

          <ImageCropper
            onCropComplete={handleImageCropped}
            aspectRatio={450 / 350}
          />

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <p>Image ready to upload (450 × 350 px)</p>
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Add Project
          </button>
        </form>
      </div>

      <div className="card">
        <h2>All Projects</h2>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>
                      {project.image ? (
                        <img
                          src={`${BASE_URL}/${project.image}`}
                          alt={project.name}
                          className="item-image"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{project.name}</td>
                    <td>{project.description.substring(0, 100)}...</td>
                    <td>
                      <button
                        onClick={() => handleDelete(project._id)}
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
        )}
      </div>
    </div>
  );
}

export default ManageProjects;

