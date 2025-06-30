# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

wire84 is a comprehensive financial market intelligence platform that combines static HTML report templates with a full-stack React application. The platform serves two primary functions:
1. **Static HTML Reports**: Professional financial reports with embedded CSS for standalone distribution
2. **React Web Application**: Interactive platform with user authentication, real-time data, and multiple analytical dashboards

## Architecture

### Dual Structure
The project has a unique dual structure:
- **Root level**: Legacy static HTML templates and bundled assets
- **`project/` directory**: Modern React application with full-stack capabilities

### React Application (`project/`)
- **Frontend**: React 18 + TypeScript + Vite build system
- **Styling**: Tailwind CSS with custom dark theme
- **Backend Integration**: Supabase for authentication and database
- **Data Sources**: Multiple APIs for market data, defense contracts, and financial intelligence
- **Routing**: React Router with protected routes

### Key Components
- **Authentication**: Supabase-based auth with protected routes
- **Dashboards**: Multiple specialized dashboards (hedge funds, stocks, insider trades, defense)
- **Reports**: Dynamic report generation with HTML templates
- **API Integration**: Express.js backend with MongoDB and web scraping capabilities

## Development Commands

### Frontend Development
```bash
cd project
npm install
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Services
```bash
cd project
npm run server       # Start Express server (port 3000)
npm run scrape       # Run data scraping processes
```

### Database
- **Supabase**: PostgreSQL database with migrations in `supabase/migrations/`
- **Environment**: Requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## Project Structure

### Main React App (`project/src/`)
- `main.tsx` - Application entry point
- `App.tsx` - Main router configuration
- `pages/` - Route components (HomePage, DashboardPage, etc.)
- `components/` - Reusable UI components
- `lib/` - Utilities and API clients
- `data/` - Static data files and type definitions

### Key Pages
- **HomePage**: Landing page and public content
- **TerminalPage**: Command-line interface style analytics
- **DashboardPage**: Main analytics dashboard
- **HedgeFundDashboard**: Hedge fund specific analytics
- **StockDashboard**: Stock market analysis
- **DefenseReport**: Defense industry intelligence
- **InsiderTradesPage**: Insider trading data

### Static Templates
- Root level HTML files serve as standalone report templates
- Embedded CSS for email/client distribution
- Multiple versions for different client needs

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Chart.js and D3.js for data visualization
- Lucide React for icons

### Backend & Data
- Supabase for authentication and database
- Express.js server capabilities
- MongoDB integration
- Puppeteer for web scraping
- Axios for API requests

### Development Tools
- ESLint for code quality
- TypeScript for type safety
- PostCSS with Autoprefixer
- Concurrent processes for development

## Authentication & Security

### Supabase Integration
- Row Level Security (RLS) enabled
- API keys stored securely in database
- Protected routes using `AuthRequired` component
- Environment variables for configuration

### Database Schema
- Users and authentication handled by Supabase
- Custom tables for API keys and application data
- Migration files track schema changes

## Content & Styling

### Design System
- Dark theme with professional financial styling
- Consistent typography using system fonts
- Grid-based responsive layouts
- Red accent colors (#ef4444) for critical alerts

### Report Structure
1. **Header**: Branding, title, date, distribution info
2. **Market Sentiment**: Sentiment analysis and categorized headlines
3. **Critical Alerts**: Risk assessments with confidence levels
4. **Trading Ideas**: Buy/sell recommendations with conviction matrices
5. **Deep Intelligence**: Proprietary insights from multiple data sources

## Development Workflow

### Environment Setup
1. Install dependencies: `cd project && npm install`
2. Configure Supabase environment variables
3. Run migrations if needed
4. Start development server: `npm run dev`

### Build Process
- Vite handles React app bundling
- Multiple entry points for different templates
- Static assets optimized for production
- Proxy configuration for API integration

### Data Flow
- Real-time data from multiple financial APIs
- Scheduled scraping processes for intelligence gathering
- Supabase for user data and application state
- MongoDB for analytical data storage