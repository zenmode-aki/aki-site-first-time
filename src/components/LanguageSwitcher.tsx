'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const languages = [
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'ko', flag: '🇰🇷', name: '한국어' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('languages');
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="glass-effect rounded-2xl p-2 shadow-xl">
        <div className="flex gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`group relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 overflow-hidden ${
                locale === lang.code
                  ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              title={lang.name}
            >
              {/* ホバー時の背景効果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center space-x-1">
                <span className="text-sm">{lang.flag}</span>
                <span className="font-medium text-xs">{lang.name}</span>
              </div>
              
              {/* アクティブインジケーター */}
              {locale === lang.code && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 