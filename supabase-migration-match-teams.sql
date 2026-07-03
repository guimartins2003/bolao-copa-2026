-- MIGRACAO: adiciona edicao de times das fases eliminatorias pelo admin.
-- Execute no Supabase SQL Editor (banco JA existente): SQL Editor > New Query > Cole e execute.

CREATE TABLE IF NOT EXISTS match_teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id TEXT NOT NULL UNIQUE,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_flag TEXT NOT NULL DEFAULT '',
  away_flag TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_match_teams_match ON match_teams(match_id);

ALTER TABLE match_teams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acesso publico match_teams" ON match_teams;
CREATE POLICY "Acesso publico match_teams" ON match_teams FOR ALL USING (true) WITH CHECK (true);
