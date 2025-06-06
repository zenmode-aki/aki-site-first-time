'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { HomeIcon, PencilSquareIcon, HeartIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useSidebar } from '@/context/SidebarContext'

export default function Header() {
  const { isOpen, toggleSidebar } = useSidebar()
  const menuItems = [
    { label: 'ホーム', href: '/', icon: HomeIcon },
    { label: '投稿', href: '/posts', icon: PencilSquareIcon },
    { label: 'ヘルスケア', href: '/health', icon: HeartIcon },
    { label: '自分ルール', href: '/rules', icon: Cog6ToothIcon },
  ]

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 240 : 88 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 h-screen bg-white/80 backdrop-blur-lg border-r border-gray-200 z-50 p-6 flex flex-col"
    >
      {/* ロゴと開閉ボタン */}
      <div className="flex items-center justify-between mb-10">
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Link href="/" passHref>
                <a className="font-bold text-2xl text-gray-900">
                  江崎 あき
                </a>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-200">
          {isOpen ? <ArrowLeftOnRectangleIcon className="h-6 w-6" /> : <ArrowRightOnRectangleIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href} passHref>
                <a className={`flex items-center gap-4 p-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium ${!isOpen && 'justify-center'}`}>
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="whitespace-nowrap">
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* フッター情報 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-gray-500">
            <p>&copy; 2024 Aki Ezaki</p>
            <p>All rights reserved.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
} 