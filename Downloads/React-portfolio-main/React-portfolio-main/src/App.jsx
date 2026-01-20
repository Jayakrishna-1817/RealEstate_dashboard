import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import ExperienceTimeline from "./components/ExperienceTimeline.jsx";
import {
  User,
  Code,
  Briefcase,
  Mail,
  Download,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Star,
  Award,
  Target,
  Lightbulb,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import "./App.css";

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-400/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Navigation component
const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "certifications", label: "Certifications", icon: Award }, 
    { id: "experience", label: "Experience", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 py-4"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleScrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero section
const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <FloatingParticles />

      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8 mx-auto w-48 h-48"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-spin-slow"></div>
          <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-6xl font-bold text-cyan-400">
              <img
                src="/jk_image.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Hey, I'm{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Jaya Krishna
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-300 mb-8"
        >
          <span className="text-cyan-400">Agentic AI</span> & Full-Stack Developer
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          A passionate developer specializing in{" "}
          <span className="text-cyan-400 font-semibold"></span>{" "}
          <span className="text-blue-400 font-semibold">
            full-stack development
          </span>
          , and{" "}
          <span className="text-purple-400 font-semibold">
            technical leadership
          </span>
          . Building innovative solutions that drive meaningful change.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <motion.a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=jksmart1817@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Button
    size="lg"
    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
  >
    <Mail className="mr-2" size={20} />
    Let's Connect
  </Button>
</motion.a>

          <a href="/JayaKrishna_Resume.pdf" download="JayaKrishna_Resume.pdf">
            <Button
              variant="outline"
              size="lg"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Download className="mr-2" size={20} />
              Resume
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="flex justify-center space-x-6"
        >
          <motion.a
            href="https://github.com/Jayakrishna-1817/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-300"
          >
            <Github size={24} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/jayakrishna-sikhakolli-847663261/" // Replace with your actual LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-300"
          >
            <Linkedin size={24} />
          </motion.a>

          <motion.a
            href="https://react-portfolio-green-ten.vercel.app/" // Replace with your portfolio or other link
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-300"
          >
            <ExternalLink size={24} />
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-slate-400 cursor-pointer"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

// About section
const AboutSection = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Building cutting-edge solutions that solve real problems with clean, scalable architecture.",
    },
    {
      icon: Users,
      title: "Leadership",
      description:
        "Leading teams and turning complex ideas into actionable solutions with effective communication.",
    },
    {
      icon: TrendingUp,
      title: "Learning",
      description:
        "Continuously exploring new technologies and staying ahead of industry trends.",
    },
    {
      icon: Target,
      title: "Impact",
      description:
        "Choosing projects that drive meaningful change and create lasting value.",
    },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Future
            </span>
          </h2>

          <div className="max-w-4xl mx-auto text-lg text-slate-300 leading-relaxed space-y-4">
            {/* <p>
              Currently working as a{" "}
              <span className="text-cyan-400 font-semibold">
                Software Engineer
              </span>{" "}
              at{" "}
              <span className="text-blue-400 font-semibold">Your Company</span>,
              where I'm developing core AI engine components for real-time
              applications using cutting-edge technologies.
            </p> */}

            <p>
              As a{" "}
              <span className="text-green-400 font-semibold">Team Lead</span>{" "}
              and{" "}
              <span className="text-purple-400 font-semibold">
                Technical Architect
              </span>
              , I've honed my leadership skills while maintaining an impressive{" "}
              <span className="text-yellow-400 font-semibold">
                track record
              </span>
              . I specialize in building AI-powered applications with modern
              tech stacks.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-300"
                    >
                      <Icon className="text-cyan-400" size={28} />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {value.title}
                    </h3>

                    <p className="text-slate-400 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-cyan-400">
                Key Achievements
              </h3>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-cyan-400 mb-2"
                  >
                    8.1+
                  </motion.div>
                  <div className="text-slate-300 font-semibold">
                    Current GPA
                  </div>
                  <div className="text-slate-500 text-sm">
                    Academic Excellence
                  </div>
                </div>

                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-blue-400 mb-2"
                  >
                    10+
                  </motion.div>
                  <div className="text-slate-300 font-semibold">
                    Certifications
                  </div>
                  <div className="text-slate-500 text-sm">
                    Including Elite Silver
                  </div>
                </div>

                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-purple-400 mb-2"
                  >
                    5+
                  </motion.div>
                  <div className="text-slate-300 font-semibold">
                    Leadership Roles
                  </div>
                  <div className="text-slate-500 text-sm">Active Positions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Skills section
