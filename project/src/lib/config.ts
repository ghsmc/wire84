import { supabase } from './supabase';

export const getAlphaVantageKey = async (): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('key')
      .eq('service', 'alpha_vantage')
      .single();

    if (error) throw error;
    return data.key;
  } catch (error) {
    console.error('Error fetching Alpha Vantage API key:', error);
    return import.meta.env.VITE_ALPHA_VANTAGE_KEY || '';
  }
};