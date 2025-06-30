import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Send, Loader2, AlertCircle, FileText, Search, Filter, Database, TrendingUp, DollarSign, Building2, BarChart3, LineChart, MapPin, Calendar, Info, Target, ArrowUpRight, ArrowDownRight, Percent, AlertTriangle, Scale, Activity, Shield, Rocket, Cpu, Globe, Lock, Zap, ChevronRight, Users, Briefcase, PieChart, Radar, Plane, Anchor, Tangent as Tank, Radio, Satellite, Binary, ShieldAlert, ChevronDown } from 'lucide-react'nalytics';
import { defenseIndustryData } from '../data/defense_industry_data';
import EyeLogo from '../components/EyeLogo';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  type?: 'analysis' | 'alert' | 'contract' | 'text' | 'chart';
  metadata?: {
    contractId?: string;
    confidence?: number;
    source?: string;
    timestamp?: string;
    data?: any;
  };
}

function TerminalPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to wire84 Defense Terminal. I can help you analyze defense contracts, identify patterns, and provide real-time market intelligence.',
      type: 'text'
    },
    {
      id: '2',
      role: 'system',
      content: 'Try asking questions like:\n- "Show top defense contractors"\n- "Analyze recent missile defense contracts"\n- "Compare Lockheed vs Northrop performance"\n- "What are the key industry trends?"',
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<string | null>(null);
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const analyzeQuery = async (query: string) => {
    const normalizedQuery = query.toLowerCase();
    let analysisData: any = {};
    let contractData: any[] = [];
    let alertData: any[] = [];

    // Analyze query intent
    if (normalizedQuery.includes('top') && normalizedQuery.includes('contractor')) {
      analysisData = {
        type: 'topContractors',
        data: defenseAnalytics.getTopContractors(5)
      };
    } else if (normalizedQuery.includes('missile') || normalizedQuery.includes('defense')) {
      const missileContracts = defenseIndustryData.recentContracts.filter(
        c => c.type === 'Air and Missile Defense'
      );
      analysisData = {
        type: 'missileDefense',
        data: missileContracts,
        totalValue: missileContracts.reduce((sum, c) => sum + c.value, 0)
      };
    } else if (normalizedQuery.includes('trend')) {
      analysisData = {
        type: 'trends',
        data: defenseAnalytics.analyzeTrends()
      };
    } else if (normalizedQuery.includes('risk')) {
      analysisData = {
        type: 'risk',
        data: {
          score: defenseAnalytics.calculateRiskScore(),
          supplyChain: defenseAnalytics.getSupplyChainRisk()
        }
      };
    }

    // Add relevant contracts
    if (analysisData.type === 'missileDefense') {
      contractData = analysisData.data;
    }

    // Add relevant alerts
    if (analysisData.type === 'risk') {
      alertData = defenseIndustryData.outlook.risks;
    }

    return { analysisData, contractData, alertData };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsAnalyzing(true);

    try {
      const { analysisData, contractData, alertData } = await analyzeQuery(input);

      // Generate analysis message
      if (Object.keys(analysisData).length > 0) {
        const analysisMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          type: 'analysis',
          content: 'Analysis based on defense industry data:',
          metadata: {
            confidence: 0.92,
            timestamp: new Date().toISOString(),
            data: analysisData
          }
        };
        setMessages(prev => [...prev, analysisMessage]);
      }

      // Generate contract messages
      if (contractData.length > 0) {
        contractData.slice(0, 3).forEach((contract, index) => {
          const contractMessage: Message = {
            id: (Date.now() + 2 + index).toString(),
            role: 'assistant',
            type: 'contract',
            content: `${contract.contractor} awarded ${defenseAnalytics.formatCurrency(contract.value)}M for ${contract.description}`,
            metadata: {
              contractId: `DOD-${Date.now()}-${index + 1}`,
              source: 'Defense.gov',
              data: contract
            }
          };
          setMessages(prev => [...prev, contractMessage]);
        });
      }

      // Generate alert messages
      if (alertData.length > 0) {
        alertData.slice(0, 2).forEach((alert, index) => {
          const alertMessage: Message = {
            id: (Date.now() + 5 + index).toString(),
            role: 'assistant',
            type: 'alert',
            content: `Risk Alert: ${alert.factor} - ${alert.description}`,
            metadata: {
              confidence: 0.88,
              timestamp: new Date().toISOString(),
              data: alert
            }
          };
          setMessages(prev => [...prev, alertMessage]);
        });
      }

    } catch (error) {
      console.error('Failed to analyze query:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        type: 'text',
        content: 'Sorry, I encountered an error while analyzing the data. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === 'analysis' && message.metadata?.data) {
      const data = message.metadata.data;
      
      switch (data.type) {
        case 'topContractors':
          return (
            <div className="space-y-4">
              <p>{message.content}</p>
              <div className="grid grid-cols-1 gap-4">
                {data.data.map((contractor: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{contractor.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">
                        Revenue: {defenseAnalytics.formatCurrency(contractor.revenue)}B
                      </span>
                      <span className="text-sm text-gray-400">
                        Market Share: {defenseAnalytics.calculateMarketShare(contractor.name).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'missileDefense':
          return (
            <div className="space-y-4">
              <p>{message.content}</p>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-sm mb-2">Total Contract Value: {defenseAnalytics.formatCurrency(data.totalValue)}M</p>
                <div className="space-y-2">
                  {data.data.map((contract: any, index: number) => (
                    <div key={index} className="text-sm">
                      • {contract.contractor}: {contract.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 'trends':
          return (
            <div className="space-y-4">
              <p>{message.content}</p>
              <div className="grid grid-cols-1 gap-4">
                {data.data.highImpact.map((trend: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{trend.name}</span>
                      <span className={`text-sm ${
                        trend.impact === 'Critical' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {trend.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{trend.description}</p>
                    <p className="text-sm text-gray-400 mt-1">{trend.opportunities}</p>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'risk':
          return (
            <div className="space-y-4">
              <p>{message.content}</p>
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Overall Risk Score</span>
                  <span className={`text-lg ${
                    data.data.score > 70 ? 'text-red-500' : 
                    data.data.score > 50 ? 'text-yellow-500' : 
                    'text-green-500'
                  }`}>
                    {data.data.score.toFixed(1)}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">
                    Supply Chain Risk Level: {data.data.supplyChain.riskLevel}
                  </p>
                  <p className="text-sm text-gray-400">
                    High Impact Issues: {data.data.supplyChain.highImpactCount} of {data.data.supplyChain.totalIssues}
                  </p>
                </div>
              </div>
            </div>
          );

        default:
          return message.content;
      }
    }

    return message.content;
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
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
                <Shield className="h-4 w-4 text-red-500" />
                <span className="text-sm">Defense Industry Terminal</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-24">
        {/* Defense Industry Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Budget</h3>
              <DollarSign className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-green-500">
              ${defenseAnalytics.formatCurrency(defenseIndustryData.budget.total)}B
            </p>
            <p className="text-sm text-gray-400 mt-2">FY {defenseIndustryData.budget.year}</p>
          </div>
          
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Top Contractor</h3>
              <Building2 className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-xl font-bold truncate">{defenseIndustryData.topContractors[0].name}</p>
            <p className="text-sm text-gray-400 mt-2">
              ${defenseAnalytics.formatCurrency(defenseIndustryData.topContractors[0].revenue)}B Revenue
            </p>
          </div>
          
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Largest Contract</h3>
              <FileText className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-xl font-bold">GE Aerospace</p>
            <p className="text-sm text-green-500 mt-2">$5.0B F110 Engine Support</p>
          </div>
          
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Risk Level</h3>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="text-xl font-bold text-yellow-500">Moderate</p>
            <p className="text-sm text-gray-400 mt-2">
              Score: {defenseAnalytics.calculateRiskScore().toFixed(1)}
            </p>
          </div>
        </div>

        {/* Key Trends and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Strategic Focus Areas</h2>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Radar className="h-4 w-4 text-red-500" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <PieChart className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Cpu className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">AI & Automation</h3>
                </div>
                <p className="text-sm text-gray-400">
                  $1.8B allocated for AI initiatives in autonomous systems and predictive maintenance
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Lock className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold">Cybersecurity</h3>
                </div>
                <p className="text-sm text-gray-400">
                  $14B committed to cyber operations and security initiatives
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Rocket className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Space Systems</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Major investments in satellite systems and space technology
                </p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Global Defense</h3>
                </div>
                <p className="text-sm text-gray-400">
                  International partnerships and foreign military sales growth
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-6">Risk Factors</h2>
            <div className="space-y-4">
              {defenseIndustryData.outlook.risks.map((risk, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{risk.factor}</span>
                    <span className={`text-sm ${
                      risk.severity === 'High' ? 'text-red-500' :
                      risk.severity === 'Medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 h-[calc(100vh-20rem)]">
            <div className="h-[calc(100%-5rem)] overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-red-500 text-white'
                        : message.type === 'analysis'
                        ? 'bg-blue-500/20 border border-blue-500/40'
                        : message.type === 'alert'
                        ? 'bg-yellow-500/20 border border-yellow-500/40'
                        : message.type === 'contract'
                        ? 'bg-green-500/20 border border-green-500/40'
                        : 'bg-gray-800'
                    }`}
                  >
                    {message.type === 'analysis' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Search className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-500">Analysis</span>
                        <span className="text-xs text-blue-400">
                          {message.metadata?.confidence && 
                            `Confidence: ${(message.metadata.confidence * 100).toFixed(1)}%`
                          }
                        </span>
                      </div>
                    )}
                    {message.type === 'alert' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-yellow-500">Alert</span>
                      </div>
                    )}
                    {message.type === 'contract' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">Contract</span>
                        {message.metadata?.contractId && (
                          <span className="text-xs text-green-400">
                            ID: {message.metadata.contractId}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{renderMessageContent(message)}</div>
                    {message.metadata?.timestamp && (
                      <div className="mt-2 text-xs text-gray-400">
                        {new Date(message.metadata.timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isAnalyzing && (
                <div className="flex justify-start">
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-blue-500 animate-pulse" />
                      <span className="text-blue-500">Analyzing defense industry data...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-800 p-4 bg-gray-900/30"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about defense contracts, analyze trends, or search for specific details..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Recent Contracts Feed */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 h-[calc(100vh-20rem)]">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Defense Contracts</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              <div className="divide-y divide-gray-800">
                {defenseIndustryData.recentContracts.map((contract, index) => (
                  <div key={index} className="p-4 hover:bg-gray-900/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{contract.contractor}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{contract.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-green-500 font-semibold">
                          ${defenseAnalytics.formatCurrency(contract.value)}M
                        </p>
                        <p className="text-xs text-gray-400">
                          {contract.type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300">
                        <Building2 className="h-3 w-3 mr-1" />
                        {contract.type}
                      </span>
                      {contract.breakdown && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {contract.breakdown.length} Components
                        </span>
                      )}
                    </div>

                    {contract.breakdown && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-800">
                        {contract.breakdown.map((item: any, i: number) => (
                          <div key={i} className="text-sm text-gray-400 mb-1">
                            • ${defenseAnalytics.formatCurrency(item.value)}M - {item.description}
                          </div>
                        ))}
                      </div>
                    )}
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

export default TerminalPage;