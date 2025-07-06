'use client'

import { useState, useEffect } from 'react'
import { getUserSettings, updateUserSettings } from '../../lib/api'
import { MapPin, Clock, Newspaper, Calendar, Volume2, Save } from 'lucide-react'

export function SettingsForm() {
  const [settings, setSettings] = useState({
    location: '',
    weather_enabled: true,
    news_sources: [],
    news_enabled: true,
    briefing_time: '08:00',
    briefing_timezone: 'UTC',
    audio_enabled: true,
    google_calendar_connected: false,
    calendar_integration_enabled: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setIsLoading(true)
    try {
      const data = await getUserSettings()
      setSettings(data)
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')

    try {
      await updateUserSettings(settings)
      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Error saving settings. Please try again.')
      console.error('Error saving settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNewsSourceChange = (source, checked) => {
    setSettings(prev => ({
      ...prev,
      news_sources: checked
        ? [...prev.news_sources, source]
        : prev.news_sources.filter(s => s !== source)
    }))
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading settings...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className={`px-4 py-3 rounded-lg ${
          message.includes('Error') 
            ? 'bg-red-900/50 border border-red-500 text-red-200'
            : 'bg-green-900/50 border border-green-500 text-green-200'
        }`}>
          {message}
        </div>
      )}

      {/* Calendar Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-semibold text-white">Calendar Integration</h3>
        </div>
        
        <div className="space-y-4 ml-7">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Google Calendar</label>
              <p className="text-gray-400 text-sm">
                {settings.google_calendar_connected ? 'Connected' : 'Not connected'}
              </p>
            </div>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                settings.google_calendar_connected 
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {settings.google_calendar_connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Include calendar events</label>
              <p className="text-gray-400 text-sm">Show upcoming events in your briefing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.calendar_integration_enabled}
                onChange={(e) => handleInputChange('calendar_integration_enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Weather Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-semibold text-white">Weather</h3>
        </div>
        
        <div className="space-y-4 ml-7">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Include weather</label>
              <p className="text-gray-400 text-sm">Show weather forecast in your briefing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.weather_enabled}
                onChange={(e) => handleInputChange('weather_enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Location</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter your city or zip code"
              className="input-primary w-full max-w-md"
            />
          </div>
        </div>
      </div>

      {/* News Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-semibold text-white">News</h3>
        </div>
        
        <div className="space-y-4 ml-7">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium">Include news</label>
              <p className="text-gray-400 text-sm">Show relevant news in your briefing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.news_enabled}
                onChange={(e) => handleInputChange('news_enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">News Sources</label>
            <div className="grid grid-cols-2 gap-2">
              {['BBC News', 'CNN', 'Reuters', 'AP News', 'NPR', 'The Guardian'].map(source => (
                <label key={source} className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={settings.news_sources.includes(source)}
                    onChange={(e) => handleNewsSourceChange(source, e.target.checked)}
                    className="rounded text-teal-500 focus:ring-teal-500"
                  />
                  {source}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Briefing Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-semibold text-white">Briefing Preferences</h3>
        </div>
        
        <div className="space-y-4 ml-7">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Briefing Time</label>
              <input
                type="time"
                value={settings.briefing_time}
                onChange={(e) => handleInputChange('briefing_time', e.target.value)}
                className="input-primary w-full"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Timezone</label>
              <select
                value={settings.briefing_timezone}
                onChange={(e) => handleInputChange('briefing_timezone', e.target.value)}
                className="input-primary w-full"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-gray-300 font-medium flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Audio briefings
              </label>
              <p className="text-gray-400 text-sm">Generate audio version of your briefing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.audio_enabled}
                onChange={(e) => handleInputChange('audio_enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-700">
        <button
          type="submit"
          disabled={isSaving}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  )
}