// mockApi.js - Simplified API service with mock data for Wire84 dashboard

// Mock contract data
const mockContracts = [
  {
    date: '2025-03-15',
    agency: 'ARMY',
    contractor: 'Lockheed Martin Corp.',
    amount: 450000000,
    description: 'Advanced missile defense systems for deployment in Eastern Europe',
    location: 'Orlando, Florida',
    completionDate: '2028-06-30'
  },
  {
    date: '2025-03-14',
    agency: 'NAVY',
    contractor: 'Northrop Grumman Systems Corp.',
    amount: 286500000,
    description: 'Development of next-generation submarine detection systems',
    location: 'San Diego, California',
    completionDate: '2027-12-31'
  },
  {
    date: '2025-03-14',
    agency: 'AIR FORCE',
    contractor: 'Boeing Defense, Space & Security',
    amount: 1240000000,
    description: 'Production of 15 F-15EX Eagle II fighter aircraft',
    location: 'St. Louis, Missouri',
    completionDate: '2027-09-30'
  },
  {
    date: '2025-03-13',
    agency: 'DEFENSE LOGISTICS AGENCY',
    contractor: 'General Dynamics Land Systems',
    amount: 750000000,
    description: 'Maintenance and upgrade services for Abrams battle tanks',
    location: 'Sterling Heights, Michigan',
    completionDate: '2030-03-12'
  },
  {
    date: '2025-03-12',
    agency: 'MISSILE DEFENSE AGENCY',
    contractor: 'Raytheon Technologies',
    amount: 380000000,
    description: 'Production of SM-3 Block IIA interceptors',
    location: 'Tucson, Arizona',
    completionDate: '2026-09-30'
  },
  {
    date: '2025-03-12',
    agency: 'SPACE FORCE',
    contractor: 'SpaceX',
    amount: 290000000,
    description: 'Launch services for military satellites',
    location: 'Hawthorne, California',
    completionDate: '2026-12-31'
  },
  {
    date: '2025-03-11',
    agency: 'DARPA',
    contractor: 'Palantir Technologies',
    amount: 175000000,
    description: 'Advanced AI-driven battlefield data analysis platform',
    location: 'Denver, Colorado',
    completionDate: '2027-03-10'
  },
  {
    date: '2025-03-10',
    agency: 'NAVY',
    contractor: 'HII Newport News Shipbuilding',
    amount: 2850000000,
    description: 'Construction of CVN-81 aircraft carrier components',
    location: 'Newport News, Virginia',
    completionDate: '2032-12-31'
  },
  {
    date: '2025-03-10',
    agency: 'ARMY',
    contractor: 'L3Harris Technologies',
    amount: 420000000,
    description: 'Tactical radio communication systems',
    location: 'Rochester, New York',
    completionDate: '2028-01-31'
  },
  {
    date: '2025-03-07',
    agency: 'DEFENSE HEALTH AGENCY',
    contractor: 'Leidos Inc.',
    amount: 195000000,
    description: 'Military healthcare information technology services',
    location: 'Falls Church, Virginia',
    completionDate: '2030-03-06'
  }
];

// Mock analytics data
const mockAnalytics = {
  totalValue: 7036500000,
  agencyBreakdown: [
    { name: 'NAVY', value: 3136500000 },
    { name: 'AIR FORCE', value: 1240000000 },
    { name: 'ARMY', value: 870000000 },
    { name: 'DEFENSE LOGISTICS AGENCY', value: 750000000 },
    { name: 'MISSILE DEFENSE AGENCY', value: 380000000 },
    { name: 'SPACE FORCE', value: 290000000 },
    { name: 'DEFENSE HEALTH AGENCY', value: 195000000 },
    { name: 'DARPA', value: 175000000 }
  ],
  topContractors: [
    { name: 'HII Newport News Shipbuilding', value: 2850000000 },
    { name: 'Boeing Defense, Space & Security', value: 1240000000 },
    { name: 'General Dynamics Land Systems', value: 750000000 },
    { name: 'Lockheed Martin Corp.', value: 450000000 },
    { name: 'L3Harris Technologies', value: 420000000 }
  ],
  contractsByDate: [
    { date: '2025-03-07', value: 195000000, count: 1 },
    { date: '2025-03-10', value: 3270000000, count: 2 },
    { date: '2025-03-11', value: 175000000, count: 1 },
    { date: '2025-03-12', value: 670000000, count: 2 },
    { date: '2025-03-13', value: 750000000, count: 1 },
    { date: '2025-03-14', value: 1526500000, count: 2 },
    { date: '2025-03-15', value: 450000000, count: 1 }
  ],
  recentLargeContracts: [
    {
      date: '2025-03-10',
      agency: 'NAVY',
      contractor: 'HII Newport News Shipbuilding',
      amount: 2850000000,
      description: 'Construction of CVN-81 aircraft carrier components'
    },
    {
      date: '2025-03-14',
      agency: 'AIR FORCE',
      contractor: 'Boeing Defense, Space & Security',
      amount: 1240000000,
      description: 'Production of 15 F-15EX Eagle II fighter aircraft'
    }
  ]
};

