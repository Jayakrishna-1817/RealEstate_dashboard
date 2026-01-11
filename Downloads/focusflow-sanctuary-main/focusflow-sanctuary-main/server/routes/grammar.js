import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/check', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        language: 'en-US',
      }),
    });

    const data = await response.json();

    const suggestions = data.matches
      .filter(match => match.replacements && match.replacements.length > 0)
      .map(match => ({
        original: text.substring(match.offset, match.offset + match.length),
        suggestion: match.replacements[0].value,
        explanation: match.message,
        offset: match.offset,
        length: match.length,
      }));

    res.json({ suggestions });
  } catch (error) {
    console.error('Grammar check error:', error);
    res.status(500).json({ error: 'Failed to check grammar' });
  }
});

export default router;
