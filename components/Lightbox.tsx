import React, { useState, useEffect, TouchEvent } from 'react';
import Image from 'next/image';

interface LightboxProps {
  media: string[];
  initialIndex: number;
  onClose: () => void;
}

// Icona per lo swipe
const SwipeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1.982q-2.421 0-4.62.899a15 15 0 0 0-4.05 2.464h2.545q.231 0 .407.174a.56.56 0 0 1 .176.41.55.55 0 0 1-.174.406.56.56 0 0 1-.41.171H2.703a.82.82 0 0 1-.606-.245.82.82 0 0 1-.245-.607V2.428q0-.231.17-.407a.56.56 0 0 1 .816-.002.56.56 0 0 1 .175.41v1.663A16.1 16.1 0 0 1 7.237 1.69a13.2 13.2 0 0 1 4.764-.87q2.49 0 4.763.869a16.2 16.2 0 0 1 4.23 2.403V2.428q0-.231.171-.407a.56.56 0 0 1 .817-.002.56.56 0 0 1 .174.41v3.225q0 .36-.25.607a.83.83 0 0 1-.608.245h-3.125a.56.56 0 0 1-.41-.171.55.55 0 0 1-.173-.407q0-.235.174-.41a.56.56 0 0 1 .41-.173h2.496a15 15 0 0 0-4.05-2.464A12.1 12.1 0 0 0 12 1.982m-.37 20.168q-.559-.001-1.072-.206a2.7 2.7 0 0 1-.92-.612l-4.899-4.93a.68.68 0 0 1-.2-.42.7.7 0 0 1 .1-.453l.013-.013q.318-.466.832-.652.516-.187 1.068-.026l2.317.638V7q0-.341.231-.575a.78.78 0 0 1 .576-.235q.343 0 .575.235a.8.8 0 0 1 .231.575v9.579a.74.74 0 0 1-.318.63.75.75 0 0 1-.692.119l-2.114-.581 3.444 3.461q.158.165.378.246.219.082.45.082h4.645q1.02 0 1.73-.71t.71-1.73v-4.644q0-.338.236-.57a.8.8 0 0 1 .58-.234q.343 0 .573.233a.78.78 0 0 1 .23.571v4.644q0 1.68-1.19 2.867-1.19 1.186-2.869 1.187zm1.343-12.502q.343 0 .573.233a.78.78 0 0 1 .23.571V14a.78.78 0 0 1-.235.575.8.8 0 0 1-.58.235.77.77 0 0 1-.573-.235.8.8 0 0 1-.23-.575v-3.548q0-.338.235-.57a.8.8 0 0 1 .58-.234m3.26 1q.344 0 .576.233a.78.78 0 0 1 .231.571v2.545q0 .345-.236.58a.8.8 0 0 1-.579.233.76.76 0 0 1-.57-.235.8.8 0 0 1-.228-.575v-2.548q0-.338.232-.57a.78.78 0 0 1 .575-.234"/>
  </svg>
);

export default function Lightbox({ media, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Swipe sensitivity
  const minSwipeDistance = 50;

  useEffect(() => {
    // Reset loaded state when index changes
    setIsLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    // Hide swipe hint after 3 seconds
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setShowSwipeHint(false); // Hide hint if user interacts
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      showNext();
    } else if (isRightSwipe) {
      showPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const isVideo = (url: string) => url.endsWith('.mp4');

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button className="absolute top-4 right-4 text-white text-3xl z-10 cursor-pointer p-2" onClick={onClose}>&times;</button>
      
      {/* Navigation Arrows - Hidden on Mobile */}
      <button className="hidden md:block absolute left-4 text-white text-3xl z-10 cursor-pointer p-2" onClick={(e) => { e.stopPropagation(); showPrev(); }}>&#10094;</button>
      
      <div 
        className="relative w-full h-full md:max-w-4xl md:h-auto md:aspect-[4/3] flex items-center justify-center p-2"
      >
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

        {/* Swipe Hint Icon on Mobile */}
        {showSwipeHint && (
          <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="text-white/70 animate-flash-fade">
                <SwipeIcon />
             </div>
          </div>
        )}
      </div>

      <button className="hidden md:block absolute right-4 text-white text-3xl z-10 cursor-pointer p-2" onClick={(e) => { e.stopPropagation(); showNext(); }}>&#10095;</button>

      {/* Thumbnails Navigation - Hidden on Mobile */}
      <div className="hidden md:flex gap-2 max-w-4xl w-full p-2 bg-black/40 rounded-lg [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
