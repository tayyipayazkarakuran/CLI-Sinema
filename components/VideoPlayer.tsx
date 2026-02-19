'use client';

import { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

interface VideoPlayerProps {
  tmdbId: string;
  type: 'movie' | 'tv';
  season?: number;
  episode?: number;
  onClose: () => void;
}

export default function VideoPlayer({ tmdbId, type, season = 1, episode = 1, onClose }: VideoPlayerProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          // Check if it's progress data from Videasy
          if (data && (data.progress !== undefined || data.type === 'video-progress')) {
             const key = `progress-${tmdbId}-${type}`;
             // Store the last watched episode/progress
             const progressData = {
               ...data,
               season,
               episode,
               timestamp: Date.now()
             };
             localStorage.setItem(key, JSON.stringify(progressData));
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [tmdbId, type, season, episode]);

  const url = type === 'movie' 
    ? `https://player.videasy.net/movie/${tmdbId}?color=00ff41`
    : `https://player.videasy.net/tv/${tmdbId}/${season}/${episode}?color=00ff41&nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true`;

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-in-out border border-[#00ff41] bg-black shadow-[0_0_20px_rgba(0,255,65,0.3)] ${
      isMaximized ? 'inset-0' : 'inset-4 md:inset-10 lg:inset-20'
    }`}>
      <div className="flex justify-between items-center bg-[#00ff41] text-black px-2 py-1 font-mono text-sm">
        <span className="font-bold">
          OYNATILIYOR: {type.toUpperCase()} {tmdbId} {type === 'tv' ? `S${season}B${episode}` : ''}
        </span>
        <div className="flex gap-2">
          <button onClick={() => setIsMaximized(!isMaximized)} className="hover:bg-black hover:text-[#00ff41] p-1">
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button onClick={onClose} className="hover:bg-black hover:text-[#00ff41] p-1">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="w-full h-[calc(100%-32px)] relative">
        <iframe
          src={url}
          className="w-full h-full"
          allowFullScreen
          allow="encrypted-media; autoplay; fullscreen; picture-in-picture"
          frameBorder="0"
        />
      </div>
    </div>
  );
}
