'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

interface SuiteGalleryProps {
  media: string[];
  name: string;
}

// Minimalist Magnifier Icon
const MagnifierIcon = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default function SuiteGallery({ media, name }: SuiteGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedStates, setLoadedStates] = useState<Record<number, boolean>>({});

  const handleMediaLoad = (index: number) => {
    setLoadedStates((prev) => ({ ...prev, [index]: true }));
  };

  // Helper to determine if media is video
  const isVideo = (url: string) => url.endsWith('.mp4');

  return (
    <>
      <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 max-w-container-large mx-auto">
        {/* Main Large Media */}
        <div 
          className={`relative aspect-video md:aspect-auto md:row-span-2 rounded-md overflow-hidden group ${loadedStates[0] ? 'cursor-pointer' : ''}`} 
          onClick={() => loadedStates[0] && setLightboxIndex(0)}
        >
          <div className={`absolute inset-0 flex items-center justify-center bg-grigio-chiarissimo transition-opacity duration-500 ${loadedStates[0] ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-10 h-10 border-4 border-blu border-t-transparent rounded-full animate-spin" />
          </div>
          
          {isVideo(media[0]) ? (
            <video
              src={media[0]}
              className={`w-full h-full object-cover transition-opacity duration-700 ${loadedStates[0] ? 'opacity-100' : 'opacity-0'}`}
              onLoadedData={() => handleMediaLoad(0)}
              muted
              playsInline
            />
          ) : (
            <Image 
              src={media[0]} 
              alt={name} 
              fill 
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-700 ${loadedStates[0] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleMediaLoad(0)}
            />
          )}

          <div className={`absolute inset-0 bg-black/30 opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center text-white ${loadedStates[0] ? '' : 'hidden'}`}>
             <MagnifierIcon />
          </div>
        </div>
        
        {/* Smaller Media */}
        {media.slice(1, 3).map((item, index) => {
          const actualIndex = index + 1;
          return (
            <div 
              key={actualIndex} 
              className={`hidden md:block relative aspect-video rounded-md overflow-hidden group ${loadedStates[actualIndex] ? 'cursor-pointer' : ''}`} 
              onClick={() => loadedStates[actualIndex] && setLightboxIndex(actualIndex)}
            >
              <div className={`absolute inset-0 flex items-center justify-center bg-grigio-chiarissimo transition-opacity duration-500 ${loadedStates[actualIndex] ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-8 h-8 border-4 border-blu border-t-transparent rounded-full animate-spin" />
              </div>
              
              {isVideo(item) ? (
                <video
                  src={item}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${loadedStates[actualIndex] ? 'opacity-100' : 'opacity-0'}`}
                  onLoadedData={() => handleMediaLoad(actualIndex)}
                  muted
                  playsInline
                />
              ) : (
                <Image 
                  src={item} 
                  alt={`${name} ${actualIndex + 1}`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-700 ${loadedStates[actualIndex] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleMediaLoad(actualIndex)}
                />
              )}
              
              <div className={`absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white ${loadedStates[actualIndex] ? '' : 'hidden'}`}>
                 <MagnifierIcon />
              </div>
            </div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox 
          media={media} 
          initialIndex={lightboxIndex} 
          onClose={() => setLightboxIndex(null)} 
        />
      )}
    </>
  );
}
