import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  LineChart,
  Percent,
  AlertTriangle,
  Info,
  Loader2,
  ChevronRight,
  ChevronDown,
  Filter,
  RefreshCw,
  Globe,
  Calendar,
  FileText,
  Activity,
  ExternalLink,
  Coins
} from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';
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
import {
  fetchForexRate,
  fetchForexIntraday,
  fetchForexDaily,
  fetchNews
} from '../lib/stockApi';
import EyeLogo from '../components/EyeLogo';

interface ForexRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  lastUpdated: string;
  change: number;
  changePercent: number;
}

interface ChartData {
  time: string;
  rate: number;
}

const MAJOR_PAIRS = [
  { from: 'EUR', to: 'USD', name: 'Euro/US Dollar' },
  { from: 'GBP', to: 'USD', name: 'British Pound/US Dollar' },
  { from: 'USD', to: 'JPY', name: 'US Dollar/Japanese Yen' },
  { from: 'USD', to: 'CHF', name: 'US Dollar/Swiss Franc' },
  { from: 'AUD', to: 'USD', name: 'Australian Dollar/US Dollar' },
  { from: 'USD', to: 'CAD', name: 'US Dollar/Canadian Dollar' },
  { from: 'NZD', to: 'USD', name: 'New Zealand Dollar/US Dollar' },
  { from: 'EUR', to: 'GBP', name: 'Euro/British Pound' }
];

