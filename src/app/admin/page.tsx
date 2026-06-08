'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { matches, groups, formatDate } from '@/lib/matches-data'
import { Result } from '@/lib/types'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'bolao2026admin'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [scores, setScores] = useState<Record<string, { home: string; away: string }>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState('A')
  const [stats, setStats] = useState({ players: 0, predictions: 0, results: 0 })

  const loadResults = useCallback(async () => {
    const { data } = await supabase.from('results').select('*')
    if (data) {
      setResults(data)
      const scoreMap: Record<string, { home: string; away: string }> = {}
      data.forEach(r => {
        scoreMap[r.match_id] = { home: String(r.home_score), away: String(r.away_score) }
      })
      setScores(scoreMap)
    }
  }, [])

  const loadStats = useCallback(async () => {
    const [p, pr, r] = await Promise.all([
      supabase.from('players').select('id', { count: 'exact', head: true }),
      supabase.from('predictions').select('id', { count: 'exact', head: true }),
      supabase.from('results').select('id', { count: 'exact', head: true }),
    ])
    setStats({
      players: p.count || 0,
      predictions: pr.count || 0,
      results: r.count || 0,
    })
  }, [])

  useEffect(() => {
    if (authenticated) {
      loadResults()
      loadStats()
    }
  }, [authenticated, loadResults, loadStats])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    }
  }

  function handleScoreChange(matchId: string, side: 'home' | 'away', value: string) {
    if (value !== '' && !/^\d+$/.test(value)) return
    setScores(prev => ({
      ...prev,
      [matchId]: { ...prev[matchId], [side]: value },
    }))
  }

  async function saveResult(matchId: string) {
    const score = scores[matchId]
    if (!score || score.home === '' || score.away === '') return

    setSaving(matchId)
    await supabase.from('results').upsert(
      {
        match_id: matchId,
        home_score: parseInt(score.home),
        away_score: parseInt(score.away),
      },
      { onConflict: 'match_id' }
    )
    await loadResults()
    await loadStats()
    setSaving(null)
  }

  async function deleteResult(matchId: string) {
    setSaving(matchId)
    await supabase.from('results').delete().eq('match_id', matchId)
    setScores(prev => {
      const next = { ...prev }
      delete next[matchId]
      return next
    })
    await loadResults()
    await loadStats()
    setSaving(null)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-copa-navy to-copa-blue p-4">
        <div className="card max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-copa-navy mb-4">Admin - Bolao Copa 2026</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Senha do admin"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-copa-green focus:outline-none"
              autoFocus
            />
            <button type="submit" className="btn-primary w-full">Entrar</button>
          </form>
          <a href="/" className="text-sm text-gray-400 mt-4 inline-block hover:underline">Voltar ao bolao</a>
        </div>
      </div>
    )
  }

  const filteredMatches = matches.filter(m => m.group === selectedGroup)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-copa-navy text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin - Resultados</h1>
          <a href="/" className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded">Voltar ao bolao</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-copa-navy">{stats.players}</div>
            <div className="text-xs text-gray-500">Jogadores</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-copa-green">{stats.predictions}</div>
            <div className="text-xs text-gray-500">Palpites</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-copa-gold">{stats.results}</div>
            <div className="text-xs text-gray-500">Resultados</div>
          </div>
        </div>

        {/* Group Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedGroup === g ? 'bg-copa-green text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Grupo {g}
            </button>
          ))}
        </div>

        {/* Matches */}
        <div className="space-y-3">
          {filteredMatches.map(match => {
            const hasResult = results.some(r => r.match_id === match.id)
            const score = scores[match.id] || { home: '', away: '' }

            return (
              <div key={match.id} className={`card ${hasResult ? 'border-l-4 border-l-copa-green' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{match.id} - {formatDate(match.date, match.time)}</span>
                  {hasResult && <span className="text-xs text-copa-green font-semibold">Resultado salvo</span>}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="flex-1 text-right text-sm font-medium">
                    {match.homeFlag} {match.homeTeam}
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={score.home ?? ''}
                    onChange={e => handleScoreChange(match.id, 'home', e.target.value)}
                    className="input-score"
                    placeholder="-"
                  />
                  <span className="text-gray-400 font-bold">x</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    value={score.away ?? ''}
                    onChange={e => handleScoreChange(match.id, 'away', e.target.value)}
                    className="input-score"
                    placeholder="-"
                  />
                  <div className="flex-1 text-left text-sm font-medium">
                    {match.awayTeam} {match.awayFlag}
                  </div>
                </div>

                <div className="mt-3 flex justify-center gap-2">
                  <button
                    onClick={() => saveResult(match.id)}
                    disabled={saving === match.id || score.home === '' || score.away === ''}
                    className="btn-primary text-sm py-1.5 px-4"
                  >
                    {saving === match.id ? 'Salvando...' : hasResult ? 'Atualizar' : 'Salvar resultado'}
                  </button>
                  {hasResult && (
                    <button
                      onClick={() => deleteResult(match.id)}
                      className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5"
                    >
                      Remover
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
