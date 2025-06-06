import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '江崎 あき | Personal Website',
  description: '個人的な学習記録と発信のためのウェブサイト',
  keywords: ['個人ウェブサイト', '学習記録', 'ポートフォリオ', '江崎あき'],
  authors: [{ name: '江崎 あき' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {children}
      </body>
    </html>
  )
} 