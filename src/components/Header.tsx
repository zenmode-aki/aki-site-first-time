'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ヘルストラッカー', href: '/health' },
    { label: 'マイルール', href: '/rules' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-xl text-gray-900"
          >
            <a href="/" className="text-gray-900 hover:text-primary-600 transition-colors">
              江崎 あき
            </a>
          </motion.div>

          {/* デスクトップメニュー */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            {menuItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
} 