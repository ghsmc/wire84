import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  Binary, 
  TrendingUp, 
  Brain, 
  Lock,
  ChevronRight,
  BarChart3,
  Network,
  Briefcase,
  DollarSign,
  AlertCircle,
  Loader2,
  Mail,
  FileText,
  Clock8,
  ChevronDown,
  Building2,
  FileSearch,
  GraduationCap,
  Users,
  Code2,
  Twitter,
  Linkedin,
  Globe,
  Microscope,
  Landmark,
  Home,
  Menu,
  X,
  ArrowRight,
  Shield
} from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import EyeLogo from '../components/EyeLogo';
import SubscriptionForm from '../components/SubscriptionForm';

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Mobile Menu Button - Only visible on mobile */}
      <button 
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-red-500" />
        ) : (
          <Menu className="h-6 w-6 text-red-500" />
        )}
      </button>

      {/* Left Sidebar Navigation */}
      <nav className={`fixed left-0 top-0 bottom-0 w-64 bg-black/50 backdrop-blur-sm border-r border-gray-800 transform transition-transform duration-300 ease-in-out z-40 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2 mb-8" onClick={closeMenu}>
            <EyeLogo className="w-8 h-8" />
            <span className="text-lg font-bold">wire84</span>
          </Link>
          
          <div className="space-y-2">
            <Link 
              to="/" 
              className="flex items-center px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={closeMenu}
            >
              <Home className="h-4 w-4 text-red-500 mr-2" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/terminal" 
              className="flex items-center px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={closeMenu}
            >
              <Lock className="h-4 w-4 text-red-500 mr-2" />
              <span>Terminal</span>
            </Link>
            
            <Link 
              to="/research" 
              className="flex items-center px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={closeMenu}
            >
              <Microscope className="h-4 w-4 text-red-500 mr-2" />
              <span>Research</span>
            </Link>
            
            <Link 
              to="/hedge-funds" 
              className="flex items-center px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={closeMenu}
            >
              <Landmark className="h-4 w-4 text-red-500 mr-2" />
              <span>Hedge Funds</span>
            </Link>
            
            <Link 
              to="/stocks" 
              className="flex items-center px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={closeMenu}
            >
              <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
              <span>Stocks</span>
            </Link>

            <Link 
              to="/insider-trades" 
              className="flex items-center px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={closeMenu}
            >
              <Users className="h-4 w-4 text-red-500 mr-2" />
              <span>Insider Trades</span>
            </Link>

            <Link 
              to="/defense-report" 
              className="flex items-center px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={closeMenu}
            >
              <Shield className="h-4 w-4 text-red-500 mr-2" />
              <span>Defense Monitor</span>
            </Link>
            
            <Link 
              to="/email" 
              className="flex items-center px-3 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={closeMenu}
            >
              <Mail className="h-4 w-4 text-red-500 mr-2" />
              <span>Daily Brief</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Main Content */}
      <div className="md:pl-64">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black z-0" />
          
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
            <div className="flex items-center justify-center mb-6 space-x-3">
              <EyeLogo className="w-16 h-16" />
              <span className="text-2xl font-bold tracking-tight">wire84</span>
            </div>
            
            <div className="flex items-center justify-center text-gray-400 text-sm mb-8">
              <Mail className="h-4 w-4 text-red-500 mr-2" />
              <span>Curated, Daily Deep Market Intelligence Report</span>
            </div>
            
            <h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
                <TypeAnimation
                  sequence={[
                    'Quantitative Intel',
                    2000,
                    'Market Analysis',
                    2000,
                    'Deep Research',
                    2000,
                    'Alerts & Monitoring',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </h1>

            <div className="text-center text-gray-400 max-w-3xl mx-auto mb-8">
              <p className="text-sm sm:text-base">
                <strong className="text-white">We watch markets so you don't have to: </strong>
                Proprietary algorithms & quantitative researchers monitor 214M+ sources in 15+ languages: news, patent registry, defense contracts, SEC filings, govt hearings, market disruptors, energy usage, alerts, tracking Twitter (X), Reddit.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <Clock8 className="h-3.5 w-3.5 text-red-500" />
                <span>8 AM Daily</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-red-500" />
                <span>15+ languages</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                <span>Danger Alerts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Brain className="h-3.5 w-3.5 text-red-500" />
                <span>AI Powered</span>
              </div>
            </div>

            <SubscriptionForm />
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Terminal */}
              <Link to="/terminal" className="group">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 p-6 h-full hover:border-red-500/50 hover:bg-gray-900/90 transition-all">
                  <Lock className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Terminal</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Real-time defense contract analysis, pattern detection, and market intelligence.
                  </p>
                  <div className="flex items-center text-red-500 text-sm">
                    <span>Access Terminal</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Research */}
              <Link to="/research" className="group">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 p-6 h-full hover:border-red-500/50 hover:bg-gray-900/90 transition-all">
                  <Microscope className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Research</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Deep analysis of research papers, patents, and technical developments.
                  </p>
                  <div className="flex items-center text-red-500 text-sm">
                    <span>View Research</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Defense Monitor */}
              <Link to="/defense-report" className="group">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 p-6 h-full hover:border-red-500/50 hover:bg-gray-900/90 transition-all">
                  <Shield className="h-8 w-8 text-red-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Defense Monitor</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Track defense contracts, analyze industry trends, and monitor key players.
                  </p>
                  <div className="flex items-center text-red-500 text-sm">
                    <span>Monitor Defense</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Daily Brief Preview */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Daily Intelligence Brief</h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                Every morning at 8 AM, receive a comprehensive analysis of market movements, emerging patterns, and potential opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Link to="/email" className="group">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 p-6 hover:border-red-500/50 hover:bg-gray-900/90 transition-all">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold">Morning Alpha Report</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Comprehensive market analysis, risk alerts, and trading opportunities delivered to your inbox.
                  </p>
                  <div className="flex items-center text-red-500 text-sm">
                    <span>View Sample Report</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              <Link to="/market" className="group">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 p-6 hover:border-red-500/50 hover:bg-gray-900/90 transition-all">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold">Market Intelligence</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Deep dive into market trends, sector analysis, and emerging opportunities.
                  </p>
                  <div className="flex items-center text-red-500 text-sm">
                    <span>View Market Report</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900/50 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <EyeLogo className="w-8 h-8" />
                  <span className="text-lg font-bold">wire84</span>
                </div>
                <p className="text-sm text-gray-400">
                  Elite market intelligence for institutional investors. For the sake of deep market intelligence for our clients, we watch everything, everywhere.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-4">Products</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Terminal Access</li>
                  <li>Research Monitor</li>
                  <li>Fund Intelligence</li>
                  <li>Daily Briefs</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>About Us</li>
                  <li>Methodology</li>
                  <li>Case Studies</li>
                  <li>Contact</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Compliance</li>
                  <li>Disclaimers</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 wire84. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;