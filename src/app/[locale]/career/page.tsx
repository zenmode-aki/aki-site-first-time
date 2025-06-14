'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CareerPage() {
  const t = useTranslations('career');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-12">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4 animate-fade-in">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 animate-slide-up">
            {t('subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full animate-scale-in"></div>
        </div>

        {/* メインコンテンツ - 2カラムレイアウト */}
        <div className="max-w-7xl mx-auto">
          
          {/* 上段 - 基本情報を横並び */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* 希望職種・業務内容 */}
            <section className="glass-card p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                <span className="mr-3">💼</span>
                {t('position.title')}
              </h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                    {t('position.role')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {t('position.description')}
                  </p>
                </div>
              </div>
            </section>

            {/* スキル・経験 */}
            <section className="glass-card p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                <span className="mr-3">🛠️</span>
                {t('skills.title')}
              </h2>
              <div className="space-y-3">
                {t.raw('skills.items').map((skill: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-green-500' : 
                      index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></span>
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 中段 - 働き方・企業文化 */}
          <div className="mb-8">
            <section className="glass-card p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                <span className="mr-3">🏠</span>
                {t('workstyle.title')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">リモートワーク</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {t('workstyle.remote')}
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">AI活用企業</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {t('workstyle.ai')}
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border-l-4 border-orange-500">
                  <h3 className="text-lg font-semibold mb-2 text-orange-600 dark:text-orange-400">テキストベース</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {t('workstyle.textBased')}
                  </p>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">学習文化・チーム</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {t('workstyle.learning')}
                </p>
              </div>
            </section>
          </div>

          {/* 下段 - 実績と条件を横並び */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* 過去の実績 */}
            <section className="glass-card p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                <span className="mr-3">🚀</span>
                {t('achievements.title')}
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2 text-cyan-600 dark:text-cyan-400">業務実績</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {t('achievements.work')}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2 text-pink-600 dark:text-pink-400">週末の個人プロジェクト</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {t('achievements.hobby')}
                  </p>
                </div>
              </div>
            </section>

            {/* 希望条件 */}
            <section className="glass-card p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                <span className="mr-3">📋</span>
                {t('conditions.title')}
              </h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border-l-4 border-yellow-500">
                  <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-400">給与について</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {t('conditions.salary')}
                  </p>
                </div>
                
                <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border-l-4 border-teal-500">
                  <h3 className="text-lg font-semibold mb-2 text-teal-600 dark:text-teal-400">勤務形態</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {t('conditions.workStyle')}
                  </p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border-l-4 border-indigo-500">
                  <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-400">雇用関係</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {t('conditions.employment')}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* 特徴セクション - 横並び */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            
            {/* 性格・ソフトスキル */}
            <section className="glass-card p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                <span className="mr-3">😊</span>
                {t('personality.title')}
              </h2>
              <div className="space-y-3">
                {t.raw('personality.traits').map((trait: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xl">
                      {index === 0 ? '💪' : index === 1 ? '💬' : index === 2 ? '🔄' : '😄'}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{trait}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 苦手なもの */}
            <section className="glass-card p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                <span className="mr-3">⚠️</span>
                {t('weaknesses.title')}
              </h2>
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border-l-4 border-red-500">
                  <h3 className="text-sm font-semibold mb-1 text-red-600 dark:text-red-400">集中環境</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                    {t('weaknesses.noise')}
                  </p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border-l-4 border-amber-500">
                  <h3 className="text-sm font-semibold mb-1 text-amber-600 dark:text-amber-400">プロジェクト数</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                    {t('weaknesses.projects')}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* 開始時期 */}
          <div className="mb-8">
            <section className="glass-card p-6 rounded-3xl shadow-xl hover:scale-[1.02] transition-all duration-300">
              <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                <span className="mr-3">📅</span>
                {t('availability.title')}
              </h2>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border-l-4 border-indigo-500">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {t('availability.timeline')}
                </p>
              </div>
            </section>
          </div>

          {/* メッセージ */}
          <section className="glass-card p-8 rounded-3xl shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="text-3xl font-bold gradient-text flex items-center mb-6">
              <span className="mr-4">💌</span>
              {t('message.title')}
            </h2>
            <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
              <p className="whitespace-pre-line">
                {t('message.content')}
              </p>
              <p className="text-xl font-semibold gradient-text text-center">
                <strong>{t('message.goal')}</strong>という目標に向かって、一緒に頑張りませんか？
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 