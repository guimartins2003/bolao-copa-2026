'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { matches, groups, knockoutStages, getStageLabel, formatDate, isPredictionLocked, isKnockoutStage } from '@/lib/matches-data'
import { Player, Prediction, Result, RankingEntry } from '@/lib/types'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function Home() {
  const [player, setPlayer] = useState<Player | null>(null)
  const [playerName, setPlayerName] = useState('')
  const [playerPassword, setPlayerPassword] = useState('')
  const [loginStep, setLoginStep] = useState<'name' | 'password-login' | 'password-register'>('name')
  const [pendingPlayerName, setPendingPlayerName] = useState('')
  const [activeTab, setActiveTab] = useState<'jogos' | 'ranking' | 'regras'>('jogos')
  const [selectedGroup, setSelectedGroup] = useState<string>('all')
  const [predictions, setPredictions] = useState<Record<string, { home: string; away: string }>>({})
  const [savedPredictions, setSavedPredictions] = useState<Prediction[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [allPredictions, setAllPredictions] = useState<Prediction[]>([])
  const [allPlayers, setAllPlayers] = useState<Player[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loginError, setLoginError] = useState('')

  const loadData = useCallback(async () => {
    const [resResults, resPlayers, resPredictions] = await Promise.all([
      supabase.from('results').select('*'),
      supabase.from('players').select('*'),
      supabase.from('predictions').select('*'),
    ])
    if (resResults.data) setResults(resResults.data)
    if (resPlayers.data) setAllPlayers(resPlayers.data)
    if (resPredictions.data) setAllPredictions(resPredictions.data)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('bolao_player')
    if (stored) {
      const p = JSON.parse(stored)
      setPlayer(p)
    }
    loadData().then(() => setLoading(false))
  }, [loadData])

  useEffect(() => {
    if (player) {
      const myPreds = allPredictions.filter(p => p.player_id === player.id)
      const predMap: Record<string, { home: string; away: string }> = {}
      myPreds.forEach(p => {
        predMap[p.match_id] = { home: String(p.home_score), away: String(p.away_score) }
      })
      setPredictions(predMap)
      setSavedPredictions(myPreds)
    }
  }, [player, allPredictions])

  async function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault()
    const name = playerName.trim()
    if (!name) return
    setLoginError('')

    const { data, error: selectError } = await supabase.from('players').select('*').eq('name', name).single()

    if (selectError && selectError.code !== 'PGRST116') {
      setLoginError(`Erro de conexao com o banco. (${selectError.message})`)
      return
    }

    setPendingPlayerName(name)
    if (data) {
      setLoginStep('password-login')
    } else {
      setLoginStep('password-register')
    }
    setPlayerPassword('')
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!playerPassword.trim()) return
    setLoginError('')

    const hash = await hashPassword(playerPassword)

    if (loginStep === 'password-register') {
      const res = await supabase.from('players').insert({ name: pendingPlayerName, password_hash: hash }).select().single()
      if (res.error) {
        setLoginError(`Erro ao criar jogador: ${res.error.message}`)
        return
      }
      setPlayer(res.data)
      localStorage.setItem('bolao_player', JSON.stringify(res.data))
      await loadData()
    } else {
      const { data } = await supabase.from('players').select('*').eq('name', pendingPlayerName).single()
      if (!data) {
        setLoginError('Jogador nao encontrado.')
        return
      }
      if (data.password_hash !== hash) {
        setLoginError('Senha incorreta.')
        return
      }
      setPlayer(data)
      localStorage.setItem('bolao_player', JSON.stringify(data))
      await loadData()
    }
  }

  function handleLogout() {
    setPlayer(null)
    localStorage.removeItem('bolao_player')
    setPredictions({})
    setSavedPredictions([])
    setLoginStep('name')
    setPlayerName('')
    setPlayerPassword('')
    setLoginError('')
  }

  function handleScoreChange(matchId: string, side: 'home' | 'away', value: string) {
    if (value !== '' && !/^\d+$/.test(value)) return
    setPredictions(prev => ({
      ...prev,
      [matchId]: { ...prev[matchId], [side]: value },
    }))
  }

  async function savePrediction(matchId: string) {
    if (!player) return
    const pred = predictions[matchId]
    if (!pred || pred.home === '' || pred.away === '' || pred.home === undefined || pred.away === undefined) return

    setSaving(matchId)
    const { error } = await supabase.from('predictions').upsert(
      {
        player_id: player.id,
        match_id: matchId,
        home_score: parseInt(pred.home),
        away_score: parseInt(pred.away),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'player_id,match_id' }
    )

    if (!error) {
      await loadData()
    }
    setSaving(null)
  }

  function calcPoints(pred: Prediction, result: Result): { points: number; type: string } {
    if (pred.home_score === result.home_score && pred.away_score === result.away_score) {
      return { points: 10, type: 'Placar exato!' }
    }
    const predWinner = pred.home_score > pred.away_score ? 'home' : pred.home_score < pred.away_score ? 'away' : 'draw'
    const resultWinner = result.home_score > result.away_score ? 'home' : result.home_score < result.away_score ? 'away' : 'draw'
    if (predWinner === resultWinner) {
      return { points: 5, type: 'Acertou vencedor' }
    }
    return { points: 0, type: 'Errou' }
  }

  function getRanking(): RankingEntry[] {
    return allPlayers
      .map(p => {
        const playerPreds = allPredictions.filter(pred => pred.player_id === p.id)
        let totalPoints = 0
        let exactScores = 0
        let correctWinners = 0

        playerPreds.forEach(pred => {
          const result = results.find(r => r.match_id === pred.match_id)
          if (!result) return
          const { points, type } = calcPoints(pred, result)
          totalPoints += points
          if (type === 'Placar exato!') exactScores++
          else if (type === 'Acertou vencedor') correctWinners++
        })

        return { player: p, totalPoints, exactScores, correctWinners, totalPredictions: playerPreds.length }
      })
      .sort((a, b) => b.totalPoints - a.totalPoints || b.exactScores - a.exactScores)
  }

  function getMatchResult(matchId: string) {
    return results.find(r => r.match_id === matchId)
  }

  function getMyPrediction(matchId: string) {
    return savedPredictions.find(p => p.match_id === matchId)
  }

  function isLocked(dateStr: string, time: string) {
    return isPredictionLocked(dateStr, time)
  }

  const filteredMatches = selectedGroup === 'all' ? matches : matches.filter(m => m.group === selectedGroup)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-500">Carregando...</div>
      </div>
    )
  }

  // ==================== LOGIN SCREEN ====================
  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-copa-navy to-copa-blue p-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-5xl mb-4">&#9917;</div>
          <h1 className="text-3xl font-bold text-copa-navy mb-2">Bolao Copa 2026</h1>
          <p className="text-gray-500 mb-6">Faca seus palpites e dispute com os amigos!</p>

          {loginStep === 'name' && (
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-copa-green focus:outline-none"
                autoFocus
              />
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <button type="submit" className="btn-primary w-full text-lg py-3">
                Continuar
              </button>
              <p className="text-xs text-gray-400">
                Digite seu nome para entrar ou criar uma conta
              </p>
            </form>
          )}

          {(loginStep === 'password-login' || loginStep === 'password-register') && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <p className="text-sm text-gray-600">
                {loginStep === 'password-register'
                  ? <>Bem-vindo, <strong>{pendingPlayerName}</strong>! Crie uma senha para proteger sua conta.</>
                  : <>Ola, <strong>{pendingPlayerName}</strong>! Digite sua senha.</>
                }
              </p>
              <input
                type="password"
                placeholder={loginStep === 'password-register' ? 'Crie uma senha' : 'Sua senha'}
                value={playerPassword}
                onChange={e => setPlayerPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-copa-green focus:outline-none"
                autoFocus
              />
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <button type="submit" className="btn-primary w-full text-lg py-3">
                {loginStep === 'password-register' ? 'Criar conta' : 'Entrar'}
              </button>
              <button
                type="button"
                onClick={() => { setLoginStep('name'); setLoginError(''); setPlayerPassword('') }}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Voltar
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  const ranking = getRanking()

  // ==================== MAIN APP ====================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-copa-navy text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">&#9917;</span>
            <h1 className="text-xl font-bold">Bolao Copa 2026</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80">Ola, <strong>{player.name}</strong></span>
            <button onClick={handleLogout} className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors">
              Sair
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex gap-8">
            {[
              { key: 'jogos' as const, label: 'Jogos & Palpites' },
              { key: 'ranking' as const, label: 'Ranking' },
              { key: 'regras' as const, label: 'Regras' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 px-1 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'border-b-2 border-copa-gold text-copa-gold'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* ==================== JOGOS TAB ==================== */}
        {activeTab === 'jogos' && (
          <div>
            {/* Group Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedGroup('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedGroup === 'all' ? 'bg-copa-green text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Todos
              </button>
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
                const result = getMatchResult(match.id)
                const myPred = getMyPrediction(match.id)
                const started = isLocked(match.date, match.time)
                const pred = predictions[match.id] || { home: '', away: '' }
                const pointsInfo = myPred && result ? calcPoints(myPred, result) : null

                return (
                  <div key={match.id} className="card">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        isKnockoutStage(match.group) ? 'text-copa-blue bg-blue-50' : 'text-copa-green bg-green-50'
                      }`}>
                        {isKnockoutStage(match.group) ? match.stage : `Grupo ${match.group}`}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(match.date, match.time)}</span>
                    </div>

                    {/* Result banner */}
                    {result && (
                      <div className="bg-copa-navy text-white rounded-lg p-2 mb-3 text-center">
                        <span className="text-xs opacity-70">Resultado Final: </span>
                        <span className="font-bold">
                          {match.homeTeam} {result.home_score} x {result.away_score} {match.awayTeam}
                        </span>
                      </div>
                    )}

                    {/* Teams and prediction */}
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex-1 text-right">
                        <span className="text-sm font-medium">{match.homeTeam}</span>
                        <span className="ml-2 text-lg">{match.homeFlag}</span>
                      </div>

                      {started ? (
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-10 flex items-center justify-center bg-gray-100 rounded-lg font-bold text-lg">
                            {myPred ? myPred.home_score : '-'}
                          </div>
                          <span className="text-gray-400 font-bold">x</span>
                          <div className="w-14 h-10 flex items-center justify-center bg-gray-100 rounded-lg font-bold text-lg">
                            {myPred ? myPred.away_score : '-'}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={2}
                            value={pred.home ?? ''}
                            onChange={e => handleScoreChange(match.id, 'home', e.target.value)}
                            className="input-score"
                            placeholder="-"
                          />
                          <span className="text-gray-400 font-bold">x</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={2}
                            value={pred.away ?? ''}
                            onChange={e => handleScoreChange(match.id, 'away', e.target.value)}
                            className="input-score"
                            placeholder="-"
                          />
                        </div>
                      )}

                      <div className="flex-1 text-left">
                        <span className="text-lg mr-2">{match.awayFlag}</span>
                        <span className="text-sm font-medium">{match.awayTeam}</span>
                      </div>
                    </div>

                    {/* Save button or points */}
                    <div className="mt-3 text-center">
                      {!started && (
                        <button
                          onClick={() => savePrediction(match.id)}
                          disabled={saving === match.id || pred.home === '' || pred.away === '' || pred.home === undefined || pred.away === undefined}
                          className={`text-sm px-4 py-1.5 rounded-lg font-medium transition-colors ${
                            saving === match.id
                              ? 'bg-gray-300 text-gray-500'
                              : myPred
                              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                              : 'bg-copa-green text-white hover:bg-green-800'
                          }`}
                        >
                          {saving === match.id ? 'Salvando...' : myPred ? 'Atualizar palpite' : 'Salvar palpite'}
                        </button>
                      )}
                      {pointsInfo && (
                        <span
                          className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${
                            pointsInfo.points === 10
                              ? 'bg-yellow-100 text-yellow-700'
                              : pointsInfo.points === 5
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {pointsInfo.type} ({pointsInfo.points} pts)
                        </span>
                      )}
                      {started && !myPred && (
                        <span className="text-xs text-gray-400">Sem palpite</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ==================== RANKING TAB ==================== */}
        {activeTab === 'ranking' && (
          <div>
            <h2 className="text-2xl font-bold text-copa-navy mb-4">Ranking</h2>
            {ranking.length === 0 ? (
              <p className="text-gray-500">Nenhum jogador cadastrado ainda.</p>
            ) : (
              <div className="card overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 text-sm text-gray-500">#</th>
                      <th className="text-left py-3 px-2 text-sm text-gray-500">Jogador</th>
                      <th className="text-center py-3 px-2 text-sm text-gray-500">Pts</th>
                      <th className="text-center py-3 px-2 text-sm text-gray-500 hidden sm:table-cell">Placar Exato</th>
                      <th className="text-center py-3 px-2 text-sm text-gray-500 hidden sm:table-cell">Vencedor</th>
                      <th className="text-center py-3 px-2 text-sm text-gray-500 hidden sm:table-cell">Palpites</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranking.map((entry, i) => (
                      <tr
                        key={entry.player.id}
                        className={`border-b border-gray-100 ${
                          entry.player.id === player.id ? 'bg-green-50' : ''
                        } ${i < 3 ? 'font-semibold' : ''}`}
                      >
                        <td className="py-3 px-2">
                          {i === 0 ? '\u{1F947}' : i === 1 ? '\u{1F948}' : i === 2 ? '\u{1F949}' : `${i + 1}`}
                        </td>
                        <td className="py-3 px-2">
                          {entry.player.name}
                          {entry.player.id === player.id && (
                            <span className="ml-2 text-xs text-copa-green">(voce)</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="font-bold text-copa-navy text-lg">{entry.totalPoints}</span>
                        </td>
                        <td className="py-3 px-2 text-center hidden sm:table-cell text-yellow-600">
                          {entry.exactScores}
                        </td>
                        <td className="py-3 px-2 text-center hidden sm:table-cell text-green-600">
                          {entry.correctWinners}
                        </td>
                        <td className="py-3 px-2 text-center hidden sm:table-cell text-gray-500">
                          {entry.totalPredictions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== REGRAS TAB ==================== */}
        {activeTab === 'regras' && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-copa-navy mb-4">Regras do Bolao</h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-bold text-yellow-700 mb-2">Pontuacao</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="bg-yellow-200 text-yellow-800 font-bold px-2 py-0.5 rounded text-sm">10 pts</span>
                    Acertou o placar exato do jogo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-green-200 text-green-800 font-bold px-2 py-0.5 rounded text-sm">5 pts</span>
                    Acertou o vencedor (ou empate)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-red-200 text-red-800 font-bold px-2 py-0.5 rounded text-sm">0 pts</span>
                    Errou o resultado
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Como funciona</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Preencha seus palpites para cada jogo antes da partida comecar</li>
                  <li>Voce pode alterar seu palpite ate o dia do jogo</li>
                  <li>Apos o jogo comecar, o palpite e travado</li>
                  <li>Os resultados sao atualizados pelo administrador</li>
                  <li>O ranking e atualizado automaticamente</li>
                  <li>Em caso de empate em pontos, ganha quem tiver mais placares exatos</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Fases do torneio</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Fase de Grupos: 72 jogos (12 grupos de 4 selecoes)</li>
                  <li>Segunda Fase: 16 jogos (32 classificados)</li>
                  <li>Oitavas de Final: 8 jogos</li>
                  <li>Quartas de Final: 4 jogos</li>
                  <li>Semifinais: 2 jogos</li>
                  <li>Disputa de 3o lugar e Final</li>
                </ul>
                <p className="text-sm mt-2 text-gray-500">
                  Os jogos das fases seguintes aparecem como &quot;A definir&quot; ate que os times sejam confirmados.
                  A pontuacao e a mesma em todas as fases.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400">
        Bolao Copa do Mundo 2026 &bull; 48 selecoes &bull; {matches.length} jogos
      </footer>
    </div>
  )
}
