import express from 'express';
import User from '../models/User.js';
import FocusSession from '../models/FocusSession.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

export const getThemeData = (themeId) => {
  return SHOP_ITEMS.find(item => item.id === themeId) || null;
};

export const getFontData = (fontId) => {
  return SHOP_ITEMS.find(item => item.id === fontId) || null;
};

const SHOP_ITEMS = [
  { id: 'theme-midnight', type: 'theme', name: 'Midnight Dark', description: 'Deep dark theme for night writers', price: 50, colors: { bg: '#0a0a0a', text: '#e8e8e8' } },
  { id: 'theme-forest', type: 'theme', name: 'Forest Green', description: 'Calming forest ambiance', price: 50, colors: { bg: '#1a2f1a', text: '#d4e8d4' } },
  { id: 'theme-ocean', type: 'theme', name: 'Ocean Blue', description: 'Deep ocean tranquility', price: 50, colors: { bg: '#0d1f2d', text: '#c9e4f5' } },
  { id: 'theme-sunset', type: 'theme', name: 'Sunset Warmth', description: 'Warm sunset colors', price: 75, colors: { bg: '#2d1810', text: '#f5d9c9' } },
  { id: 'font-serif', type: 'font', name: 'Classic Serif', description: 'Traditional serif font', price: 30, fontFamily: 'Georgia, serif' },
  { id: 'font-mono', type: 'font', name: 'Writer Mono', description: 'Typewriter-style monospace', price: 40, fontFamily: 'Courier New, monospace' },
  { id: 'font-elegant', type: 'font', name: 'Elegant Script', description: 'Flowing handwriting style', price: 60, fontFamily: 'Brush Script MT, cursive' },
  { id: 'font-modern', type: 'font', name: 'Modern Sans', description: 'Clean modern look', price: 35, fontFamily: 'Helvetica, Arial, sans-serif' },
];

router.get('/items', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (typeof user.credits !== 'number') {
      user.credits = 100;
    }
    if (!user.purchasedItems) {
      user.purchasedItems = [];
    }
    if (!user.activeTheme) {
      user.activeTheme = 'default';
    }
    if (!user.activeFont) {
      user.activeFont = 'default';
    }
    await user.save();
    
    const purchasedIds = user.purchasedItems.map(item => item.itemId);
    
    const itemsWithStatus = SHOP_ITEMS.map(item => ({
      ...item,
      purchased: purchasedIds.includes(item.id),
      active: item.type === 'theme' ? user.activeTheme === item.id : user.activeFont === item.id
    }));
    
    res.json(itemsWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/credits', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (typeof user.credits !== 'number') {
      user.credits = 100;
      await user.save();
    }
    
    res.json({ credits: user.credits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/purchase', async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.user._id);
    
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const alreadyPurchased = user.purchasedItems.some(i => i.itemId === itemId);
    if (alreadyPurchased) {
      return res.status(400).json({ error: 'Item already purchased' });
    }
    
    if (user.credits < item.price) {
      return res.status(400).json({ error: 'Insufficient credits' });
    }
    
    user.credits -= item.price;
    user.purchasedItems.push({
      itemId: item.id,
      itemType: item.type
    });
    
    if (item.type === 'theme' && !user.activeTheme) {
      user.activeTheme = item.id;
    } else if (item.type === 'font' && !user.activeFont) {
      user.activeFont = item.id;
    }
    
    await user.save();
    
    res.json({ 
      success: true, 
      credits: user.credits,
      message: `${item.name} purchased successfully!`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/activate', async (req, res) => {
  try {
    const { itemId } = req.body;
    const user = await User.findById(req.user._id);
    
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const isPurchased = user.purchasedItems.some(i => i.itemId === itemId);
    if (!isPurchased && itemId !== 'default') {
      return res.status(400).json({ error: 'Item not purchased' });
    }
    
    if (item.type === 'theme') {
      user.activeTheme = itemId;
    } else if (item.type === 'font') {
      user.activeFont = itemId;
    }
    
    await user.save();
    
    res.json({ 
      success: true,
      activeTheme: user.activeTheme,
      activeFont: user.activeFont
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/award-credits', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (typeof user.credits !== 'number') {
      user.credits = 100;
      await user.save();
    }
    
    const sessions = await FocusSession.find({ user: req.user._id }).sort({ startTime: -1 });
    
    if (sessions.length === 0) {
      return res.json({ creditsAwarded: 0, reason: 'No sessions yet' });
    }
    
    let creditsAwarded = 0;
    let bonusReasons = [];
    
    const totalSessions = sessions.length;
    const latestSession = sessions[0];
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    
    const baseCredits = Math.floor(latestSession.duration / 300);
    creditsAwarded += baseCredits;
    
    if (totalSessions === 1) {
      creditsAwarded += 20;
      bonusReasons.push('First session bonus: +20');
    }
    if (totalSessions === 10) {
      creditsAwarded += 50;
      bonusReasons.push('10 sessions milestone: +50');
    }
    if (totalSessions === 25) {
      creditsAwarded += 100;
      bonusReasons.push('25 sessions milestone: +100');
    }
    if (totalSessions === 50) {
      creditsAwarded += 200;
      bonusReasons.push('50 sessions milestone: +200');
    }
    
    if (latestSession.duration >= 3600) {
      creditsAwarded += 30;
      bonusReasons.push('1+ hour session: +30');
    } else if (latestSession.duration >= 1800) {
      creditsAwarded += 15;
      bonusReasons.push('30+ min session: +15');
    }
    
    const previousDuration = totalDuration - latestSession.duration;
    if (totalDuration >= 36000 && previousDuration < 36000) {
      creditsAwarded += 75;
      bonusReasons.push('10 total hours: +75');
    }
    
    let reason = '';
    if (bonusReasons.length > 0) {
      reason = bonusReasons.join(' • ');
    } else {
      reason = `+${baseCredits} credits for ${Math.floor(latestSession.duration / 60)} minutes focused! ✨`;
    }
    
    if (creditsAwarded > 0) {
      user.credits += creditsAwarded;
      await user.save();
      console.log(`Awarded ${creditsAwarded} credits to user ${user.email}. New total: ${user.credits}`);
    }
    
    res.json({ creditsAwarded, reason, totalCredits: user.credits });
  } catch (error) {
    console.error('Error awarding credits:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/preferences', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.activeTheme) user.activeTheme = 'default';
    if (!user.activeFont) user.activeFont = 'default';
    
    const activeTheme = SHOP_ITEMS.find(item => item.id === user.activeTheme);
    const activeFont = SHOP_ITEMS.find(item => item.id === user.activeFont);
    
    res.json({
      activeTheme: user.activeTheme,
      activeFont: user.activeFont,
      themeData: activeTheme || null,
      fontData: activeFont || null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