// Mock alerts
const mockAlerts = [
  {
    date: '2025-03-16',
    agency: 'NAVY',
    contractor: 'Electric Boat Corporation',
    amount: 1850000000,
    description: 'Development of next-generation submarine propulsion systems'
  },
  {
    date: '2025-03-15',
    agency: 'ARMY',
    contractor: 'Lockheed Martin Corp.',
    amount: 450000000,
    description: 'Advanced missile defense systems for deployment in Eastern Europe'
  },
  {
    date: '2025-03-15',
    agency: 'AIR FORCE',
    contractor: 'Northrop Grumman Systems Corp.',
    amount: 325000000,
    description: 'Advanced sensor suite development for reconnaissance aircraft'
  }
];

// Mock contractors data
const mockContractors = [
  {
    name: 'HII Newport News Shipbuilding',
    totalContracts: 12,
    totalValue: 5650000000,
    lastContractDate: '2025-03-10',
    locations: ['Newport News, Virginia', 'Pascagoula, Mississippi'],
    agencies: ['NAVY']
  },
  {
    name: 'Boeing Defense, Space & Security',
    totalContracts: 8,
    totalValue: 3240000000,
    lastContractDate: '2025-03-14',
    locations: ['St. Louis, Missouri', 'Seattle, Washington'],
    agencies: ['AIR FORCE', 'NAVY', 'SPACE FORCE']
  },
  {
    name: 'Lockheed Martin Corp.',
    totalContracts: 15,
    totalValue: 2850000000,
    lastContractDate: '2025-03-15',
    locations: ['Orlando, Florida', 'Fort Worth, Texas', 'Bethesda, Maryland'],
    agencies: ['ARMY', 'AIR FORCE', 'MISSILE DEFENSE AGENCY']
  },
  {
    name: 'General Dynamics Land Systems',
    totalContracts: 5,
    totalValue: 1950000000,
    lastContractDate: '2025-03-13',
    locations: ['Sterling Heights, Michigan', 'Lima, Ohio'],
    agencies: ['ARMY', 'DEFENSE LOGISTICS AGENCY']
  },
  {
    name: 'Raytheon Technologies',
    totalContracts: 9,
    totalValue: 1870000000,
    lastContractDate: '2025-03-12',
    locations: ['Tucson, Arizona', 'Waltham, Massachusetts'],
    agencies: ['MISSILE DEFENSE AGENCY', 'NAVY', 'AIR FORCE']
  }
];

// Mock agencies data
const mockAgencies = [
  { name: 'NAVY', totalContracts: 24, totalValue: 3136500000, latestDate: '2025-03-16' },
  { name: 'AIR FORCE', totalContracts: 18, totalValue: 1240000000, latestDate: '2025-03-15' },
  { name: 'ARMY', totalContracts: 22, totalValue: 870000000, latestDate: '2025-03-15' },
  { name: 'DEFENSE LOGISTICS AGENCY', totalContracts: 8, totalValue: 750000000, latestDate: '2025-03-13' },
  { name: 'MISSILE DEFENSE AGENCY', totalContracts: 5, totalValue: 380000000, latestDate: '2025-03-12' },
  { name: 'SPACE FORCE', totalContracts: 4, totalValue: 290000000, latestDate: '2025-03-12' },
  { name: 'DEFENSE HEALTH AGENCY', totalContracts: 7, totalValue: 195000000, latestDate: '2025-03-07' },
  { name: 'DARPA', totalContracts: 6, totalValue: 175000000, latestDate: '2025-03-11' }
];

// Mock user data
const mockUser = {
  id: 'user123',
  email: 'investor@wire84.com',
  name: 'John Investor',
  role: 'user',
  alertSettings: {
    contractors: ['Lockheed Martin Corp.', 'Northrop Grumman Systems Corp.'],
    agencies: ['NAVY', 'SPACE FORCE'],
    minAmount: 300000000,
    enabled: true
  }
};

// Helper functions to simulate filtering based on query params
const filterContracts = (params = {}) => {
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
      return order * (new Date(b.date) - new Date(a.date));
    } else if (sort === 'amount') {
      return order * (b.amount - a.amount);
    } else {
      return order * a[sort].localeCompare(b[sort]);
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
};

