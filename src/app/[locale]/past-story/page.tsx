import { useTranslations } from 'next-intl';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Breadcrumb from '@/components/Breadcrumb';
import Sidebar from '@/components/Sidebar';
import HomeButton from '@/components/HomeButton';
import Image from 'next/image';

export default function PastStoryPage() {
  const t = useTranslations();

  const breadcrumbItems = [
    { label: t('pastStoryTitle') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 relative overflow-hidden theme-transition">
      {/* 背景の装飾的要素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-300/30 dark:to-purple-300/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 dark:from-pink-300/30 dark:to-yellow-300/30 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-400/10 dark:from-indigo-300/20 dark:to-cyan-300/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}} />
      </div>
      
      <ThemeToggle />
      <Sidebar />
      <LanguageSwitcher />
      <HomeButton />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* ページタイトル */}
          <div className="text-center mb-12 fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {t('pastStoryTitle')}
            </h1>
          </div>

          {/* コンテンツエリア */}
          <div className="space-y-12">
            {/* YouTube動画セクション */}
            <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-xl theme-transition fade-in-up">
              <div className="text-center">
                <p className="text-lg md:text-xl leading-relaxed font-semibold gradient-text whitespace-pre-line tracking-wide font-sans mb-8">
                  {t('pastStory').split('\n\n')[0]}
                </p>
                
                {/* YouTube動画の埋め込み */}
                <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/Yj337Wrzomw"
                    title="Talk Academy - Promotional Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video rounded-2xl"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* 留学エージェント資料セクション */}
            <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-xl theme-transition fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold gradient-text mb-4">
                  {t('pastStory').split('\n\n')[1].split('\n')[0]}
                </h2>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  {t('pastStory').split('\n\n')[1].split('\n')[1]}
                </p>
              </div>
              
                             {/* 資料画像の表示 */}
               <div className="flex justify-center">
                 <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg max-w-2xl">
                   <Image
                     src="/manager-profile.jpg"
                     alt="江崎あき - 日本人マネージャー就任資料"
                     width={800}
                     height={600}
                     className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                   />
                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                     2024年4月14日 - 日本人マネージャー就任資料
                   </p>
                 </div>
               </div>
            </div>
          </div>
          
          {/* 装飾的な要素 */}
          <div className="flex justify-center mt-12 space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-300 dark:to-red-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-300 dark:to-orange-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 dark:from-green-300 dark:to-yellow-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </main>
    </div>
  );
} 