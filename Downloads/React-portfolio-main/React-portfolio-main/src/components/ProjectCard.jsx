import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { ExternalLink, Github, Play } from 'lucide-react'

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Helper function to handle image paths
  const getImagePath = (imgPath) => {
    // If it's already a full URL, return as-is
    if (imgPath.startsWith('http')) return imgPath
    
    // If using Vite/React, images in public folder should be referenced from root
    if (imgPath.startsWith('assets/')) return `/${imgPath}`
    
    // For placeholder images
    if (imgPath.startsWith('/api/placeholder')) {
      return `https://picsum.photos/seed/${project.title}/800/450`
    }
    
    return imgPath
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <Card className="bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden h-full flex flex-col">
        {/* Image/Header Section */}
        <div className="relative overflow-hidden flex-grow-0">
          <motion.div
            className="h-48 w-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 relative"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Image - Now properly displayed */}
            <img
              src={getImagePath(project.image)}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            
            {/* Top-left badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-cyan-500/10 text-cyan-400">
                {project.category}
              </Badge>
              <Badge className="bg-purple-500/10 text-purple-400">
                {project.year}
              </Badge>
            </div>
            
            {/* Technology tags at bottom */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <Badge
                    key={techIndex}
                    variant="secondary"
                    className="bg-slate-700/80 text-cyan-400 border-cyan-500/30"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="secondary" className="bg-slate-700/80 text-slate-400">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Hover overlay with action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-slate-900/90 flex items-center justify-center gap-4"
            >
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white transition-all"
                  >
                    <Play size={16} className="mr-2" />
                    Live Demo
                  </Button>
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 transition-all"
                  >
                    <Github size={16} className="mr-2" />
                    View Code
                  </Button>
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Content Section */}
        <CardContent className="p-6 flex-grow flex flex-col">
          <p className="text-slate-400 leading-relaxed mb-4 flex-grow">
            {project.description}
          </p>
          
          {/* Footer with external link */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
            <div className="flex items-center gap-3">
              {project.technologies.slice(0, 2).map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs py-1 px-2 text-slate-400 border-slate-700"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            
            {project.liveLink && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink 
                    size={18} 
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer" 
                  />
                </a>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ProjectCard