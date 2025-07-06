'use client'

import { SettingsForm } from '../../../components/settings/SettingsForm'
import { Settings as SettingsIcon } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-teal-400" />
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>
        
        <div className="card">
          <SettingsForm />
        </div>
      </div>
    </div>
  )
}