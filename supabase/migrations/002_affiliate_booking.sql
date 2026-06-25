-- AFFILIATE BOOKING SYSTEM

CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  booking_url TEXT NOT NULL,
  booking_platform TEXT,
  discount_pct INTEGER NOT NULL DEFAULT 10,
  discount_code TEXT UNIQUE NOT NULL,
  discount_description TEXT,
  is_active BOOLEAN DEFAULT true,
  valid_from DATE DEFAULT CURRENT_DATE,
  valid_until DATE,
  partner_confirmed BOOLEAN DEFAULT false,
  partner_contact TEXT,
  partner_notes TEXT,
  click_count INTEGER DEFAULT 0,
  conversion_estimate INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_link_id UUID NOT NULL REFERENCES affiliate_links(id),
  listing_id UUID NOT NULL REFERENCES listings(id),
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  country_code TEXT,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_affiliate_links_listing ON affiliate_links(listing_id);
CREATE INDEX idx_affiliate_links_code ON affiliate_links(discount_code);
CREATE INDEX idx_affiliate_clicks_link ON affiliate_clicks(affiliate_link_id);
CREATE INDEX idx_affiliate_clicks_date ON affiliate_clicks(clicked_at);

ALTER TABLE listings ADD COLUMN IF NOT EXISTS booking_url TEXT;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS discount_pct INTEGER DEFAULT 10;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS discount_code TEXT;

-- Helper function for click count increment
CREATE OR REPLACE FUNCTION increment_click_count(link_id UUID)
RETURNS VOID AS $$
  UPDATE affiliate_links SET click_count = click_count + 1 WHERE id = link_id;
$$ LANGUAGE sql;

ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_active_links" ON affiliate_links
  FOR SELECT USING (is_active = true AND partner_confirmed = true);

CREATE POLICY "public_insert_clicks" ON affiliate_clicks
  FOR INSERT WITH CHECK (true);
