import { useTranslations } from 'next-intl';

export default function Introduction() {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto fade-in-up">
      <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-xl theme-transition">
        <div className="text-left max-w-3xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed font-semibold gradient-text whitespace-pre-line tracking-wide font-sans">
            {t('introduction')}
          </p>
        </div>
        
        {/* 装飾的な要素 */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-300 dark:to-pink-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 dark:from-pink-300 dark:to-red-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
}
