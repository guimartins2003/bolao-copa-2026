import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bolao Copa 2026',
  description: 'Bolao da Copa do Mundo FIFA 2026 - Faca seus palpites!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