const CurrenciesDashboard = () => {
  const [selectedPair, setSelectedPair] = useState<{ from: string; to: string; name: string }>(MAJOR_PAIRS[0]);
  const [rates, setRates] = useState<Record<string, ForexRate>>({});
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '3M' | '1Y'>('1D');
  const [news, setNews] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);

  const fetchInterval = useRef<number>();
  const clockInterval = useRef<number>();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initial load
    fetchAllRates();
    
    // Set up intervals
    fetchInterval.current = window.setInterval(fetchAllRates, 15000);
    clockInterval.current = window.setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      if (fetchInterval.current) clearInterval(fetchInterval.current);
      if (clockInterval.current) clearInterval(clockInterval.current);
    };
  }, []);

  useEffect(() => {
    if (selectedPair) {
      fetchPairData(selectedPair.from, selectedPair.to);
      fetchForexNews();
    }
  }, [selectedPair, timeframe]);

  const fetchAllRates = async () => {
    try {
      const newRates: Record<string, ForexRate> = {};
      
      for (const pair of MAJOR_PAIRS) {
        const { data, error } = await fetchForexRate(pair.from, pair.to);
        if (error) throw error;
        
        if (data['Realtime Currency Exchange Rate']) {
          const quote = data['Realtime Currency Exchange Rate'];
          const rate = parseFloat(quote['5. Exchange Rate']);
          const prevRate = rates[`${pair.from}${pair.to}`]?.rate || rate;
          const change = rate - prevRate;
          
          newRates[`${pair.from}${pair.to}`] = {
            fromCurrency: pair.from,
            toCurrency: pair.to,
            rate,
            lastUpdated: quote['6. Last Refreshed'],
            change,
            changePercent: (change / prevRate) * 100
          };
        }
      }
      
      setRates(newRates);
    } catch (err) {
      console.error('Error fetching forex rates:', err);
    }
  };

  const fetchPairData = async (fromCurrency: string, toCurrency: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await fetchForexIntraday(fromCurrency, toCurrency);
      if (error) throw error;
      
      if (data['Time Series FX (5min)']) {
        const timeSeries = data['Time Series FX (5min)'];
        const chartData: ChartData[] = Object.entries(timeSeries)
          .map(([time, values]: [string, any]) => ({
            time,
            rate: parseFloat(values['4. close'])
          }))
          .reverse()
          .slice(-100);
        
        setChartData(chartData);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForexNews = async () => {
    setNewsLoading(true);
    try {
      const { data } = await fetchNews(undefined, ['forex', 'economy_forex']);
      setNews(data);
    } catch (err) {
      console.error('Error fetching forex news:', err);
    } finally {
      setNewsLoading(false);
    }
  };

  const formatNumber = (num: number, decimals: number = 4) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  };

  const formatNewsDate = (dateString: string): string => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        return 'Invalid date';
      }
      return format(date, 'MMM d, HH:mm');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <EyeLogo className="w-8 h-8" />
                <span className="text-lg font-bold">wire84</span>
              </Link>
              <div className="h-6 w-px bg-gray-800" />
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 text-red-500" />
                <span className="text-sm">Forex</span>
              </div>
              <div className="h-6 w-px bg-gray-800" />
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="text-sm font-mono">
                  {format(currentTime, 'HH:mm:ss')}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchAllRates}
                className="p-1.5 hover:bg-gray-800 rounded transition-colors"
              >
                <RefreshCw className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Grid Layout */}
      <div className="pt-12 grid grid-cols-12 gap-0.5 bg-gray-900">
        {/* Currency Pairs Sidebar */}
        <div className="col-span-3 bg-black h-[calc(100vh-3rem)] overflow-y-auto">
          <div className="p-2 space-y-1">
            {MAJOR_PAIRS.map(pair => {
              const rate = rates[`${pair.from}${pair.to}`];
              return (
                <button
                  key={`${pair.from}${pair.to}`}
                  onClick={() => setSelectedPair(pair)}
                  className={`w-full text-left p-2 rounded text-sm ${
                    selectedPair === pair ? 'bg-gray-900' : 'hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{pair.name}</span>
                    {rate && (
                      <span className={rate.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {formatNumber(rate.rate)}
                      </span>
                    )}
                  </div>
                  {rate && (
                    <div className="flex items-center mt-1">
                      <span className={`text-xs ${rate.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {rate.change >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 inline" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 inline" />
                        )}
                        {formatNumber(rate.change, 4)} ({formatNumber(rate.changePercent, 2)}%)
                      </span>
                      <span className="text-xs text-gray-400 ml-2">
                        {format(new Date(rate.lastUpdated), 'HH:mm:ss')}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9 bg-black h-[calc(100vh-3rem)] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="p-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-500">{error}</p>
                </div>
              </div>
            </div>
          ) : selectedPair ? (
            <>
              {/* Rate Header */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{selectedPair.name}</h1>
                    <div className="flex items-center mt-1">
                      <span className="text-3xl font-bold">
                        {formatNumber(rates[`${selectedPair.from}${selectedPair.to}`]?.rate || 0)}
                      </span>
                      {rates[`${selectedPair.from}${selectedPair.to}`] && (
                        <span className={`ml-3 flex items-center ${
                          rates[`${selectedPair.from}${selectedPair.to}`].change >= 0 
                            ? 'text-green-500' 
                            : 'text-red-500'
                        }`}>
                          {rates[`${selectedPair.from}${selectedPair.to}`].change >= 0 ? (
                            <ArrowUpRight className="h-5 w-5 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-5 w-5 mr-1" />
                          )}
                          {formatNumber(rates[`${selectedPair.from}${selectedPair.to}`].change, 4)} 
                          ({formatNumber(rates[`${selectedPair.from}${selectedPair.to}`].changePercent, 2)}%)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">
                      Last Updated: {format(new Date(rates[`${selectedPair.from}${selectedPair.to}`]?.lastUpdated || new Date()), 'HH:mm:ss')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Controls */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {['1D', '5D', '1M', '3M', '1Y'].map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf as any)}
                        className={`px-3 py-1 rounded text-sm ${
                          timeframe === tf
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="p-4">
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="time"
                        stroke="#9ca3af"
                        tickFormatter={(time) => {
                          try {
                            const date = parseISO(time);
                            if (!isValid(date)) return '';
                            return format(date, 'HH:mm');
                          } catch {
                            return '';
                          }
                        }}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => formatNumber(value)}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111827',
                          border: '1px solid #374151',
                          borderRadius: '0.5rem',
                        }}
                        formatter={(value: any) => [formatNumber(value), 'Rate']}
                        labelFormatter={(label) => format(new Date(label), 'MMM d, HH:mm')}
                      />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="#ef4444"
                        fillOpacity={1}
                        fill="url(#colorRate)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* News Feed */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Forex News</h2>
                  {newsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 text-red-500 animate-spin" />
                    </div>
                  ) : news.length > 0 ? (
                    <div className="space-y-4">
                      {news.map((item, i) => (
                        <div key={i} className="bg-gray-900/30 rounded-lg border border-gray-800 p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium mb-2">
                                <a 
                                  href={item.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-red-500 transition-colors flex items-center"
                                >
                                  {item.title}
                                  <ExternalLink className="h-4 w-4 ml-1" />
                                </a>
                              </h3>
                              <p className="text-sm text-gray-400">{item.summary}</p>
                              <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                                <span>{item.source}</span>
                                <span>•</span>
                                <span>{formatNewsDate(item.time_published)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      No recent news available
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Coins className="h-12 w-12 mb-4" />
              <p>Select a currency pair from the list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrenciesDashboard;