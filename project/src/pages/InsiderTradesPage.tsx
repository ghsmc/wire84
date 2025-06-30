import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign,
  Briefcase,
  AlertCircle,
  Loader2,
  Filter,
  TrendingUp,
  ChevronDown,
  BarChart3,
  LineChart,
  Activity,
  Clock,
  Building2
} from 'lucide-react';
import { getAlphaVantageKey } from '../lib/config';
import EyeLogo from '../components/EyeLogo';

// S&P 500 top companies for initial feed
const SP500_SYMBOLS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 
  'META', 'BRK.B', 'LLY', 'V', 'TSM',
  'UNH', 'XOM', 'JPM', 'JNJ', 'MA'
];

interface InsiderTransaction {
  transaction_date: string;
  ticker: string;
  executive: string;
  executive_title: string;
  security_type: string;
  acquisition_or_disposal: string;
  shares: string;
  share_price: string;
}

interface AggregatedData {
  totalBuyValue: number;
  totalSellValue: number;
  largestTransaction: InsiderTransaction;
  mostActiveCompany: {
    symbol: string;
    transactionCount: number;
  };
  recentTrends: {
    date: string;
    buyCount: number;
    sellCount: number;
  }[];
}

const InsiderTradesPage: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [transactions, setTransactions] = useState<InsiderTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sp500Transactions, setSp500Transactions] = useState<InsiderTransaction[]>([]);
  const [loadingFeed, setLoadingFeed] = useState<boolean>(true);
  const [aggregatedData, setAggregatedData] = useState<AggregatedData | null>(null);

  useEffect(() => {
    fetchSP500Feed();
  }, []);

  const fetchSP500Feed = async () => {
    setLoadingFeed(true);
    try {
      const apiKey = await getAlphaVantageKey();
      const allTransactions: InsiderTransaction[] = [];
      
      // Fetch data for first 5 companies (to avoid rate limits)
      for (const symbol of SP500_SYMBOLS.slice(0, 5)) {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=${symbol}&apikey=${apiKey}`
        );
        const data = await response.json();
        
        if (data.data && Array.isArray(data.data)) {
          allTransactions.push(...data.data);
        }
        
        // Respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Sort by date
      allTransactions.sort((a, b) => 
        new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
      );

      setSp500Transactions(allTransactions);
      calculateAggregatedData(allTransactions);
    } catch (err) {
      console.error('Error fetching S&P 500 feed:', err);
    } finally {
      setLoadingFeed(false);
    }
  };

  const calculateAggregatedData = (transactions: InsiderTransaction[]) => {
    const data: AggregatedData = {
      totalBuyValue: 0,
      totalSellValue: 0,
      largestTransaction: transactions[0],
      mostActiveCompany: { symbol: '', transactionCount: 0 },
      recentTrends: []
    };

    // Calculate totals and find largest transaction
    const companyTransactions: { [key: string]: number } = {};
    transactions.forEach(t => {
      const value = parseFloat(t.shares) * parseFloat(t.share_price);
      if (t.acquisition_or_disposal === 'A') {
        data.totalBuyValue += value;
      } else {
        data.totalSellValue += value;
      }

      companyTransactions[t.ticker] = (companyTransactions[t.ticker] || 0) + 1;
      
      if (!data.largestTransaction || 
          (parseFloat(t.shares) * parseFloat(t.share_price)) > 
          (parseFloat(data.largestTransaction.shares) * parseFloat(data.largestTransaction.share_price))) {
        data.largestTransaction = t;
      }
    });

    // Find most active company
    data.mostActiveCompany = Object.entries(companyTransactions)
      .reduce((max, [symbol, count]) => 
        count > max.transactionCount ? { symbol, transactionCount: count } : max,
        { symbol: '', transactionCount: 0 }
      );

    // Calculate recent trends (last 7 days)
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });

    data.recentTrends = last7Days.map(date => ({
      date,
      buyCount: transactions.filter(t => 
        t.transaction_date === date && t.acquisition_or_disposal === 'A'
      ).length,
      sellCount: transactions.filter(t => 
        t.transaction_date === date && t.acquisition_or_disposal === 'D'
      ).length
    }));

    setAggregatedData(data);
  };

  const fetchInsiderTrades = async (ticker: string) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = await getAlphaVantageKey();
      const response = await fetch(
        `https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=${ticker}&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid data format received');
      }

      setTransactions(data.data);
    } catch (err: any) {
      setError(err.message);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSymbol(searchQuery.toUpperCase());
      fetchInsiderTrades(searchQuery.toUpperCase());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: string) => {
    const value = parseFloat(num);
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(value);
  };

  const calculateTotalValue = (shares: string, price: string) => {
    const shareCount = parseFloat(shares);
    const sharePrice = parseFloat(price);
    if (isNaN(shareCount) || isNaN(sharePrice)) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(shareCount * sharePrice);
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
                <Users className="h-4 w-4 text-red-500" />
                <span className="text-sm">Insider Trades</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="relative flex-grow">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter stock symbol (e.g., IBM, AAPL, MSFT)"
                className="bg-gray-900/50 border border-gray-800 rounded-lg py-2 pl-10 pr-4 w-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 flex items-center transition-colors"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </button>
          </form>
        </div>

        {!symbol && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">S&P 500 Insider Trading Overview</h2>
            
            {loadingFeed ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
              </div>
            ) : aggregatedData && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Buy Volume</h3>
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-green-500">
                      ${(aggregatedData.totalBuyValue / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Last 7 days</p>
                  </div>

                  <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Sell Volume</h3>
                      <ArrowDownRight className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-3xl font-bold text-red-500">
                      ${(aggregatedData.totalSellValue / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-gray-400 mt-2">Last 7 days</p>
                  </div>

                  <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Most Active</h3>
                      <Activity className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-3xl font-bold">{aggregatedData.mostActiveCompany.symbol}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {aggregatedData.mostActiveCompany.transactionCount} transactions
                    </p>
                  </div>

                  <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Largest Trade</h3>
                      <DollarSign className="h-5 w-5 text-red-500" />
                    </div>
                    <p className="text-xl font-bold">
                      {calculateTotalValue(
                        aggregatedData.largestTransaction.shares,
                        aggregatedData.largestTransaction.share_price
                      )}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {aggregatedData.largestTransaction.ticker}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/30 rounded-lg border border-gray-800">
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">Recent S&P 500 Insider Transactions</h2>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">
                          <Clock className="h-4 w-4 inline mr-2" />
                          Last Updated: {new Date().toLocaleTimeString()}
                        </span>
                        <button 
                          onClick={fetchSP500Feed}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <TrendingUp className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Company</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Executive</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {sp500Transactions.slice(0, 10).map((transaction, index) => (
                          <tr key={index} className="hover:bg-gray-900/30">
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {formatDate(transaction.transaction_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {transaction.ticker}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {transaction.executive}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {transaction.executive_title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center ${
                                transaction.acquisition_or_disposal === 'A' 
                                  ? 'text-green-500' 
                                  : 'text-red-500'
                              }`}>
                                {transaction.acquisition_or_disposal === 'A' ? (
                                  <ArrowUpRight className="h-4 w-4 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4 mr-1" />
                                )}
                                {transaction.acquisition_or_disposal === 'A' ? 'Buy' : 'Sell'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {calculateTotalValue(transaction.shares, transaction.share_price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        )}

        {symbol && !loading && transactions.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Transactions</h3>
                  <TrendingUp className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-3xl font-bold">{transactions.length}</p>
                <p className="text-sm text-gray-400 mt-2">Recent insider activities</p>
              </div>

              <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Latest Transaction</h3>
                  <Calendar className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-xl font-bold">{formatDate(transactions[0].transaction_date)}</p>
                <p className="text-sm text-gray-400 mt-2">{transactions[0].executive_title}</p>
              </div>

              <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Trading Activity</h3>
                  <DollarSign className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">
                    {transactions.filter(t => t.acquisition_or_disposal === 'A').length} Buys
                  </span>
                  <span className="text-gray-400">/</span>
                  <span className="text-red-500">
                    {transactions.filter(t => t.acquisition_or_disposal === 'D').length} Sells
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Last 30 days</p>
              </div>
            </div>

            <div className="bg-gray-900/30 rounded-lg border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Recent Insider Transactions</h2>
                  <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Executive</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Shares</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-900/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {formatDate(transaction.transaction_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {transaction.executive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {transaction.executive_title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center ${
                            transaction.acquisition_or_disposal === 'A' 
                              ? 'text-green-500' 
                              : 'text-red-500'
                          }`}>
                            {transaction.acquisition_or_disposal === 'A' ? (
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                            )}
                            {transaction.acquisition_or_disposal === 'A' ? 'Buy' : 'Sell'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {formatNumber(transaction.shares)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ${formatNumber(transaction.share_price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {calculateTotalValue(transaction.shares, transaction.share_price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {!loading && !error && !symbol && !loadingFeed && (
          <div className="flex flex-col items-center justify-center py-16">
            <Users className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Track Insider Trading Activity</h2>
            <p className="text-gray-400 text-center max-w-md mb-6">
              Monitor insider transactions across S&P 500 companies or search for specific stocks to view detailed trading activity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsiderTradesPage;