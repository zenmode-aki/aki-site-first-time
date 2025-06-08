'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProfileImage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative mb-12 flex justify-center animate-float">
      {/* 背景のグロー効果 */}
      <div className="absolute inset-0 w-56 h-56 mx-auto rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 dark:from-blue-300/30 dark:via-purple-300/30 dark:to-pink-300/30 blur-2xl animate-pulse-slow" />
      
      <div 
        className={`relative w-48 h-48 rounded-full overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 hover-lift theme-transition ${
          isHovered ? 'ring-4 ring-white/50 dark:ring-gray-300/30 ring-offset-4 ring-offset-transparent' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src="/profile.jpg"
          alt="Aki Ezaki Profile"
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          priority
        />
        
        {/* オーバーレイ効果 */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/40 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* ボーダーリング */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30 dark:border-gray-300/20" />
      </div>
    </div>
  );
} 