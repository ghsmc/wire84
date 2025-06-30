import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal,
  Mail,
  ArrowRight,
  Brain,
  LineChart,
  Target,
  Activity,
  Shield,
  Network,
  MessageSquare,
  Workflow,
  Clock,
  ChevronRight,
  Lock,
  Zap
} from 'lucide-react';
import EyeLogo from '../components/EyeLogo';

const StrategiesPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <EyeLogo className="w-8 h-8" />
                <span className="text-lg font-bold">wire84</span>
              </Link>
              <div className="h-6 w-px bg-gray-800" />
              <div className="flex items-center space-x-2">
                <Workflow className="h-4 w-4 text-red-500" />
                <span className="text-sm">Strategies</span>
              </div>
            </div>
            
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
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-32 pb-24">
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 rounded-full px-4 py-2 mb-8">
            <Lock className="h-4 w-4 text-red-500" />
            <span className="text-xs font-mono text-red-500">INSTITUTIONAL ACCESS ONLY</span>
          </div>
          <h1 className="text-4xl font-light mb-6">
            Trading <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 font-medium">Strategies</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Our proprietary trading algorithms combine advanced LLMs with quantitative analysis to generate consistent alpha.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-medium">Social Signal Alpha</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Proprietary implementation of GPT-4 for real-time analysis of market-moving social media content.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-24">Target Alpha:</span>
                <span className="text-green-500">30% per trade</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Capacity:</span>
                <span>$500M</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Frequency:</span>
                <span>5-10 trades/day</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-medium">High-Frequency NLP</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Sub-millisecond processing of news and market data using specialized language models.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-24">Target Alpha:</span>
                <span className="text-green-500">15-20% per trade</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Capacity:</span>
                <span>$200M</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Frequency:</span>
                <span>100-200 trades/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategiesPage;