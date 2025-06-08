'use client';

import Image from 'next/image';
import { useState } from 'react';

const photos = [
  { id: 1, src: '/profile.jpg', alt: 'Aki Ezaki - Profile' },
  { id: 2, src: '/gallery-1.jpg', alt: 'Aki Ezaki - Photo 1' },
  { id: 3, src: '/gallery-2.jpg', alt: 'Aki Ezaki - Photo 2' },
  { id: 4, src: '/gallery-3.jpg', alt: 'Aki Ezaki - Photo 3' },
  { id: 5, src: '/gallery-4.jpg', alt: 'Aki Ezaki - Photo 4' },
  { id: 6, src: '/gallery-5.jpg', alt: 'Aki Ezaki - Photo 5' },
  { id: 7, src: '/gallery-6.jpg', alt: 'Aki Ezaki - Photo 6' },
  { id: 8, src: '/gallery-7.jpg', alt: 'Aki Ezaki - Photo 7' },
  { id: 9, src: '/gallery-8.jpg', alt: 'Aki Ezaki - Photo 8' },
  { id: 10, src: '/gallery-9.jpg', alt: 'Aki Ezaki - Photo 9' },
  { id: 11, src: '/gallery-10.jpg', alt: 'Aki Ezaki - Photo 10' },
  { id: 12, src: '/gallery-11.jpg', alt: 'Aki Ezaki - Photo 11' },
  { id: 13, src: '/gallery-12.jpg', alt: 'Aki Ezaki - Photo 12' },
  { id: 14, src: '/gallery-13.jpg', alt: 'Aki Ezaki - Photo 13' },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="mt-16 mb-12">
      <h3 className="text-2xl font-semibold text-center mb-8 gradient-text">
        Photo Gallery
      </h3>
      
      {/* 横スクロールギャラリー */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4 px-4" style={{ width: 'max-content' }}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-lg hover-lift cursor-pointer theme-transition"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
      
      {/* スクロールヒント */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>横にスクロールして他の写真を見る</span>
        </div>
      </div>

      {/* モーダル表示 */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <div className="relative w-full h-full">
              <Image
                src={photos.find(p => p.id === selectedPhoto)?.src || ''}
                alt={photos.find(p => p.id === selectedPhoto)?.alt || ''}
                width={800}
                height={800}
                className="object-contain max-h-[90vh] rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(null);
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 