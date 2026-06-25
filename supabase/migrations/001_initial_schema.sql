-- ============================================================
-- BEST DIVE GUIDE — Complete Database Schema
-- Three-Layer Voting System + Listings + Sustainability + Awards
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- LISTINGS
-- ============================================================
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  island TEXT,
  website_url TEXT,
  description TEXT,
  editorial_note TEXT,
  best_for TEXT[],
  -- Active categories this listing operates in
  has_dive BOOLEAN DEFAULT false,
  has_food BOOLEAN DEFAULT false,
  has_stay BOOLEAN DEFAULT false,
  has_liveaboard BOOLEAN DEFAULT false,
  -- Type classification
  listing_type TEXT CHECK (listing_type IN (
    'dive_center', 'dive_resort', 'liveaboard',
    'boutique_stay', 'restaurant', 'island_lodge'
  )),
  -- Images
  hero_image_url TEXT,
  gallery_urls TEXT[],
  -- Status
  is_published BOOLEAN DEFAULT false,
  is_claimed BOOLEAN DEFAULT false,
  claimed_by_email TEXT,
  -- Admin
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROFESSIONAL PANEL MEMBERS (Layer 1)
-- ============================================================
CREATE TABLE panel_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL, -- 'dive_professional', 'photographer', 'chef', 'hospitality', etc.
  bio TEXT,
  is_active BOOLEAN DEFAULT true,
  is_public BOOLEAN DEFAULT false, -- whether name appears on site
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VOTERS (public + panel)
-- ============================================================
CREATE TABLE voters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  country TEXT,
  daily_profession TEXT,
  -- Dive credentials
  cert_agency TEXT CHECK (cert_agency IN ('PADI','SSI','RAID','NAUI','CMAS','BSAC','Other')),
  cert_level TEXT,
  logged_dives INTEGER DEFAULT 0,
  -- Voter role for trust weighting
  voter_role TEXT CHECK (voter_role IN (
    'recreational_diver','professional_diver','dive_instructor',
    'underwater_photographer','chef','travel_professional','guest'
  )),
  -- Trust multiplier (calculated from role + dives)
  trust_multiplier NUMERIC(4,2) DEFAULT 1.0,
  -- Panel membership
  is_panel_member BOOLEAN DEFAULT false,
  panel_member_id UUID REFERENCES panel_members(id),
  -- Most Travelled Voter tracking
  verified_vote_count INTEGER DEFAULT 0,
  unique_destinations INTEGER DEFAULT 0,
  -- Verification
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VOTES (Layer 1 + 2)
-- ============================================================
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES voters(id),
  -- Which layer
  voting_layer INTEGER NOT NULL CHECK (voting_layer IN (1, 2)), -- 1=panel, 2=public
  -- Visit details
  visit_date DATE NOT NULL,
  visit_year INTEGER GENERATED ALWAYS AS (EXTRACT(YEAR FROM visit_date)::INTEGER) STORED,
  -- Active categories for this vote
  voted_dive BOOLEAN DEFAULT false,
  voted_food BOOLEAN DEFAULT false,
  voted_stay BOOLEAN DEFAULT false,
  voted_liveaboard BOOLEAN DEFAULT false,
  -- ---- STAY SCORES (1-10) ----
  stay_comfort INTEGER CHECK (stay_comfort BETWEEN 1 AND 10),
  stay_service INTEGER CHECK (stay_service BETWEEN 1 AND 10),
  stay_diver_friendly INTEGER CHECK (stay_diver_friendly BETWEEN 1 AND 10),
  stay_facilities INTEGER CHECK (stay_facilities BETWEEN 1 AND 10),
  stay_atmosphere INTEGER CHECK (stay_atmosphere BETWEEN 1 AND 10),
  stay_would_return INTEGER CHECK (stay_would_return BETWEEN 1 AND 10),
  stay_recommend INTEGER CHECK (stay_recommend BETWEEN 1 AND 10),
  -- ---- FOOD SCORES (1-10) ----
  food_quality INTEGER CHECK (food_quality BETWEEN 1 AND 10),
  food_freshness INTEGER CHECK (food_freshness BETWEEN 1 AND 10),
  food_diver_adapted INTEGER CHECK (food_diver_adapted BETWEEN 1 AND 10),
  food_memorable INTEGER CHECK (food_memorable BETWEEN 1 AND 10),
  food_variety INTEGER CHECK (food_variety BETWEEN 1 AND 10),
  food_full_offering INTEGER CHECK (food_full_offering BETWEEN 1 AND 10),
  food_recommend INTEGER CHECK (food_recommend BETWEEN 1 AND 10),
  -- ---- DIVE SCORES (1-10) ----
  dive_marine_life INTEGER CHECK (dive_marine_life BETWEEN 1 AND 10),
  dive_uniqueness INTEGER CHECK (dive_uniqueness BETWEEN 1 AND 10),
  dive_conditions INTEGER CHECK (dive_conditions BETWEEN 1 AND 10),
  dive_operation INTEGER CHECK (dive_operation BETWEEN 1 AND 10),
  dive_safety INTEGER CHECK (dive_safety BETWEEN 1 AND 10),
  dive_memorable INTEGER CHECK (dive_memorable BETWEEN 1 AND 10),
  dive_would_return INTEGER CHECK (dive_would_return BETWEEN 1 AND 10),
  -- ---- SUSTAINABILITY SCORES (1-10) ----
  sus_stay_env_policy INTEGER CHECK (sus_stay_env_policy BETWEEN 1 AND 10),
  sus_stay_plastic INTEGER CHECK (sus_stay_plastic BETWEEN 1 AND 10),
  sus_stay_conservation INTEGER CHECK (sus_stay_conservation BETWEEN 1 AND 10),
  sus_stay_local_food INTEGER CHECK (sus_stay_local_food BETWEEN 1 AND 10),
  sus_stay_energy INTEGER CHECK (sus_stay_energy BETWEEN 1 AND 10),
  sus_food_local INTEGER CHECK (sus_food_local BETWEEN 1 AND 10),
  sus_food_waste INTEGER CHECK (sus_food_waste BETWEEN 1 AND 10),
  sus_food_seafood INTEGER CHECK (sus_food_seafood BETWEEN 1 AND 10),
  sus_food_plastic INTEGER CHECK (sus_food_plastic BETWEEN 1 AND 10),
  sus_food_community INTEGER CHECK (sus_food_community BETWEEN 1 AND 10),
  sus_dive_brief INTEGER CHECK (sus_dive_brief BETWEEN 1 AND 10),
  sus_dive_no_touch INTEGER CHECK (sus_dive_no_touch BETWEEN 1 AND 10),
  sus_dive_mooring INTEGER CHECK (sus_dive_mooring BETWEEN 1 AND 10),
  sus_dive_conservation INTEGER CHECK (sus_dive_conservation BETWEEN 1 AND 10),
  sus_dive_mpa INTEGER CHECK (sus_dive_mpa BETWEEN 1 AND 10),
  -- Open feedback
  feedback_special TEXT,
  feedback_improve TEXT,
  feedback_best_for TEXT,
  feedback_tips TEXT,
  -- Proof of visit
  proof_urls TEXT[],
  proof_type TEXT CHECK (proof_type IN ('photo','booking','dive_log','receipt','menu','other')),
  -- Admin workflow
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','flagged')),
  rejection_reason TEXT,
  admin_notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  -- Weighted score (calculated on approval)
  raw_score NUMERIC(8,2),
  weighted_score NUMERIC(8,2),
  sustainability_score NUMERIC(5,2),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, voter_id) -- one vote per voter per listing
);