// Mock API service that simulates server responses
export const mockApi = {
  // Auth API
  auth: {
    login: async (email, password) => {
      // For demo, any credentials will work
      return {
        token: 'mock_token_12345',
        user: { ...mockUser }
      };
    },
    
    register: async (userData) => {
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
      return { ...mockUser };
    }
  },
  
  // Contracts API
  contracts: {
    getContracts: async (params = {}) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return filterContracts(params);
    },
    
    getContract: async (id) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // For demo, just return the first contract
      return mockContracts[0];
    },
    
    getAnalytics: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      return { ...mockAnalytics };
    },
    
    getTrending: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        trendingContractors: [
          {
            name: 'SpaceX',
            currentValue: 290000000,
            previousValue: 120000000,
            growth: 141.67,
            countGrowth: 100
          },
          {
            name: 'Lockheed Martin Corp.',
            currentValue: 450000000,
            previousValue: 280000000,
            growth: 60.71,
            countGrowth: 33.33
          }
        ],
        newContractors: [
          {
            name: 'Electric Boat Corporation',
            value: 1850000000,
            count: 1,
            firstSeen: '2025-03-16'
          }
        ]
      };
    }
  },
  
  // Contractors API
  contractors: {
    getContractors: async (params = {}) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      let filtered = [...mockContractors];
      
      // Apply search filter
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(contractor => 
          contractor.name.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply min contracts filter
      if (params.minContracts) {
        filtered = filtered.filter(contractor => 
          contractor.totalContracts >= parseInt(params.minContracts)
        );
      }
      
      // Apply sorting
      const sort = params.sort || 'totalValue';
      const order = params.order === 'asc' ? 1 : -1;
      
      filtered.sort((a, b) => {
        if (typeof a[sort] === 'number') {
          return order * (b[sort] - a[sort]);
        } else {
          return order * a[sort].localeCompare(b[sort]);
        }
      });
      
      // Apply pagination
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 20;
      const total = filtered.length;
      const pages = Math.ceil(total / limit);
      const skip = (page - 1) * limit;
      
      return {
        contractors: filtered.slice(skip, skip + limit),
        pagination: {
          total,
          page,
          pages,
          limit
        }
      };
    },
    
    getContractor: async (name) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const contractor = mockContractors.find(c => 
        c.name.toLowerCase() === name.toLowerCase()
      );
      
      if (!contractor) {
        throw new Error('Contractor not found');
      }
      
      // Add additional data for contractor detail view
      return {
        ...contractor,
        recentContracts: mockContracts
          .filter(c => c.contractor === contractor.name)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5),
        contractHistory: [
          { year: 2023, totalValue: 2100000000, count: 5 },
          { year: 2024, totalValue: 3200000000, count: 8 },
          { year: 2025, totalValue: contractor.totalValue, count: contractor.totalContracts }
        ],
        agencyDistribution: contractor.agencies.map(agency => ({
          agency,
          totalValue: mockContracts
            .filter(c => c.contractor === contractor.name && c.agency === agency)
            .reduce((sum, c) => sum + c.amount, 0),
          count: mockContracts
            .filter(c => c.contractor === contractor.name && c.agency === agency)
            .length
        }))
      };
    }
  },
  
  // Agencies API
  agencies: {
    getAgencies: async (params = {}) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Apply sorting
      const sort = params.sort || 'totalValue';
      const order = params.order === 'asc' ? 1 : -1;
      
      const sorted = [...mockAgencies].sort((a, b) => {
        if (typeof a[sort] === 'number') {
          return order * (b[sort] - a[sort]);
        } else {
          return order * a[sort].localeCompare(b[sort]);
        }
      });
      
      return { agencies: sorted };
    },
    
    getAgency: async (name) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const agency = mockAgencies.find(a => 
        a.name.toLowerCase() === name.toLowerCase()
      );
      
      if (!agency) {
        throw new Error('Agency not found');
      }
      
      // Add additional data for agency detail view
      return {
        ...agency,
        recentContracts: mockContracts
          .filter(c => c.agency === agency.name)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5),
        topContractors: mockContractors
          .filter(c => c.agencies.includes(agency.name))
          .map(c => ({
            contractor: c.name,
            totalValue: mockContracts
              .filter(contract => contract.contractor === c.name && contract.agency === agency.name)
              .reduce((sum, contract) => sum + contract.amount, 0),
            count: mockContracts
              .filter(contract => contract.contractor === c.name && contract.agency === agency.name)
              .length
          }))
          .sort((a, b) => b.totalValue - a.totalValue)
          .slice(0, 5),
        contractHistory: [
          { date: '2025-01', totalValue: 640000000, count: 3 },
          { date: '2025-02', totalValue: 890000000, count: 4 },
          { date: '2025-03', totalValue: agency.totalValue, count: agency.totalContracts }
        ]
      };
    }
  },
  
  // Alerts API
  alerts: {
    getAlerts: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return { alertSettings: mockUser.alertSettings };
    },
    
    updateAlerts: async (alertSettings) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update the mock user's alert settings
      mockUser.alertSettings = {
        ...mockUser.alertSettings,
        ...alertSettings
      };
      
      return { alertSettings: mockUser.alertSettings };
    },
    
    getAlertMatches: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return { matches: mockAlerts };
    }
  }
};

export default mockApi;