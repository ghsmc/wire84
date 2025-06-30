import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  DollarSign,
  TrendingUp,
  Building2,
  Rocket,
  Lock,
  Cpu,
  Globe,
  AlertTriangle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Users,
  Scale,
  Activity,
  FileText,
  Briefcase,
  Zap,
  Network,
  Database
} from 'lucide-react';
import EyeLogo from '../components/EyeLogo';

function DefenseReport() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <EyeLogo className="w-8 h-8" />
                <span className="text-lg font-bold">wire84</span>
              </Link>
              <div className="h-6 w-px bg-gray-800" />
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-red-500" />
                <span className="text-sm">Defense Monitor</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-gray-400">FY2025 Analysis</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Last Updated: March 19, 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Cpu className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-bold text-blue-500">AI Market Intelligence Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
              <p className="text-blue-200">
                <span className="font-semibold">Market Size:</span> FY2025 defense budget: <span className="text-green-500 font-bold">$895.2B</span> (AI: $1.8B, Cyber: $14B, R&D: $145.8B)
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <Target className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
              <p className="text-blue-200">
                <span className="font-semibold">Growth Areas:</span> <span className="bg-blue-500/20 px-1.5 py-0.5 rounded text-xs">autonomous systems</span> <span className="bg-blue-500/20 px-1.5 py-0.5 rounded text-xs">hypersonics</span> <span className="bg-blue-500/20 px-1.5 py-0.5 rounded text-xs">quantum tech</span>
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
              <p className="text-blue-200">
                <span className="font-semibold">Risks:</span> Budget uncertainty, supply chain issues, DOGE initiative impacts
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Government Defense Contracts in 
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text"> 2025</span>
          </h1>
          <p className="text-sm text-gray-400">
            The Department of Defense (DoD) FY2025 budget authorizes <span className="text-green-500 font-semibold">$895.2 billion</span> for Department of Defense and Department of Energy national security programs, creating significant opportunities for defense contractors across multiple domains.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Total Budget", value: "$895.2B", subtext: "FY 2025", icon: DollarSign, color: "text-green-500" },
            { title: "R&D Investment", value: "$145.8B", subtext: "Research & Dev", icon: Rocket, color: "text-blue-500" },
            { title: "Cybersecurity", value: "$14.0B", subtext: "Security Ops", icon: Lock, color: "text-purple-500" },
            { title: "AI Initiatives", value: "$1.8B", subtext: "AI & ML", icon: Cpu, color: "text-yellow-500" }
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900/30 rounded-lg border border-gray-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">{stat.title}</h3>
                <stat.icon className="h-4 w-4 text-red-500" />
              </div>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DefenseReport;