// mockApi.ts - Simplified API service with mock data for Wire84 dashboard
import contractsData from './data/defense_contracts_data.json';

// Helper function to parse currency string to number
const parseCurrency = (value: string) => {
  if (value === 'N/A') return 0;
  return parseInt(value.replace(/[$,]/g, ''));
};

// Parse contract data from government_contracts
const parseContractData = (contract: any) => {
  return {
    date: contract.contract_date,
    agency: contract.agency,
    contractor: contract.contractor,
    amount: parseCurrency(contract.contract_value),
    description: contract.text,
    location: contract.location,
    text: contract.text,
    completionDate: new Date(new Date(contract.contract_date).setFullYear(2027)).toISOString().split('T')[0]
  };
};

// Parse contracts
const mockContracts = contractsData.government_contracts
  .filter(contract => contract.contract_value !== 'N/A')
  .map(parseContractData);

// Mock news feed
const mockNewsFeed = contractsData.news_feed;

// Mock analytics data
const mockAnalytics = {
  totalValue: mockContracts.reduce((sum, contract) => sum + contract.amount, 0),
  agencyBreakdown: Object.entries(
    mockContracts.reduce((acc: { [key: string]: number }, contract) => {
      acc[contract.agency] = (acc[contract.agency] || 0) + contract.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value })),
  topContractors: Object.entries(
    mockContracts.reduce((acc: { [key: string]: number }, contract) => {
      acc[contract.contractor] = (acc[contract.contractor] || 0) + contract.amount;
      return acc;
    }, {})
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5),
  contractsByDate: Object.entries(
    mockContracts.reduce((acc: { [key: string]: { value: number; count: number } }, contract) => {
      if (!acc[contract.date]) {
        acc[contract.date] = { value: 0, count: 0 };
      }
      acc[contract.date].value += contract.amount;
      acc[contract.date].count += 1;
      return acc;
    }, {})
  ).map(([date, data]) => ({ date, ...data })),
  recentLargeContracts: mockContracts
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 2)
    .map(contract => ({
      date: contract.date,
      agency: contract.agency,
      contractor: contract.contractor,
      amount: contract.amount,
      description: contract.description
    }))
};

// Mock API service that simulates server responses
export const mockApi = {
  // Auth API
  auth: {
    login: async (email: string, password: string) => {
      // For demo, any credentials will work
      return {
        token: 'mock_token_12345',
        user: {
          id: 'user123',
          email: 'investor@wire84.com',
          name: 'John Investor',
          role: 'user'
        }
      };
    },
    
    register: async (userData: any) => {
      return {
        token: 'mock_token_12345',
        user: {
          id: 'new_user',
          email: userData.email,
          name: userData.name,
          role: 'user'
        }
      };
    },
    
    logout: () => {
      // Just a stub for the mock API
      return;
    },
    
    isAuthenticated: () => {
      // Always return true for the mock API
      return true;
    },
    
    getCurrentUser: async () => {
      return {
        id: 'user123',
        email: 'investor@wire84.com',
        name: 'John Investor',
        role: 'user'
      };
    }
  },
  
  // Contracts API
  contracts: {
    getContracts: async (params: any = {}) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filtered = [...mockContracts];
      
      // Apply agency filter
      if (params.agency) {
        filtered = filtered.filter(contract => contract.agency === params.agency);
      }
      
      // Apply search filter
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(contract => 
          contract.contractor.toLowerCase().includes(searchLower) ||
          contract.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply min amount filter
      if (params.minAmount) {
        filtered = filtered.filter(contract => contract.amount >= parseFloat(params.minAmount));
      }
      
      // Apply max amount filter
      if (params.maxAmount) {
        filtered = filtered.filter(contract => contract.amount <= parseFloat(params.maxAmount));
      }
      
      // Apply date filters
      if (params.startDate) {
        const startDate = new Date(params.startDate);
        filtered = filtered.filter(contract => new Date(contract.date) >= startDate);
      }
      
      if (params.endDate) {
        const endDate = new Date(params.endDate);
        filtered = filtered.filter(contract => new Date(contract.date) <= endDate);
      }
      
      // Apply sorting
      const sort = params.sort || 'date';
      const order = params.order === 'asc' ? 1 : -1;
      
      filtered.sort((a, b) => {
        if (sort === 'date') {
          return order * (new Date(b.date).getTime() - new Date(a.date).getTime());
        } else if (sort === 'amount') {
          return order * (b.amount - a.amount);
        } else {
          return order * (a[sort as keyof typeof a] as string).localeCompare(b[sort as keyof typeof b] as string);
        }
      });
      
      // Apply pagination
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 20;
      const total = filtered.length;
      const pages = Math.ceil(total / limit);
      const skip = (page - 1) * limit;
      
      return {
        contracts: filtered.slice(skip, skip + limit),
        pagination: {
          total,
          page,
          pages,
          limit
        }
      };
    },
    
    getContract: async (id: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // For demo, just return the first contract
      return mockContracts[0];
    },
    
    getAnalytics: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      return mockAnalytics;
    },
    
    getTrending: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        trendingContractors: [
          {
            name: 'Applied Technology Inc.',
            currentValue: 243909635,
            previousValue: 120000000,
            growth: 103.26,
            countGrowth: 100
          },
          {
            name: 'Lockheed Martin Corp.',
            currentValue: 213001070,
            previousValue: 180000000,
            growth: 18.33,
            countGrowth: 33.33
          }
        ],
        newContractors: [
          {
            name: 'Lawelawe Technology Services LLC',
            value: 10386669,
            count: 1,
            firstSeen: '2025-03-17'
          }
        ]
      };
    }
  },
  
  // News API
  news: {
    getNews: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return { news: mockNewsFeed };
    }
  }
};

export default mockApi;