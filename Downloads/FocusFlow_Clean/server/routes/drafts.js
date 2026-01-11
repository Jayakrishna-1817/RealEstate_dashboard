import express from 'express';
import Draft from '../models/Draft.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', async (req, res) => {
  try {
    const drafts = await Draft.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(drafts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const draft = await Draft.findOne({ _id: req.params.id, user: req.user._id });
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json(draft);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const draft = await Draft.create({
      user: req.user._id,
      title: req.body.title || 'Untitled',
      content: req.body.content || ''
    });
    res.status(201).json(draft);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const draft = await Draft.findOne({ _id: req.params.id, user: req.user._id });
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    if (req.body.title !== undefined) draft.title = req.body.title;
    if (req.body.content !== undefined) draft.content = req.body.content;
    if (req.body.isFavorite !== undefined) draft.isFavorite = req.body.isFavorite;
    await draft.save();
    res.json(draft);
  } catch (error) {
    console.error('Error updating draft:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const draft = await Draft.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json({ message: 'Draft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
