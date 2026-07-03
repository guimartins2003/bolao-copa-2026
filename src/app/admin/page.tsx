'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { matches, groups, knockoutStages, formatDate, isKnockoutStage, applyTeamOverrides } from '@/lib/matches-data'
import { Result, MatchTeam } from '@/lib/types'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'bolao2026admin'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [scores, setScores] = useState<Record<string, { home: string; away: string }>>({})
  const [matchTeams, setMatchTeams] = useState<MatchTeam[]>([])
  const [teamEdits, setTeamEdits] = useState<Record<string, { homeTeam: string; awayTeam: string; homeFlag: string; awayFlag: string }>>({})
  const [savingTeams, setSavingTeams] = useState<string | null>(null)
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

  const loadTeams = useCallback(async () => {
    const { data } = await supabase.from('match_teams').select('*')
    if (data) {
      setMatchTeams(data)
      const editMap: Record<string, { homeTeam: string; awayTeam: string; homeFlag: string; awayFlag: string }> = {}
      data.forEach(t => {
        editMap[t.match_id] = { homeTeam: t.home_team, awayTeam: t.away_team, homeFlag: t.home_flag, awayFlag: t.away_flag }
      })
      setTeamEdits(editMap)
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
      loadTeams()
      loadStats()
    }
  }, [authenticated, loadResults, loadTeams, loadStats])

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

  function handleTeamEditChange(matchId: string, field: 'homeTeam' | 'awayTeam' | 'homeFlag' | 'awayFlag', value: string) {
    setTeamEdits(prev => ({
      ...prev,
      [matchId]: {
        homeTeam: prev[matchId]?.homeTeam ?? '',
        awayTeam: prev[matchId]?.awayTeam ?? '',
        homeFlag: prev[matchId]?.homeFlag ?? '',
        awayFlag: prev[matchId]?.awayFlag ?? '',
        [field]: value,
      },
    }))
  }

  async function saveTeams(matchId: string) {
    const edit = teamEdits[matchId]
    if (!edit || !edit.homeTeam.trim() || !edit.awayTeam.trim()) return

    setSavingTeams(matchId)
    await supabase.from('match_teams').upsert(
      {
        match_id: matchId,
        home_team: edit.homeTeam.trim(),
        away_team: edit.awayTeam.trim(),
        home_flag: edit.homeFlag.trim(),
        away_flag: edit.awayFlag.trim(),
      },
      { onConflict: 'match_id' }
    )
    await loadTeams()
    setSavingTeams(null)
  }

  async function resetTeams(matchId: string) {
    setSavingTeams(matchId)
    await supabase.from('match_teams').delete().eq('match_id', matchId)
    setTeamEdits(prev => {
      const next = { ...prev }
      delete next[matchId]
      return next
    })
    await loadTeams()
    setSavingTeams(null)
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

  const filteredMatches = applyTeamOverrides(matches, matchTeams).filter(m => m.group === selectedGroup)

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
          {knockoutStages.map(s => (
            <button
              key={s.key}
              onClick={() => setSelectedGroup(s.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedGroup === s.key ? 'bg-copa-blue text-white' : 'bg-white text-copa-blue hover:bg-blue-50 border border-copa-blue'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Matches */}
        <div className="space-y-3">
          {filteredMatches.map(match => {
            const hasResult = results.some(r => r.match_id === match.id)
            const score = scores[match.id] || { home: '', away: '' }

            const isKnockout = isKnockoutStage(match.group)
            const teamEdit = teamEdits[match.id] || { homeTeam: '', awayTeam: '', homeFlag: '', awayFlag: '' }
            const hasCustomTeams = matchTeams.some(t => t.match_id === match.id)

            return (
              <div key={match.id} className={`card ${hasResult ? 'border-l-4 border-l-copa-green' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{match.id} - {formatDate(match.date, match.time)}</span>
                  {hasResult && <span className="text-xs text-copa-green font-semibold">Resultado salvo</span>}
                </div>

                {/* Editar times (apenas fases eliminatorias) */}
                {isKnockout && (
                  <div className="mb-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="text-xs font-semibold text-copa-blue mb-2">Definir times {hasCustomTeams && <span className="text-gray-400 font-normal">(personalizado)</span>}</div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={teamEdit.homeFlag}
                          onChange={e => handleTeamEditChange(match.id, 'homeFlag', e.target.value)}
                          className="w-12 px-2 py-1.5 border border-gray-300 rounded text-center"
                          placeholder="🏳️"
                          maxLength={8}
                        />
                        <input
                          type="text"
                          value={teamEdit.homeTeam}
                          onChange={e => handleTeamEditChange(match.id, 'homeTeam', e.target.value)}
                          className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"
                          placeholder="Time mandante"
                        />
                      </div>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={teamEdit.awayFlag}
                          onChange={e => handleTeamEditChange(match.id, 'awayFlag', e.target.value)}
                          className="w-12 px-2 py-1.5 border border-gray-300 rounded text-center"
                          placeholder="🏳️"
                          maxLength={8}
                        />
                        <input
                          type="text"
                          value={teamEdit.awayTeam}
                          onChange={e => handleTeamEditChange(match.id, 'awayTeam', e.target.value)}
                          className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"
                          placeholder="Time visitante"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => saveTeams(match.id)}
                        disabled={savingTeams === match.id || !teamEdit.homeTeam.trim() || !teamEdit.awayTeam.trim()}
                        className="text-xs bg-copa-blue text-white px-3 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        {savingTeams === match.id ? 'Salvando...' : 'Salvar times'}
                      </button>
                      {hasCustomTeams && (
                        <button
                          onClick={() => resetTeams(match.id)}
                          className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5"
                        >
                          Restaurar padrao
                        </button>
                      )}
                    </div>
                  </div>
                )}

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
