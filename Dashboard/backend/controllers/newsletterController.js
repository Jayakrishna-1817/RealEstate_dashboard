const Newsletter = require('../models/Newsletter');

// Get all newsletter subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    const subscription = new Newsletter({ email });
    const newSubscription = await subscription.save();
    res.status(201).json({ message: 'Subscribed successfully', data: newSubscription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
