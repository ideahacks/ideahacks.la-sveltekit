-- =============================================================================
-- parts_2026: exact copy of parts_2025 (structure and data).
-- Run in Supabase SQL Editor. Use Option A if parts_2025 exists, else Option B.
-- =============================================================================

-- Option A: If parts_2025 already exists — clone structure + data (uncomment to run)
-- CREATE TABLE parts_2026 (LIKE parts_2025 INCLUDING ALL);
-- INSERT INTO parts_2026 SELECT * FROM parts_2025;

-- Option B: If parts_2025 does not exist — create parts_2026 with same schema from scratch
CREATE TABLE IF NOT EXISTS parts_2026 (
  part_id text PRIMARY KEY,
  name text NOT NULL,
  tags text,                    -- stored as "tag1, tag2" (split in app)
  requires_checkout text,       -- 'Checkout' or other (normalized to boolean in app)
  quantity integer DEFAULT 0,
  num_in_use integer DEFAULT 0,
  image_url text,
  description text,
  datasheet_url text,
  alt_ids text,                 -- comma-separated alternate IDs for scanning
  checkout_location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS and allow public read for the parts page
ALTER TABLE parts_2026 ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read for parts_2026" ON parts_2026;
CREATE POLICY "Allow public read for parts_2026"
  ON parts_2026 FOR SELECT
  USING (true);
