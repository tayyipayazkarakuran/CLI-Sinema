'use client';

export default function FalloutBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center bg-[#050a05]">
      {/* Old TV Effect Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--terminal-color)]/10 to-transparent animate-scan" style={{ backgroundSize: '100% 3px' }}></div>
      
      {/* Test Pattern Container */}
      <div className="relative w-[600px] h-[600px] flex items-center justify-center opacity-40 text-terminal">
        <svg viewBox="0 0 500 500" className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main Circle */}
          <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="2" fill="rgba(0, 255, 65, 0.05)" />
          <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="1" fill="none" />
          
          {/* Crosshairs */}
          <line x1="250" y1="10" x2="250" y2="490" stroke="currentColor" strokeWidth="1" />
          <line x1="10" y1="250" x2="490" y2="250" stroke="currentColor" strokeWidth="1" />
          
          {/* Diagonal Lines */}
          <line x1="80" y1="80" x2="420" y2="420" stroke="currentColor" strokeWidth="1" />
          <line x1="420" y1="80" x2="80" y2="420" stroke="currentColor" strokeWidth="1" />
          
          {/* Center Pattern */}
          <circle cx="250" cy="250" r="50" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="250" cy="250" r="10" fill="currentColor" />
          
          {/* Indian Head / Native American Figure Placeholder (Simplified Geometry) */}
          <path d="M250 200 L230 180 L270 180 Z" fill="currentColor" />
          
          {/* Side Circles */}
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="450" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="450" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="450" cy="450" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          
          {/* Text */}
          <text x="250" y="250" textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontFamily="monospace" fontSize="48" fontWeight="bold" filter="url(#glow)" className="animate-pulse">
            PLEASE STAND BY
          </text>
        </svg>
      </div>
    </div>
  );
}
