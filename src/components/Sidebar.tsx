'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const params = useParams();

  return (
    <>
      {/* サイドバー開閉ボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-20 z-50 p-3 rounded-2xl glass-effect dark:bg-gray-800/70 dark:border-gray-700/20 shadow-xl hover:scale-105 transition-all duration-300"
        aria-label="サイドメニュー"
      >
        <div className="relative flex items-center justify-center w-6 h-6">
          <svg 
            className={`w-6 h-6 text-gray-700 dark:text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </button>

      {/* オーバーレイ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* サイドバー */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 md:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200/20 dark:border-gray-700/20 shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ヘッダー */}
        <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold gradient-text">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-4">
          <div className="space-y-4">
            <Link 
              href={`/${params.locale}/career`}
              className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xl">💼</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">転職活動中</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">一緒に働きませんか？</p>
              </div>
              <div className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 