import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Calendar,
  Building2,
  Users,
  FileText,
  Bell,
  Settings,
  ChevronDown
} from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import EyeLogo from '../components/EyeLogo';

// Types
interface Contract {
  _id: string;
  date: string;
  agency: string;
  contractor: string;
  amount: number;
  description: string;
  tags: string[];
}

interface ContractorStats {
  name: string;
  totalValue: number;
  totalContracts: number;
  recentContracts: number;
}

interface AgencyStats {
  name: string;
  totalValue: number;
  totalContracts: number;
  avgContractValue: number;
}

const DashboardPage: React.FC = () => {
  // State
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeframe, setTimeframe] = useState('7D');
  const [view, setView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [contractors, setContractors] = useState<ContractorStats[]>([]);
  const [agencies, setAgencies] = useState<AgencyStats[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [contractsRes, contractorsRes, agenciesRes] = await Promise.all([
          axios.get('/api/contracts'),
          axios.get('/api/contractors'),
          axios.get('/api/agencies')
        ]);

        setContracts(contractsRes.data);
        setContractors(contractorsRes.data);
        setAgencies(agenciesRes.data);
        
        // Simulate some alerts
        setAlerts([
          {
            id: 1,
            type: 'contract',
            message: 'New $500M+ contract awarded to Lockheed Martin',
            timestamp: new Date().toISOString(),
            priority: 'high'
          },
          {
            id: 2,
            type: 'trend',
            message: 'Unusual increase in Navy procurement activity',
            timestamp: new Date().toISOString(),
            priority: 'medium'
          }
        ]);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Aggregate data for charts
  const contractValueByDate = contracts.reduce((acc: any[], contract) => {
    const date = format(new Date(contract.date), 'MMM dd');
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.value += contract.amount;
    } else {
      acc.push({ date, value: contract.amount });
    }
    return acc;
  }, []);

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
                <BarChart3 className="h-4 w-4 text-red-500" />
                <span className="text-sm">Defense Contracts Dashboard</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors">
                <Bell className="h-4 w-4" />
                <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">2</span>
              </button>
              <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contracts, contractors, or agencies..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-red-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors">
                <Filter className="h-4 w-4 text-gray-400" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Date Range</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Value</h3>
                <DollarSign className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-3xl font-bold text-green-500">$4.2B</p>
              <p className="text-sm text-gray-400 mt-2">+12.4% from last month</p>
            </div>
            
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Active Contracts</h3>
                <FileText className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-3xl font-bold">1,247</p>
              <p className="text-sm text-gray-400 mt-2">142 new this month</p>
            </div>
            
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Top Contractors</h3>
                <Building2 className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-3xl font-bold">84</p>
              <p className="text-sm text-gray-400 mt-2">12 new partnerships</p>
            </div>
            
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Agencies</h3>
                <Users className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-3xl font-bold">16</p>
              <p className="text-sm text-gray-400 mt-2">All major departments</p>
            </div>
          </div>

          {/* Main Chart */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Contract Value Trends</h2>
              <div className="flex space-x-2">
                {['7D', '1M', '3M', '6M', '1Y', 'ALL'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      timeframe === tf
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={contractValueByDate}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Contracts */}
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-6">Recent Contracts</h2>
              <div className="space-y-4">
                {contracts.slice(0, 5).map((contract) => (
                  <div key={contract._id} className="border-b border-gray-800 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{contract.contractor}</span>
                      <span className="text-green-500">${(contract.amount / 1000000).toFixed(1)}M</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{contract.agency}</p>
                    <p className="text-xs text-gray-500">{format(new Date(contract.date), 'MMM dd, yyyy')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contractors */}
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-6">Top Contractors</h2>
              <div className="space-y-4">
                {contractors.slice(0, 5).map((contractor, index) => (
                  <div key={contractor.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span>{contractor.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(contractor.totalValue / 1000000000).toFixed(1)}B</p>
                      <p className="text-sm text-gray-400">{contractor.totalContracts} contracts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts & Notifications */}
            <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-6">Alerts & Notifications</h2>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg ${
                      alert.priority === 'high' 
                        ? 'bg-red-500/10 border border-red-500/20' 
                        : 'bg-yellow-500/10 border border-yellow-500/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <AlertCircle className={`h-5 w-5 ${
                        alert.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <div>
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {format(new Date(alert.timestamp), 'MMM dd, HH:mm')}
                        </p>
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
};

export default DashboardPage;