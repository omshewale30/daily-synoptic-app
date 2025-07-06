# The Daily Synoptic AI

A personalized daily briefing service that gathers information from your calendar, weather forecasts, and news sources, then synthesizes it into a comprehensive text and audio summary.

## Project Structure

```
daily-synoptic-app/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── api/      # API endpoints
│   │   ├── core/     # Core configuration
│   │   ├── models/   # Pydantic models
│   │   ├── services/ # Business logic services
│   │   └── main.py   # FastAPI app
│   └── requirements.txt
└── frontend/         # Next.js frontend
    ├── app/          # Next.js app router
    ├── components/   # React components
    ├── context/      # React context
    ├── lib/          # Utilities
    └── package.json
```

## Features

- **Calendar Integration**: Connect Google Calendar for event insights
- **Weather Intelligence**: Location-based weather forecasts
- **News Synthesis**: Curated news from multiple sources
- **AI-Powered Briefings**: Intelligent synthesis using LangChain/LangGraph
- **Audio Briefings**: Text-to-speech audio versions
- **Personalized Scheduling**: Custom briefing times and preferences

## Tech Stack

### Backend
- FastAPI for REST API
- Python with async/await
- LangChain/LangGraph for AI workflows
- OpenAI for language model and TTS
- Google Calendar API integration
- Weather and News APIs

### Frontend
- Next.js 14 with App Router
- React with modern hooks
- Tailwind CSS with custom design system
- Dark theme with aurora-inspired colors
- Responsive design for all devices

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd daily-synoptic-app/backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Run the development server:
```bash
uvicorn app.main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd daily-synoptic-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
WEATHER_API_KEY=your-weather-api-key
NEWS_API_KEY=your-news-api-key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Development

The application uses a modern development setup with:

- **Hot reload** for both backend and frontend
- **Type safety** with TypeScript/Python typing
- **Modern authentication** with JWT tokens
- **Responsive design** with Tailwind CSS
- **Component-based architecture** with React

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Create new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/google` - Google OAuth

### Settings
- `GET /api/v1/settings/` - Get user settings
- `POST /api/v1/settings/` - Update user settings

### Briefings
- `GET /api/v1/briefings/latest` - Get latest briefing
- `POST /api/v1/briefings/generate` - Generate new briefing
- `GET /api/v1/briefings/history` - Get briefing history

## Design System

The application uses a custom design system with:

- **Dark theme** with space-inspired colors
- **Aurora gradient** accent colors (teal to green)
- **Responsive breakpoints** for mobile, tablet, and desktop
- **Custom components** with consistent styling
- **Smooth animations** and micro-interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.