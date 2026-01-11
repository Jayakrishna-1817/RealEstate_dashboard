# FocusFlow - Distraction-Free Writing Platform

A peaceful writing sanctuary designed for students, writers, and dreamers.

## 🚀 Current Architecture (Supabase)

This app runs on **Supabase** which provides:
- PostgreSQL database
- Built-in authentication (JWT)
- Edge Functions (serverless APIs)
- Auto-scaling infrastructure

**Supabase setup required** - configure your Supabase project settings.

---

## 🍃 MongoDB Alternative Setup (Local Development)

If you want to run this project with MongoDB instead, follow these instructions to set up a local Node.js + Express + MongoDB backend.

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/atlas)
- npm or yarn

### Step 1: Install MongoDB Locally

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB runs as a service automatically

**Linux (Ubuntu):**
```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Verify MongoDB is running:**
```bash
mongosh
# Should connect to mongodb://localhost:27017
```

### Step 2: Create Backend Server

Create a new folder `server/` in your project root:

```
focusflow/
├── server/           # NEW - MongoDB backend
│   ├── package.json
│   ├── .env
│   ├── index.js
│   ├── models/
│   │   ├── User.js
│   │   └── Draft.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── drafts.js
│   └── middleware/
│       └── auth.js
└── src/              # React frontend (existing)
```

### Step 3: Server Files

**server/package.json:**
```json
{
  "name": "focusflow-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

**server/.env:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/focusflow
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**server/index.js:**
```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import draftRoutes from './routes/drafts.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drafts', draftRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

**server/models/User.js:**
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Don't include password in queries by default
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
```

**server/models/Draft.js:**
```javascript
import mongoose from 'mongoose';

const draftSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'Untitled',
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    default: ''
  },
  wordCount: {
    type: Number,
    default: 0
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Update word count before saving
draftSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    this.wordCount = this.content.trim() ? this.content.trim().split(/\s+/).length : 0;
  }
  next();
});

export default mongoose.model('Draft', draftSchema);
```

**server/middleware/auth.js:**
```javascript
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Not authorized, user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Not authorized, token invalid' });
  }
};
```

**server/routes/auth.js:**
```javascript
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create user
    const user = await User.create({ name, email, password });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', protect, (req, res) => {
  res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email } });
});

export default router;
```

**server/routes/drafts.js:**
```javascript
import express from 'express';
import Draft from '../models/Draft.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// GET /api/drafts - Get all drafts for user
router.get('/', async (req, res) => {
  try {
    const drafts = await Draft.find({ user: req.user._id })
      .sort({ updatedAt: -1 });
    res.json(drafts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/drafts/:id - Get single draft
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

// POST /api/drafts - Create new draft
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

// PUT /api/drafts/:id - Update draft
router.put('/:id', async (req, res) => {
  try {
    const draft = await Draft.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { 
        title: req.body.title,
        content: req.body.content,
        isFavorite: req.body.isFavorite
      },
      { new: true, runValidators: true }
    );
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json(draft);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/drafts/:id - Delete draft
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
```

### Step 4: Run the Backend

```bash
cd server
npm install
npm run dev
```

Server will run at `http://localhost:5000`

### Step 5: Test the API

```bash
# Health check
curl http://localhost:5000/api/health

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## 📁 API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |

### Drafts (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/drafts` | Get all user's drafts |
| GET | `/api/drafts/:id` | Get single draft |
| POST | `/api/drafts` | Create new draft |
| PUT | `/api/drafts/:id` | Update draft |
| DELETE | `/api/drafts/:id` | Delete draft |

---

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |

---

## 📝 Notes

- The **Supabase version** (current) requires Supabase configuration
- The **MongoDB version** requires running the backend separately
- Both provide the same functionality
- For production MongoDB, use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available)

---

Made with ☕ in Bengaluru
