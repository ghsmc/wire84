/*
  # Add Defense Industry Categories and Sub-niches

  1. New Tables
    - defense_categories
      - Main categories like Aerospace, Land Systems, Naval Systems
    - defense_sub_niches
      - Detailed sub-niches within each category
    - defense_contractor_specialties
      - Links contractors to their specialized niches
    - defense_contract_categories
      - Categorizes contracts by industry segment

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Defense Categories Table
CREATE TABLE IF NOT EXISTS defense_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  market_size numeric,
  growth_rate numeric,
  key_technologies text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Defense Sub-niches Table
CREATE TABLE IF NOT EXISTS defense_sub_niches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES defense_categories(id),
  name text NOT NULL,
  description text,
  market_size numeric,
  growth_rate numeric,
  key_players text[],
  technologies text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Defense Contractor Specialties Table
CREATE TABLE IF NOT EXISTS defense_contractor_specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id uuid REFERENCES defense_contractors(id),
  category_id uuid REFERENCES defense_categories(id),
  sub_niche_id uuid REFERENCES defense_sub_niches(id),
  market_share numeric,
  revenue numeric,
  key_products text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Defense Contract Categories Table
CREATE TABLE IF NOT EXISTS defense_contract_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid,
  category_id uuid REFERENCES defense_categories(id),
  sub_niche_id uuid REFERENCES defense_sub_niches(id),
  value numeric,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE defense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_sub_niches ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_contractor_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE defense_contract_categories ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow authenticated users to read defense categories"
  ON defense_categories FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read defense sub-niches"
  ON defense_sub_niches FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read defense contractor specialties"
  ON defense_contractor_specialties FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read defense contract categories"
  ON defense_contract_categories FOR SELECT TO authenticated USING (true);

-- Insert Initial Categories
INSERT INTO defense_categories (name, description, market_size, growth_rate, key_technologies)
VALUES
  (
    'Aerospace and Aviation',
    'Military aircraft, helicopters, UAVs, missile systems, and space systems',
    250000000000,
    7.5,
    ARRAY['Propulsion systems', 'Avionics', 'Stealth technology', 'Satellite systems']
  ),
  (
    'Land Systems',
    'Armored vehicles, artillery, infantry weapons, and military ground vehicles',
    120000000000,
    5.2,
    ARRAY['Armor technology', 'Fire control systems', 'Electric drive']
  ),
  (
    'Naval Systems',
    'Warships, submarines, naval weapons, and maritime defense',
    180000000000,
    4.8,
    ARRAY['Propulsion', 'Sonar', 'Naval combat systems']
  ),
  (
    'C4ISR',
    'Command, Control, Communications, Computers, Intelligence, Surveillance, and Reconnaissance',
    140000000000,
    8.9,
    ARRAY['AI/ML', 'Quantum computing', 'Advanced sensors']
  ),
  (
    'Cybersecurity',
    'Cyber defense systems and secure communications',
    85000000000,
    12.4,
    ARRAY['Zero trust', 'Quantum encryption', 'AI-driven defense']
  );

-- Insert Sub-niches
INSERT INTO defense_sub_niches (category_id, name, description, market_size, growth_rate, key_players, technologies)
VALUES
  (
    (SELECT id FROM defense_categories WHERE name = 'Aerospace and Aviation'),
    'Military Aircraft',
    'Fighter jets, bombers, and transport aircraft',
    95000000000,
    6.8,
    ARRAY['Lockheed Martin', 'Boeing', 'Northrop Grumman'],
    ARRAY['Stealth technology', 'Advanced propulsion', 'Electronic warfare systems']
  ),
  (
    (SELECT id FROM defense_categories WHERE name = 'Aerospace and Aviation'),
    'Unmanned Aerial Vehicles',
    'Military drones and autonomous aircraft',
    45000000000,
    15.3,
    ARRAY['General Atomics', 'Northrop Grumman', 'Boeing'],
    ARRAY['AI/ML', 'Autonomous systems', 'Advanced sensors']
  ),
  (
    (SELECT id FROM defense_categories WHERE name = 'Land Systems'),
    'Armored Vehicles',
    'Tanks, APCs, and combat vehicles',
    55000000000,
    4.2,
    ARRAY['General Dynamics', 'BAE Systems', 'Rheinmetall'],
    ARRAY['Active protection systems', 'Electric drive', 'Advanced armor']
  ),
  (
    (SELECT id FROM defense_categories WHERE name = 'Naval Systems'),
    'Submarines',
    'Nuclear and conventional submarines',
    65000000000,
    3.8,
    ARRAY['General Dynamics Electric Boat', 'Huntington Ingalls', 'BAE Systems'],
    ARRAY['Air-independent propulsion', 'Advanced sonar', 'Combat management systems']
  ),
  (
    (SELECT id FROM defense_categories WHERE name = 'C4ISR'),
    'Battlefield Management',
    'Command and control systems',
    42000000000,
    9.5,
    ARRAY['Raytheon', 'L3Harris', 'General Dynamics'],
    ARRAY['AI/ML', 'Cloud computing', 'Advanced networking']
  );

-- Link Contractors to Specialties
INSERT INTO defense_contractor_specialties (
  contractor_id,
  category_id,
  sub_niche_id,
  market_share,
  revenue,
  key_products
)
SELECT 
  dc.id,
  cat.id,
  sn.id,
  25.5,
  15000000000,
  ARRAY['F-35 Lightning II', 'F-22 Raptor', 'C-130J']
FROM 
  defense_contractors dc,
  defense_categories cat,
  defense_sub_niches sn
WHERE 
  dc.company_name = 'Lockheed Martin'
  AND cat.name = 'Aerospace and Aviation'
  AND sn.name = 'Military Aircraft';

-- Add Contract Categories
INSERT INTO defense_contract_categories (
  category_id,
  sub_niche_id,
  value,
  description
)
SELECT
  cat.id,
  sn.id,
  13100000000,
  'F-35 Program FY2025 funding'
FROM
  defense_categories cat,
  defense_sub_niches sn
WHERE
  cat.name = 'Aerospace and Aviation'
  AND sn.name = 'Military Aircraft';