import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LineChart, PieChart, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const marketData = [
  { date: '2025-03-01', value: 4000, sentiment: 0.6, volume: 1200 },
  { date: '2025-03-02', value: 3000, sentiment: 0.4, volume: 1400 },
  { date: '2025-03-03', value: 5000, sentiment: 0.8, volume: 2200 },
  { date: '2025-03-04', value: 2780, sentiment: 0.3, volume: 1800 },
  { date: '2025-03-05', value: 4890, sentiment: 0.7, volume: 2400 },
  { date: '2025-03-06', value: 3390, sentiment: 0.5, volume: 1900 },
  { date: '2025-03-07', value: 4490, sentiment: 0.65, volume: 2100 },
];

const sectorPerformance = [
  { name: 'Technology', value: 35, change: '+2.4%' },
  { name: 'Healthcare', value: 25, change: '-1.2%' },
  { name: 'Finance', value: 20, change: '+0.8%' },
  { name: 'Energy', value: 15, change: '+1.5%' },
  { name: 'Consumer', value: 5, change: '-0.5%' },
];

function MarketAnalytics() {
  const [timeframe, setTimeframe] = useState('1W');

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="h-5 w-5 text-red-500 mr-2" />
                <LineChart className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-xl font-bold">Market Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Market Value</h3>
              <DollarSign className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-green-500">$4,490.00</p>
            <p className="text-sm text-gray-400 mt-2">+2.4% from yesterday</p>
          </div>
          
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sentiment Score</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-500">0.65</p>
            <p className="text-sm text-gray-400 mt-2">Bullish territory</p>
          </div>
          
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Trading Volume</h3>
              <BarChart3 className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold">2,100M</p>
            <p className="text-sm text-gray-400 mt-2">+10.5% above average</p>
          </div>
        </div>

        {/* Market Chart */}
        <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Market Performance</h2>
            <div className="flex space-x-2">
              {['1D', '1W', '1M', '3M', 'YTD'].map((tf) => (
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
              <AreaChart data={marketData}>
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

        {/* Sector Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-6">Sector Performance</h2>
            <div className="space-y-4">
              {sectorPerformance.map((sector) => (
                <div key={sector.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>{sector.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{sector.value}%</span>
                    <span className={sector.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                      {sector.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-6">Sentiment Analysis</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
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
                  <Line
                    type="monotone"
                    dataKey="sentiment"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketAnalytics;