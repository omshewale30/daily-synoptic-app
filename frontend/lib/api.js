const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

// Helper function to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem('daily_synoptic_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// Helper function to handle API responses
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Network error' }))
    throw new Error(error.detail || 'API request failed')
  }
  return response.json()
}

// Authentication APIs
export async function loginUser(email, password) {
  const formData = new FormData()
  formData.append('username', email)
  formData.append('password', password)

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: formData
  })

  return handleResponse(response)
}

export async function signupUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return handleResponse(response)
}

// Settings APIs
export async function getUserSettings() {
  const response = await fetch(`${API_BASE_URL}/settings/`, {
    headers: getAuthHeaders()
  })

  return handleResponse(response)
}

export async function updateUserSettings(settings) {
  const response = await fetch(`${API_BASE_URL}/settings/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(settings)
  })

  return handleResponse(response)
}

// Briefing APIs
export async function getLatestBriefing() {
  const response = await fetch(`${API_BASE_URL}/briefings/latest`, {
    headers: getAuthHeaders()
  })

  return handleResponse(response)
}

export async function generateBriefing() {
  const response = await fetch(`${API_BASE_URL}/briefings/generate`, {
    method: 'POST',
    headers: getAuthHeaders()
  })

  return handleResponse(response)
}

export async function getBriefingHistory(limit = 10, offset = 0) {
  const response = await fetch(`${API_BASE_URL}/briefings/history?limit=${limit}&offset=${offset}`, {
    headers: getAuthHeaders()
  })

  return handleResponse(response)
}