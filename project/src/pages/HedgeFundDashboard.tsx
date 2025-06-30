import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';
import { Landmark, ArrowLeft } from 'lucide-react';
import EyeLogo from '../components/EyeLogo';

const HedgeFundDashboard = () => {
  // Dataset with processed numeric values and additional fields
  const data = [
    { rank: 1, managerName: "Chris Hohn", fundName: "TCI Fund Management", earnings: 2.9, returns: 33, aum: null, description: "London-based Hohn tops this year's Rich List after his highly concentrated, mostly long portfolio surged 33 percent, its largest gain in four years. The strong performance more than erased 2022's 18 percent loss. In 2023, TCI generated $12.9 billion in gains for its investors, more than any other firm.", keyHoldings: ["Alphabet", "Moody's", "Visa"], strategy: "Concentrated Long, Activist" },
    { rank: 2, managerName: "Israel Englander", fundName: "Millennium Management", earnings: 2.8, returns: 10, aum: 62.2, description: "Millennium is rarely the best multistrategy performer, but it continues to post returns that rank near the top of the strategy. It gained about 10 percent in 2023. Millennium has more than 320 investment teams managing $62.2 billion in four major strategies.", keyHoldings: [], strategy: "Multi-Strategy" },
    { rank: 3, managerName: "Kenneth Griffin", fundName: "Citadel", earnings: 2.6, returns: 15.3, aum: null, description: "Griffin ranked third among the highest-earning hedge fund managers in 2023, and Citadel generated $8.1 billion for investors. All four of its main funds posted double-digit gains in 2023: The flagship Wellington fund jumped 15.3 percent.", keyHoldings: [], strategy: "Multi-Strategy" },
    { rank: 4, managerName: "David Tepper", fundName: "Appaloosa Management", earnings: 2.3, returns: 18, aum: 17, description: "Tepper qualified for the Rich List for the 20th time after racking up a better than 18 percent gain. That performance was driven by four Magnificent Seven stocks: Nvidia, Meta Platforms, Microsoft, and Amazon.", keyHoldings: ["Nvidia", "Meta Platforms", "Microsoft", "Amazon"], strategy: "Opportunistic" },
    { rank: 5, managerName: "Steven Cohen", fundName: "Point72 Asset Management", earnings: 1.6, returns: 10.6, aum: 32.3, description: "Point72 gained 10.6 percent, making it one of the top-performing multistrat funds. It has more than 185 money management teams overseeing more than $32.3 billion.", keyHoldings: ["Nvidia", "Microsoft", "Amazon", "Meta"], strategy: "Multi-Strategy" },
    { rank: 6, managerName: "Philippe Laffont", fundName: "Coatue Management", earnings: 1.4, returns: 21.5, aum: null, description: "Coatue gained 21.5 percent in 2023, with its long-only fund surging 55 percent as the equity markets rebounded. Six of its ten largest U.S.-listed longs at the end of the third quarter and five of its top seven at year-end were Magnificent Seven members.", keyHoldings: ["Nvidia", "Meta", "Amazon"], strategy: "Long/Short Equity, Tiger Cub" },
    { rank: 7, managerName: "James Simons", fundName: "Renaissance Technologies", earnings: 1.3, returns: 7.5, aum: null, description: "Last year was a rough one for Renaissance's public computer-driven hedge funds. RIDA lost 70 basis points and RIDGE was essentially flat, although RIEF gained 7.5 percent.", keyHoldings: [], strategy: "Quantitative" },
    { rank: 8, managerName: "John Overdeck & David Siegel", fundName: "Two Sigma", earnings: 1.2, returns: 12, aum: 60, description: "Two Sigma Absolute Return Enhanced fund, a mostly systematic equity market-neutral fund, rose 12 percent and the firm's equity quant fund, Two Sigma Spectrum, was up 8.6 percent.", keyHoldings: [], strategy: "Quantitative, Systematic" },
    { rank: 10, managerName: "Chase Coleman", fundName: "Tiger Global Management", earnings: 1.1, returns: 28.5, aum: null, description: "Last year, Tiger Global posted a 28.5 percent increase in its long-short fund and a 20.4 percent return in the long-only fund. But this performance still left many clients in the red after the long-short fund lost 56 percent in 2022.", keyHoldings: ["Meta", "Microsoft", "Alphabet", "Amazon", "Nvidia"], strategy: "Long/Short Equity, Tiger Cub" },
    { rank: 11, managerName: "O. Andreas Halvorsen", fundName: "Viking Global Investors", earnings: 1.0, returns: 13.8, aum: null, description: "Viking Global Equities, the firm's long-short fund, gained 13.8 percent in 2023 after losing just 2.4 percent in 2022. Viking Long Fund, meanwhile, surged 29.3 percent last year.", keyHoldings: ["Visa", "Workday", "UPS"], strategy: "Long/Short Equity, Tiger Cub" },
    { rank: 12, managerName: "William Ackman", fundName: "Pershing Square Capital Management", earnings: 0.9, returns: 26.3, aum: null, description: "Ackman generated a 26.3 percent return in 2023 — after losing 8.8 percent the previous year — despite mostly eschewing the tech and internet-related stocks that drove the market for more than a year.", keyHoldings: ["Alphabet", "Chipotle", "Hilton", "Lowe's", "Restaurant Brands"], strategy: "Activist, Concentrated" },
    { rank: 13, managerName: "David Shaw", fundName: "D.E. Shaw Group", earnings: 0.75, returns: 9.6, aum: 60, description: "D.E. Shaw Composite Fund, the firm's largest multistrategy fund, gained 9.6 percent in 2023. Oculus Fund, a macro-oriented multistrategy offering and D.E. Shaw's second-largest strategy, returned an estimated 7.8 percent.", keyHoldings: [], strategy: "Multi-Strategy, Quantitative" },
    { rank: 14, managerName: "Paul Singer", fundName: "Elliott Management", earnings: 0.735, returns: 4.7, aum: 65.5, description: "Elliott posted a modest 4.7 percent gain last year. But that extended the multistrategy firm's impressive streak of no down years since the financial crisis in 2008, when it dropped only 3 percent.", keyHoldings: ["Crown Castle", "BioMarin"], strategy: "Multi-Strategy, Activist" },
    { rank: 15, managerName: "Scott Shleifer", fundName: "Tiger Global Management", earnings: 0.7, returns: null, aum: null, description: "Scott Shleifer was celebrated for years for his role as a co-founder of Tiger Global's private equity business. Late last year, firm founder Chase Coleman announced that Shleifer would transition to senior adviser at the firm while remaining a partner.", keyHoldings: [], strategy: "Private Equity, Tiger Cub" },
    { rank: 16, managerName: "Karthik Sarma", fundName: "SRS Investment Management", earnings: 0.6, returns: 25.4, aum: null, description: "Car rental giant Avis Budget Group accounted for roughly half of SRS's U.S.-listed assets for most of last year, but it didn't drive the Tiger Global alum's 25.4 percent gain as it was up just over 10 percent in 2023.", keyHoldings: ["Avis Budget Group", "Netflix", "Meta"], strategy: "Concentrated, Tiger Cub" },
    { rank: 17, managerName: "Stephen Mandel Jr.", fundName: "Lone Pine Capital", earnings: 0.5, returns: 19, aum: null, description: "Lone Pine's long-short fund rose 19 percent last year after losing 36 percent in 2022 and 7 percent in 2021. The long-only fund jumped 32 percent after dropping 42 percent in 2022.", keyHoldings: ["Meta", "Amazon", "Microsoft"], strategy: "Long/Short Equity, Tiger Cub" },
    { rank: 18, managerName: "Ray Dalio", fundName: "Bridgewater Associates", earnings: 0.4, returns: -7.6, aum: null, description: "Last year, Pure Alpha II's 7.6 percent loss marred stronger performance elsewhere at the firm. Dalio is no longer running the quantitatively driven macro giant he founded in 1975.", keyHoldings: [], strategy: "Macro, Quantitative" },
    { rank: 19, managerName: "Chris Rokos", fundName: "Rokos Capital Management", earnings: 0.35, returns: 8.8, aum: 16, description: "Rokos's fund was down more than 15 percent at one point in March 2023 after losing money from bets on short-term interest rates when several U.S. financial institutions failed. He finished the year up 8.8 percent.", keyHoldings: [], strategy: "Macro" },
    { rank: 20, managerName: "Larry Robbins", fundName: "Glenview Capital Management", earnings: 0.33, returns: 17.4, aum: null, description: "After gaining 14 percent in the first half of 2023, it was down 1.5 percent as late as the end of October. But a two-month surge at year-end put the flagship Glenview Capital Partners fund up 17.4 percent for the year.", keyHoldings: ["Tenet Healthcare", "Universal Health Services", "Global Payments", "DXC Technology", "Alight"], strategy: "Long/Short Equity" },
    { rank: 21, managerName: "Nelson Peltz", fundName: "Trian Fund Management", earnings: 0.325, returns: 10, aum: null, description: "Peltz and Trian have been in the spotlight over the past few months for their nasty proxy fight with entertainment giant Disney, the firm's largest investment. Trian gained 10 percent in 2023 after losing a bit more than that in 2022.", keyHoldings: ["Disney", "Ferguson", "Janus Henderson"], strategy: "Activist" },
    { rank: 22, managerName: "Anthony Clake", fundName: "Marshall Wace", earnings: 0.32, returns: 7.7, aum: 62.2, description: "Clake qualifies for the Rich List for the second straight year after Marshall Wace's Trade Optimized Portfolio System posted a 7.7 percent gain in 2023.", keyHoldings: [], strategy: "Systematic" },
    { rank: 23, managerName: "Joseph Edelman", fundName: "Perceptive Advisors", earnings: 0.275, returns: 26, aum: null, description: "Perceptive seemed well on its way to suffering its third straight significant losing year when it was down more than 9 percent at the end of October. But the life sciences specialist finished the year up 26 percent.", keyHoldings: ["Amicus Therapeutics", "Cerevel Therapeutics"], strategy: "Long/Short Equity, Healthcare" },
    { rank: 24, managerName: "Paul Marshall & Ian Wace", fundName: "Marshall Wace", earnings: 0.25, returns: 7.6, aum: 62, description: "Marshall and Wace made the Rich List for the third straight year after their equity-driven Eureka fund climbed 4.6 percent and Global Opportunity rose 7.6 percent, in addition to a 7.7 percent gain for TOPS.", keyHoldings: [], strategy: "Long/Short Equity, Systematic" }
  ];

  // Strategy data for analysis
  const strategyData = [
    { strategy: "Long/Short Equity", count: 7 },
    { strategy: "Tiger Cub", count: 6 },
    { strategy: "Multi-Strategy", count: 5 },
    { strategy: "Activist", count: 4 },
    { strategy: "Quantitative", count: 4 }
  ];

  // Top holdings data
  const holdingsData = [
    { holding: "Amazon", count: 5 },
    { holding: "Meta", count: 5 },
    { holding: "Nvidia", count: 4 },
    { holding: "Microsoft", count: 4 },
    { holding: "Alphabet", count: 3 }
  ];

  // Strategy returns data
  const strategyReturnsData = [
    { strategy: "Concentrated Long", avgReturn: 33, count: 1 },
    { strategy: "Healthcare", avgReturn: 26, count: 1 },
    { strategy: "Concentrated", avgReturn: 25.9, count: 2 },
    { strategy: "Activist", avgReturn: 18.5, count: 4 },
    { strategy: "Opportunistic", avgReturn: 18, count: 1 }
  ].sort((a, b) => b.avgReturn - a.avgReturn);

  const [view, setView] = useState('earnings');
  const [selectedManager, setSelectedManager] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Top 10 managers by earnings or returns
  const topManagers = [...data]
    .sort((a, b) => b[view] - a[view])
    .filter((item, index) => index < 10 && item[view] !== null);

  // Sort function for the table
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] === null) return 1;
    if (b[sortConfig.key] === null) return -1;
    
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] < b[sortConfig.key] ? -1 : 1;
    } else {
      return a[sortConfig.key] > b[sortConfig.key] ? -1 : 1;
    }
  });

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
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
                <Landmark className="h-4 w-4 text-red-500" />
                <span className="text-sm">Hedge Fund Monitor</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Top Hedge Fund Managers 2023</h1>
          <p className="text-gray-400">Analysis of performance, strategies, and holdings for the top hedge fund managers</p>
        </div>

        {/* Performance Chart */}
        <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Manager Performance</h2>
            <select 
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm"
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              <option value="earnings">Earnings ($ Billions)</option>
              <option value="returns">Returns (%)</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topManagers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="managerName" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80}
                  interval={0}
                  stroke="#9ca3af"
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar 
                  dataKey={view} 
                  fill={view === 'earnings' ? "#ef4444" : "#10b981"}
                  name={view === 'earnings' ? 'Earnings ($ Billions)' : 'Returns (%)'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Strategy Distribution */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Strategy Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={strategyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="strategy"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {strategyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Holdings */}
          <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Most Common Holdings</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={holdingsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis 
                    dataKey="holding" 
                    type="category" 
                    stroke="#9ca3af"
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="count" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Manager Table */}
        <div className="bg-gray-900/30 rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold">Manager Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900/50">
                <tr>
                  {['Rank', 'Manager', 'Fund', 'Earnings ($B)', 'Returns (%)', 'Strategy', 'Details'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-300"
                      onClick={() => requestSort(header.toLowerCase())}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {sortedData.map((manager) => (
                  <tr key={manager.rank} className="hover:bg-gray-900/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{manager.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{manager.managerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{manager.fundName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${manager.earnings.toFixed(1)}B</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={manager.returns >= 0 ? "text-green-500" : "text-red-500"}>
                        {manager.returns !== null ? `${manager.returns}%` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{manager.strategy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => setSelectedManager(manager)}
                        className="text-red-500 hover:text-red-400"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manager Detail Modal */}
        {selectedManager && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedManager.managerName}</h3>
                <button 
                  onClick={() => setSelectedManager(null)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4">
                <p className="text-gray-400">Fund: {selectedManager.fundName}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-400">Rank</p>
                    <p className="font-medium">{selectedManager.rank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Earnings</p>
                    <p className="font-medium">${selectedManager.earnings.toFixed(1)}B</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Returns</p>
                    <p className={selectedManager.returns >= 0 ? "font-medium text-green-500" : "font-medium text-red-500"}>
                      {selectedManager.returns !== null ? `${selectedManager.returns}%` : 'N/A'}
                    </p>
                  </div>
                  {selectedManager.aum && (
                    <div>
                      <p className="text-sm text-gray-400">AUM</p>
                      <p className="font-medium">${selectedManager.aum}B</p>
                    </div>
                  )}
                </div>
              </div>
              {selectedManager.keyHoldings && selectedManager.keyHoldings.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Key Holdings</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedManager.keyHoldings.map((holding, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm">
                        {holding}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-400">{selectedManager.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HedgeFundDashboard;