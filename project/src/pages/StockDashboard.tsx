import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BarChart3, 
  TrendingUp, 
  FileText, 
  AlertCircle,
  Globe,
  DollarSign,
  ChevronRight,
  Loader2,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import EyeLogo from '../components/EyeLogo';

const StockDashboard: React.FC = () => {
  const [ticker, setTicker] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [stockData, setStockData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API key would normally be stored securely in environment variables
  // This is just for demonstration purposes
  const API_KEY = 'demo';

  useEffect(() => {
    if (ticker) {
      fetchAllData();
    }
  }, [ticker]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch stock time series data
      await fetchStockData();
      
      // Fetch company overview
      await fetchCompanyOverview();
      
      // Fetch financial data
      await fetchFinancialData();
      
      // Fetch news data
      await fetchNewsData();
      
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStockData = async () => {
    // In a real implementation, this would fetch from Alpha Vantage
    // For demo purposes, we'll generate mock data
    const mockData = generateMockTimeSeriesData();
    setStockData(mockData);
  };

  const fetchCompanyOverview = async () => {
    // Mock company data
    const mockCompanyInfo = {
      Symbol: ticker,
      Name: `${ticker} Corporation`,
      Description: `${ticker} is a leading technology company specializing in advanced solutions for various industries. The company focuses on innovation and sustainable growth through strategic partnerships and cutting-edge research.`,
      Sector: 'Technology',
      Industry: 'Software & Services',
      MarketCapitalization: '345678900000',
      EBITDA: '12345678000',
      PERatio: '32.5',
      DividendYield: '1.25',
      '52WeekHigh': '185.40',
      '52WeekLow': '120.15',
      AnalystTargetPrice: '190.75'
    };
    
    setCompanyInfo(mockCompanyInfo);
  };

  const fetchFinancialData = async () => {
    // Mock financial data
    const mockFinancialData = generateMockFinancialData();
    setFinancialData(mockFinancialData);
  };

  const fetchNewsData = async () => {
    // Mock news data
    const mockNews = [
      {
        title: `${ticker} Announces Breakthrough Innovation in AI Technology`,
        url: '#',
        source: 'Financial Times',
        publishedDate: '2025-03-18T09:30:00Z',
        summary: `${ticker} revealed a groundbreaking advancement in artificial intelligence that is expected to revolutionize the industry and potentially increase market share significantly.`
      },
      {
        title: `${ticker} Beats Quarterly Earnings Expectations`,
        url: '#',
        source: 'The Wall Street Journal',
        publishedDate: '2025-03-15T14:45:00Z',
        summary: `${ticker} reported quarterly earnings that surpassed analyst expectations, showing robust growth in key segments despite ongoing market challenges.`
      },
      {
        title: `${ticker} Expands Operations with Strategic Acquisition`,
        url: '#',
        source: 'Bloomberg',
        publishedDate: '2025-03-10T11:20:00Z',
        summary: `${ticker} announced the acquisition of a promising startup, strengthening its position in emerging markets and adding valuable intellectual property to its portfolio.`
      }
    ];
    
    setNewsData(mockNews);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setTicker(searchQuery.toUpperCase());
    }
  };

  // Generate mock time series data for demonstration
  const generateMockTimeSeriesData = () => {
    const data = [];
    const today = new Date();
    const basePrice = 150 + Math.random() * 50;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Create some realistic-looking price movements
      const volatility = 0.02; // 2% daily volatility
      const dailyChange = basePrice * volatility * (Math.random() * 2 - 1);
      const previousPrice = i < 30 ? data[data.length - 1].price : basePrice;
      const price = previousPrice + dailyChange;
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 10000000) + 1000000
      });
    }
    
    return data;
  };
  
  // Generate mock financial data for demonstration
  const generateMockFinancialData = () => {
    const data = [];
    const currentYear = new Date().getFullYear();
    
    for (let i = 4; i >= 0; i--) {
      const year = currentYear - i;
      const revenue = 10000 + Math.random() * 2000 * (4 - i); // Growing revenue trend
      const expenses = revenue * (0.6 + Math.random() * 0.1); // Expenses as percentage of revenue
      
      data.push({
        year: year.toString(),
        revenue: parseFloat(revenue.toFixed(2)),
        expenses: parseFloat(expenses.toFixed(2)),
        profit: parseFloat((revenue - expenses).toFixed(2))
      });
    }
    
    return data;
  };

  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate price change and percentage
  const calculatePriceChange = () => {
    if (!stockData || stockData.length < 2) return { change: 0, percentage: 0 };
    
    const currentPrice = stockData[stockData.length - 1].price;
    const previousPrice = stockData[stockData.length - 2].price;
    const change = currentPrice - previousPrice;
    const percentage = (change / previousPrice) * 100;
    
    return {
      change: change.toFixed(2),
      percentage: percentage.toFixed(2),
      isPositive: change >= 0
    };
  };

  const priceChange = stockData ? calculatePriceChange() : null;

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header/Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <EyeLogo className="w-8 h-8" />
                <span className="text-lg font-bold">wire84</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">Stock Dashboard</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <div className="relative flex-grow">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter ticker symbol (e.g., AAPL, MSFT, GOOGL)"
                  className="bg-gray-900/50 border border-gray-800 rounded-lg py-2 pl-10 pr-4 w-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 flex items-center transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                Lookup
              </button>
            </form>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
            </div>
          )}

          {error && (
            <div className="bg-black/40 border border-red-800 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-500">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && ticker && stockData && (
            <>
              {/* Stock Header */}
              <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{companyInfo?.Name || ticker}</h1>
                    <div className="flex items-center mt-1 text-gray-400">
                      <span className="text-sm">{companyInfo?.Symbol}</span>
                      {companyInfo?.Sector && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-sm">{companyInfo?.Sector}</span>
                        </>
                      )}
                      {companyInfo?.Industry && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-sm">{companyInfo?.Industry}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      ${stockData[stockData.length - 1].price}
                    </div>
                    {priceChange && (
                      <div className={`flex items-center justify-end mt-1 ${priceChange.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {priceChange.isPositive ? (
                          <ArrowUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 mr-1" />
                        )}
                        <span>{priceChange.change} ({priceChange.percentage}%)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Stock Price Chart */}
                <div className="lg:col-span-2 bg-black/40 rounded-lg border border-gray-800 p-4">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-5 w-5 text-red-500 mr-2" />
                    <h2 className="text-lg font-semibold">Price History</h2>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stockData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fill: '#9CA3AF' }}
                          tickFormatter={(tick) => {
                            const date = new Date(tick);
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                          }}
                        />
                        <YAxis 
                          tick={{ fill: '#9CA3AF' }}
                          domain={['auto', 'auto']}
                          tickFormatter={(tick) => `$${tick}`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                          itemStyle={{ color: '#F3F4F6' }}
                          formatter={(value) => [`$${value}`, 'Price']}
                          labelFormatter={(label) => formatDate(label)}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#EF4444" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6, fill: '#EF4444' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="bg-black/40 rounded-lg border border-gray-800 p-4">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
                    <h2 className="text-lg font-semibold">Key Stats</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Cap</span>
                      <span className="font-medium">{companyInfo?.MarketCapitalization ? formatNumber(parseInt(companyInfo.MarketCapitalization)) : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">P/E Ratio</span>
                      <span className="font-medium">{companyInfo?.PERatio || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">52-Week High</span>
                      <span className="font-medium">${companyInfo?.['52WeekHigh'] || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">52-Week Low</span>
                      <span className="font-medium">${companyInfo?.['52WeekLow'] || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dividend Yield</span>
                      <span className="font-medium">{companyInfo?.DividendYield ? `${companyInfo.DividendYield}%` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">EBITDA</span>
                      <span className="font-medium">{companyInfo?.EBITDA ? formatNumber(parseInt(companyInfo.EBITDA)) : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Analyst Target</span>
                      <span className="font-medium">${companyInfo?.AnalystTargetPrice || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Revenue vs Expenses */}
                <div className="lg:col-span-2 bg-black/40 rounded-lg border border-gray-800 p-4">
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-5 w-5 text-red-500 mr-2" />
                    <h2 className="text-lg font-semibold">Revenue vs Expenses</h2>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financialData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="year" tick={{ fill: '#9CA3AF' }} />
                        <YAxis 
                          tick={{ fill: '#9CA3AF' }}
                          tickFormatter={(tick) => formatNumber(tick)}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                          itemStyle={{ color: '#F3F4F6' }}
                          formatter={(value) => [formatNumber(value), '']}
                        />
                        <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                        <Bar dataKey="revenue" name="Revenue" fill="#10B981" />
                        <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
                        <Bar dataKey="profit" name="Profit" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Company Description */}
                <div className="bg-black/40 rounded-lg border border-gray-800 p-4">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 text-red-500 mr-2" />
                    <h2 className="text-lg font-semibold">Company Overview</h2>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {companyInfo?.Description || 'No description available.'}
                  </p>
                </div>
              </div>

              {/* Latest News */}
              <div className="bg-black/40 rounded-lg border border-gray-800 p-4 mb-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-semibold">Latest News</h2>
                </div>
                <div className="space-y-4">
                  {newsData.length > 0 ? (
                    newsData.map((news, index) => (
                      <div key={index} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-semibold mb-1">{news.title}</h3>
                        <div className="flex items-center mb-2 text-xs text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(news.publishedDate)}</span>
                          <span className="mx-2">•</span>
                          <span>{news.source}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{news.summary}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No recent news available.</p>
                  )}
                </div>
              </div>

              {/* Wire84 Style Insights */}
              <div className="bg-black/40 rounded-lg border border-gray-800 p-4">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-semibold">wire84 Intelligence Insights</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Regulatory Signals</p>
                      <p className="text-sm text-gray-400">Recent patent applications suggest upcoming product innovations in Q3 2025.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Supply Chain Intelligence</p>
                      <p className="text-sm text-gray-400">Component shipments indicate production increase of 22% above market estimates.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Human Network Indicators</p>
                      <p className="text-sm text-gray-400">Significant hiring in R&D departments suggests strategic expansion in emerging markets.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {!loading && !error && !ticker && (
            <div className="flex flex-col items-center justify-center py-16">
              <EyeLogo className="w-16 h-16 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Welcome to wire84 Stock Dashboard</h2>
              <p className="text-gray-400 text-center max-w-md mb-6">
                Enter a ticker symbol above to get detailed stock information, financial analysis, and market intelligence.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-2xl">
                <div className="bg-black/40 rounded-lg border border-gray-800 p-4 hover:border-red-500/50 transition-colors">
                  <BarChart3 className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm">Price Charts</p>
                </div>
                <div className="bg-black/40 rounded-lg border border-gray-800 p-4 hover:border-red-500/50 transition-colors">
                  <DollarSign className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm">Financial Data</p>
                </div>
                <div className="bg-black/40 rounded-lg border border-gray-800 p-4 hover:border-red-500/50 transition-colors">
                  <FileText className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm">Company Info</p>
                </div>
                <div className="bg-black/40 rounded-lg border border-gray-800 p-4 hover:border-red-500/50 transition-colors">
                  <Globe className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm">Latest News</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <EyeLogo className="w-6 h-6" />
              <span className="text-sm font-bold">wire84</span>
            </div>
            <p className="text-xs text-gray-400">
              © 2025 wire84. Market data powered by Alpha Vantage. For demonstration purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StockDashboard;