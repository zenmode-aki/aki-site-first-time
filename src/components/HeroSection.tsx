'use client'

import { motion } from 'framer-motion'
import { ArrowDownIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
  return (
    <section id="hero" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* プロフィール画像エリア */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-xl">
              あき
            </div>
          </motion.div>

          {/* メインタイトル */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
          >
            江崎 あき
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block text-2xl md:text-3xl lg:text-4xl text-primary-600 font-normal mt-2"
            >
              Personal Learning Journey
            </motion.span>
          </motion.h1>

          {/* 説明文 */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            完璧を求めがちな性格から解放されて、<br className="hidden sm:block" />
            自由に学習と発信を楽しむための個人的な空間。<br className="hidden sm:block" />
            ここでは失敗も成功も、すべてが学びの一部です。
          </motion.p>

          {/* アクションボタン */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <SparklesIcon className="h-4 w-4" />
              学習ジャーニーを見る
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors duration-200"
              onClick={() => document.getElementById('health')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ヘルストラッカーを見る
            </motion.button>
          </motion.div>

          {/* スクロールダウンインジケーター */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-gray-500 mb-2">下にスクロール</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDownIcon className="h-5 w-5 text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 背景装飾 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"
        />
      </div>
    </section>
  )
} 