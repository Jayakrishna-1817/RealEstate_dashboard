const Client = require('../models/Client');

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    let image = req.body.image;
    
    // If file was uploaded, use the uploaded file path
    if (req.file) {
      image = `/uploads/clients/${req.file.filename}`;
    }
    
    const client = new Client({
      name,
      description,
      designation,
      image
    });

    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
