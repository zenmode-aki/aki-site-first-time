'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import FeedSection from '@/components/FeedSection'
import HeroSection from '@/components/HeroSection'
import CategoryGallery from '@/components/CategoryGallery'
import Footer from '@/components/Footer'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" />
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-16 md:space-y-24"
      >
        {/* 自分の投稿欄 */}
        <FeedSection />
        {/* ヒーローセクション（自己紹介） */}
        <HeroSection />
        
        {/* カテゴリギャラリー（学習ジャーニー） */}
        <CategoryGallery />
        
        {/* 簡単なヘルスケア情報 */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                健康への取り組み
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                日々の健康データを記録し、自分の体調や生活リズムを把握することで、<br />
                より良い生活習慣を築いています。
              </p>
              <motion.a
                href="/health"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-200"
              >
                詳細なヘルストラッカーを見る →
              </motion.a>
            </motion.div>
          </div>
        </section>
        
        {/* マイルールへのリンク */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                マイルール
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                自分らしい生活を送るために決めたルールや習慣。<br />
                完璧を目指さず、継続することを大切にしています。
              </p>
              <motion.a
                href="/rules"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-700 transition-colors duration-200"
              >
                マイルール集を見る →
              </motion.a>
            </motion.div>
          </div>
        </section>
      </motion.div>
      
      <Footer />
    </main>
  )
} 