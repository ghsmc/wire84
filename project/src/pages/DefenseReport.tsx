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
  Database, 
  Radar, 
  Landmark, 
  Plane, 
  Anchor, 
  Tangent as Tank, 
  Satellite, 
  Binary, 
  ShieldAlert 
} from 'lucide-react';
import EyeLogo from '../components/EyeLogo';

function DefenseReport() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
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
        {/* AI Summary */}
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

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Government Defense Contracts in 
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text"> 2025</span>
          </h1>
          <p className="text-sm text-gray-400">
            The Department of Defense (DoD) FY2025 budget authorizes <span className="text-green-500 font-semibold">$895.2 billion</span> for Department of Defense and Department of Energy national security programs, creating significant opportunities for defense contractors across multiple domains.
          </p>
        </div>

        {/* Budget Stats */}
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

        {/* Budget Context */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <h2 className="text-lg font-bold mb-4">Budget Context and Market Environment</h2>
            <div className="text-sm text-gray-400 space-y-4">
              <p>
                The <span className="text-white">2025 defense budget</span> reflects a commitment to strengthening national security through innovation and modernization. While some analysts project that real dollar outlays could decline slightly in 2025, overall defense spending remains robust after years of significant growth.
              </p>
              <p>
                The <span className="text-white">National Defense Authorization Act (NDAA)</span> for Fiscal Year 2025 has introduced several provisions that will impact government contractors, including changes to acquisition procedures, contract modifications, and supply chain requirements.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building2 className="h-4 w-4 text-red-500" />
                    <h3 className="font-semibold">Department of Government Efficiency</h3>
                  </div>
                  <p className="text-xs text-gray-400">
                    New DOGE initiative expected to accelerate adoption of low-cost, cutting-edge technology while potentially subjecting traditional defense platforms to increased scrutiny.
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-red-500" />
                    <h3 className="font-semibold">Strategic Focus</h3>
                  </div>
                  <p className="text-xs text-gray-400">
                    Emphasis on efficiency and modernization, with particular focus on AI integration, cybersecurity, and advanced weapons systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <h2 className="text-lg font-bold mb-4">Investment Priorities</h2>
            <div className="space-y-4">
              {[
                { name: "Research & Development", icon: Rocket, desc: "RDT&E funding for advanced materials, hypersonics, quantum", highlight: "Substantial" },
                { name: "Cybersecurity", icon: Lock, desc: "$14B for cyberspace operations and security", highlight: "Critical" },
                { name: "Artificial Intelligence", icon: Cpu, desc: "$1.8B for autonomous vehicles and analytics", highlight: "Growing" },
                { name: "Modernization", icon: Radar, desc: "Investment in submarines, aircraft, and strategic bombers", highlight: "Strategic" }
              ].map((priority, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <priority.icon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{priority.name}</h3>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/20 text-red-500">{priority.highlight}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{priority.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Leaders */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Industry Leaders and Market Position</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Top Defense Contractors</h3>
                <Building2 className="h-5 w-5 text-red-500" />
              </div>
              <div className="space-y-4">
                {[
                  { name: "Lockheed Martin", revenue: "72.5B", specialty: "F-35, missile systems", trend: "up" },
                  { name: "RTX", revenue: "40.6B", specialty: "Integrated defense solutions", trend: "up" },
                  { name: "Northrop Grumman", revenue: "35.2B", specialty: "B-21 Raider, space systems", trend: "up" },
                  { name: "General Dynamics", revenue: "33.7B", specialty: "Combat vehicles, IT services", trend: "neutral" },
                  { name: "Boeing", revenue: "32.7B", specialty: "F-15EX, satellites", trend: "down" }
                ].map((contractor, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{contractor.name}</h4>
                      <p className="text-xs text-gray-400">{contractor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">${contractor.revenue}</span>
                        {contractor.trend === 'up' && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                        {contractor.trend === 'down' && <ArrowDownRight className="h-4 w-4 text-red-500" />}
                        {contractor.trend === 'neutral' && <Activity className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Major Contract Awards</h3>
                <FileText className="h-5 w-5 text-red-500" />
              </div>
              <div className="space-y-4">
                {[
                  { contractor: "Northrop Grumman", value: "1.4B", type: "Air Defense", icon: Plane },
                  { contractor: "GE Aerospace", value: "5.0B", type: "Engine Systems", icon: Rocket },
                  { contractor: "HII", value: "147M", type: "Naval Training", icon: Anchor },
                  { contractor: "BAE Systems", value: "356.7M", type: "Combat Vehicles", icon: Tank },
                  { contractor: "Charles Stark Draper", value: "308M", type: "Navigation", icon: Satellite }
                ].map((contract, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <contract.icon className="h-4 w-4 text-red-500" />
                      <div>
                        <h4 className="font-medium text-sm">{contract.contractor}</h4>
                        <p className="text-xs text-gray-400">{contract.type}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-500">${contract.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emerging Trends */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Emerging Trends Shaping the Defense Landscape</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Binary className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Technological Transformation</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "AI Integration", impact: "High", desc: "Revolutionizing maintenance operations" },
                  { name: "Industry 5.0", impact: "Medium", desc: "Human-centered manufacturing" },
                  { name: "Autonomous Systems", impact: "High", desc: "Unmanned platform growth" },
                  { name: "Cybersecurity", impact: "Critical", desc: "Infrastructure protection" }
                ].map((trend, i) => (
                  <div key={i} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{trend.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        trend.impact === 'Critical' ? 'bg-red-500/20 text-red-500' :
                        trend.impact === 'High' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>{trend.impact}</span>
                    </div>
                    <p className="text-xs text-gray-400">{trend.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Legislative Changes</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Streamlined Acquisition", desc: "Continuous prototyping pathway", status: "Positive" },
                  { name: "Software Reform", desc: "Accelerated development cycles", status: "Positive" },
                  { name: "Commercial Items", desc: "Simplified determinations", status: "Neutral" },
                  { name: "Inflation Relief", desc: "Contract modifications extended", status: "Positive" }
                ].map((change, i) => (
                  <div key={i} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{change.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        change.status === 'Positive' ? 'bg-green-500/20 text-green-500' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>{change.status}</span>
                    </div>
                    <p className="text-xs text-gray-400">{change.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Risk Factors</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Budget Uncertainty", severity: "High", desc: "Extended temporary funding measures" },
                  { name: "Supply Chain", severity: "Medium", desc: "Ongoing disruptions and shortages" },
                  { name: "Labor Constraints", severity: "High", desc: "Workforce shortages impact" },
                  { name: "Shifting Priorities", severity: "Medium", desc: "DOGE initiative effects" }
                ].map((risk, i) => (
                  <div key={i} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{risk.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        risk.severity === 'High' ? 'bg-red-500/20 text-red-500' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>{risk.severity}</span>
                    </div>
                    <p className="text-xs text-gray-400">{risk.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Outlook and Conclusions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                The defense contracting landscape in 2025 presents significant opportunities for companies aligned with DoD priorities and possessing capabilities in emerging technologies. Major contractors like <span className="text-white">Lockheed Martin</span>, <span className="text-white">Northrop Grumman</span>, and <span className="text-white">General Dynamics</span> are well-positioned to maintain their market leadership.
              </p>
              <p className="text-sm text-gray-400">
                The coming year will likely see continued robust defense spending, though with potential shifts in priorities under the new administration. Contractors that can navigate budget uncertainties, address supply chain challenges, and adapt to evolving defense needs will emerge as the winners in this dynamic environment.
              </p>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <h4 className="font-medium mb-2">Key Success Factors</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-red-500" />
                    <span>Alignment with strategic priorities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-red-500" />
                    <span>Strong international market presence</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-red-500" />
                    <span>Supply chain resilience</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-red-500" />
                    <span>Technology innovation capabilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefenseReport;