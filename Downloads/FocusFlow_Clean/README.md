# FocusFlow Sanctuary

A peaceful writing sanctuary designed for students, writers, and dreamers. Focus on your writing, track your progress, and earn rewards for your dedication.

## Features

### 📝 Writing Environment
- **Distraction-Free Editor**: Clean, minimal interface designed for focused writing
- **Auto-Save Drafts**: Your work is automatically saved as you write
- **Word Count Tracking**: Real-time word count displayed on dashboard
- **Favorite Drafts**: Mark important drafts for quick access

### ✍️ Grammar & Writing Tools
- **Real-Time Grammar Checking**: Powered by LanguageTool API
- **Smart Suggestions**: Click to apply grammar corrections instantly
- **Offset-Adjusted Corrections**: Multiple suggestions update automatically after each fix

### ⏱️ Focus Sessions
- **Pomodoro Timer**: Track focused writing sessions
- **Focus History**: View all your past focus sessions
- **Session Analytics**: Monitor your productivity over time

### 🎯 Credits & Rewards System
- **Earn Credits**: Get rewarded for focused writing time
  - 1 credit per 5 minutes of focus time
  - Milestone bonuses: 25 mins (+5), 50 mins (+10), 100 mins (+20)
- **Starting Balance**: New users receive 100 credits

### 🛍️ Customization Shop
- **Premium Themes**: Choose from 4 beautiful editor themes (50-75 credits)
  - Midnight Blue
  - Forest Green
  - Sunset Orange
  - Royal Purple
- **Custom Fonts**: Enhance your writing experience with 4 unique fonts (30-60 credits)
  - Serif Classic
  - Sans Modern
  - Mono Code
  - Handwriting Flow
- **Instant Application**: Purchased themes and fonts apply immediately to your editor

### 🔐 User Authentication
- **Secure Login/Signup**: JWT-based authentication
- **Protected Routes**: User data is secure and private
- **Email Verification Flow**: Signup redirects to login page

### 📊 Dashboard
- **Draft Overview**: See all your drafts with word counts and timestamps
- **Quick Actions**: Edit, delete, or favorite drafts
- **Search & Filter**: Find your work easily

## Technologies Used

### Frontend
- **React 18.3.1**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite 5.4.19**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Beautiful, accessible components

### Backend
- **Express.js 4.18.2**: Web application framework
- **MongoDB Atlas**: Cloud database
- **Mongoose 8.0.0**: MongoDB ODM
- **JWT Authentication**: Secure user sessions
- **bcryptjs**: Password hashing

### APIs & Services
- **LanguageTool API**: Grammar checking service

## Getting Started

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- MongoDB Atlas account and connection string

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd focusflow-sanctuary-main

# Step 3: Install dependencies
npm i

# Step 4: Set up environment variables
# Create a .env file in the server directory with:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret

# Step 5: Start the backend server (from server directory)
cd server
node index.js

# Step 6: Start the frontend development server (from root directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

## Project Structure

```
focusflow-sanctuary-main/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utilities and API client
├── server/                # Backend Express application
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── index.js           # Server entry point
└── public/                # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Drafts
- `GET /api/drafts` - Get all user drafts
- `POST /api/drafts` - Create new draft
- `GET /api/drafts/:id` - Get specific draft
- `PUT /api/drafts/:id` - Update draft
- `DELETE /api/drafts/:id` - Delete draft

### Focus Sessions
- `GET /api/focus-sessions` - Get user's focus sessions
- `POST /api/focus-sessions` - Create focus session

### Grammar
- `POST /api/grammar/check` - Check text for grammar errors

### Shop
- `GET /api/shop/items` - Get all shop items
- `GET /api/shop/credits` - Get user credits
- `POST /api/shop/purchase` - Purchase item
- `POST /api/shop/activate` - Activate theme/font
- `GET /api/shop/preferences` - Get active theme/font
- `POST /api/shop/award-credits` - Award credits based on focus time
