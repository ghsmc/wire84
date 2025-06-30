export const getAlphaVantageKey = async (): Promise<string> => {
  try {
    return import.meta.env.VITE_ALPHA_VANTAGE_KEY || '';
  } catch (error) {
    console.error('Error fetching Alpha Vantage API key:', error);
    return '';
  }
};

export const REFRESH_INTERVAL = 15000; // 15 seconds
export const CHART_POINTS = 100; // Number of data points to show in charts
export const DEFAULT_TIMEFRAME = '1D';
export const API_RATE_LIMIT = 5; // Requests per minute
export const NEWS_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
export const NEWS_TOPICS = [
  'blockchain',
  'earnings',
  'ipo',
  'mergers_and_acquisitions',
  'financial_markets',
  'economy_fiscal',
  'economy_monetary',
  'economy_macro',
  'energy_transportation',
  'finance',
  'life_sciences',
  'manufacturing',
  'real_estate',
  'retail_wholesale',
  'technology'
] as const;