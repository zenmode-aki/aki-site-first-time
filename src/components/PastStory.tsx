import { useTranslations } from 'next-intl';

export default function PastStory() {
  const t = useTranslations();

  return (
    <div className="mb-8">
      <div className="max-w-full mx-auto">
        <div className="glass-effect rounded-2xl p-4 md:p-6 shadow-lg theme-transition">
          <div className="text-left">
            <p className="text-sm md:text-base leading-relaxed font-semibold gradient-text whitespace-pre-line tracking-wide font-sans">
              {t('pastStory')}
            </p>
            
            {/* YouTube動画の埋め込み */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-md">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/Yj337Wrzomw"
                title="Talk Academy - Promotional Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video rounded-xl"
              ></iframe>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                📹 語学学校宣伝動画
              </p>
            </div>
          </div>
          
          {/* 装飾的な要素 */}
          <div className="flex justify-center mt-6 space-x-1.5">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-300 dark:to-red-300 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-300 dark:to-orange-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-yellow-400 dark:from-green-300 dark:to-yellow-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
} 