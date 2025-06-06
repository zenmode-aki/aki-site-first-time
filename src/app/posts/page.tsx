'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import FeedSection from '@/components/FeedSection'
import Footer from '@/components/Footer'

export default function PostsPage() {
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
              投稿・発信
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              日々の学習や気づき、試行錯誤の過程を記録しています。
            </p>
          </motion.div>
        </div>
        
        <FeedSection />
      </motion.div>
      
      <Footer />
    </main>
  )
} 