const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: [
        {
          name: "JavaScript",
          level: 85,
          color: "from-yellow-400 to-yellow-600",
        },
        { name: "HTML & CSS", level: 95, color: "from-blue-400 to-blue-600" },
        { name: "Python", level: 80, color: "from-green-400 to-green-600" },
        { name: "React", level: 80, color: "from-cyan-400 to-cyan-600" },
        { name: "Node.js", level: 90, color: "from-green-500 to-green-700" },
        { name: "Java", level: 90, color: "from-red-400 to-red-600" },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        {
          name: "Git/GitHub",
          level: 92,
          color: "from-orange-400 to-orange-600",
        },
        { name: "Figma", level: 95, color: "from-blue-500 to-blue-700" },
        {
          name: "MS office",
          level: 95,
          color: "from-yellow-500 to-orange-500",
        },
        { name: "MongoDB", level: 88, color: "from-green-600 to-green-800" },
        { name: "PostgreSQL", level: 82, color: "from-blue-600 to-blue-800" },
        { name: "Android Studio", level: 95, color: "from-red-500 to-red-700" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technical{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building innovative solutions from
            concept to deployment
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-center mb-8 text-cyan-400">
                    {category.title}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">
                            {skill.name}
                          </span>
                          <span className="text-slate-400 text-sm">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{
                              delay: skillIndex * 0.1 + 0.5,
                              duration: 1,
                              ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                          >
                            <motion.div
                              animate={{ x: [0, 10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 bg-white/20 rounded-full"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "Jk's ChatBot",
      description:
        "Developed an intelligent chatbot integrated into a comprehensive analytics platform to assist users with real-time data insights, reports, and predictive trends. The chatbot acts as a conversational interface between users and business data, simplifying complex queries using natural language processing (NLP).",
      technologies: [
        "Python",
        "Streamlit",
        "TensorFlow",
        "Gemini API",
        "PostgreSQL",
        "Docker",
      ],
      category: "AI/ML",
      year: "2024",
      image: "/CB.png",
      githubLink: "https://github.com/Jayakrishna-1817/jkchatbot",
      liveLink: "https://jkchatbot.streamlit.app/",
    },
    {
      title: "FocusFlow",
      description:
        "Built a full-stack writing platform with distraction-free editing, focus sessions, and gamified productivity features.",
      technologies: ["Node.js", "MongoDB", "React", "Express", ],
      category: "Full-Stack",
      year: "2026",
      image: "/ff.png",
      githubLink: "https://github.com/Jayakrishna-1817/Code_Crew_FocusFlow",
      liveLink: "https://focusflow-frontend-kx64.onrender.com/",
    },
    {
      title: "PoolMate",
      description:
        "Developed PoolMate, an intelligent ride-sharing platform that connects riders with nearby drivers based on live route data, availability, and preferences. The system incorporates real-time search, dynamic ride updates, and backend analytics to ensure efficient and eco-friendly commuting.",
      technologies: ["Node.js", "React", "Express", "MongoDB", "ejs"],
      category: "Full-Stack",
      year: "2025",
      image: "/PoolMate.png",
      githubLink: "https://github.com/Jayakrishna-1817/PoolMate",
      liveLink: "https://poolmate-qyxa.onrender.com/",
    },
    {
      title: "LinkHub",
      description:
        "a platform where users can manage and categorize links in one place (like a personalized link page or “link tree”). You likely paste or upload links and the dashboard classifies them based on what you provide so you can organize and share them easily.",
      technologies: ["Node.js", "React", "Express", "MongoDB", "Machine Learning"],
      category: "AI",
      year: "2025",
      image: "/api/placeholder/400/300",
      githubLink: "https://github.com/Jayakrishna-1817/LinkHub",
      liveLink: "https://link-hub-kappa-nine.vercel.app/",
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A showcase of innovative projects that demonstrate technical
            expertise and creative problem-solving
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Jayakrishna-1817/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              View All Projects
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// 2. Add the CertificationsSection component (place it before your ProjectsSection)
const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      name: "Programming in java",
      organization: "NPTEL",
      imageUrl: "java.png",
    },
    {
      name: "DataBase Management System",
      organization: "Infosys Springboard",
      imageUrl: "dbms.png",
    },
    {
      name: "Salesforce AI Associate",
      organization: "Salesforce Trailhead",
      imageUrl: "salesforce.png",
    },
  ];

  return (
    <section id="certifications" className="py-20 px-6 bg-slate-900/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Professional credentials that validate my technical expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-slate-400 mb-4">{cert.organization}</p>
                  </div>
                  <Button
                    onClick={() => setSelectedCert(cert)}
                    className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700"
                  >
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCert.imageUrl}
                alt={`${selectedCert.name} certificate`}
                className="w-full h-auto rounded-lg border border-slate-700"
              />
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-10 right-0 text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Experience section placeholder
const ExperienceSection = () => {
  const experiences = [
    {
      position: "IIT ROPAR WINTER INTERN",
      company: "IIT Ropar",
      duration: "DEC-2025 to JUN-2026",
      location: "Remote",
      description:
        "Completed a structured internship program covering MERN Stack fundamentals & Understand LLM’s,Web sockets, Learning modals.",
      achievements: [
        "Gained strong conceptual understanding of full-stack web development workflows",
        "Learned REST API architecture, client–server communication, and HTTP method",
        "Understood MongoDB data modeling, CRUD concepts, and backend request handling",
        "Understand LLM’s,Web sockets, Learning modals and Agentic AI concepts",
      ],
      technologies: ["React js", "Node js", "Express js", "MongoDB", "TypeScript","Git"," Github","AI"],
    },
    {
      position: "Full-Stack Developer",
      company: "Jathin Software PVT LTD",
      duration: "DEC-2022 to JUN-2023",
      location: "Guntur, AP",
      description:
        "Driving the end-to-end development of scalable, high-performance web applications by leveraging both front-end and back-end technologies. Collaborating cross-functionally to architect robust systems, ensuring smooth user experiences and maintainable codebases.",
      achievements: [
        "Developed and deployed a full-stack application handling 1M+ daily transactions using React, Node.js, and PostgreSQL",
        "Optimized backend queries and API structure, improving response times by 50% and reducing server load",
        "Led a team of 5 developers in building a modular, real-time dashboard with dynamic data visualization and role-based access",
        "Implemented CI/CD pipelines and Docker-based deployment, reducing manual overhead and release time by 60%",
      ],
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Git",
      ],
    },
    {
      position: "JAVA FULL STACK DEVELOPER VIRTUAL INTERN",
      company: "Edu Skills - AICTE",
      duration: "APR-2025 to JUN-2025",
      location: "Remote",
      description:
        "Developed and maintained full-stack web applications using Java and modern frontend technologies. Collaborated closely with backend and frontend teams to deliver scalable and efficient solutions within agile environments.",
      achievements: [
        "Built and deployed responsive web applications used by 100K+ users",
        "Reduced server response and page load times by 50% through code optimization and caching strategies",
        "Implemented automated unit and integration testing, increasing backend code coverage to 90%",
        "Mentored 3 junior developers, conducted regular code reviews, and enforced coding standards",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "Hibernate",
        "React",
        "MySQL",
        "Docker",
        "Git",
        "Jenkins",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Professional{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A journey of growth, innovation, and technical excellence across
            diverse projects and teams
          </p>
        </motion.div>

        <ExperienceTimeline experiences={experiences} />
      </div>
    </section>
  );
};

// Contact section placeholder
const ContactSection = () => (
  <section id="contact" className="py-20 px-6">
    <div className="max-w-6xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-6"
      >
        Get In{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Touch
        </span>
      </motion.h2>
      <p className="text-lg text-slate-400 mb-12">
        Let's connect and build something amazing together
      </p>
      <motion.a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=jksmart1817@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
        className="inline-flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold
             bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700
             text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
      >
        <Mail className="mr-2" size={20} />
        Send a Mail
      </motion.a>
    </div>
  </section>
);
function App() {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}

export default App;
