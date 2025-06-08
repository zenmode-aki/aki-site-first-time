import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProfileImage from '@/components/ProfileImage';
import Introduction from '@/components/Introduction';
import ThemeToggle from '@/components/ThemeToggle';
import PhotoGallery from '@/components/PhotoGallery';
import Sidebar from '@/components/Sidebar';

export default function HomePage() {
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
      
      <main className="relative container mx-auto px-6 py-16 flex flex-col justify-center items-center min-h-screen">
        <div className="max-w-6xl w-full">
          {/* プロフィール画像 */}
          <ProfileImage />
          
          {/* 自己紹介文 */}
          <Introduction />
          
          {/* フォトギャラリー */}
          <PhotoGallery />
          
          {/* フッター的な装飾 */}
          <div className="mt-16 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent rounded-full" />
          </div>
        </div>
      </main>
    </div>
  );
} 