-- ============================================================
-- RANKING SCORES (computed, refreshed on vote approval)
-- ============================================================
CREATE TABLE ranking_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID UNIQUE NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  -- Weighted averages by category
  dive_score NUMERIC(5,2),
  food_score NUMERIC(5,2),
  stay_score NUMERIC(5,2),
  overall_score NUMERIC(5,2),
  sustainability_score NUMERIC(5,2),
  -- Vote counts
  total_votes INTEGER DEFAULT 0,
  panel_votes INTEGER DEFAULT 0,
  public_votes INTEGER DEFAULT 0,
  -- Badge eligibility
  green_diver_approved BOOLEAN DEFAULT false,
  green_diver_override BOOLEAN DEFAULT false, -- admin manual override
  sustainability_level TEXT CHECK (sustainability_level IN ('approved','recognised','none','insufficient')),
  -- Top 100 vs Recommended
  ranking_position INTEGER,
  badge_type TEXT CHECK (badge_type IN ('top100','recommended','none')),
  -- Committee override
  committee_override_position INTEGER,
  committee_override_note TEXT,
  last_calculated TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANNUAL REVIEW COMMITTEE (Layer 3)
-- ============================================================
CREATE TABLE committee_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_year INTEGER NOT NULL,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','published')),
  committee_members TEXT[],
  session_date DATE,
  notes TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE committee_decisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES committee_reviews(id),
  listing_id UUID NOT NULL REFERENCES listings(id),
  decision_type TEXT CHECK (decision_type IN (
    'confirmed','adjusted_up','adjusted_down','removed','held_pending','badge_awarded','badge_removed'
  )),
  original_position INTEGER,
  final_position INTEGER,
  reason TEXT NOT NULL,
  decided_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MOST TRAVELLED VOTER — ANNUAL TRACKER
