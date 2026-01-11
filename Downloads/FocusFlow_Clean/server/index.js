import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import draftRoutes from './routes/drafts.js';
import focusSessionRoutes from './routes/focusSessions.js';
import shopRoutes from './routes/shop.js';
import grammarRoutes from './routes/grammar.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/drafts', draftRoutes);
app.use('/api/focus-sessions', focusSessionRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/grammar', grammarRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
