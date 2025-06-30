/*
  # Create Broker Credentials Table

  1. New Tables
    - `broker_credentials`
      - `id` (uuid, primary key)
      - `broker` (text, unique)
      - `clientId` (text)
      - `clientSecret` (text)
      - `accessToken` (text)
      - `refreshToken` (text)
      - `expiresAt` (bigint)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `broker_credentials` table
    - Add policy for authenticated users to read/update credentials
*/

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

ALTER TABLE broker_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read broker credentials"
  ON broker_credentials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update broker credentials"
  ON broker_credentials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);