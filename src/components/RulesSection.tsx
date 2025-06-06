'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  SunIcon, 
  MoonIcon, 
  ChatBubbleLeftRightIcon,
  TvIcon,
  PlayIcon,
  ComputerDesktopIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

interface Rule {
  id: string
  trigger: string
  action: string
}

interface RuleCategory {
  id: string
  title: string
  description: string
  icon: any
  color: string
  rules: Rule[]
}

export default function RulesSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const ruleCategories: RuleCategory[] = [
    {
      id: 'morning',
      title: '朝のルール',
      description: '1日を最高にスタートするための習慣',
      icon: SunIcon,
      color: 'from-yellow-400 to-orange-500',
      rules: [
        {
          id: 'morning-1',
          trigger: '朝起きたら',
          action: '最初にコップ1杯の水を飲む'
        },
        {
          id: 'morning-2',
          trigger: 'スマホを触りたくなったら',
          action: '先に10分間のストレッチをする'
        },
        {
          id: 'morning-3',
          trigger: '朝食を食べる前に',
          action: 'その日のTODOを3つだけ決める'
        }
      ]
    },
    {
      id: 'night',
      title: '夜のルール',
      description: '質の高い睡眠と翌日への準備',
      icon: MoonIcon,
      color: 'from-indigo-400 to-purple-500',
      rules: [
        {
          id: 'night-1',
          trigger: '夜9時になったら',
          action: 'ブルーライトカットメガネをかける'
        },
        {
          id: 'night-2',
          trigger: 'ベッドに入ったら',
          action: 'スマホは手の届かない場所に置く'
        },
        {
          id: 'night-3',
          trigger: '眠れないときは',
          action: '本を読むか瞑想アプリを使う'
        }
      ]
    },
    {
      id: 'communication',
      title: 'コミュニケーションのルール',
      description: '人との関わりを大切にする',
      icon: ChatBubbleLeftRightIcon,
      color: 'from-green-400 to-blue-500',
      rules: [
        {
          id: 'comm-1',
          trigger: '相手が話しているときは',
          action: 'デバイスを置いて完全に集中する'
        },
        {
          id: 'comm-2',
          trigger: '批判的な気持ちになったら',
          action: '一度深呼吸して相手の立場を考える'
        },
        {
          id: 'comm-3',
          trigger: 'ありがとうと思ったら',
          action: 'その瞬間に必ず言葉で伝える'
        }
      ]
    },
    {
      id: 'netflix',
      title: 'Netflixのルール',
      description: '娯楽を楽しみつつ、時間を大切に',
      icon: TvIcon,
      color: 'from-red-400 to-pink-500',
      rules: [
        {
          id: 'netflix-1',
          trigger: 'Netflixを開く前に',
          action: '見たい作品を1つだけ決めてから開く'
        },
        {
          id: 'netflix-2',
          trigger: '1話見終わったら',
          action: '一旦停止して本当に続きを見るか考える'
        },
        {
          id: 'netflix-3',
          trigger: '見終わったら',
          action: '5分間でその作品の感想を書く'
        }
      ]
    },
    {
      id: 'youtube',
      title: 'YouTubeのルール',
      description: '学びのあるコンテンツ消費を',
      icon: PlayIcon,
      color: 'from-red-500 to-red-600',
      rules: [
        {
          id: 'youtube-1',
          trigger: 'YouTubeを開くときは',
          action: '学習目的の動画を3本まで決めてから見る'
        },
        {
          id: 'youtube-2',
          trigger: 'おすすめ動画が表示されたら',
          action: '「後で見る」に追加して今は見ない'
        },
        {
          id: 'youtube-3',
          trigger: '動画を見終わったら',
          action: '学んだことを一行でメモする'
        }
      ]
    },
    {
      id: 'macbook',
      title: 'MacBookのルール',
      description: '生産性を最大化するための習慣',
      icon: ComputerDesktopIcon,
      color: 'from-gray-400 to-gray-600',
      rules: [
        {
          id: 'macbook-1',
          trigger: 'MacBookを開いたら',
          action: '最初に今日の目標を確認する'
        },
        {
          id: 'macbook-2',
          trigger: '集中が切れたら',
          action: '5分間の休憩を取ってから再開する'
        },
        {
          id: 'macbook-3',
          trigger: '作業を終える前に',
          action: '翌日のタスクを整理してから閉じる'
        }
      ]
    }
  ]

  return (
    <section id="rules" className="py-16 px-4 sm:px-6 lg:px-8">
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
            マイルール集
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If-Thenルールで自分をより良い方向に導く。小さな習慣の積み重ねが大きな変化を生みます。
          </p>
        </motion.div>

        {/* ルールカテゴリーグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ruleCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* カテゴリーヘッダー */}
                <div className={`h-24 bg-gradient-to-br ${category.color} p-4 flex items-center justify-center relative`}>
                  <category.icon className="h-8 w-8 text-white" />
                  
                  {/* ルール数表示 */}
                  <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-medium text-white">
                      {category.rules.length}個
                    </span>
                  </div>
                </div>

                {/* カテゴリー情報 */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>

                  {/* ルールプレビュー */}
                  <div className="space-y-1 mb-3">
                    {category.rules.slice(0, 2).map((rule) => (
                      <div key={rule.id} className="text-xs bg-gray-50 rounded-lg p-2">
                        <span className="font-medium text-gray-700">
                          {rule.trigger}
                        </span>
                        <br />
                        <span className="text-gray-600">
                          → {rule.action}
                        </span>
                      </div>
                    ))}
                    {category.rules.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        他 {category.rules.length - 2}件のルール...
                      </div>
                    )}
                  </div>

                  {/* 展開ボタン */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setExpandedCategory(
                      expandedCategory === category.id ? null : category.id
                    )}
                    className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {expandedCategory === category.id ? '閉じる' : 'すべてのルールを見る'}
                    <PlusIcon className={`h-3 w-3 transition-transform duration-200 ${expandedCategory === category.id ? 'rotate-45' : ''}`} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 詳細表示エリア */}
        {expandedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {(() => {
              const category = ruleCategories.find(c => c.id === expandedCategory)
              if (!category) return null

              return (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${category.color}`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {category.title}
                      </h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {category.rules.map((rule, ruleIndex) => (
                      <motion.div
                        key={rule.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: ruleIndex * 0.1 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            IF: {rule.trigger}
                          </div>
                          <div className="hidden sm:block text-gray-400">→</div>
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            THEN: {rule.action}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}

        {/* モチベーション引用 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-100"
        >
          <blockquote className="text-center">
            <p className="text-lg font-medium text-gray-900 mb-4">
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
            </p>
            <footer className="text-sm text-gray-600">
              - アリストテレス
            </footer>
          </blockquote>
          <p className="text-center text-sm text-gray-600 mt-4">
            習慣は第二の天性。小さなルールの積み重ねが、理想の自分を作ります。
          </p>
        </motion.div>
      </div>
    </section>
  )
} 