export const defenseIndustryData = {
  budget: {
    total: 895.2,
    year: 2025,
    breakdown: {
      rdte: 145.8,
      cybersecurity: 14.0,
      ai: 1.8,
      modernization: 78.5
    }
  },
  
  topContractors: [
    {
      name: "Lockheed Martin",
      revenue: 72.5,
      specialties: ["F-35 fighter jet", "missile systems", "space technology"],
      recentContracts: 18.2
    },
    {
      name: "RTX",
      revenue: 40.6,
      specialties: ["missile systems", "integrated defense", "advanced sensors"],
      recentContracts: 12.4
    },
    {
      name: "Northrop Grumman",
      revenue: 35.2,
      specialties: ["nuclear modernization", "B-21 Raider", "space systems"],
      recentContracts: 15.8
    },
    {
      name: "General Dynamics",
      revenue: 33.7,
      specialties: ["combat vehicles", "shipbuilding", "IT services"],
      recentContracts: 9.6
    },
    {
      name: "Boeing",
      revenue: 32.7,
      specialties: ["F-15EX fighter jet", "satellite systems"],
      recentContracts: 8.9
    }
  ],

  recentContracts: [
    {
      contractor: "Northrop Grumman",
      value: 1400,
      type: "Air and Missile Defense",
      description: "Modernization of global air and missile defense capabilities",
      breakdown: [
        {
          value: 481,
          description: "U.S. Army's Aviation Missile Technology Consortium software development"
        },
        {
          value: 899.6,
          description: "Poland's air defense programs IBCS implementation"
        }
      ]
    },
    {
      contractor: "HII",
      value: 147,
      type: "Naval Systems",
      description: "Shipboard and shore-based combat training for U.S. Navy"
    },
    {
      contractor: "Charles Stark Draper Laboratory",
      value: 308,
      type: "Naval Systems",
      description: "Engineering for hypersonic missile program navigation"
    },
    {
      contractor: "GE Aerospace",
      value: 5000,
      type: "Aircraft Systems",
      description: "F110 engines support for foreign military sales"
    },
    {
      contractor: "KBR",
      value: 229,
      type: "Aircraft Systems",
      description: "Life cycle research for cargo helicopter systems"
    }
  ],

  trends: {
    technological: [
      {
        name: "AI Integration",
        impact: "High",
        description: "Revolutionizing maintenance and repair operations",
        opportunities: "1,800 maintenance personnel shortage in U.S. Air Force"
      },
      {
        name: "Industry 5.0",
        impact: "Medium",
        description: "Human-centered manufacturing processes",
        opportunities: "Balance of technology and human expertise"
      },
      {
        name: "Autonomous Systems",
        impact: "High",
        description: "Unmanned platforms across all domains",
        opportunities: "Air, land, sea, and space applications"
      },
      {
        name: "Cybersecurity",
        impact: "Critical",
        description: "Protection of infrastructure and information",
        opportunities: "Increasing investment in digital defense"
      }
    ],
    
    regulatory: [
      {
        name: "Streamlined Acquisition",
        description: "Continuous iterative prototyping for 5-year periods",
        impact: "Positive"
      },
      {
        name: "Software Reform",
        description: "Accelerated development cycles",
        impact: "Positive"
      },
      {
        name: "Commercial Items",
        description: "Simplified commercial product determinations",
        impact: "Positive"
      },
      {
        name: "Inflation Relief",
        description: "Contract modifications for inflation through 2025",
        impact: "Neutral"
      }
    ],

    supplyChain: [
      {
        name: "Berry Amendment",
        description: "Domestic nonavailability determinations tracking",
        impact: "Medium"
      },
      {
        name: "Supply Monitoring",
        description: "Enhanced contractor supply chain assessment",
        impact: "High"
      }
    ]
  },

  outlook: {
    risks: [
      {
        factor: "Budget Uncertainty",
        description: "Operating under continuing resolution",
        severity: "High"
      },
      {
        factor: "Supply Chain",
        description: "Ongoing disruptions and workforce shortages",
        severity: "Medium"
      },
      {
        factor: "Shifting Priorities",
        description: "Potential program cuts and efficiency initiatives",
        severity: "Medium"
      }
    ]
  }
};