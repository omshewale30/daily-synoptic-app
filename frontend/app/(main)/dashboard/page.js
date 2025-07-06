'use client'

import { BriefingDisplay } from '../../../components/dashboard/BriefingDisplay'
import { AudioPlayer } from '../../../components/dashboard/AudioPlayer'
import { RefreshCw, Clock, Calendar, CloudSun, Newspaper } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getLatestBriefing, generateBriefing } from '../../../lib/api'

export default function DashboardPage() {
  const [briefing, setBriefing] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    loadBriefing()
  }, [])

  const loadBriefing = async () => {
    try {
      const data = await getLatestBriefing()
      setBriefing(data)
      setLastUpdated(new Date(data.date))
    } catch (error) {
      console.error('Error loading briefing:', error)
    }
  }

  const handleGenerateNewBriefing = async () => {
    setIsGenerating(true)
    try {
      await generateBriefing()
      // Simulate briefing generation
      setTimeout(() => {
        loadBriefing()
        setIsGenerating(false)
      }, 3000)
    } catch (error) {
      console.error('Error generating briefing:', error)
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Daily Briefing</h1>
            {lastUpdated && (
              <p className="text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>
          <button
            onClick={handleGenerateNewBriefing}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate New'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <Calendar className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Today's Events</p>
            <p className="text-2xl font-bold text-white">3</p>
          </div>
          <div className="card text-center">
            <CloudSun className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Current Weather</p>
            <p className="text-2xl font-bold text-white">72°F</p>
          </div>
          <div className="card text-center">
            <Newspaper className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">News Updates</p>
            <p className="text-2xl font-bold text-white">5</p>
          </div>
          <div className="card text-center">
            <Clock className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Reading Time</p>
            <p className="text-2xl font-bold text-white">2 min</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Briefing Text */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Today's Briefing</h2>
              {briefing ? (
                <BriefingDisplay content={briefing.content.text} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No briefing available. Generate your first briefing to get started!</p>
                </div>
              )}
            </div>
          </div>

          {/* Audio Player & Quick Actions */}
          <div className="space-y-6">
            {/* Audio Player */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Audio Briefing</h3>
              {briefing?.content?.audio_url ? (
                <AudioPlayer audioUrl={briefing.content.audio_url} />
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400 text-sm">Audio version not available</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-secondary text-left">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  View Full Calendar
                </button>
                <button className="w-full btn-secondary text-left">
                  <CloudSun className="w-4 h-4 inline mr-2" />
                  Weather Details
                </button>
                <button className="w-full btn-secondary text-left">
                  <Newspaper className="w-4 h-4 inline mr-2" />
                  Browse News
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}