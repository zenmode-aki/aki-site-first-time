'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import HealthTracker from '@/components/HealthTracker'
import Footer from '@/components/Footer'

export default function HealthPage() {
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
        className="pt-24 pb-16"
      >
        {/* ページヘッダー */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ヘルストラッカー
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              健康データの記録と分析を通じて、より良い生活習慣を築いていきます。
            </p>
          </motion.div>
        </div>

        {/* ヘルストラッカー */}
        <HealthTracker />
      </motion.div>
      
      <Footer />
    </main>
  )
} 