'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  VideoCameraIcon, 
  LanguageIcon, 
  CloudIcon, 
  CodeBracketIcon,
  LightBulbIcon,
  BriefcaseIcon,
  BeakerIcon,
  PlusIcon,
  PencilIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Category {
  id: string
  title: string
  description: string
  icon: any
  color: string
  posts: Post[]
  content?: string // 編集可能なコンテンツ
}

interface Post {
  id: string
  title: string
  description: string
  date: string
  status: '学習中' | '完了' | '計画中'
  tags: string[]
}

export default function CategoryGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [showNotionPanel, setShowNotionPanel] = useState(false)

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'video-editing',
      title: '動画編集',
      description: 'クリエイティブな動画制作スキルを身につける',
      icon: VideoCameraIcon,
      color: 'from-red-400 to-pink-500',
      content: '動画編集の学習記録や気づき、作成した動画のリンクなどを自由に書いてください。',
      posts: [
        {
          id: '1',
          title: 'Premiere Pro基礎学習',
          description: 'カット、エフェクト、カラーグレーディングの基本',
          date: '2024-01-15',
          status: '学習中',
          tags: ['Adobe', 'Premiere Pro', '基礎']
        },
        {
          id: '2',
          title: 'YouTubeショート動画作成',
          description: 'TikTok形式の縦動画編集テクニック',
          date: '2024-01-10',
          status: '計画中',
          tags: ['YouTube', 'ショート', 'モバイル']
        }
      ]
    },
    {
      id: 'english',
      title: '英語学習',
      description: 'グローバルコミュニケーション能力の向上',
      icon: LanguageIcon,
      color: 'from-blue-400 to-indigo-500',
      content: '英語学習の進捗、使った教材、覚えた表現などを記録しましょう。',
      posts: [
        {
          id: '3',
          title: 'TOEIC 900点チャレンジ',
          description: 'ビジネス英語スキルの向上を目指す',
          date: '2024-01-20',
          status: '学習中',
          tags: ['TOEIC', 'ビジネス英語', '資格']
        }
      ]
    },
    {
      id: 'aws',
      title: 'AWS',
      description: 'クラウドインフラストラクチャーの理解',
      icon: CloudIcon,
      color: 'from-orange-400 to-yellow-500',
      content: 'AWSサービスの学習メモ、実際に構築したアーキテクチャの記録など。',
      posts: [
        {
          id: '4',
          title: 'AWS SAA認定取得',
          description: 'Solutions Architect Associate認定',
          date: '2024-01-25',
          status: '計画中',
          tags: ['AWS', '認定', 'クラウド']
        }
      ]
    },
    {
      id: 'ai-coding',
      title: 'AIコーディング',
      description: '機械学習とAI開発スキルの習得',
      icon: CodeBracketIcon,
      color: 'from-purple-400 to-pink-500',
      content: 'AI・機械学習の学習記録、作成したモデルやコードのメモ。',
      posts: [
        {
          id: '5',
          title: 'Python機械学習入門',
          description: 'scikit-learnを使った基礎学習',
          date: '2024-01-18',
          status: '学習中',
          tags: ['Python', '機械学習', 'scikit-learn']
        }
      ]
    },
    {
      id: 'mindset',
      title: 'マインド整理',
      description: '考え方と思考パターンの改善',
      icon: LightBulbIcon,
      color: 'from-green-400 to-blue-500',
      content: '考え方の変化、気づき、読んだ本の感想、自己分析など。',
      posts: [
        {
          id: '6',
          title: '完璧主義との向き合い方',
          description: '健全な成長マインドセットの構築',
          date: '2024-01-22',
          status: '学習中',
          tags: ['マインドセット', '成長', '自己改善']
        }
      ]
    },
    {
      id: 'work-insights',
      title: '仕事での気づき',
      description: '日々の業務から得られる学び',
      icon: BriefcaseIcon,
      color: 'from-gray-400 to-gray-600',
      content: '仕事で学んだこと、改善したこと、チームワークの気づきなど。',
      posts: [
        {
          id: '7',
          title: 'チームコミュニケーションの改善',
          description: 'リモートワーク環境での効果的な連携',
          date: '2024-01-12',
          status: '完了',
          tags: ['チームワーク', 'リモートワーク', 'コミュニケーション']
        }
      ]
    },
    {
      id: 'experiments',
      title: '実験・記録',
      description: '試行錯誤の記録と学び',
      icon: BeakerIcon,
      color: 'from-teal-400 to-cyan-500',
      content: '新しく試したこと、実験の結果、面白い発見など自由に記録。',
      posts: [
        {
          id: '8',
          title: '新しいワークフロー実験',
          description: 'Notionとの連携自動化テスト',
          date: '2024-01-08',
          status: '学習中',
          tags: ['自動化', 'Notion', 'ワークフロー']
        }
      ]
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case '学習中': return 'bg-blue-100 text-blue-800'
      case '完了': return 'bg-green-100 text-green-800'
      case '計画中': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    if (category) {
      setSelectedCategory(categoryId)
      setEditContent(category.content || '')
      setEditMode(true)
    }
  }

  const handleSaveContent = () => {
    if (selectedCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === selectedCategory 
          ? { ...cat, content: editContent }
          : cat
      ))
      setEditMode(false)
    }
  }

  const handleVideoUrlPaste = (url: string): string => {
    // YouTube URL変換
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    const youtubeMatch = url.match(youtubeRegex)
    if (youtubeMatch) {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeMatch[1]}" frameborder="0" allowfullscreen></iframe>`
    }
    
    // Vimeo URL変換
    const vimeoRegex = /vimeo\.com\/(\d+)/
    const vimeoMatch = url.match(vimeoRegex)
    if (vimeoMatch) {
      return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`
    }
    
    return url
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSaveContent()
    }
  }

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
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
            学習ギャラリー
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            現在進行中のプロジェクトと学習記録。完璧でなくても、進歩を可視化することが大切です。
          </p>
        </motion.div>

        <div className="flex gap-6">
          {/* 左側: カテゴリーグリッド */}
          <div className={`transition-all duration-500 ${showNotionPanel ? 'w-1/2' : 'w-full'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => setShowNotionPanel(true)}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    {/* カテゴリーヘッダー */}
                    <div className={`h-24 bg-gradient-to-br ${category.color} p-4 flex items-center justify-center relative`}>
                      <category.icon className="h-8 w-8 text-white" />
                      <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-xs font-medium text-white">
                          {category.posts.length}件
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

                      {/* 最近の投稿プレビュー */}
                      {category.posts.length > 0 && (
                        <div className="space-y-1">
                          {category.posts.slice(0, 1).map((post) => (
                            <div key={post.id} className="text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700 truncate">
                                  {post.title}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                                  {post.status}
                                </span>
                              </div>
                            </div>
                          ))}
                          {category.posts.length > 1 && (
                            <div className="text-xs text-gray-500">
                              他 {category.posts.length - 1}件...
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 編集ボタン */}
                    <div className="px-4 pb-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <PencilIcon className="h-3 w-3" />
                        編集する
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notionパネル - 右半分 */}
          {showNotionPanel && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="w-1/2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">学習ジャーニー</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotionPanel(false)}
                  className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  <XMarkIcon className="h-4 w-4" />
                </motion.button>
              </div>
              <div className="h-[80vh]">
                {/* Notion埋め込みは外部サイトでは拒否されるため、リンクにフォールバック */}
                <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">
                    このページは外部サイトへの埋め込みがサポートされていません。
                  </p>
                  <a
                    href="https://shimmering-rook-2b3.notion.site/Study-IT-AWS-AI-something-via-Youtube-20a1ccb082a08043b91ce988b882e02c?source=copy_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 font-medium underline"
                  >
                    Notionで開く →
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
} 