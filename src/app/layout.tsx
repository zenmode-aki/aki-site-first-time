import type { Metadata } from 'next'
import './globals.css'
import { SidebarProvider, useSidebar } from '@/context/SidebarContext'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: '江崎 あき | Personal Website',
  description: '個人的な学習記録と発信のためのウェブサイト',
  keywords: ['個人ウェブサイト', '学習記録', 'ポートフォリオ', '江崎あき'],
  authors: [{ name: '江崎 あき' }],
  viewport: 'width=device-width, initial-scale=1',
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  return (
    <>
      <Header />
      <main className={`transition-all duration-300 ${isOpen ? 'ml-60' : 'ml-22'}`}>
        {children}
      </main>
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <SidebarProvider>
          <AppLayout>{children}</AppLayout>
        </SidebarProvider>
      </body>
    </html>
  )
} 