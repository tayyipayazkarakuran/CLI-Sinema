'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { executeCommand, CommandResult } from '@/lib/commands';
import { motion, AnimatePresence } from 'motion/react';
import VideoPlayer from './VideoPlayer';
import Image from 'next/image';
import MatrixRain from './MatrixRain';
import FalloutBackground from './FalloutBackground';

type HistoryItem = {
  id: string;
  type: 'input' | 'output' | 'error' | 'component';
  content?: string;
  data?: any;
};

const BOOT_SEQUENCE = [
  "BIOS Date 01/01/99 15:23:00 Ver: 1.0.0",
  "CPU: Intel Pentium III 800MHz",
  "640K RAM System... OK",
  "Initializing Video Adapter... OK",
  "Loading OS...",
  "Mounting /dev/sda1...",
  "Starting Terminal Cinema Shell...",
  "Connection established."
];

export default function Terminal() {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [theme, setTheme] = useState('green');
  const [activeAnimation, setActiveAnimation] = useState<'none' | 'matrix' | 'fallout'>('none');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(3); // 1-5, default 3 (normal)
  
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [playData, setPlayData] = useState<{ id: string; type: 'movie' | 'tv'; season: number; episode: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load settings from localStorage
  useEffect(() => {
    const savedAnimation = localStorage.getItem('terminal_animation');
    const savedSound = localStorage.getItem('terminal_sound');
    const savedZoom = localStorage.getItem('terminal_zoom');
    
    if (savedAnimation) setActiveAnimation(savedAnimation as any);
    if (savedSound) setSoundEnabled(savedSound === 'true');
    if (savedZoom) setZoomLevel(parseInt(savedZoom));
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('terminal_animation', activeAnimation);
    localStorage.setItem('terminal_sound', String(soundEnabled));
    localStorage.setItem('terminal_zoom', String(zoomLevel));
    
    // Sync theme with animation for Fallout
    if (activeAnimation === 'fallout') {
      setTheme('fallout');
    } else {
      setTheme('green');
    }
  }, [activeAnimation, soundEnabled, zoomLevel]);

  // Clock state for Fallout theme
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sound effects
  const playSound = (type: 'key' | 'enter' | 'error') => {
    if (!soundEnabled) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'key') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'enter') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  };

  // Boot sequence
  useEffect(() => {
    let delay = 0;
    BOOT_SEQUENCE.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setBootLines(prev => [...prev, line]);
        if (soundEnabled) {
          // Play sound directly here to avoid dependency issues in useEffect
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'square';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => {
            setIsBooting(false);
            setHistory([{
              id: 'init',
              type: 'output',
              content: 'Terminal Sinemasına Hoşgeldiniz v1.2.0\nTMDB API Bağlantısı Başarılı.\nKomutları görmek için "yardım" yazın.',
            }]);
          }, 800);
        }
      }, delay);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, bootLines]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
       if (window.getSelection()?.toString()) return;
       inputRef.current?.focus();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playSound('enter');
    const command = input;
    setInput('');
    setHistoryIndex(-1); // Reset history index on new command
    setCommandHistory(prev => [...prev, command]);
    
    setHistory(prev => [...prev, { id: Date.now().toString() + '-in', type: 'input', content: command }]);
    
    setIsLoading(true);
    const result: CommandResult = await executeCommand(command);
    setIsLoading(false);

    if (result.type === 'clear') {
      setHistory([]);
    } else if (result.type === 'animation') {
      setActiveAnimation(result.data);
      setHistory(prev => [...prev, { id: Date.now().toString() + '-out', type: 'output', content: `Animation set to ${result.data}.` }]);
    } else if (result.type === 'sound') {
      setSoundEnabled(result.data);
      setHistory(prev => [...prev, { id: Date.now().toString() + '-out', type: 'output', content: `Sound effects ${result.data ? 'enabled' : 'disabled'}.` }]);
    } else if (result.type === 'zoom') {
      setZoomLevel(result.data);
      setHistory(prev => [...prev, { id: Date.now().toString() + '-out', type: 'output', content: `Zoom level set to ${result.data}.` }]);
    } else if (result.type === 'play') {
      setPlayData(result.data);
      setIsPlaying(true);
      setHistory(prev => [...prev, { id: Date.now().toString() + '-out', type: 'output', content: `Starting playback for ${result.data.type} ID: ${result.data.id}...` }]);
    } else {
      if (result.type === 'error') playSound('error');
      setHistory(prev => [
        ...prev, 
        { 
          id: Date.now().toString() + '-out', 
          type: result.type as any, 
          content: typeof result.content === 'string' ? result.content : undefined,
          data: result.data
        }
      ]);
    }
  };

  const getFontSize = () => {
    switch(zoomLevel) {
      case 1: return 'text-xs';
      case 2: return 'text-sm';
      case 3: return 'text-base';
      case 4: return 'text-lg';
      case 5: return 'text-xl';
      default: return 'text-base';
    }
  };

  if (isBooting) {
    return (
      <div className={`h-screen p-8 font-mono text-base theme-${theme} text-terminal overflow-hidden`}>
        {bootLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col p-4 md:p-8 font-mono ${getFontSize()} theme-${theme} relative z-10 overflow-hidden`}>
      {activeAnimation === 'matrix' && <MatrixRain />}
      {activeAnimation === 'fallout' && <FalloutBackground />}
      
      {/* Fallout Theme Overlay */}
      {theme === 'fallout' && (
        <>
          <div className="fixed top-4 right-4 z-20 text-terminal border-2 border-terminal p-2 rounded bg-black/50">
            <div className="text-xs font-bold mb-1">PIP-BOY 3000</div>
            <div className="text-xl">{time.toLocaleTimeString()}</div>
            <div className="text-xs mt-1">{time.toLocaleDateString()}</div>
          </div>
          <div className="fixed bottom-4 right-4 z-20 opacity-20 pointer-events-none">
            <pre className="text-[10px] leading-[8px] text-terminal font-bold">
{`
      /\\
     /  \\
    /    \\
   /      \\
  /        \\
 /          \\
/            \\
--------------
  VAULT-TEC
`}
            </pre>
          </div>
        </>
      )}
      
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col min-h-0 relative z-10">
        {/* Output History */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-current scrollbar-track-transparent pr-2">
          {history.map((item) => (
            <div key={item.id} className={`${item.type === 'error' ? 'text-red-500' : 'text-terminal'}`}>
              {item.type === 'input' && (
                <div className="flex gap-2">
                  <span className="opacity-70">$</span>
                  <span>{item.content}</span>
                </div>
              )}
              
              {item.type === 'output' && (
                <div className="whitespace-pre-wrap opacity-90">{item.content}</div>
              )}

              {item.type === 'error' && (
                <div className="text-red-500 font-bold">Error: {item.content}</div>
              )}

              {item.type === 'component' && item.data && (
                <div className="my-4 border-l-2 border-terminal pl-4">
                  {item.data.type === 'neofetch' && (
                    <div className="flex gap-4 font-mono text-xs md:text-sm">
                       <pre className="text-terminal hidden md:block">
{`
       .---.
      /     \\
      | (.) |
      \\     /
       \`---\`
`}
                       </pre>
                       <div className="space-y-1">
                         <div><span className="font-bold text-terminal">OS:</span> TerminalOS v1.2.0</div>
                         <div><span className="font-bold text-terminal">Host:</span> Browser ({navigator.userAgent.split(')')[0].split('(')[1] || 'Unknown'})</div>
                         <div><span className="font-bold text-terminal">Resolution:</span> {window.innerWidth}x{window.innerHeight}</div>
                         <div><span className="font-bold text-terminal">Shell:</span> React Terminal</div>
                         <div><span className="font-bold text-terminal">Theme:</span> {theme}</div>
                         <div><span className="font-bold text-terminal">Uptime:</span> {Math.floor(Date.now() / 1000) % 10000}s</div>
                       </div>
                    </div>
                  )}

                  {item.data.type === 'list' && (
                    <div className="grid grid-cols-1 gap-4">
                      {item.data.items.slice(0, 10).map((media: any) => (
                        <div key={media.id} className="flex gap-4 group hover:bg-terminal/10 p-2 transition-colors cursor-pointer"
                             onClick={() => {
                               setInput(`info ${media.id} ${media.media_type || (media.title ? 'movie' : 'tv')}`);
                               inputRef.current?.focus();
                             }}>
                          {media.poster_path && (
                            <div className="relative w-16 h-24 flex-shrink-0 hidden sm:block">
                              <Image 
                                src={`https://image.tmdb.org/t/p/w200${media.poster_path}`} 
                                alt={media.title || media.name}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all"
                              />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-lg group-hover:text-white transition-colors">
                              {media.title || media.name} <span className="text-xs opacity-60">({new Date(media.release_date || media.first_air_date).getFullYear() || 'N/A'})</span>
                            </div>
                            <div className="text-xs opacity-70 line-clamp-2">{media.overview}</div>
                            <div className="text-xs mt-1 opacity-80">ID: {media.id} | Type: {media.media_type || (media.title ? 'movie' : 'tv')} | Rating: {media.vote_average}</div>
                          </div>
                        </div>
                      ))}
                      {item.data.items.length === 0 && <div>Sonuç bulunamadı.</div>}
                    </div>
                  )}

                  {item.data.type === 'details' && (
                    <div className="flex flex-col md:flex-row gap-6 bg-terminal/5 p-4 border border-terminal/20">
                      {item.data.item.poster_path && (
                        <div className="relative w-48 h-72 flex-shrink-0 mx-auto md:mx-0">
                          <Image 
                            src={`https://image.tmdb.org/t/p/w500${item.data.item.poster_path}`} 
                            alt={item.data.item.title || item.data.item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-4">
                        <h2 className="text-2xl font-bold text-white">{item.data.item.title || item.data.item.name}</h2>
                        <p className="opacity-80 leading-relaxed">{item.data.item.overview}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><span className="font-bold opacity-80">Yayın Tarihi:</span> {item.data.item.release_date || item.data.item.first_air_date}</div>
                          <div><span className="font-bold opacity-80">Puan:</span> {item.data.item.vote_average}/10</div>
                          <div><span className="font-bold opacity-80">Durum:</span> {item.data.item.status}</div>
                          <div><span className="font-bold opacity-80">Türler:</span> {item.data.item.genres?.map((g: any) => g.name).join(', ')}</div>
                        </div>
                        
                        <div className="pt-4 flex gap-4">
                          <button 
                            className="bg-terminal text-black px-4 py-2 font-bold hover:bg-white transition-colors"
                            onClick={() => {
                              setPlayData({ 
                                id: item.data.item.id, 
                                type: item.data.mediaType, 
                                season: 1, 
                                episode: 1 
                              });
                              setIsPlaying(true);
                            }}
                          >
                            [ OYNAT ]
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="text-terminal animate-pulse">İşleniyor...</div>
          )}
          
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex gap-2 items-center bg-[#0c0c0c] py-4 border-t border-terminal/20 flex-shrink-0 relative z-20">
          <span className="text-terminal font-bold animate-pulse">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              playSound('key');
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal placeholder-terminal"
            placeholder="Komut girin..."
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>

      {/* Video Player Overlay */}
      <AnimatePresence>
        {isPlaying && playData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <VideoPlayer 
              tmdbId={playData.id} 
              type={playData.type} 
              season={playData.season} 
              episode={playData.episode} 
              onClose={() => setIsPlaying(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
