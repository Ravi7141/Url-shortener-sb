# URL Shortener Frontend

A modern, animated React frontend for the URL Shortener application built with Vite, TypeScript, and premium UI components.

## Features

- 🔐 **Authentication** - Secure JWT-based authentication with login and registration
- 🔗 **URL Shortening** - Create short, memorable URLs with one click
- 📊 **Analytics Dashboard** - Track clicks and analyze link performance with interactive charts
- 🎨 **Modern UI** - Glassmorphic design with smooth animations and transitions
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast** - Built with Vite for lightning-fast development and optimized builds

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **React Router v6** - Client-side routing
- **Framer Motion** - Smooth animations
- **Recharts** - Beautiful, responsive charts
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Elegant toast notifications
- **Lucide React** - Beautiful icons
- **date-fns** - Modern date utility library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend server running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI components (Button, Input, Card, etc.)
│   │   ├── layout/       # Layout components (Navbar)
│   │   └── features/     # Feature-specific components (UrlCard)
│   ├── contexts/         # React contexts (AuthContext)
│   ├── pages/            # Page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── MyUrls.tsx
│   │   └── Analytics.tsx
│   ├── services/         # API service layer
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── urlService.ts
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── .env                  # Environment variables
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Available Routes

- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - URL shortening dashboard (protected)
- `/my-urls` - View all shortened URLs (protected)
- `/analytics` - Analytics dashboard (protected)

## Design System

### Colors
- **Primary**: Vibrant cyan (#00d9ff)
- **Secondary**: Electric purple (#a855f7)
- **Accent**: Neon pink (#ff006e)
- **Background**: Deep dark gradient

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold with gradient text effects
- **Body**: Regular weight, comfortable line height

### Components
- **Glassmorphic Cards**: Semi-transparent with backdrop blur
- **Smooth Animations**: Framer Motion for page transitions
- **Responsive Design**: Mobile-first approach
- **Loading States**: Elegant spinners and skeletons

## API Integration

The frontend communicates with the Spring Boot backend through:

- **Authentication**: `/api/auth/public/login`, `/api/auth/public/register`
- **URL Management**: `/api/urls/shorten`, `/api/urls/myurls`
- **Analytics**: `/api/urls/analytics/{shortUrl}`, `/api/urls/totalclicks`

All authenticated requests include JWT token in the Authorization header.

## Development

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License
