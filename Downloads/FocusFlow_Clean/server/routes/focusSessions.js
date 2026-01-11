import express from 'express';
import FocusSession from '../models/FocusSession.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', async (req, res) => {
  try {
    const { draftId, duration, startTime, endTime, wordCount } = req.body;
    
    const session = await FocusSession.create({
      user: req.user._id,
      draftId,
      duration,
      startTime,
      endTime,
      wordCount
    });
    
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const sessions = await FocusSession.find({ user: req.user._id })
      .sort({ startTime: -1 })
      .populate('draftId', 'title');
    
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const sessions = await FocusSession.find({ user: req.user._id });
    
    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalWords = sessions.reduce((sum, s) => sum + s.wordCount, 0);
    const averageDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaySessions = sessions.filter(s => new Date(s.startTime) >= today);
    const todayDuration = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekSessions = sessions.filter(s => new Date(s.startTime) >= weekAgo);
    const weekDuration = weekSessions.reduce((sum, s) => sum + s.duration, 0);
    
    res.json({
      totalSessions,
      totalDuration,
      totalWords,
      averageDuration,
      todayDuration,
      todaySessions: todaySessions.length,
      weekDuration,
      weekSessions: weekSessions.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
