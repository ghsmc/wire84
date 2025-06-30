import { defenseIndustryData } from '../data/defense_industry_data';
import numeral from 'numeral';

export const defenseAnalytics = {
  // Format currency values
  formatCurrency: (value: number, format: string = '0.0a') => {
    return numeral(value).format(format);
  },

  // Calculate total contract value for a contractor
  getContractorValue: (contractorName: string) => {
    const contractor = defenseIndustryData.topContractors.find(
      c => c.name === contractorName
    );
    return contractor ? contractor.revenue : 0;
  },

  // Get recent contracts for a contractor
  getContractorContracts: (contractorName: string) => {
    return defenseIndustryData.recentContracts.filter(
      c => c.contractor === contractorName
    );
  },

  // Calculate market share
  calculateMarketShare: (contractorName: string) => {
    const totalRevenue = defenseIndustryData.topContractors.reduce(
      (sum, c) => sum + c.revenue,
      0
    );
    const contractorRevenue = defenseAnalytics.getContractorValue(contractorName);
    return (contractorRevenue / totalRevenue) * 100;
  },

  // Get top contractors by revenue
  getTopContractors: (limit: number = 5) => {
    return [...defenseIndustryData.topContractors]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  },

  // Get largest recent contracts
  getLargestContracts: (limit: number = 5) => {
    return [...defenseIndustryData.recentContracts]
      .sort((a, b) => b.value - a.value)
      .slice(0, limit);
  },

  // Analyze technological trends
  analyzeTrends: () => {
    const highImpactTrends = defenseIndustryData.trends.technological.filter(
      t => t.impact === 'High' || t.impact === 'Critical'
    );
    
    return {
      highImpact: highImpactTrends,
      total: defenseIndustryData.trends.technological.length,
      criticalCount: defenseIndustryData.trends.technological.filter(
        t => t.impact === 'Critical'
      ).length
    };
  },

  // Calculate risk score (0-100)
  calculateRiskScore: () => {
    const risks = defenseIndustryData.outlook.risks;
    const riskWeights = { High: 1, Medium: 0.6, Low: 0.3 };
    
    const totalRiskScore = risks.reduce((score, risk) => {
      return score + (riskWeights[risk.severity as keyof typeof riskWeights] || 0);
    }, 0);
    
    return (totalRiskScore / risks.length) * 100;
  },

  // Get growth opportunities
  getGrowthOpportunities: () => {
    return defenseIndustryData.outlook.winners.filter(w => w.growth === 'Strong');
  },

  // Calculate budget allocation percentages
  getBudgetAllocation: () => {
    const total = defenseIndustryData.budget.total;
    const breakdown = defenseIndustryData.budget.breakdown;
    
    return Object.entries(breakdown).map(([category, value]) => ({
      category,
      value,
      percentage: (value / total) * 100
    }));
  },

  // Get regulatory impact analysis
  getRegulatoryImpact: () => {
    return defenseIndustryData.trends.regulatory.reduce((acc, reg) => {
      acc[reg.impact] = (acc[reg.impact] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  },

  // Calculate contractor diversity score (0-100)
  calculateContractorDiversity: (contractorName: string) => {
    const contractor = defenseIndustryData.topContractors.find(
      c => c.name === contractorName
    );
    if (!contractor) return 0;
    
    return (contractor.specialties.length / 5) * 100; // Normalized to max of 5 specialties
  },

  // Get supply chain risk assessment
  getSupplyChainRisk: () => {
    const highImpactIssues = defenseIndustryData.trends.supplyChain.filter(
      s => s.impact === 'High'
    );
    
    return {
      highImpactCount: highImpactIssues.length,
      totalIssues: defenseIndustryData.trends.supplyChain.length,
      riskLevel: highImpactIssues.length > 1 ? 'High' : 'Moderate'
    };
  }
};