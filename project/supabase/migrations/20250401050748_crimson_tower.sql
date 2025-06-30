/*
  # Fix API Key Configuration

  1. Changes
    - Remove any existing API key entries
    - Insert correct Alpha Vantage API key
    - Ensure RLS policy exists
*/

-- First remove any existing API keys
DELETE FROM api_keys WHERE service = 'alpha_vantage';

-- Insert the correct API key
INSERT INTO api_keys (service, key)
VALUES ('alpha_vantage', '9BFW6PWFNGFMZ064')
ON CONFLICT (service) DO UPDATE
SET key = EXCLUDED.key,
    updated_at = now();

-- Ensure RLS policy exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'api_keys' AND policyname = 'Allow authenticated users to read api keys'
  ) THEN
    CREATE POLICY "Allow authenticated users to read api keys"
      ON api_keys
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;