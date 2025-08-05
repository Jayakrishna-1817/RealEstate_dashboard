# CourierTrack - Netlify Deployment

This is a courier tracking web application deployed on Netlify with serverless functions.

## Files Structure for Netlify:
```
├── netlify/
│   └── functions/
│       └── api.js          # Serverless API functions
├── Courier Tracking application/  # Static files
│   ├── index.html
│   ├── shipment.html
│   ├── dashboard.html
│   └── ... (all other HTML/CSS/JS files)
├── netlify.toml            # Netlify configuration
└── package.json           # Dependencies

```

## Deployment Steps:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Netlify functions for deployment"
   git push origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with GitHub
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Build settings will be auto-detected from netlify.toml
   - Click "Deploy site"

3. **Your site will be live** at: `https://your-site-name.netlify.app`

## Features:
- ✅ User registration and login
- ✅ Admin dashboard with shipment management
- ✅ Full CRUD operations on shipments
- ✅ Real-time updates
- ✅ Responsive design
- ✅ Serverless backend with Netlify Functions

## API Endpoints:
- `GET /api/shipments` - Get all shipments
- `POST /api/shipments` - Create new shipment
- `PUT /api/shipments/:id` - Update shipment
- `DELETE /api/shipments/:id` - Delete shipment
- `POST /api/users` - Create user
- `POST /api/login` - User login

## Changes Made for Netlify:
1. Created `netlify/functions/api.js` for serverless backend
2. Added `netlify.toml` for configuration
3. Updated all fetch URLs from `localhost:3000` to `/api`
4. Added redirects for proper routing