-- ============================================================
CREATE TABLE most_travelled_voter (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  award_year INTEGER UNIQUE NOT NULL,
  voter_id UUID REFERENCES voters(id),
  verified_votes INTEGER,
  unique_destinations INTEGER,
  announced BOOLEAN DEFAULT false,
  announcement_date DATE,
  prize_description TEXT,
  prize_partner TEXT,
  voter_consented BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ANNUAL AWARDS ARCHIVE
-- ============================================================
CREATE TABLE annual_awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  award_year INTEGER NOT NULL,
  category TEXT NOT NULL, -- 'overall_top1', 'best_dive_stay', 'best_dive_food', 'green_diver', etc.
  listing_id UUID REFERENCES listings(id),
  position INTEGER,
  notes TEXT,
  ceremony_held BOOLEAN DEFAULT false,
  ceremony_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VIEWS FOR RANKING CALCULATION
-- ============================================================

-- Approved votes with trust multipliers applied
CREATE VIEW approved_votes_weighted AS
SELECT
  v.id,
  v.listing_id,
  v.voter_id,
  v.voting_layer,
  v.voted_dive, v.voted_food, v.voted_stay,
  -- Apply panel multiplier (3x) + trust multiplier
  CASE WHEN v.voting_layer = 1
    THEN 3.0 * vt.trust_multiplier
    ELSE vt.trust_multiplier
  END AS effective_multiplier,
  -- Category raw scores
  (COALESCE(v.stay_comfort,0) + COALESCE(v.stay_service,0) + COALESCE(v.stay_diver_friendly,0) +
   COALESCE(v.stay_facilities,0) + COALESCE(v.stay_atmosphere,0) + COALESCE(v.stay_would_return,0) +
   COALESCE(v.stay_recommend,0))::NUMERIC / NULLIF(
     (CASE WHEN v.voted_stay THEN 7 ELSE 0 END), 0) AS stay_avg,
  (COALESCE(v.food_quality,0) + COALESCE(v.food_freshness,0) + COALESCE(v.food_diver_adapted,0) +
   COALESCE(v.food_memorable,0) + COALESCE(v.food_variety,0) + COALESCE(v.food_full_offering,0) +
   COALESCE(v.food_recommend,0))::NUMERIC / NULLIF(
     (CASE WHEN v.voted_food THEN 7 ELSE 0 END), 0) AS food_avg,
  (COALESCE(v.dive_marine_life,0) + COALESCE(v.dive_uniqueness,0) + COALESCE(v.dive_conditions,0) +
   COALESCE(v.dive_operation,0) + COALESCE(v.dive_safety,0) + COALESCE(v.dive_memorable,0) +
   COALESCE(v.dive_would_return,0))::NUMERIC / NULLIF(
     (CASE WHEN v.voted_dive THEN 7 ELSE 0 END), 0) AS dive_avg,
  v.weighted_score,
  v.sustainability_score
FROM votes v
JOIN voters vt ON vt.id = v.voter_id
WHERE v.status = 'approved';

-- Public-facing ranking view
CREATE VIEW public_rankings AS
SELECT
  l.id,
  l.name,
  l.slug,
  l.country,
  l.region,
  l.island,
  l.website_url,
  l.hero_image_url,
  l.has_dive, l.has_food, l.has_stay, l.has_liveaboard,
  l.listing_type,
  l.best_for,
  rs.ranking_position,
  rs.badge_type,
  rs.overall_score,
  rs.dive_score,
  rs.food_score,
  rs.stay_score,
  rs.sustainability_score,
  rs.green_diver_approved,
  rs.sustainability_level,
  rs.total_votes
FROM listings l
JOIN ranking_scores rs ON rs.listing_id = l.id
WHERE l.is_published = true
  AND rs.badge_type IN ('top100','recommended')
ORDER BY rs.ranking_position ASC NULLS LAST;

-- Most Travelled Voter leaderboard (admin)
CREATE VIEW mtv_leaderboard AS
SELECT
  vt.id,
  vt.full_name,
  vt.country,
  vt.voter_role,
  COUNT(v.id) AS verified_vote_count,
  COUNT(DISTINCT l.country) AS unique_countries,
  COUNT(DISTINCT v.listing_id) AS unique_listings
FROM voters vt
JOIN votes v ON v.voter_id = vt.id AND v.status = 'approved'
JOIN listings l ON l.id = v.listing_id
WHERE EXTRACT(YEAR FROM v.submitted_at) = EXTRACT(YEAR FROM NOW())
GROUP BY vt.id, vt.full_name, vt.country, vt.voter_role
HAVING COUNT(v.id) >= 5
ORDER BY verified_vote_count DESC;

-- ============================================================
-- FUNCTION: Recalculate ranking score for a listing
-- ============================================================
CREATE OR REPLACE FUNCTION recalculate_listing_score(p_listing_id UUID)
RETURNS VOID AS $$
DECLARE
  v_total_votes INTEGER;
  v_panel_votes INTEGER;
  v_public_votes INTEGER;
  v_overall NUMERIC;
  v_dive NUMERIC;
  v_food NUMERIC;
  v_stay NUMERIC;
  v_sus NUMERIC;
  v_green BOOLEAN;
  v_sus_level TEXT;
BEGIN
  SELECT
    COUNT(*),
    SUM(CASE WHEN voting_layer = 1 THEN 1 ELSE 0 END),
    SUM(CASE WHEN voting_layer = 2 THEN 1 ELSE 0 END),
    AVG(weighted_score),
    AVG(CASE WHEN voted_dive THEN dive_avg END),
    AVG(CASE WHEN voted_food THEN food_avg END),
    AVG(CASE WHEN voted_stay THEN stay_avg END),
    AVG(sustainability_score)
  INTO v_total_votes, v_panel_votes, v_public_votes,
       v_overall, v_dive, v_food, v_stay, v_sus
  FROM approved_votes_weighted
  WHERE listing_id = p_listing_id;

  -- Sustainability badge logic
  v_sus_level := CASE
    WHEN v_total_votes < 3 THEN 'insufficient'
    WHEN v_sus >= 8.0 THEN 'approved'
    WHEN v_sus >= 6.0 THEN 'recognised'
    ELSE 'none'
  END;
  v_green := v_sus_level = 'approved';

  INSERT INTO ranking_scores (
    listing_id, total_votes, panel_votes, public_votes,
    overall_score, dive_score, food_score, stay_score,
    sustainability_score, green_diver_approved, sustainability_level,
    last_calculated, updated_at
  ) VALUES (
    p_listing_id, COALESCE(v_total_votes,0), COALESCE(v_panel_votes,0),
    COALESCE(v_public_votes,0), v_overall, v_dive, v_food, v_stay,
    v_sus, COALESCE(v_green, false), v_sus_level, NOW(), NOW()
  )
  ON CONFLICT (listing_id) DO UPDATE SET
    total_votes = EXCLUDED.total_votes,
    panel_votes = EXCLUDED.panel_votes,
    public_votes = EXCLUDED.public_votes,
    overall_score = EXCLUDED.overall_score,
    dive_score = EXCLUDED.dive_score,
    food_score = EXCLUDED.food_score,
    stay_score = EXCLUDED.stay_score,
    sustainability_score = EXCLUDED.sustainability_score,
    green_diver_approved = CASE
      WHEN ranking_scores.green_diver_override THEN ranking_scores.green_diver_approved
      ELSE EXCLUDED.green_diver_approved
    END,
    sustainability_level = EXCLUDED.sustainability_level,
    last_calculated = NOW(),
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Trigger to recalculate on vote approval
CREATE OR REPLACE FUNCTION trigger_recalculate_on_approve()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    PERFORM recalculate_listing_score(NEW.listing_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_vote_approved
AFTER UPDATE ON votes
FOR EACH ROW EXECUTE FUNCTION trigger_recalculate_on_approve();

-- Trigger to update updated_at on listings
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_updated_at BEFORE UPDATE ON listings
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE voters ENABLE ROW LEVEL SECURITY;
ALTER TABLE ranking_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE panel_members ENABLE ROW LEVEL SECURITY;

-- Public can read published listings
CREATE POLICY "public_read_listings" ON listings
  FOR SELECT USING (is_published = true);

-- Public can read ranking scores
CREATE POLICY "public_read_rankings" ON ranking_scores
  FOR SELECT USING (true);

-- Voters can insert their own vote
CREATE POLICY "voters_insert_vote" ON votes
  FOR INSERT WITH CHECK (true);

-- Voters can read their own vote status
CREATE POLICY "voters_read_own_votes" ON votes
  FOR SELECT USING (true);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX idx_listings_country ON listings(country);
CREATE INDEX idx_listings_type ON listings(listing_type);
CREATE INDEX idx_listings_published ON listings(is_published);
CREATE INDEX idx_votes_listing ON votes(listing_id);
CREATE INDEX idx_votes_voter ON votes(voter_id);
CREATE INDEX idx_votes_status ON votes(status);
CREATE INDEX idx_ranking_scores_position ON ranking_scores(ranking_position);
CREATE INDEX idx_ranking_scores_badge ON ranking_scores(badge_type);
