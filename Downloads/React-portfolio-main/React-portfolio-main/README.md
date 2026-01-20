# Animated Portfolio - React

A modern, smooth, and highly animated portfolio website built with React, featuring stunning visual effects, interactive elements, and responsive design.

## ✨ Features

### 🎨 Visual Design
- **Dark Theme**: Modern dark color scheme with cyan/blue accents
- **Gradient Effects**: Beautiful gradient text and background animations
- **Floating Particles**: Animated background particles for visual appeal
- **Glassmorphism**: Modern glass-like effects on cards and components
- **Custom Scrollbar**: Styled scrollbar with gradient colors

### 🚀 Animations & Interactions
- **Framer Motion**: Smooth, professional animations throughout
- **Scroll Animations**: Elements animate as they come into view
- **Hover Effects**: Interactive hover states on all clickable elements
- **Loading Animations**: Smooth loading states and transitions
- **Micro-interactions**: Subtle animations that enhance user experience

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Proper touch targets and interactions
- **Flexible Layout**: Adapts beautifully to different viewports

### 🛠 Technical Features
- **React 18**: Latest React with hooks and modern patterns
- **TypeScript Ready**: Easy to convert to TypeScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: High-quality, accessible UI components
- **Lucide Icons**: Beautiful, consistent icon set
- **Vite**: Fast development and build tool

## 🎯 Sections

1. **Hero Section**
   - Animated profile image with rotating border
   - Typing animations and gradient text effects
   - Call-to-action buttons with hover effects
   - Social media links with micro-animations

2. **About Section**
   - Professional description with highlighted keywords
   - Value proposition cards with hover animations
   - Key achievements with animated counters

3. **Skills Section**
   - Animated progress bars for different technologies
   - Categorized skill sets (Languages, Tools, AI/ML)
   - Hover effects and smooth transitions

4. **Projects Section**
   - Interactive project cards with hover overlays
   - Technology badges and project details
   - Demo and code buttons with animations

5. **Experience Section**
   - Animated timeline with professional history
   - Achievement lists with bullet animations
   - Technology tags for each position

6. **Contact Section**
   - Contact form with validation (ready to implement)
   - Social media integration
   - Professional contact information

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm, npm, or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd animated-portfolio
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   pnpm run dev --host
   # or
   npm run dev -- --host
   # or
   yarn dev --host
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the portfolio.

### Build for Production

```bash
pnpm run build
# or
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎨 Customization Guide

### 1. Personal Information

Update your personal details in `src/App.jsx`:

```jsx
// Hero Section - Line ~150
<h1 className="text-5xl md:text-7xl font-bold mb-4">
  Hey, I'm{' '}
  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
    Your Name  {/* ← Change this */}
  </span>
</h1>

// Professional title
<div className="text-xl md:text-2xl text-slate-300 mb-8">
  <span className="text-cyan-400">Innovation Architect</span> & Full-Stack Developer  {/* ← Change this */}
</div>
```

### 2. Profile Image

Replace the placeholder initials with your photo:

```jsx
// In Hero Section - Line ~140
<div className="w-40 h-40 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl font-bold text-cyan-400">
  YN  {/* ← Replace with your initials or add an image */}
</div>
```

To use an actual image:
```jsx
<img 
  src="/path/to/your/photo.jpg" 
  alt="Your Name"
  className="w-40 h-40 rounded-full object-cover"
/>
```

### 3. About Section Content

Update the about section in `src/App.jsx` around line 250:

```jsx
<p>
  Currently working as a{' '}
  <span className="text-cyan-400 font-semibold">Software Engineer</span> at{' '}
  <span className="text-blue-400 font-semibold">Your Company</span>, where I'm developing 
  core AI engine components for real-time applications using cutting-edge technologies.
</p>
```

### 4. Skills and Technologies

Update the skills arrays in the `SkillsSection` component:

```jsx
const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600" },
      { name: "TypeScript", level: 90, color: "from-blue-400 to-blue-600" },
      // Add your skills here
    ]
  },
  // Add more categories
]
```

### 5. Projects

Update the projects array in the `ProjectsSection` component:

```jsx
const projects = [
  {
    title: "Your Project Name",
    description: "Your project description...",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Full-Stack",
    year: "2024",
    image: "/path/to/project/image.jpg"
  },
  // Add more projects
]
```

### 6. Experience

Update the experiences array in the `ExperienceSection` component:

```jsx
const experiences = [
  {
    position: "Your Job Title",
    company: "Company Name",
    duration: "2023 - Present",
    location: "City, State",
    description: "Your job description...",
    achievements: [
      "Your achievement 1",
      "Your achievement 2",
    ],
    technologies: ["Tech1", "Tech2", "Tech3"]
  },
  // Add more experiences
]
```

### 7. Color Scheme

The portfolio uses a consistent color scheme defined in Tailwind classes. Main colors:

- **Primary**: Cyan (`cyan-400`, `cyan-500`, `cyan-600`)
- **Secondary**: Blue (`blue-400`, `blue-500`, `blue-600`)
- **Accent**: Purple (`purple-400`, `purple-500`, `purple-600`)
- **Background**: Slate (`slate-900`, `slate-800`, `slate-700`)

To change colors, update the Tailwind classes throughout the components.

### 8. Animations

Animations are controlled by Framer Motion. Key animation properties:

```jsx
// Fade in from bottom
initial={{ opacity: 0, y: 50 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Hover effects
whileHover={{ y: -10, scale: 1.02 }}

// Stagger animations
transition={{ delay: index * 0.1, duration: 0.6 }}
```

## 📁 Project Structure

```
animated-portfolio/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn/UI components
│   │   ├── ProjectCard.jsx  # Project card component
│   │   └── ExperienceTimeline.jsx  # Experience timeline
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main application component
│   ├── App.css              # Custom styles and animations
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎨 Custom CSS Classes

The portfolio includes custom CSS classes in `App.css`:

- `.animate-spin-slow` - Slow rotation animation
- `.animate-float` - Floating animation
- `.animate-glow` - Glowing effect
- `.animate-gradient` - Gradient animation
- `.glass` - Glassmorphism effect
- `.gradient-text` - Animated gradient text

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `pnpm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 🛠 Development Tips

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add it to `App.jsx`
3. Update the navigation array
4. Add scroll-triggered animations

### Performance Optimization
- Use `React.memo()` for components that don't change often
- Implement lazy loading for images
- Optimize animations with `will-change` CSS property
- Use `useCallback` and `useMemo` for expensive operations

### Accessibility
- All interactive elements have proper focus states
- Semantic HTML structure
- Alt text for images
- Proper heading hierarchy
- Keyboard navigation support

## 🐛 Troubleshooting

### Common Issues

1. **Animations not working**
   - Check if Framer Motion is properly installed
   - Ensure `viewport={{ once: true }}` is set for scroll animations

2. **Styles not applying**
   - Verify Tailwind CSS is properly configured
   - Check if custom CSS classes are imported

3. **Build errors**
   - Ensure all dependencies are installed
   - Check for TypeScript errors if using TS

### Performance Issues
- Reduce the number of floating particles
- Optimize images and use WebP format
- Implement virtual scrolling for large lists

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the portfolio, please open an issue on GitHub.

---

**Happy coding! 🚀**

