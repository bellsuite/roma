import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface LightboxProps {
  media: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ media, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reset loaded state when index changes
    setIsLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const isVideo = (url: string) => url.endsWith('.mp4');

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4">
      <button className="absolute top-4 right-4 text-white text-3xl z-10 cursor-pointer" onClick={onClose}>&times;</button>
      
      <button className="absolute left-4 text-white text-3xl z-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); showPrev(); }}>&#10094;</button>
      
      <div className="relative w-full max-w-4xl aspect-[4/3] mb-6 flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {isVideo(media[currentIndex]) ? (
          <video
            src={media[currentIndex]}
            controls
            autoPlay
            className={`max-w-full max-h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadedData={() => setIsLoaded(true)}
          />
        ) : (
          <Image 
            src={media[currentIndex]} 
            alt={`Suite media ${currentIndex + 1}`}
            fill
            className={`object-contain transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>

      <button className="absolute right-4 text-white text-3xl z-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); showNext(); }}>&#10095;</button>

      {/* Thumbnails Navigation */}
      <div className="flex gap-2 max-w-4xl w-full p-2 bg-black/40 rounded-lg [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {media.map((item, index) => (
          <div 
            key={index} 
            className={`relative flex-1 h-16 cursor-pointer border-2 ${currentIndex === index ? 'border-white' : 'border-transparent hover:border-white/50'} rounded overflow-hidden`}
            onClick={() => setCurrentIndex(index)}
          >
            {isVideo(item) ? (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xs">VIDEO</div>
            ) : (
              <Image 
                src={item} 
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
