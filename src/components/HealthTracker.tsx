'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  HeartIcon, 
  MoonIcon, 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

interface HealthData {
  date: string
  steps: number
  sleepHours: number
}

export default function HealthTracker() {
  const [healthData, setHealthData] = useState<HealthData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // サンプルデータ（実際のApple Health連携時に置き換え）
  const sampleData: HealthData[] = [
    { date: '2024-01-20', steps: 8542, sleepHours: 7.2 },
    { date: '2024-01-21', steps: 12043, sleepHours: 6.8 },
    { date: '2024-01-22', steps: 6234, sleepHours: 8.1 },
    { date: '2024-01-23', steps: 9876, sleepHours: 7.5 },
    { date: '2024-01-24', steps: 11234, sleepHours: 6.3 },
    { date: '2024-01-25', steps: 7890, sleepHours: 7.8 },
    { date: '2024-01-26', steps: 13456, sleepHours: 7.0 },
  ]

  useEffect(() => {
    // 初期データの読み込み
    setHealthData(sampleData)
    setLastUpdated(new Date())
  }, [])

  // Apple Healthデータの更新関数（将来的にiOS Shortcutsと連携）
  const refreshHealthData = async () => {
    setIsLoading(true)
    
    try {
      // ここで実際のAPIコールやiOS Shortcutsとの連携を行う
      await new Promise(resolve => setTimeout(resolve, 2000)) // シミュレーション
      
      // 新しいデータを追加（シミュレーション）
      const today = new Date().toISOString().split('T')[0]
      const newData = {
        date: today,
        steps: Math.floor(Math.random() * 15000) + 5000,
        sleepHours: Math.round((Math.random() * 3 + 6) * 10) / 10
      }
      
      setHealthData(prev => {
        const filtered = prev.filter(d => d.date !== today)
        return [...filtered, newData].sort((a, b) => a.date.localeCompare(b.date))
      })
      
      setLastUpdated(new Date())
    } catch (error) {
      console.error('HealthKitデータの取得に失敗しました:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 統計計算
  const avgSteps = Math.round(healthData.reduce((sum, d) => sum + d.steps, 0) / healthData.length)
  const avgSleep = Math.round(healthData.reduce((sum, d) => sum + d.sleepHours, 0) / healthData.length * 10) / 10
  const todayData = healthData[healthData.length - 1]
  const yesterdayData = healthData[healthData.length - 2]

  const stepsTrend = todayData && yesterdayData ? todayData.steps - yesterdayData.steps : 0
  const sleepTrend = todayData && yesterdayData ? todayData.sleepHours - yesterdayData.sleepHours : 0

  return (
    <section id="health" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ヘルストラッカー
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Apple Healthと連携した健康データの可視化。継続的な生活習慣の改善を目指します。
          </p>
          
          {/* 更新ボタン */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshHealthData}
            disabled={isLoading}
            className="bg-primary-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <ArrowPathIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'データ更新中...' : 'HealthKitから更新'}
          </motion.button>
          
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              最終更新: {lastUpdated.toLocaleString('ja-JP')}
            </p>
          )}
        </motion.div>

        {/* メトリクスカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 今日の歩数 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <HeartIcon className="h-5 w-5 text-blue-600" />
              </div>
              {stepsTrend !== 0 && (
                <div className={`flex items-center gap-1 ${stepsTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stepsTrend > 0 ? (
                    <ArrowTrendingUpIcon className="h-3 w-3" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3 w-3" />
                  )}
                  <span className="text-sm font-medium">
                    {Math.abs(stepsTrend).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">今日の歩数</h3>
            <p className="text-2xl font-bold text-gray-900">
              {todayData ? todayData.steps.toLocaleString() : '---'}
            </p>
            <p className="text-sm text-gray-500">歩</p>
          </motion.div>

          {/* 今日の睡眠時間 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <MoonIcon className="h-5 w-5 text-purple-600" />
              </div>
              {sleepTrend !== 0 && (
                <div className={`flex items-center gap-1 ${sleepTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {sleepTrend > 0 ? (
                    <ArrowTrendingUpIcon className="h-3 w-3" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3 w-3" />
                  )}
                  <span className="text-sm font-medium">
                    {Math.abs(sleepTrend).toFixed(1)}h
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">昨夜の睡眠</h3>
            <p className="text-2xl font-bold text-gray-900">
              {todayData ? todayData.sleepHours.toFixed(1) : '---'}
            </p>
            <p className="text-sm text-gray-500">時間</p>
          </motion.div>

          {/* 平均歩数 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="bg-green-100 p-2 rounded-full mb-4 w-fit">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">平均歩数（7日間）</h3>
            <p className="text-2xl font-bold text-gray-900">
              {avgSteps.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">歩/日</p>
          </motion.div>

          {/* 平均睡眠時間 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="bg-indigo-100 p-2 rounded-full mb-4 w-fit">
              <MoonIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">平均睡眠（7日間）</h3>
            <p className="text-2xl font-bold text-gray-900">
              {avgSleep}
            </p>
            <p className="text-sm text-gray-500">時間/日</p>
          </motion.div>
        </div>

        {/* 週次チャート */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">7日間の推移</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 歩数グラフ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">歩数</h4>
              <div className="space-y-3">
                {healthData.map((data, index) => {
                  const percentage = (data.steps / Math.max(...healthData.map(d => d.steps))) * 100
                  return (
                    <div key={data.date} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-12">
                        {new Date(data.date).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-blue-500 h-3 rounded-full"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 w-16 text-right">
                        {data.steps.toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 睡眠時間グラフ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">睡眠時間</h4>
              <div className="space-y-3">
                {healthData.map((data, index) => {
                  const percentage = (data.sleepHours / Math.max(...healthData.map(d => d.sleepHours))) * 100
                  return (
                    <div key={data.date} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-12">
                        {new Date(data.date).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-purple-500 h-3 rounded-full"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 w-12 text-right">
                        {data.sleepHours.toFixed(1)}h
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Apple Health連携の説明 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🍎 Apple Health連携について
          </h3>
          <div className="text-blue-800 text-sm space-y-2">
            <p>
              <strong>データの取得方法:</strong> iOS Shortcutsアプリを使用してHealthKitからデータを取得し、
              このウェブサイトのAPIに送信することで自動更新されます。
            </p>
            <p>
              <strong>プライバシー:</strong> すべてのヘルスデータは暗号化され、個人使用目的でのみ保存されます。
            </p>
            <p>
              <strong>更新頻度:</strong> 1日1回の自動更新、または手動での即座更新が可能です。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 