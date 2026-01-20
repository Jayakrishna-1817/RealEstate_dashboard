import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Calendar, MapPin, Building } from 'lucide-react'

const ExperienceTimeline = ({ experiences }) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-600"
      />
      
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex items-start"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="relative z-10 flex-shrink-0"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Building className="text-white" size={24} />
              </div>
              
              {/* Pulse effect */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-cyan-400/30"
              />
            </motion.div>
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="ml-8 flex-1"
            >
              <Card className="bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {experience.position}
                      </h3>
                      <p className="text-cyan-400 font-semibold">
                        {experience.company}
                      </p>
                    </div>
                    
                    <div className="flex flex-col md:items-end mt-2 md:mt-0 space-y-1">
                      <div className="flex items-center text-slate-400 text-sm">
                        <Calendar size={14} className="mr-2" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center text-slate-400 text-sm">
                        <MapPin size={14} className="mr-2" />
                        {experience.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {experience.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + achievementIndex * 0.1 + 0.7, duration: 0.4 }}
                          viewport={{ once: true }}
                          className="flex items-start text-slate-400 text-sm"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: index * 0.2 + achievementIndex * 0.1 + 0.8, type: "spring" }}
                            viewport={{ once: true }}
                            className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3 flex-shrink-0"
                          />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + techIndex * 0.05 + 1, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-slate-700/50 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 transition-colors duration-300"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceTimeline

