import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal,
  Mail,
  ArrowRight,
  MonitorDot,
  LineChart,
  BarChart3,
  Lock,
  Globe,
  Shield,
  Database,
  Zap,
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  Search,
  Radar,
  Target,
  Cpu,
  Brain,
  AlertTriangle,
  Bot,
  Workflow
} from 'lucide-react';
import EyeLogo from '../components/EyeLogo';

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { value: '30%', label: 'Target Alpha per Trade' },
    { value: '8,247', label: 'Daily AI Signals Processed' },
    { value: '150ms', label: 'Trade Execution Latency' },
    { value: '$327M', label: 'Strategy AUM' }
  ];

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY <= lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [lastScrollY]);

  const parallaxStyle = {
    transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-gray-100 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-3 group">
                  <EyeLogo className="w-6 h-6 transition-transform duration-700 group-hover:scale-110" />
                  <span className="font-mono text-sm tracking-[0.2em]">wire84</span>
                </Link>
                
                <div className="hidden md:flex items-center space-x-8">
                  {['ABOUT', 'STRATEGIES', 'RESEARCH'].map((item) => (
                    <Link 
                      key={item}
                      to={`/${item.toLowerCase()}`}
                      className="relative group text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm tracking-[0.15em]"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500/30 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <Link 
                  to="/terminal"
                  className="hidden md:flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 font-mono group"
                >
                  <Terminal className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                  <span className="tracking-wider">Terminal</span>
                </Link>
                
                <Link 
                  to="/waitlist"
                  className="relative overflow-hidden bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2.5 rounded-lg text-sm font-mono tracking-wider transition-all duration-300 flex items-center space-x-2 group"
                >
                  <Mail className="h-4 w-4" />
                  <span>Join Waitlist</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative">
        {/* Background Elements */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/5 via-black to-black" />
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"
            style={{
              ...parallaxStyle,
              animationName: 'pulse',
              animationDuration: '4s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
            style={{
              ...parallaxStyle,
              animationName: 'pulse',
              animationDuration: '4s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '0.5s',
            }}
          />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <div className={`mb-8 transition-all duration-1000 transform ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                  <div className="inline-flex items-center space-x-2 bg-red-500/10 rounded-full px-4 py-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono text-red-500">AI-POWERED TRADING</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-8 leading-[1.1]">
                    LLM-driven quant
                    <br />
                    <span className="relative inline-block mt-2">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 font-medium">
                        trading algorithms
                      </span>
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-red-500/30 to-orange-500/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </span>
                  </h1>

                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    We're building next-generation trading algorithms that process social signals, news, and market data through advanced LLMs to generate alpha. Our system analyzes tweets from key influencers and financial data in real-time.
                  </p>

                  <p className="text-gray-400 text-lg leading-relaxed mb-12">
                    By combining the pattern recognition of GPT-4 with quantitative analysis, we create trading strategies that achieve 30% target alpha per trade while maintaining rigorous risk management.
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 mb-12">
                    {[
                      { icon: Brain, text: 'LLM Processing' },
                      { icon: AlertTriangle, text: 'Risk Analytics' },
                      { icon: Zap, text: 'Real-time Execution' }
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center space-x-3 text-gray-400 group">
                        <Icon className="h-5 w-5 text-red-500 transition-transform duration-500 group-hover:scale-110" />
                        <span className="font-mono text-sm">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-12">
                    <div className="h-16 overflow-hidden">
                      {metrics.map((metric, index) => (
                        <div
                          key={index}
                          className={`transform transition-all duration-500 ${
                            currentMetric === index 
                              ? 'translate-y-0 opacity-100' 
                              : 'translate-y-16 opacity-0'
                          }`}
                        >
                          <div className="text-3xl font-light mb-1">{metric.value}</div>
                          <div className="text-sm text-gray-500 font-mono">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-6">
                    <Link 
                      to="/terminal" 
                      className="group relative px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-mono text-sm tracking-wider transition-all duration-300 flex items-center space-x-2"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>Access Terminal</span>
                      <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <Link
                      to="/waitlist"
                      className="group relative px-8 py-3 border border-gray-800 hover:border-red-500/30 rounded-lg font-mono text-sm tracking-wider transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>Schedule Demo</span>
                      <ExternalLink className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Content - Terminal Illustration */}
              <div 
                ref={terminalRef}
                className={`relative transition-all duration-1000 delay-300 transform ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={parallaxStyle}
              >
                <div className="relative bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6 shadow-2xl">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-black/30 rounded-t-xl border-b border-gray-800/50 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <div className="flex items-center space-x-3 mb-4 text-red-500/70">
                      <Bot className="h-5 w-5" />
                      <span className="font-mono text-sm">wire84 quant engine &gt; processing signals</span>
                    </div>
                    
                    <div className="space-y-4 font-mono text-sm">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Workflow className="h-4 w-4" />
                        <span>Analyzing @elonmusk tweet sentiment...</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <BarChart3 className="h-4 w-4" />
                        <span>Processing market impact vectors...</span>
                      </div>
                      <div className="h-48 bg-gray-900/30 rounded-lg border border-gray-800/50 p-4 overflow-hidden">
                        <div className="space-y-2 animate-[float_8s_ease-in-out_infinite]">
                          <div className="flex items-center space-x-2 text-green-500/70">
                            <ChevronRight className="h-4 w-4" />
                            <span>LLM detected bullish signal in $TSLA tweet</span>
                          </div>
                          <div className="flex items-center space-x-2 text-blue-500/70">
                            <ChevronRight className="h-4 w-4" />
                            <span>Calculating optimal position size: 2.5% AUM</span>
                          </div>
                          <div className="flex items-center space-x-2 text-purple-500/70">
                            <ChevronRight className="h-4 w-4" />
                            <span>Risk-adjusted return forecast: +32.7%</span>
                          </div>
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-4" />
                          <div className="flex items-center space-x-2 text-orange-500/70">
                            <Brain className="h-4 w-4" />
                            <span>GPT-4 signal confidence: 89%</span>
                          </div>
                          <div className="flex items-center space-x-2 text-yellow-500/70">
                            <Globe className="h-4 w-4" />
                            <span>Real-time market data feed synced</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-full animate-[shimmer_2s_linear_infinite]" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-red-500/10 rounded-full px-4 py-2 mb-8">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono text-red-500">OUR TECHNOLOGY</span>
                </div>
                
                <h2 className="text-4xl font-light mb-6">
                  AI-powered trading,
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 font-medium">
                    reinvented
                  </span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Advanced LLMs analyze social signals and market data to generate high-alpha trading opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    number: '01',
                    icon: Globe,
                    title: 'Social Signal Analysis',
                    description: 'Monitor tweets from Elon Musk, Donald Trump, and Bloomberg in real-time, analyzing sentiment and market impact.',
                    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2000'
                  },
                  {
                    number: '02',
                    icon: Brain,
                    title: 'LLM Processing',
                    description: 'GPT-4 analyzes text context, determines market relevance, and generates specific trading recommendations.',
                    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000'
                  },
                  {
                    number: '03',
                    icon: Target,
                    title: 'Automated Execution',
                    description: 'Execute trades with microsecond latency, targeting 30% alpha per trade with advanced risk management.',
                    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=2000'
                  }
                ].map((step, index) => (
                  <div 
                    key={step.number}
                    className={`relative group bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6 transition-all duration-500 hover:border-red-500/30 ${
                      isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
                      <img 
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      />
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs text-gray-500">{step.number}</span>
                        <step.icon className="h-5 w-5 text-red-500" />
                      </div>

                      <h3 className="text-xl font-medium mb-4">{step.title}</h3>
                      <p className="text-gray-400 text-sm mb-6">{step.description}</p>

                      <div className="h-px bg-gradient-to-r from-red-500/20 to-transparent" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <div className="inline-flex flex-col items-center">
                  <p className="text-gray-400 mb-8 max-w-xl">
                    Join leading institutions using wire84's LLM-driven algorithms to capture alpha in real-time markets.
                  </p>
                  <Link 
                    to="/waitlist"
                    className="group relative px-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-mono text-sm tracking-wider transition-all duration-300 flex items-center space-x-2"
                  >
                    <Terminal className="h-4 w-4" />
                    <span>Request Algorithm Access</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <EyeLogo className="w-5 h-5" />
                  <span className="text-xs font-mono tracking-[0.2em] text-gray-500">wire84</span>
                </div>
                <p className="text-xs text-gray-600 font-mono tracking-[0.1em]">
                  © 2025 wire84. AI-driven trading algorithms. Institutional access only.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default HomePage;