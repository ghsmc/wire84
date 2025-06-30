import { getAlphaVantageKey } from './config';

interface StockApiResponse {
  data: any;
  error?: string;
}

interface TechnicalIndicators {
  rsi?: {
    value: number;
    history: Array<{ time: string; value: number }>;
  };
  macd?: {
    macd: number;
    signal: number;
    histogram: number;
    history: Array<{ time: string; macd: number; signal: number; histogram: number }>;
  };
  bbands?: {
    upper: number;
    middle: number;
    lower: number;
    history: Array<{ time: string; upper: number; middle: number; lower: number }>;
  };
  volume?: {
    current: number;
    average: number;
    change: number;
    history: Array<{ time: string; volume: number }>;
  };
}

interface NewsItem {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  source: string;
  category: string;
  sentiment?: 'Positive' | 'Negative' | 'Neutral';
  sentiment_score?: number;
}

// Cache implementation
const cache = {
  data: new Map<string, { value: any; timestamp: number }>(),
  
  get: function(key: string) {
    const item = this.data.get(key);
    if (!item) return null;
    
    // Cache expires after 5 minutes
    if (Date.now() - item.timestamp > 5 * 60 * 1000) {
      this.data.delete(key);
      return null;
    }
    
    return item.value;
  },
  
  set: function(key: string, value: any) {
    this.data.set(key, {
      value,
      timestamp: Date.now()
    });
  },
  
  clear: function() {
    this.data.clear();
  }
};

// Rate limiting helper
const rateLimiter = {
  queue: [] as (() => Promise<any>)[],
  processing: false,
  
  async add(fn: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      if (!this.processing) {
        this.process();
      }
    });
  },
  
  async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    const fn = this.queue.shift();
    
    if (fn) {
      await fn();
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between requests
      this.processing = false;
      this.process();
    }
  }
};

export const fetchStockData = async (symbol: string): Promise<StockApiResponse> => {
  return rateLimiter.add(async () => {
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
  });
};

export const fetchTechnicalIndicators = async (symbol: string): Promise<TechnicalIndicators> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      // Fetch all indicators in parallel
      const [rsiRes, macdRes, bbandsRes, volumeRes] = await Promise.all([
        fetch(`https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=daily&time_period=14&series_type=close&apikey=${apiKey}`),
        fetch(`https://www.alphavantage.co/query?function=MACD&symbol=${symbol}&interval=daily&series_type=close&apikey=${apiKey}`),
        fetch(`https://www.alphavantage.co/query?function=BBANDS&symbol=${symbol}&interval=daily&time_period=20&series_type=close&nbdevup=2&nbdevdn=2&apikey=${apiKey}`),
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`)
      ]);

      const [rsiData, macdData, bbandsData, volumeData] = await Promise.all([
        rsiRes.json(),
        macdRes.json(),
        bbandsRes.json(),
        volumeRes.json()
      ]);

      // Process RSI
      const rsiValues = rsiData['Technical Analysis: RSI'];
      const rsiHistory = Object.entries(rsiValues || {}).map(([time, data]: [string, any]) => ({
        time,
        value: parseFloat(data.RSI)
      })).reverse();

      // Process MACD
      const macdValues = macdData['Technical Analysis: MACD'];
      const macdHistory = Object.entries(macdValues || {}).map(([time, data]: [string, any]) => ({
        time,
        macd: parseFloat(data.MACD),
        signal: parseFloat(data.MACD_Signal),
        histogram: parseFloat(data.MACD_Hist)
      })).reverse();

      // Process Bollinger Bands
      const bbandsValues = bbandsData['Technical Analysis: BBANDS'];
      const bbandsHistory = Object.entries(bbandsValues || {}).map(([time, data]: [string, any]) => ({
        time,
        upper: parseFloat(data['Real Upper Band']),
        middle: parseFloat(data['Real Middle Band']),
        lower: parseFloat(data['Real Lower Band'])
      })).reverse();

      // Process Volume
      const volumeValues = volumeData['Time Series (Daily)'];
      const volumeHistory = Object.entries(volumeValues || {}).map(([time, data]: [string, any]) => ({
        time,
        volume: parseFloat(data['5. volume'])
      })).reverse();

      // Calculate volume metrics
      const currentVolume = volumeHistory[volumeHistory.length - 1]?.volume || 0;
      const averageVolume = volumeHistory.slice(-20).reduce((sum, v) => sum + v.volume, 0) / 20;
      const volumeChange = ((currentVolume - averageVolume) / averageVolume) * 100;

      return {
        rsi: rsiHistory.length > 0 ? {
          value: rsiHistory[rsiHistory.length - 1].value,
          history: rsiHistory
        } : undefined,
        macd: macdHistory.length > 0 ? {
          ...macdHistory[macdHistory.length - 1],
          history: macdHistory
        } : undefined,
        bbands: bbandsHistory.length > 0 ? {
          ...bbandsHistory[bbandsHistory.length - 1],
          history: bbandsHistory
        } : undefined,
        volume: {
          current: currentVolume,
          average: averageVolume,
          change: volumeChange,
          history: volumeHistory
        }
      };
    } catch (error: any) {
      console.error('Error fetching technical indicators:', error);
      return {};
    }
  });
};

export const fetchQuote = async (symbol: string): Promise<StockApiResponse> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      return { data };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  });
};

export const searchSymbols = async (keywords: string): Promise<StockApiResponse> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`
      );
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      return { data };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  });
};

