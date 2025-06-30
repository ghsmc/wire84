/*
  # Insert Alpha Vantage API Key

  1. Changes
    - Insert Alpha Vantage API key into api_keys table
    - Key will be used for fetching stock and insider trading data

  2. Security
    - Key is already protected by RLS policies from previous migration
*/

INSERT INTO api_keys (service, key)
VALUES ('alpha_vantage', '9BFW6PWFNGFMZ064')
ON CONFLICT (service) DO UPDATE
SET key = EXCLUDED.key,
    updated_at = now();