import { Navbar } from '../components/shared/Navbar'
import { Footer } from '../components/shared/Footer'
import { Star, Clock, Brain, Headphones, Calendar, CloudSun } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-space-blue to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent leading-tight py-2">
              Your Day, Synthesized
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The Daily Synoptic transforms your calendar, weather, and news into a personalized briefing that starts your day with clarity and purpose.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup" className="btn-primary text-lg px-8 py-3">
                Get Started Today
              </Link>
              <Link href="/login" className="btn-secondary text-lg px-8 py-3">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-300">
              Intelligent synthesis of your most important information
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="mb-4 p-3 bg-gradient-to-r from-teal-500 to-green-400 rounded-lg w-fit">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Calendar Integration</h3>
              <p className="text-gray-300">
                Seamlessly connect your Google Calendar to get insights about your upcoming meetings and appointments.
              </p>
            </div>
            
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="mb-4 p-3 bg-gradient-to-r from-teal-500 to-green-400 rounded-lg w-fit">
                <CloudSun className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Weather Intelligence</h3>
              <p className="text-gray-300">
                Get location-based weather forecasts and recommendations tailored to your daily activities.
              </p>
            </div>
            
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="mb-4 p-3 bg-gradient-to-r from-teal-500 to-green-400 rounded-lg w-fit">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">AI Synthesis</h3>
              <p className="text-gray-300">
                Advanced AI analyzes and synthesizes information from multiple sources into actionable insights.
              </p>
            </div>
            
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="mb-4 p-3 bg-gradient-to-r from-teal-500 to-green-400 rounded-lg w-fit">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Audio Briefings</h3>
              <p className="text-gray-300">
                Listen to your personalized briefing while commuting, exercising, or getting ready for the day.
              </p>
            </div>
            
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="mb-4 p-3 bg-gradient-to-r from-teal-500 to-green-400 rounded-lg w-fit">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Perfect Timing</h3>
              <p className="text-gray-300">
                Receive your briefing at the perfect time, customized to your schedule and preferences.
              </p>
            </div>
            
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="mb-4 p-3 bg-gradient-to-r from-teal-500 to-green-400 rounded-lg w-fit">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Personalized</h3>
              <p className="text-gray-300">
                Every briefing is tailored to your interests, location, and daily routine for maximum relevance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card aurora-gradient p-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Mornings?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of professionals who start their day with The Daily Synoptic
            </p>
            <Link href="/signup" className="inline-block bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}