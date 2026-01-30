const Client = require("../models/Client");

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { name, description, designation } = req.body;

    if (!name || !description || !designation) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const client = new Client({
      name,
      description,
      designation,
      image: `/uploads/${req.file.filename}`,
    });

    const saved = await client.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("CREATE CLIENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
