import { getAlphaVantageKey } from './config';

interface StockApiResponse {
  data: any;
  error?: string;
}

export const fetchStockData = async (symbol: string): Promise<StockApiResponse> => {
  try {
    const apiKey = await getAlphaVantageKey();
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    return { data };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const fetchCompanyOverview = async (symbol: string): Promise<StockApiResponse> => {
  try {
    const apiKey = await getAlphaVantageKey();
    if (!apiKey) {
      throw new Error('API key not found');
    }

    const response = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
    );
    
    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    return { data };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};