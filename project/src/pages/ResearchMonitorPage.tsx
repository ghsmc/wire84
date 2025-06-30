import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Search, 
  TrendingUp, 
  AlertCircle, 
  FileText, 
  Globe, 
  Database, 
  Zap, 
  BarChart2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Microscope, 
  BookOpen, 
  Code2, 
  FileCheck, // Changed from Patent to FileCheck
  Building2 
} from 'lucide-react';
import EyeLogo from '../components/EyeLogo';

// Mock research data
const researchItems = [
  {
    id: 1,
    title: "Quantum Advantage in Large Language Models",
    company: "Google Research",
    source: "arXiv",
    date: "2025-03-17",
    impactScore: 89,
    sentiment: "positive",
    summary: "Breakthrough in quantum-accelerated language models showing 100x improvement in training efficiency",
    tags: ["quantum", "AI", "LLM"],
    marketImpact: "High potential impact on GOOGL, NVDA"
  },
  {
    id: 2,
    title: "Novel Architecture for Neuromorphic Computing",
    company: "NVIDIA Research",
    source: "Company Blog",
    date: "2025-03-16",
    impactScore: 76,
    sentiment: "positive",
    summary: "New chip design mimicking neural pathways reduces power consumption by 90%",
    tags: ["hardware", "AI", "energy-efficiency"],
    marketImpact: "Direct implications for NVDA product roadmap"
  },
  {
    id: 3,
    title: "Advanced Memory-Centric Computing Patent",
    company: "Microsoft",
    source: "Patent Filing",
    date: "2025-03-15",
    impactScore: 82,
    sentiment: "positive",
    summary: "Revolutionary approach to memory-centric computing could reshape cloud infrastructure",
    tags: ["patents", "cloud", "hardware"],
    marketImpact: "Potential disruption in cloud computing sector"
  }
];

const trendingTopics = [
  { name: "Quantum Computing", count: 127, growth: 45 },
  { name: "Neuromorphic Hardware", count: 89, growth: 32 },
  { name: "Edge AI", count: 156, growth: 28 },
  { name: "Memory-Centric Computing", count: 67, growth: 22 }
];

const companyActivity = [
  { name: "Google", papers: 34, patents: 12, blogs: 8 },
  { name: "Microsoft", papers: 28, patents: 15, blogs: 6 },
  { name: "NVIDIA", papers: 22, patents: 9, blogs: 11 },
  { name: "Meta", papers: 19, patents: 7, blogs: 13 }
];

function ResearchMonitorPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <EyeLogo className="w-8 h-8" />
                <span className="text-lg font-bold">wire84</span>
              </Link>
              <div className="h-6 w-px bg-gray-800" />
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-red-500" />
                <span className="text-sm">Research Monitor</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search research papers, patents, and tech blogs..."
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-red-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button className="px-3 py-1 rounded-lg text-sm bg-gray-800 text-gray-300 hover:bg-gray-700">
              <Globe className="h-4 w-4 inline mr-1" />
              All Sources
            </button>
            <button className="px-3 py-1 rounded-lg text-sm bg-gray-800 text-gray-300 hover:bg-gray-700">
              <Building2 className="h-4 w-4 inline mr-1" />
              Companies
            </button>
            <button className="px-3 py-1 rounded-lg text-sm bg-gray-800 text-gray-300 hover:bg-gray-700">
              <Database className="h-4 w-4 inline mr-1" />
              Topics
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Research Volume</h3>
              <BookOpen className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold">1,247</p>
            <p className="text-sm text-gray-400 mt-2">+12% from last month</p>
          </div>
          
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Patent Filings</h3>
              <FileCheck className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold">384</p>
            <p className="text-sm text-gray-400 mt-2">43 new this week</p>
          </div>
          
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Tech Blogs</h3>
              <Code2 className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold">892</p>
            <p className="text-sm text-gray-400 mt-2">128 analyzed today</p>
          </div>
          
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Market Signals</h3>
              <Zap className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold">16</p>
            <p className="text-sm text-gray-400 mt-2">High-impact insights</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Research Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/30 rounded-lg border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold">Latest Research</h2>
              </div>
              <div className="divide-y divide-gray-800">
                {researchItems.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-900/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.company}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-500">
                          Impact: {item.impactScore}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-sm">
                      <span className="text-gray-400">Market Impact: </span>
                      <span className="text-green-500">{item.marketImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
              <div className="space-y-4">
                {trendingTopics.map((topic) => (
                  <div key={topic.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{topic.name}</p>
                      <p className="text-sm text-gray-400">{topic.count} mentions</p>
                    </div>
                    <div className="flex items-center text-green-500">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>{topic.growth}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Activity */}
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Company Activity</h2>
              <div className="space-y-4">
                {companyActivity.map((company) => (
                  <div key={company.name} className="border-b border-gray-800 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{company.name}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-400">Papers</p>
                        <p className="font-semibold">{company.papers}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Patents</p>
                        <p className="font-semibold">{company.patents}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Blogs</p>
                        <p className="font-semibold">{company.blogs}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchMonitorPage;