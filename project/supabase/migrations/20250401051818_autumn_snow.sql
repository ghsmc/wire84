/*
  # Fix Authentication Setup

  1. Changes
    - Create broker_credentials table if not exists
    - Add RLS policies for broker_credentials
    - Insert Alpha Vantage API key
    - Add RLS policy for API keys

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for authenticated users
*/

-- First ensure broker_credentials table exists
CREATE TABLE IF NOT EXISTS broker_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  broker text UNIQUE NOT NULL,
  client_id text NOT NULL,
  client_secret text NOT NULL,
  access_token text,
  refresh_token text,
  expires_at bigint,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on broker_credentials
ALTER TABLE broker_credentials ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for broker_credentials
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'broker_credentials' AND policyname = 'Allow authenticated users to read broker credentials'
  ) THEN
    CREATE POLICY "Allow authenticated users to read broker credentials"
      ON broker_credentials
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'broker_credentials' AND policyname = 'Allow authenticated users to update broker credentials'
  ) THEN
    CREATE POLICY "Allow authenticated users to update broker credentials"
      ON broker_credentials
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Ensure API keys table exists
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text UNIQUE NOT NULL,
  key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on api_keys
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for API keys
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

-- Insert Alpha Vantage API key
INSERT INTO api_keys (service, key)
VALUES ('alpha_vantage', '9BFW6PWFNGFMZ064')
ON CONFLICT (service) DO UPDATE
SET key = EXCLUDED.key,
    updated_at = now();