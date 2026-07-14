-- Execute este SQL no Supabase SQL Editor (https://supabase.com/dashboard)
-- Menu: SQL Editor > New Query > Cole e execute

-- Tabela de jogadores
CREATE TABLE players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de palpites
CREATE TABLE predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  match_id TEXT NOT NULL,
  home_score INTEGER NOT NULL CHECK (home_score >= 0),
  away_score INTEGER NOT NULL CHECK (away_score >= 0),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(player_id, match_id)
);

-- Tabela de resultados reais
CREATE TABLE results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id TEXT NOT NULL UNIQUE,
  home_score INTEGER NOT NULL CHECK (home_score >= 0),
  away_score INTEGER NOT NULL CHECK (away_score >= 0),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de times definidos pelo admin nas fases eliminatorias (override)
CREATE TABLE match_teams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id TEXT NOT NULL UNIQUE,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_flag TEXT NOT NULL DEFAULT '',
  away_flag TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indices para performance
CREATE INDEX idx_predictions_player ON predictions(player_id);
CREATE INDEX idx_predictions_match ON predictions(match_id);
CREATE INDEX idx_results_match ON results(match_id);
CREATE INDEX idx_match_teams_match ON match_teams(match_id);

-- Habilitar RLS (Row Level Security) - mas permitir acesso publico
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_teams ENABLE ROW LEVEL SECURITY;

-- Politicas de acesso publico (usando anon key)
CREATE POLICY "Acesso publico players" ON players FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso publico predictions" ON predictions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso publico results" ON results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Acesso publico match_teams" ON match_teams FOR ALL USING (true) WITH CHECK (true);
