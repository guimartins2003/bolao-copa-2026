import { Match } from './types'

export const matches: Match[] = [
  // ============ GRUPO A ============
  { id: 'A1', group: 'A', stage: 'Fase de Grupos', date: '2026-06-11', time: '16:00', homeTeam: 'Mexico', awayTeam: 'Africa do Sul', homeFlag: '\u{1F1F2}\u{1F1FD}', awayFlag: '\u{1F1FF}\u{1F1E6}' },
  { id: 'A2', group: 'A', stage: 'Fase de Grupos', date: '2026-06-11', time: '23:00', homeTeam: 'Coreia do Sul', awayTeam: 'Republica Tcheca', homeFlag: '\u{1F1F0}\u{1F1F7}', awayFlag: '\u{1F1E8}\u{1F1FF}' },
  { id: 'A3', group: 'A', stage: 'Fase de Grupos', date: '2026-06-18', time: '13:00', homeTeam: 'Republica Tcheca', awayTeam: 'Africa do Sul', homeFlag: '\u{1F1E8}\u{1F1FF}', awayFlag: '\u{1F1FF}\u{1F1E6}' },
  { id: 'A4', group: 'A', stage: 'Fase de Grupos', date: '2026-06-18', time: '22:00', homeTeam: 'Mexico', awayTeam: 'Coreia do Sul', homeFlag: '\u{1F1F2}\u{1F1FD}', awayFlag: '\u{1F1F0}\u{1F1F7}' },
  { id: 'A5', group: 'A', stage: 'Fase de Grupos', date: '2026-06-24', time: '22:00', homeTeam: 'Republica Tcheca', awayTeam: 'Mexico', homeFlag: '\u{1F1E8}\u{1F1FF}', awayFlag: '\u{1F1F2}\u{1F1FD}' },
  { id: 'A6', group: 'A', stage: 'Fase de Grupos', date: '2026-06-24', time: '22:00', homeTeam: 'Africa do Sul', awayTeam: 'Coreia do Sul', homeFlag: '\u{1F1FF}\u{1F1E6}', awayFlag: '\u{1F1F0}\u{1F1F7}' },

  // ============ GRUPO B ============
  { id: 'B1', group: 'B', stage: 'Fase de Grupos', date: '2026-06-12', time: '16:00', homeTeam: 'Canada', awayTeam: 'Bosnia e Herzegovina', homeFlag: '\u{1F1E8}\u{1F1E6}', awayFlag: '\u{1F1E7}\u{1F1E6}' },
  { id: 'B2', group: 'B', stage: 'Fase de Grupos', date: '2026-06-13', time: '16:00', homeTeam: 'Qatar', awayTeam: 'Suica', homeFlag: '\u{1F1F6}\u{1F1E6}', awayFlag: '\u{1F1E8}\u{1F1ED}' },
  { id: 'B3', group: 'B', stage: 'Fase de Grupos', date: '2026-06-18', time: '16:00', homeTeam: 'Suica', awayTeam: 'Bosnia e Herzegovina', homeFlag: '\u{1F1E8}\u{1F1ED}', awayFlag: '\u{1F1E7}\u{1F1E6}' },
  { id: 'B4', group: 'B', stage: 'Fase de Grupos', date: '2026-06-18', time: '19:00', homeTeam: 'Canada', awayTeam: 'Qatar', homeFlag: '\u{1F1E8}\u{1F1E6}', awayFlag: '\u{1F1F6}\u{1F1E6}' },
  { id: 'B5', group: 'B', stage: 'Fase de Grupos', date: '2026-06-24', time: '16:00', homeTeam: 'Suica', awayTeam: 'Canada', homeFlag: '\u{1F1E8}\u{1F1ED}', awayFlag: '\u{1F1E8}\u{1F1E6}' },
  { id: 'B6', group: 'B', stage: 'Fase de Grupos', date: '2026-06-24', time: '16:00', homeTeam: 'Bosnia e Herzegovina', awayTeam: 'Qatar', homeFlag: '\u{1F1E7}\u{1F1E6}', awayFlag: '\u{1F1F6}\u{1F1E6}' },

  // ============ GRUPO C ============
  { id: 'C1', group: 'C', stage: 'Fase de Grupos', date: '2026-06-13', time: '19:00', homeTeam: 'Brasil', awayTeam: 'Marrocos', homeFlag: '\u{1F1E7}\u{1F1F7}', awayFlag: '\u{1F1F2}\u{1F1E6}' },
  { id: 'C2', group: 'C', stage: 'Fase de Grupos', date: '2026-06-13', time: '22:00', homeTeam: 'Haiti', awayTeam: 'Escocia', homeFlag: '\u{1F1ED}\u{1F1F9}', awayFlag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}' },
  { id: 'C3', group: 'C', stage: 'Fase de Grupos', date: '2026-06-19', time: '21:30', homeTeam: 'Brasil', awayTeam: 'Haiti', homeFlag: '\u{1F1E7}\u{1F1F7}', awayFlag: '\u{1F1ED}\u{1F1F9}' },
  { id: 'C4', group: 'C', stage: 'Fase de Grupos', date: '2026-06-19', time: '19:00', homeTeam: 'Escocia', awayTeam: 'Marrocos', homeFlag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}', awayFlag: '\u{1F1F2}\u{1F1E6}' },
  { id: 'C5', group: 'C', stage: 'Fase de Grupos', date: '2026-06-24', time: '19:00', homeTeam: 'Escocia', awayTeam: 'Brasil', homeFlag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}', awayFlag: '\u{1F1E7}\u{1F1F7}' },
  { id: 'C6', group: 'C', stage: 'Fase de Grupos', date: '2026-06-24', time: '19:00', homeTeam: 'Marrocos', awayTeam: 'Haiti', homeFlag: '\u{1F1F2}\u{1F1E6}', awayFlag: '\u{1F1ED}\u{1F1F9}' },

  // ============ GRUPO D ============
  { id: 'D1', group: 'D', stage: 'Fase de Grupos', date: '2026-06-12', time: '22:00', homeTeam: 'Estados Unidos', awayTeam: 'Paraguai', homeFlag: '\u{1F1FA}\u{1F1F8}', awayFlag: '\u{1F1F5}\u{1F1FE}' },
  { id: 'D2', group: 'D', stage: 'Fase de Grupos', date: '2026-06-13', time: '01:00', homeTeam: 'Australia', awayTeam: 'Turquia', homeFlag: '\u{1F1E6}\u{1F1FA}', awayFlag: '\u{1F1F9}\u{1F1F7}' },
  { id: 'D3', group: 'D', stage: 'Fase de Grupos', date: '2026-06-19', time: '01:00', homeTeam: 'Turquia', awayTeam: 'Paraguai', homeFlag: '\u{1F1F9}\u{1F1F7}', awayFlag: '\u{1F1F5}\u{1F1FE}' },
  { id: 'D4', group: 'D', stage: 'Fase de Grupos', date: '2026-06-19', time: '16:00', homeTeam: 'Estados Unidos', awayTeam: 'Australia', homeFlag: '\u{1F1FA}\u{1F1F8}', awayFlag: '\u{1F1E6}\u{1F1FA}' },
  { id: 'D5', group: 'D', stage: 'Fase de Grupos', date: '2026-06-25', time: '23:00', homeTeam: 'Turquia', awayTeam: 'Estados Unidos', homeFlag: '\u{1F1F9}\u{1F1F7}', awayFlag: '\u{1F1FA}\u{1F1F8}' },
  { id: 'D6', group: 'D', stage: 'Fase de Grupos', date: '2026-06-25', time: '23:00', homeTeam: 'Paraguai', awayTeam: 'Australia', homeFlag: '\u{1F1F5}\u{1F1FE}', awayFlag: '\u{1F1E6}\u{1F1FA}' },

  // ============ GRUPO E ============
  { id: 'E1', group: 'E', stage: 'Fase de Grupos', date: '2026-06-14', time: '14:00', homeTeam: 'Alemanha', awayTeam: 'Curacao', homeFlag: '\u{1F1E9}\u{1F1EA}', awayFlag: '\u{1F1E8}\u{1F1FC}' },
  { id: 'E2', group: 'E', stage: 'Fase de Grupos', date: '2026-06-14', time: '20:00', homeTeam: 'Costa do Marfim', awayTeam: 'Equador', homeFlag: '\u{1F1E8}\u{1F1EE}', awayFlag: '\u{1F1EA}\u{1F1E8}' },
  { id: 'E3', group: 'E', stage: 'Fase de Grupos', date: '2026-06-20', time: '17:00', homeTeam: 'Alemanha', awayTeam: 'Costa do Marfim', homeFlag: '\u{1F1E9}\u{1F1EA}', awayFlag: '\u{1F1E8}\u{1F1EE}' },
  { id: 'E4', group: 'E', stage: 'Fase de Grupos', date: '2026-06-20', time: '21:00', homeTeam: 'Equador', awayTeam: 'Curacao', homeFlag: '\u{1F1EA}\u{1F1E8}', awayFlag: '\u{1F1E8}\u{1F1FC}' },
  { id: 'E5', group: 'E', stage: 'Fase de Grupos', date: '2026-06-25', time: '17:00', homeTeam: 'Equador', awayTeam: 'Alemanha', homeFlag: '\u{1F1EA}\u{1F1E8}', awayFlag: '\u{1F1E9}\u{1F1EA}' },
  { id: 'E6', group: 'E', stage: 'Fase de Grupos', date: '2026-06-25', time: '17:00', homeTeam: 'Curacao', awayTeam: 'Costa do Marfim', homeFlag: '\u{1F1E8}\u{1F1FC}', awayFlag: '\u{1F1E8}\u{1F1EE}' },

  // ============ GRUPO F ============
  { id: 'F1', group: 'F', stage: 'Fase de Grupos', date: '2026-06-14', time: '17:00', homeTeam: 'Holanda', awayTeam: 'Japao', homeFlag: '\u{1F1F3}\u{1F1F1}', awayFlag: '\u{1F1EF}\u{1F1F5}' },
  { id: 'F2', group: 'F', stage: 'Fase de Grupos', date: '2026-06-14', time: '23:00', homeTeam: 'Suecia', awayTeam: 'Tunisia', homeFlag: '\u{1F1F8}\u{1F1EA}', awayFlag: '\u{1F1F9}\u{1F1F3}' },
  { id: 'F3', group: 'F', stage: 'Fase de Grupos', date: '2026-06-20', time: '14:00', homeTeam: 'Holanda', awayTeam: 'Suecia', homeFlag: '\u{1F1F3}\u{1F1F1}', awayFlag: '\u{1F1F8}\u{1F1EA}' },
  { id: 'F4', group: 'F', stage: 'Fase de Grupos', date: '2026-06-20', time: '01:00', homeTeam: 'Tunisia', awayTeam: 'Japao', homeFlag: '\u{1F1F9}\u{1F1F3}', awayFlag: '\u{1F1EF}\u{1F1F5}' },
  { id: 'F5', group: 'F', stage: 'Fase de Grupos', date: '2026-06-25', time: '20:00', homeTeam: 'Tunisia', awayTeam: 'Holanda', homeFlag: '\u{1F1F9}\u{1F1F3}', awayFlag: '\u{1F1F3}\u{1F1F1}' },
  { id: 'F6', group: 'F', stage: 'Fase de Grupos', date: '2026-06-25', time: '20:00', homeTeam: 'Japao', awayTeam: 'Suecia', homeFlag: '\u{1F1EF}\u{1F1F5}', awayFlag: '\u{1F1F8}\u{1F1EA}' },

  // ============ GRUPO G ============
  { id: 'G1', group: 'G', stage: 'Fase de Grupos', date: '2026-06-15', time: '16:00', homeTeam: 'Belgica', awayTeam: 'Egito', homeFlag: '\u{1F1E7}\u{1F1EA}', awayFlag: '\u{1F1EA}\u{1F1EC}' },
  { id: 'G2', group: 'G', stage: 'Fase de Grupos', date: '2026-06-15', time: '22:00', homeTeam: 'Ira', awayTeam: 'Nova Zelandia', homeFlag: '\u{1F1EE}\u{1F1F7}', awayFlag: '\u{1F1F3}\u{1F1FF}' },
  { id: 'G3', group: 'G', stage: 'Fase de Grupos', date: '2026-06-21', time: '16:00', homeTeam: 'Belgica', awayTeam: 'Ira', homeFlag: '\u{1F1E7}\u{1F1EA}', awayFlag: '\u{1F1EE}\u{1F1F7}' },
  { id: 'G4', group: 'G', stage: 'Fase de Grupos', date: '2026-06-21', time: '22:00', homeTeam: 'Nova Zelandia', awayTeam: 'Egito', homeFlag: '\u{1F1F3}\u{1F1FF}', awayFlag: '\u{1F1EA}\u{1F1EC}' },
  { id: 'G5', group: 'G', stage: 'Fase de Grupos', date: '2026-06-27', time: '00:00', homeTeam: 'Nova Zelandia', awayTeam: 'Belgica', homeFlag: '\u{1F1F3}\u{1F1FF}', awayFlag: '\u{1F1E7}\u{1F1EA}' },
  { id: 'G6', group: 'G', stage: 'Fase de Grupos', date: '2026-06-27', time: '00:00', homeTeam: 'Egito', awayTeam: 'Ira', homeFlag: '\u{1F1EA}\u{1F1EC}', awayFlag: '\u{1F1EE}\u{1F1F7}' },

  // ============ GRUPO H ============
  { id: 'H1', group: 'H', stage: 'Fase de Grupos', date: '2026-06-15', time: '13:00', homeTeam: 'Espanha', awayTeam: 'Cabo Verde', homeFlag: '\u{1F1EA}\u{1F1F8}', awayFlag: '\u{1F1E8}\u{1F1FB}' },
  { id: 'H2', group: 'H', stage: 'Fase de Grupos', date: '2026-06-15', time: '19:00', homeTeam: 'Arabia Saudita', awayTeam: 'Uruguai', homeFlag: '\u{1F1F8}\u{1F1E6}', awayFlag: '\u{1F1FA}\u{1F1FE}' },
  { id: 'H3', group: 'H', stage: 'Fase de Grupos', date: '2026-06-21', time: '13:00', homeTeam: 'Espanha', awayTeam: 'Arabia Saudita', homeFlag: '\u{1F1EA}\u{1F1F8}', awayFlag: '\u{1F1F8}\u{1F1E6}' },
  { id: 'H4', group: 'H', stage: 'Fase de Grupos', date: '2026-06-21', time: '19:00', homeTeam: 'Uruguai', awayTeam: 'Cabo Verde', homeFlag: '\u{1F1FA}\u{1F1FE}', awayFlag: '\u{1F1E8}\u{1F1FB}' },
  { id: 'H5', group: 'H', stage: 'Fase de Grupos', date: '2026-06-26', time: '21:00', homeTeam: 'Uruguai', awayTeam: 'Espanha', homeFlag: '\u{1F1FA}\u{1F1FE}', awayFlag: '\u{1F1EA}\u{1F1F8}' },
  { id: 'H6', group: 'H', stage: 'Fase de Grupos', date: '2026-06-26', time: '21:00', homeTeam: 'Cabo Verde', awayTeam: 'Arabia Saudita', homeFlag: '\u{1F1E8}\u{1F1FB}', awayFlag: '\u{1F1F8}\u{1F1E6}' },

  // ============ GRUPO I ============
  { id: 'I1', group: 'I', stage: 'Fase de Grupos', date: '2026-06-16', time: '16:00', homeTeam: 'Franca', awayTeam: 'Senegal', homeFlag: '\u{1F1EB}\u{1F1F7}', awayFlag: '\u{1F1F8}\u{1F1F3}' },
  { id: 'I2', group: 'I', stage: 'Fase de Grupos', date: '2026-06-16', time: '19:00', homeTeam: 'Iraque', awayTeam: 'Noruega', homeFlag: '\u{1F1EE}\u{1F1F6}', awayFlag: '\u{1F1F3}\u{1F1F4}' },
  { id: 'I3', group: 'I', stage: 'Fase de Grupos', date: '2026-06-22', time: '18:00', homeTeam: 'Franca', awayTeam: 'Iraque', homeFlag: '\u{1F1EB}\u{1F1F7}', awayFlag: '\u{1F1EE}\u{1F1F6}' },
  { id: 'I4', group: 'I', stage: 'Fase de Grupos', date: '2026-06-22', time: '21:00', homeTeam: 'Noruega', awayTeam: 'Senegal', homeFlag: '\u{1F1F3}\u{1F1F4}', awayFlag: '\u{1F1F8}\u{1F1F3}' },
  { id: 'I5', group: 'I', stage: 'Fase de Grupos', date: '2026-06-26', time: '16:00', homeTeam: 'Noruega', awayTeam: 'Franca', homeFlag: '\u{1F1F3}\u{1F1F4}', awayFlag: '\u{1F1EB}\u{1F1F7}' },
  { id: 'I6', group: 'I', stage: 'Fase de Grupos', date: '2026-06-26', time: '16:00', homeTeam: 'Senegal', awayTeam: 'Iraque', homeFlag: '\u{1F1F8}\u{1F1F3}', awayFlag: '\u{1F1EE}\u{1F1F6}' },

  // ============ GRUPO J ============
  { id: 'J1', group: 'J', stage: 'Fase de Grupos', date: '2026-06-16', time: '22:00', homeTeam: 'Argentina', awayTeam: 'Argelia', homeFlag: '\u{1F1E6}\u{1F1F7}', awayFlag: '\u{1F1E9}\u{1F1FF}' },
  { id: 'J2', group: 'J', stage: 'Fase de Grupos', date: '2026-06-16', time: '01:00', homeTeam: 'Austria', awayTeam: 'Jordania', homeFlag: '\u{1F1E6}\u{1F1F9}', awayFlag: '\u{1F1EF}\u{1F1F4}' },
  { id: 'J3', group: 'J', stage: 'Fase de Grupos', date: '2026-06-22', time: '14:00', homeTeam: 'Argentina', awayTeam: 'Austria', homeFlag: '\u{1F1E6}\u{1F1F7}', awayFlag: '\u{1F1E6}\u{1F1F9}' },
  { id: 'J4', group: 'J', stage: 'Fase de Grupos', date: '2026-06-22', time: '00:00', homeTeam: 'Jordania', awayTeam: 'Argelia', homeFlag: '\u{1F1EF}\u{1F1F4}', awayFlag: '\u{1F1E9}\u{1F1FF}' },
  { id: 'J5', group: 'J', stage: 'Fase de Grupos', date: '2026-06-27', time: '23:00', homeTeam: 'Jordania', awayTeam: 'Argentina', homeFlag: '\u{1F1EF}\u{1F1F4}', awayFlag: '\u{1F1E6}\u{1F1F7}' },
  { id: 'J6', group: 'J', stage: 'Fase de Grupos', date: '2026-06-27', time: '23:00', homeTeam: 'Argelia', awayTeam: 'Austria', homeFlag: '\u{1F1E9}\u{1F1FF}', awayFlag: '\u{1F1E6}\u{1F1F9}' },

  // ============ GRUPO K ============
  { id: 'K1', group: 'K', stage: 'Fase de Grupos', date: '2026-06-17', time: '14:00', homeTeam: 'Portugal', awayTeam: 'RD Congo', homeFlag: '\u{1F1F5}\u{1F1F9}', awayFlag: '\u{1F1E8}\u{1F1E9}' },
  { id: 'K2', group: 'K', stage: 'Fase de Grupos', date: '2026-06-17', time: '23:00', homeTeam: 'Uzbequistao', awayTeam: 'Colombia', homeFlag: '\u{1F1FA}\u{1F1FF}', awayFlag: '\u{1F1E8}\u{1F1F4}' },
  { id: 'K3', group: 'K', stage: 'Fase de Grupos', date: '2026-06-23', time: '14:00', homeTeam: 'Portugal', awayTeam: 'Uzbequistao', homeFlag: '\u{1F1F5}\u{1F1F9}', awayFlag: '\u{1F1FA}\u{1F1FF}' },
  { id: 'K4', group: 'K', stage: 'Fase de Grupos', date: '2026-06-23', time: '23:00', homeTeam: 'Colombia', awayTeam: 'RD Congo', homeFlag: '\u{1F1E8}\u{1F1F4}', awayFlag: '\u{1F1E8}\u{1F1E9}' },
  { id: 'K5', group: 'K', stage: 'Fase de Grupos', date: '2026-06-27', time: '20:30', homeTeam: 'Colombia', awayTeam: 'Portugal', homeFlag: '\u{1F1E8}\u{1F1F4}', awayFlag: '\u{1F1F5}\u{1F1F9}' },
  { id: 'K6', group: 'K', stage: 'Fase de Grupos', date: '2026-06-27', time: '20:30', homeTeam: 'RD Congo', awayTeam: 'Uzbequistao', homeFlag: '\u{1F1E8}\u{1F1E9}', awayFlag: '\u{1F1FA}\u{1F1FF}' },

  // ============ GRUPO L ============
  { id: 'L1', group: 'L', stage: 'Fase de Grupos', date: '2026-06-17', time: '17:00', homeTeam: 'Inglaterra', awayTeam: 'Croacia', homeFlag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}', awayFlag: '\u{1F1ED}\u{1F1F7}' },
  { id: 'L2', group: 'L', stage: 'Fase de Grupos', date: '2026-06-17', time: '20:00', homeTeam: 'Gana', awayTeam: 'Panama', homeFlag: '\u{1F1EC}\u{1F1ED}', awayFlag: '\u{1F1F5}\u{1F1E6}' },
  { id: 'L3', group: 'L', stage: 'Fase de Grupos', date: '2026-06-23', time: '17:00', homeTeam: 'Inglaterra', awayTeam: 'Gana', homeFlag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}', awayFlag: '\u{1F1EC}\u{1F1ED}' },
  { id: 'L4', group: 'L', stage: 'Fase de Grupos', date: '2026-06-23', time: '20:00', homeTeam: 'Panama', awayTeam: 'Croacia', homeFlag: '\u{1F1F5}\u{1F1E6}', awayFlag: '\u{1F1ED}\u{1F1F7}' },
  { id: 'L5', group: 'L', stage: 'Fase de Grupos', date: '2026-06-27', time: '18:00', homeTeam: 'Panama', awayTeam: 'Inglaterra', homeFlag: '\u{1F1F5}\u{1F1E6}', awayFlag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}' },
  { id: 'L6', group: 'L', stage: 'Fase de Grupos', date: '2026-06-27', time: '18:00', homeTeam: 'Croacia', awayTeam: 'Gana', homeFlag: '\u{1F1ED}\u{1F1F7}', awayFlag: '\u{1F1EC}\u{1F1ED}' },

  // ============================================================
  // =================== FASE ELIMINATORIA ======================
  // ============================================================

  // ============ SEGUNDA FASE (Round of 32) ============
  { id: 'R32_1', group: 'R32', stage: 'Segunda Fase', date: '2026-06-28', time: '16:00', homeTeam: 'Africa do Sul', awayTeam: 'Canada', homeFlag: '\u{1F1FF}\u{1F1E6}', awayFlag: '\u{1F1E8}\u{1F1E6}' },
  { id: 'R32_2', group: 'R32', stage: 'Segunda Fase', date: '2026-06-29', time: '14:00', homeTeam: 'Brasil', awayTeam: 'Japao', homeFlag: '\u{1F1E7}\u{1F1F7}', awayFlag: '\u{1F1EF}\u{1F1F5}' },
  { id: 'R32_3', group: 'R32', stage: 'Segunda Fase', date: '2026-06-29', time: '17:30', homeTeam: 'Alemanha', awayTeam: 'Paraguai', homeFlag: '\u{1F1E9}\u{1F1EA}', awayFlag: '\u{1F1F5}\u{1F1FE}' },
  { id: 'R32_4', group: 'R32', stage: 'Segunda Fase', date: '2026-06-29', time: '22:00', homeTeam: 'Holanda', awayTeam: 'Marrocos', homeFlag: '\u{1F1F3}\u{1F1F1}', awayFlag: '\u{1F1F2}\u{1F1E6}' },
  { id: 'R32_5', group: 'R32', stage: 'Segunda Fase', date: '2026-06-30', time: '14:00', homeTeam: 'Costa do Marfim', awayTeam: 'Noruega', homeFlag: '\u{1F1E8}\u{1F1EE}', awayFlag: '\u{1F1F3}\u{1F1F4}' },
  { id: 'R32_6', group: 'R32', stage: 'Segunda Fase', date: '2026-06-30', time: '18:00', homeTeam: 'Franca', awayTeam: 'Suecia', homeFlag: '\u{1F1EB}\u{1F1F7}', awayFlag: '\u{1F1F8}\u{1F1EA}' },
  { id: 'R32_7', group: 'R32', stage: 'Segunda Fase', date: '2026-06-30', time: '22:00', homeTeam: 'Mexico', awayTeam: 'Equador', homeFlag: '\u{1F1F2}\u{1F1FD}', awayFlag: '\u{1F1EA}\u{1F1E8}' },
  { id: 'R32_8', group: 'R32', stage: 'Segunda Fase', date: '2026-07-01', time: '13:00', homeTeam: 'Inglaterra', awayTeam: 'RD Congo', homeFlag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}', awayFlag: '\u{1F1E8}\u{1F1E9}' },
  { id: 'R32_9', group: 'R32', stage: 'Segunda Fase', date: '2026-07-01', time: '17:00', homeTeam: 'Belgica', awayTeam: 'Senegal', homeFlag: '\u{1F1E7}\u{1F1EA}', awayFlag: '\u{1F1F8}\u{1F1F3}' },
  { id: 'R32_10', group: 'R32', stage: 'Segunda Fase', date: '2026-07-01', time: '21:00', homeTeam: 'Estados Unidos', awayTeam: 'Bosnia e Herzegovina', homeFlag: '\u{1F1FA}\u{1F1F8}', awayFlag: '\u{1F1E7}\u{1F1E6}' },
  { id: 'R32_11', group: 'R32', stage: 'Segunda Fase', date: '2026-07-02', time: '16:00', homeTeam: 'Espanha', awayTeam: 'Austria', homeFlag: '\u{1F1EA}\u{1F1F8}', awayFlag: '\u{1F1E6}\u{1F1F9}' },
  { id: 'R32_12', group: 'R32', stage: 'Segunda Fase', date: '2026-07-02', time: '20:00', homeTeam: 'Portugal', awayTeam: 'Croacia', homeFlag: '\u{1F1F5}\u{1F1F9}', awayFlag: '\u{1F1ED}\u{1F1F7}' },
  { id: 'R32_13', group: 'R32', stage: 'Segunda Fase', date: '2026-07-03', time: '00:00', homeTeam: 'Suica', awayTeam: 'Ira', homeFlag: '\u{1F1E8}\u{1F1ED}', awayFlag: '\u{1F1EE}\u{1F1F7}' },
  { id: 'R32_14', group: 'R32', stage: 'Segunda Fase', date: '2026-07-03', time: '15:00', homeTeam: 'Australia', awayTeam: 'Egito', homeFlag: '\u{1F1E6}\u{1F1FA}', awayFlag: '\u{1F1EA}\u{1F1EC}' },
  { id: 'R32_15', group: 'R32', stage: 'Segunda Fase', date: '2026-07-03', time: '19:00', homeTeam: 'Argentina', awayTeam: 'Cabo Verde', homeFlag: '\u{1F1E6}\u{1F1F7}', awayFlag: '\u{1F1E8}\u{1F1FB}' },
  { id: 'R32_16', group: 'R32', stage: 'Segunda Fase', date: '2026-07-03', time: '22:30', homeTeam: 'Colombia', awayTeam: 'Gana', homeFlag: '\u{1F1E8}\u{1F1F4}', awayFlag: '\u{1F1EC}\u{1F1ED}' },

  // ============ OITAVAS DE FINAL (Round of 16) ============
  { id: 'R16_1', group: 'R16', stage: 'Oitavas de Final', date: '2026-07-04', time: '14:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'R16_2', group: 'R16', stage: 'Oitavas de Final', date: '2026-07-04', time: '18:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'R16_3', group: 'R16', stage: 'Oitavas de Final', date: '2026-07-05', time: '17:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'R16_4', group: 'R16', stage: 'Oitavas de Final', date: '2026-07-05', time: '21:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'R16_5', group: 'R16', stage: 'Oitavas de Final', date: '2026-07-06', time: '16:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'R16_6', group: 'R16', stage: 'Oitavas de Final', date: '2026-07-06', time: '21:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'R16_7', group: 'R16', stage: 'Oitavas de Final', date: '2026-07-07', time: '13:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'R16_8', group: 'R16', stage: 'Oitavas de Final', date: '2026-07-07', time: '17:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },

  // ============ QUARTAS DE FINAL ============
  { id: 'QF1', group: 'QF', stage: 'Quartas de Final', date: '2026-07-09', time: '17:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'QF2', group: 'QF', stage: 'Quartas de Final', date: '2026-07-10', time: '16:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'QF3', group: 'QF', stage: 'Quartas de Final', date: '2026-07-11', time: '18:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'QF4', group: 'QF', stage: 'Quartas de Final', date: '2026-07-11', time: '22:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },

  // ============ SEMIFINAIS ============
  { id: 'SF1', group: 'SF', stage: 'Semifinal', date: '2026-07-14', time: '16:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
  { id: 'SF2', group: 'SF', stage: 'Semifinal', date: '2026-07-15', time: '16:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },

  // ============ DISPUTA DE 3o LUGAR ============
  { id: 'TPP', group: 'FIN', stage: 'Disputa de 3o Lugar', date: '2026-07-18', time: '17:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },

  // ============ FINAL ============
  { id: 'FIN', group: 'FIN', stage: 'Final', date: '2026-07-19', time: '16:00', homeTeam: 'A definir', awayTeam: 'A definir', homeFlag: '\u{1F3F3}\u{FE0F}', awayFlag: '\u{1F3F3}\u{FE0F}' },
]

export const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export const knockoutStages = [
  { key: 'R32', label: '2a Fase' },
  { key: 'R16', label: 'Oitavas' },
  { key: 'QF', label: 'Quartas' },
  { key: 'SF', label: 'Semis' },
  { key: 'FIN', label: 'Finais' },
]

export const stageLabels: Record<string, string> = {
  'R32': 'Segunda Fase',
  'R16': 'Oitavas de Final',
  'QF': 'Quartas de Final',
  'SF': 'Semifinal',
  'FIN': 'Finais',
}

export function getMatchesByGroup(group: string): Match[] {
  return matches.filter(m => m.group === group)
}

export function formatDate(dateStr: string, time: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  const weekday = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', weekday: 'short' })
  return `${weekday} - ${time}h`
}

// Retorna true se o palpite esta bloqueado (falta menos de 1 hora para o jogo, horario de Brasilia)
export function isPredictionLocked(dateStr: string, time: string): boolean {
  const [hours, minutes] = time.split(':').map(Number)
  // Monta a data/hora do jogo em UTC (Brasilia = UTC-3, entao soma 3h para converter para UTC)
  const matchDate = new Date(dateStr + 'T00:00:00Z')
  matchDate.setUTCHours(hours + 3, minutes, 0, 0)
  // Subtrai 1 hora para o limite
  const lockTime = new Date(matchDate.getTime() - 60 * 60 * 1000)
  return new Date() >= lockTime
}

export function isKnockoutStage(group: string): boolean {
  return ['R32', 'R16', 'QF', 'SF', 'FIN'].includes(group)
}

export function getStageLabel(group: string): string {
  if (isKnockoutStage(group)) return stageLabels[group] || group
  return `Grupo ${group}`
}
