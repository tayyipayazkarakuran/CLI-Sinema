'use client';

export default function FalloutBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0f0a]">
      {/* Scanlines and Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--terminal-color)]/5 to-transparent animate-scan" style={{ backgroundSize: '100% 4px' }}></div>
      
      {/* Pip-Boy UI Frame */}
      <svg className="absolute inset-0 w-full h-full text-terminal opacity-30" preserveAspectRatio="none">
        {/* Top Bar */}
        <path d="M0 0 L100 0 L100 50 L0 50 Z" fill="none" />
        <line x1="20" y1="40" x2="98%" y2="40" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="40" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
        
        {/* Bottom Bar */}
        <line x1="20" y1="95%" x2="98%" y2="95%" stroke="currentColor" strokeWidth="2" />
        <line x1="98%" y1="95%" x2="98%" y2="90%" stroke="currentColor" strokeWidth="2" />
        
        {/* Decorative Ticks */}
        <rect x="30" y="30" width="10" height="5" fill="currentColor" />
        <rect x="45" y="30" width="10" height="5" fill="currentColor" />
        <rect x="60" y="30" width="10" height="5" fill="currentColor" />
      </svg>

      {/* Vault Boy & Vault-Tec Logo Container */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg viewBox="0 0 500 500" className="w-[600px] h-[600px] text-terminal">
          {/* Vault-Tec Gear Logo */}
          <g transform="translate(250, 250) scale(0.8)">
             <circle cx="0" cy="0" r="200" fill="none" stroke="currentColor" strokeWidth="10" />
             <path d="M-30 -200 L30 -200 L50 -240 L-50 -240 Z" fill="currentColor" transform="rotate(0)" />
             <path d="M-30 -200 L30 -200 L50 -240 L-50 -240 Z" fill="currentColor" transform="rotate(45)" />
             <path d="M-30 -200 L30 -200 L50 -240 L-50 -240 Z" fill="currentColor" transform="rotate(90)" />
             <path d="M-30 -200 L30 -200 L50 -240 L-50 -240 Z" fill="currentColor" transform="rotate(135)" />
             <path d="M-30 -200 L30 -200 L50 -240 L-50 -240 Z" fill="currentColor" transform="rotate(180)" />
             <path d="M-30 -200 L30 -200 L50 -240 L-50 -240 Z" fill="currentColor" transform="rotate(225)" />
             <path d="M-30 -200 L30 -200 L50 -240 L-50 -240 Z" fill="currentColor" transform="rotate(270)" />
             <path d="M-30 -200 L30 -200 L50 -240 L-50 -240 Z" fill="currentColor" transform="rotate(315)" />
             
             {/* Inner Vault-Tec Text Area */}
             <circle cx="0" cy="0" r="140" fill="none" stroke="currentColor" strokeWidth="5" />
             <path d="M-100 0 L100 0" stroke="currentColor" strokeWidth="2" />
             <path d="M0 -100 L0 100" stroke="currentColor" strokeWidth="2" />
          </g>

          {/* Vault Boy Head (Stylized) */}
          <g transform="translate(250, 250) scale(0.4)">
            {/* Hair */}
            <path d="M-80 -60 C -100 -100, 0 -150, 80 -80 C 120 -60, 120 0, 80 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            <path d="M-80 -60 C -90 -40, -90 -20, -80 0" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            
            {/* Face Outline */}
            <path d="M-80 0 C -80 100, 80 100, 80 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            
            {/* Ear */}
            <path d="M-80 -20 C -100 -20, -100 20, -80 20" fill="none" stroke="currentColor" strokeWidth="8" />
            
            {/* Eyes */}
            <circle cx="-30" cy="-10" r="5" fill="currentColor" />
            <circle cx="30" cy="-10" r="5" fill="currentColor" />
            
            {/* Smile */}
            <path d="M-40 30 Q 0 60, 40 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            
            {/* Thumbs Up Hand */}
            <g transform="translate(100, 60) rotate(-10)">
              <path d="M0 0 C 10 -20, 30 -20, 40 0 L 40 40 C 30 60, 10 60, 0 40 Z" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              <path d="M0 40 C -10 50, -10 70, 0 80" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              <path d="M10 40 C 0 50, 0 70, 10 80" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              <path d="M20 40 C 10 50, 10 70, 20 80" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              <path d="M30 40 C 20 50, 20 70, 30 80" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              {/* Thumb */}
              <path d="M0 20 C -20 10, -20 -30, 0 -40 C 10 -30, 20 -10, 10 10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>

      {/* Pip-Boy Stats Overlay (Static Decoration) */}
      <div className="absolute bottom-10 left-10 text-terminal opacity-50 font-bold text-xs hidden md:block">
        <div className="flex gap-4 mb-2">
          <div className="border border-terminal px-2 py-1">HP 95/100</div>
          <div className="border border-terminal px-2 py-1">AP 70/90</div>
        </div>
        <div className="flex gap-2">
          <div className="w-20 h-2 bg-terminal/20"><div className="w-[80%] h-full bg-terminal"></div></div>
          <div className="w-20 h-2 bg-terminal/20"><div className="w-[60%] h-full bg-terminal"></div></div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 text-terminal opacity-50 font-bold text-xs hidden md:block text-right">
        <div className="mb-1">RADS <span className="animate-pulse text-red-500">12</span></div>
        <div className="w-32 h-2 bg-terminal/20 ml-auto"><div className="w-[5%] h-full bg-red-500"></div></div>
      </div>

      {/* Menu Tabs */}
      <div className="absolute top-10 left-0 w-full flex justify-center gap-8 text-terminal opacity-60 font-bold text-sm tracking-widest pointer-events-none">
        <span className="opacity-50">STAT</span>
        <span className="opacity-50">INV</span>
        <span className="border-b-2 border-terminal pb-1">DATA</span>
        <span className="opacity-50">MAP</span>
        <span className="opacity-50">RADIO</span>
      </div>
    </div>
  );
}
