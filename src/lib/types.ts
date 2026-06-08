export interface Match {
  id: string
  group: string
  stage: string
  date: string
  time: string // HH:MM horario de Brasilia (UTC-3)
  homeTeam: string
  awayTeam: string
  homeFlag: string
  awayFlag: string
}

export interface Player {
  id: string
  name: string
  created_at: string
}

export interface Prediction {
  id: string
  player_id: string
  match_id: string
  home_score: number
  away_score: number
}

export interface Result {
  id: string
  match_id: string
  home_score: number
  away_score: number
}

export interface RankingEntry {
  player: Player
  totalPoints: number
  exactScores: number
  correctWinners: number
  totalPredictions: number
}
