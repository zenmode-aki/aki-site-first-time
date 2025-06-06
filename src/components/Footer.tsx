'use client'

import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.987 11.987s11.987-5.367 11.987-11.987C24.003 5.367 18.636.001 12.017.001zM8.48 16.532c-2.173 0-3.933-1.76-3.933-3.933s1.76-3.933 3.933-3.933 3.933 1.76 3.933 3.933-1.76 3.933-3.933 3.933zm7.52-8.572c-.52 0-.942-.42-.942-.942s.422-.942.942-.942.942.42.942.942-.422.942-.942.942z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* ブランド情報 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4">江崎 あき</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              完璧を求めることから自由になり、学習と成長の過程を楽しむための個人的な空間。
              ここでは失敗も成功も、すべてが価値ある学びです。
            </p>
            
            {/* 統計情報 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-400">7</div>
                <div className="text-xs text-gray-400">学習カテゴリー</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-400">18</div>
                <div className="text-xs text-gray-400">マイルール</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-400">24/7</div>
                <div className="text-xs text-gray-400">ヘルストラッキング</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-400">∞</div>
                <div className="text-xs text-gray-400">成長の可能性</div>
              </div>
            </div>
          </motion.div>

          {/* SNSリンク */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <h4 className="text-lg font-semibold mb-4">SNSで繋がろう</h4>
            <p className="text-gray-300 text-sm mb-6">
              学習の様子や日常の気づきを発信しています。
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-primary-600 transition-colors duration-200"
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* セパレーター */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 my-8"
        />

        {/* ボトム情報 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 sm:mb-0">
            <span>© {currentYear} 江崎 あき. すべての権利を保有。</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Created with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HeartIcon className="h-3 w-3 text-red-500" />
            </motion.div>
            <span>& Next.js</span>
          </div>
        </motion.div>

        {/* 追加メッセージ */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-700"
        >
          <blockquote className="text-center">
            <p className="text-gray-300 italic">
              "Perfect is the enemy of good. Progress, not perfection."
            </p>
            <footer className="text-gray-500 text-sm mt-2">
              - 自分への言葉
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </footer>
  )
} 