export const fetchIntraday = async (symbol: string): Promise<StockApiResponse> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
      );
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      return { data };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  });
};

export const fetchSMA = async (symbol: string): Promise<StockApiResponse> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const response = await fetch(
        `https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=10&series_type=close&apikey=${apiKey}`
      );
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      return { data };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  });
};

export const fetchNews = async (symbol?: string, topics?: string[]): Promise<{ data: NewsItem[]; error?: string }> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      // Check cache first
      const cacheKey = `news_${symbol || 'general'}_${topics?.join('_') || 'all'}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return { data: cachedData };
      }

      // Construct API URL
      let url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT`;
      if (symbol) {
        url += `&tickers=${symbol}`;
      }
      if (topics && topics.length > 0) {
        url += `&topics=${topics.join(',')}`;
      }
      url += `&apikey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }

      if (!data.feed || !Array.isArray(data.feed)) {
        throw new Error('Invalid news data format');
      }

      // Process and format news data
      const newsItems: NewsItem[] = data.feed.map((item: any) => ({
        title: item.title,
        url: item.url,
        time_published: item.time_published,
        authors: item.authors || [],
        summary: item.summary,
        source: item.source,
        category: item.category || 'General',
        sentiment: item.overall_sentiment_label,
        sentiment_score: parseFloat(item.overall_sentiment_score)
      }));

      // Cache the results
      cache.set(cacheKey, newsItems);

      return { data: newsItems };
    } catch (error: any) {
      return { data: [], error: error.message };
    }
  });
};

export const analyzeNewsSentiment = (news: NewsItem[]) => {
  if (!news.length) return { sentiment: 'Neutral', score: 0 };

  const sentimentScores = news.map(item => item.sentiment_score || 0);
  const averageScore = sentimentScores.reduce((a, b) => a + b, 0) / sentimentScores.length;

  return {
    sentiment: averageScore > 0.2 ? 'Positive' : averageScore < -0.2 ? 'Negative' : 'Neutral',
    score: averageScore
  };
};

export const clearCache = () => {
  cache.clear();
};

export const fetchForexRate = async (fromCurrency: string, toCurrency: string): Promise<StockApiResponse> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const response = await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiKey}`
      );
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      return { data };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  });
};

export const fetchForexIntraday = async (fromCurrency: string, toCurrency: string): Promise<StockApiResponse> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const response = await fetch(
        `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&interval=5min&apikey=${apiKey}`
      );
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      return { data };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  });
};

export const fetchForexDaily = async (fromCurrency: string, toCurrency: string): Promise<StockApiResponse> => {
  return rateLimiter.add(async () => {
    try {
      const apiKey = await getAlphaVantageKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const response = await fetch(
        `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${apiKey}`
      );
      
      const data = await response.json();
      
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      return { data };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  });
};