'use client'

import { Calendar, Clock, MapPin, TrendingUp } from 'lucide-react'

export function BriefingDisplay({ content }) {
  if (!content) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No briefing content available</p>
      </div>
    )
  }

  // Parse content into sections (basic markdown-like parsing)
  const sections = content.split('\n\n').filter(section => section.trim())
  
  return (
    <div className="prose prose-invert max-w-none">
      {sections.map((section, index) => {
        // Check if section is a heading (starts with **)
        if (section.startsWith('**') && section.includes('**')) {
          const title = section.match(/\*\*(.*?)\*\*/)?.[1] || ''
          const content = section.replace(/\*\*(.*?)\*\*/, '').trim()
          
          let icon = null
          if (title.toLowerCase().includes('calendar')) icon = <Calendar className="w-5 h-5 text-teal-400" />
          else if (title.toLowerCase().includes('weather')) icon = <MapPin className="w-5 h-5 text-teal-400" />
          else if (title.toLowerCase().includes('news')) icon = <TrendingUp className="w-5 h-5 text-teal-400" />
          else icon = <Clock className="w-5 h-5 text-teal-400" />
          
          return (
            <div key={index} className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                {icon}
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <div className="text-gray-300 leading-relaxed">
                {content.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-2">
                    {line.startsWith('- ') ? (
                      <span className="flex items-start gap-2">
                        <span className="text-teal-400 mt-1">•</span>
                        <span>{line.substring(2)}</span>
                      </span>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            </div>
          )
        } else {
          // Regular paragraph
          return (
            <div key={index} className="mb-4">
              <p className="text-gray-300 leading-relaxed">{section}</p>
            </div>
          )
        }
      })}
    </div>
  )
}