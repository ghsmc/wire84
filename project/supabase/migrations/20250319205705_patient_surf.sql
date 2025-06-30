/*
  # Defense Industry Database Schema

  1. New Tables
    - defense_contractors
      - Major defense contractors and emerging tech companies
    - defense_budgets
      - Budget allocations and program funding
    - strategic_initiatives
      - Major defense initiatives and programs
    - international_defense
      - International defense spending data
    - defense_etfs
      - Defense industry ETF tracking
    - technology_trends
      - Key technology trends and impacts
    - defense_events
      - Upcoming industry events
    - government_officials
      - Key decision makers
    - regulatory_factors
      - Regulatory and political factors
    - defense_indices
      - Industry performance indices

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Defense Contractors Table
CREATE TABLE IF NOT EXISTS defense_contractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  ticker text,
  market_cap numeric,
  defense_revenue numeric,
  company_type text NOT NULL CHECK (company_type IN ('major', 'emerging')),
  focus_area text,
  key_programs text[],
  key_technologies text[],
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Defense Budget Table
CREATE TABLE IF NOT EXISTS defense_budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fiscal_year integer NOT NULL,
  category text NOT NULL,
  amount numeric NOT NULL,
  percentage numeric,
  department text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Strategic Initiatives Table
CREATE TABLE IF NOT EXISTS strategic_initiatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_name text NOT NULL,
  lead_agency text NOT NULL,
  budget numeric NOT NULL,
  start_date date,
  end_date date,
  key_contractors text[],
  status text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- International Defense Table
CREATE TABLE IF NOT EXISTS international_defense (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  annual_budget numeric NOT NULL,
  gdp_percentage numeric NOT NULL,
  focus_areas text[],
  year integer NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Defense ETFs Table
CREATE TABLE IF NOT EXISTS defense_etfs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  ticker text NOT NULL UNIQUE,
  aum numeric NOT NULL,
  ytd_return numeric,
  focus text,
  expense_ratio numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Technology Trends Table
CREATE TABLE IF NOT EXISTS technology_trends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trend_name text NOT NULL,
  category text NOT NULL,
  description text,
  impact_level text CHECK (impact_level IN ('Low', 'Medium', 'High', 'Critical')),
  adoption_stage text,
  key_players text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Defense Events Table
CREATE TABLE IF NOT EXISTS defense_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  location text NOT NULL,
  focus text,
  description text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Government Officials Table
CREATE TABLE IF NOT EXISTS government_officials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  focus_areas text[],
  appointment_date date,
  department text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Regulatory Factors Table
CREATE TABLE IF NOT EXISTS regulatory_factors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  factor_name text NOT NULL,
  category text NOT NULL,
  description text,
  effective_date date,
  expiration_date date,
  impact_level text CHECK (impact_level IN ('Low', 'Medium', 'High')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Defense Indices Table
CREATE TABLE IF NOT EXISTS defense_indices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  index_name text NOT NULL,
  ticker text,
  provider text,
  description text,
  methodology text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE defense_contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategic_initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE international_defense ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_etfs ENABLE ROW LEVEL SECURITY;
ALTER TABLE technology_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_officials ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulatory_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_indices ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow authenticated users to read defense contractors"
  ON defense_contractors FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read defense budgets"
  ON defense_budgets FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read strategic initiatives"
  ON strategic_initiatives FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read international defense"
  ON international_defense FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read defense ETFs"
  ON defense_etfs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read technology trends"
  ON technology_trends FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read defense events"
  ON defense_events FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read government officials"
  ON government_officials FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read regulatory factors"
  ON regulatory_factors FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read defense indices"
  ON defense_indices FOR SELECT TO authenticated USING (true);

-- Insert Initial Data
INSERT INTO defense_contractors (company_name, ticker, market_cap, defense_revenue, company_type, key_programs)
VALUES
  ('Lockheed Martin', 'LMT', 120000000000, 65000000000, 'major', ARRAY['F-35', 'Aegis', 'UH-60', 'Hypersonics']),
  ('RTX Corporation', 'RTX', 110000000000, 40000000000, 'major', ARRAY['Patriot', 'SM-3/6', 'F135 engines']),
  ('Northrop Grumman', 'NOC', 80000000000, 35000000000, 'major', ARRAY['B-21 Raider', 'GBSD', 'Space Systems']),
  ('General Dynamics', 'GD', 75000000000, 33000000000, 'major', ARRAY['Virginia-class subs', 'Abrams tanks', 'GDIT']),
  ('Boeing Defense', 'BA', 130000000000, 32000000000, 'major', ARRAY['F-15EX', 'KC-46', 'MQ-25', 'Space']);

INSERT INTO defense_budgets (fiscal_year, category, amount, percentage)
VALUES
  (2025, 'DoD Base Budget', 723500000000, 80.8),
  (2025, 'DoE Defense Activities', 35700000000, 4.0),
  (2025, 'Overseas Contingency Operations', 100000000000, 11.2),
  (2025, 'Defense-related Activities', 36000000000, 4.0);

INSERT INTO strategic_initiatives (initiative_name, lead_agency, budget, start_date, end_date, key_contractors)
VALUES
  ('Replicator Initiative', 'DIU/OUSD', 1800000000, '2024-01-01', '2026-12-31', ARRAY['Anduril', 'Shield AI', 'Skydio']),
  ('JADC2', 'Joint Staff', 2300000000, '2023-01-01', '2028-12-31', ARRAY['Leidos', 'Northrop', 'Palantir']),
  ('Sentinel ICBM', 'Air Force', 3600000000, '2022-01-01', '2036-12-31', ARRAY['Northrop Grumman']);

INSERT INTO international_defense (country, annual_budget, gdp_percentage, focus_areas, year)
VALUES
  ('United States', 895200000000, 3.5, ARRAY['Full spectrum capabilities'], 2025),
  ('China', 225000000000, 1.5, ARRAY['Naval', 'Hypersonics', 'AI'], 2025),
  ('Russia', 87000000000, 4.1, ARRAY['Nuclear', 'Hypersonics'], 2025);

INSERT INTO defense_etfs (name, ticker, aum, ytd_return, focus)
VALUES
  ('iShares U.S. Aerospace & Defense', 'ITA', 5200000000, 14.2, 'Broad aerospace & defense'),
  ('SPDR S&P Aerospace & Defense', 'XAR', 1800000000, 15.7, 'Equal-weighted A&D'),
  ('Invesco Aerospace & Defense', 'PPA', 1500000000, 13.8, 'Broad aerospace & defense');

INSERT INTO technology_trends (trend_name, category, description, impact_level)
VALUES
  ('Autonomous Systems', 'Platforms', 'Unmanned aerial, ground, and maritime platforms', 'High'),
  ('Artificial Intelligence', 'Software', 'Decision support, predictive maintenance, targeting', 'Critical'),
  ('Cybersecurity', 'Infrastructure', 'Zero-trust networks, offensive cyber capabilities', 'Critical');

INSERT INTO defense_events (event_name, start_date, end_date, location, focus)
VALUES
  ('AUSA Annual Meeting', '2025-10-09', '2025-10-11', 'Washington, DC', 'Army programs'),
  ('Defense Innovation Summit', '2025-07-14', '2025-07-16', 'Austin, TX', 'Defense tech startups'),
  ('Navy League Sea-Air-Space', '2025-04-05', '2025-04-07', 'National Harbor, MD', 'Naval programs');

INSERT INTO government_officials (name, position, focus_areas, department)
VALUES
  ('Lloyd Austin', 'Secretary of Defense', ARRAY['Strategic direction', 'Ukraine support'], 'DoD'),
  ('Kathleen Hicks', 'Deputy Secretary of Defense', ARRAY['Innovation', 'CDAO oversight'], 'DoD'),
  ('Charles Q. Brown', 'Chairman of the Joint Chiefs', ARRAY['Joint Warfighting Concept'], 'Joint Chiefs');

INSERT INTO regulatory_factors (factor_name, category, description, impact_level)
VALUES
  ('NDAA Implementation', 'Acquisition', 'FY2025 provisions impacting acquisition and supply chains', 'High'),
  ('Export Controls', 'Trade', 'ITAR restrictions for emerging technologies', 'High'),
  ('CFIUS', 'Investment', 'Foreign investment scrutiny in defense technologies', 'Medium');

INSERT INTO defense_indices (index_name, provider, description)
VALUES
  ('S&P Aerospace & Defense Select Industry Index', 'S&P', 'Tracks the performance of aerospace and defense companies'),
  ('Dow Jones U.S. Select Aerospace & Defense Index', 'Dow Jones', 'Market-cap weighted index of U.S. defense companies'),
  ('NASDAQ OMX Defense Index', 'NASDAQ', 'Tracks companies primarily involved in defense activities');