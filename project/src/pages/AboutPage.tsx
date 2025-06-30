import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal,
  Mail,
  ArrowRight,
  Brain,
  Cpu,
  Code,
  Shield,
  Users,
  BookOpen,
  Building2,
  GraduationCap,
  Lightbulb,
  Rocket
} from 'lucide-react';
import EyeLogo from '../components/EyeLogo';

function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const founders = [
    {
      name: 'George McCain',
      title: 'Co-Founder',
      description: 'Sophomore at Yale University studying Computer Science and Finance. Passionate about applying machine learning to financial markets.'
    },
    {
      name: 'Mariano Alderete Sanchez',
      title: 'Co-Founder & CTO',
      description: 'Sophomore at Yale University. Building the technical infrastructure that powers wire84\'s trading algorithms.'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Innovation First',
      description: 'We\'re exploring the cutting edge of what\'s possible with LLMs and quantitative trading.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'We prioritize responsible trading practices and robust risk controls in everything we build.'
    },
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'We believe in writing clean, efficient code that scales with our ambitions.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50">
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
                    className={`relative group text-gray-400 hover:text-white transition-colors duration-300 font-mono text-sm tracking-[0.15em] ${
                      item === 'ABOUT' ? 'text-white' : ''
                    }`}
                  >
                    {item}
                    <span className={`absolute -bottom-1 left-0 h-px bg-red-500/30 transition-all duration-300 ${
                      item === 'ABOUT' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
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
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center space-x-2 bg-red-500/10 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono text-red-500">OUR STORY</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">
              Building the future of
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 font-medium">
                AI-driven trading
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-3xl">
              Started by two Yale sophomores with a vision to revolutionize trading through large language models. We're combining academic rigor with practical implementation to create next-generation trading algorithms.
            </p>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-12">Meet the Founders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <div 
                key={founder.name}
                className={`bg-gray-900/30 rounded-xl border border-gray-800/50 p-8 transition-all duration-1000 transform ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div>
                  <h3 className="text-xl font-medium mb-1">{founder.name}</h3>
                  <p className="text-red-500 text-sm font-mono mb-4">{founder.title}</p>
                  <p className="text-gray-400 text-sm">
                    {founder.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yale Section */}
      <section className="py-24 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-500/10 rounded-full px-4 py-2 mb-8">
                <GraduationCap className="w-4 h-4 text-red-500" />
                <span className="text-xs font-mono text-red-500">YALE UNIVERSITY</span>
              </div>
              
              <h2 className="text-2xl font-light mb-6">
                From dorm rooms to trading algorithms
              </h2>
              <p className="text-gray-400 mb-6">
                What started as a late-night project between two Yale students has grown into a groundbreaking approach to quantitative trading. We're leveraging our academic environment to push the boundaries of what's possible with LLMs in finance.
              </p>
              <p className="text-gray-400 mb-8">
                With access to Yale's world-class resources and mentorship, we're building algorithms that combine cutting-edge research with practical trading applications.
              </p>
              
              <div className="flex items-center space-x-8">
                <div>
                  <div className="text-3xl font-light mb-2">2023</div>
                  <div className="text-sm text-gray-500">Founded</div>
                </div>
                <div>
                  <div className="text-3xl font-light mb-2">2027</div>
                  <div className="text-sm text-gray-500">Class Year</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000"
                  alt="Yale Campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="p-6 bg-gray-900/30 rounded-xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300"
              >
                <value.icon className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-red-500/10 rounded-full px-4 py-2 mb-8">
              <Rocket className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono text-red-500">OUR VISION</span>
            </div>
            
            <h2 className="text-3xl font-light mb-6">
              The next generation of quantitative finance
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              We believe that large language models will fundamentally reshape how markets are analyzed and traded. As students at the forefront of both technology and finance, we're uniquely positioned to pioneer this transformation.
            </p>
            <p className="text-gray-400">
              Our goal is simple: to build trading algorithms that leverage the unparalleled pattern recognition capabilities of LLMs to generate alpha in ways that were previously impossible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 md:p-12 border border-red-500/20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-light mb-4">
                Join us on this journey
              </h2>
              <p className="text-gray-400 mb-8">
                We're always looking for collaborators, advisors, and investors who share our vision for the future of algorithmic trading.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/waitlist"
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Contact Us</span>
                </Link>
                <Link
                  to="/waitlist"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-800 hover:border-red-500/30 rounded-lg font-mono text-sm tracking-wider transition-all duration-300"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  <span>Share Ideas</span>
                </Link>
              </div>
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
              © 2025 wire84. AI-driven trading algorithms by Yale students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;