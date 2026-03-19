'use client';

export default function FalloutBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0f0a]">
      {/* Scanlines and Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--terminal-color)]/5 to-transparent animate-scan" style={{ backgroundSize: '100% 4px' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* Pip-Boy Screen Frame */}
      <svg className="absolute inset-0 w-full h-full text-terminal opacity-40" preserveAspectRatio="none">
        {/* Outer Frame */}
        <path d="M 20 20 L calc(100% - 20) 20 L calc(100% - 20) calc(100% - 20) L 20 calc(100% - 20) Z" fill="none" stroke="currentColor" strokeWidth="2" rx="20" />
        
        {/* Inner Frame with rounded corners */}
        <path d="M 40 40 L calc(100% - 40) 40 L calc(100% - 40) calc(100% - 40) L 40 calc(100% - 40) Z" fill="none" stroke="currentColor" strokeWidth="1" rx="10" />

        {/* Top Header Line */}
        <line x1="40" y1="80" x2="calc(100% - 40)" y2="80" stroke="currentColor" strokeWidth="2" />
        
        {/* Bottom Footer Line */}
        <line x1="40" y1="calc(100% - 80)" x2="calc(100% - 40)" y2="calc(100% - 80)" stroke="currentColor" strokeWidth="2" />

        {/* Side Ticks */}
        <g stroke="currentColor" strokeWidth="1">
          <line x1="20" y1="100" x2="30" y2="100" />
          <line x1="20" y1="150" x2="30" y2="150" />
          <line x1="20" y1="200" x2="30" y2="200" />
          <line x1="20" y1="250" x2="30" y2="250" />
          
          <line x1="calc(100% - 20)" y1="100" x2="calc(100% - 30)" y2="100" />
          <line x1="calc(100% - 20)" y1="150" x2="calc(100% - 30)" y2="150" />
          <line x1="calc(100% - 20)" y1="200" x2="calc(100% - 30)" y2="200" />
          <line x1="calc(100% - 20)" y1="250" x2="calc(100% - 30)" y2="250" />
        </g>
      </svg>

      {/* Vault Boy & Vault-Tec Logo Container */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <svg viewBox="0 0 800 800" className="w-[800px] h-[800px] text-terminal">
          {/* Vault-Tec Gear Logo (Background) */}
          <g transform="translate(400, 400) scale(1.2)" opacity="0.3">
            <circle cx="0" cy="0" r="250" fill="none" stroke="currentColor" strokeWidth="15" />
            <circle cx="0" cy="0" r="180" fill="none" stroke="currentColor" strokeWidth="8" />
            
            {/* Gear Teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <path key={angle} d="M-40 -250 L40 -250 L60 -300 L-60 -300 Z" fill="currentColor" transform={`rotate(${angle})`} />
            ))}
            
            {/* Inner Vault-Tec Text Area */}
            <path d="M-130 0 L130 0" stroke="currentColor" strokeWidth="4" />
            <path d="M0 -130 L0 130" stroke="currentColor" strokeWidth="4" />
            <circle cx="0" cy="0" r="50" fill="currentColor" />
          </g>

          {/* Detailed Vault Boy (Thumbs Up) */}
          <g transform="translate(400, 450) scale(0.8)">
            {/* Hair */}
            <path d="M-100 -120 C -140 -180, -20 -240, 80 -160 C 140 -120, 140 -20, 100 40" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
            <path d="M-100 -120 C -120 -80, -120 -40, -100 0" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
            <path d="M-60 -180 C -20 -200, 40 -180, 80 -140" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            
            {/* Face Outline */}
            <path d="M-100 0 C -120 120, 120 120, 100 40" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
            
            {/* Ear */}
            <path d="M-110 -40 C -140 -40, -140 20, -110 20" fill="none" stroke="currentColor" strokeWidth="10" />
            <path d="M-120 -10 C -130 -10, -130 0, -120 0" fill="none" stroke="currentColor" strokeWidth="6" />
            
            {/* Eyes */}
            <ellipse cx="-40" cy="-20" rx="10" ry="15" fill="currentColor" />
            <ellipse cx="40" cy="-20" rx="10" ry="15" fill="currentColor" />
            
            {/* Eyebrows */}
            <path d="M-60 -50 Q -40 -60, -20 -50" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M20 -50 Q 40 -60, 60 -50" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />

            {/* Nose */}
            <path d="M-5 0 C -10 10, 10 10, 5 0" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            
            {/* Smile */}
            <path d="M-50 40 Q 0 80, 50 40" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            <path d="M-60 30 Q -50 40, -40 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M40 30 Q 50 40, 60 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            
            {/* Collar/Suit */}
            <path d="M-80 100 L -120 180 L -60 180 L -40 130" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M80 100 L 120 180 L 60 180 L 40 130" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M-40 130 L 0 180 L 40 130" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M-120 180 L -140 250" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            <path d="M120 180 L 140 250" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            
            {/* Thumbs Up Hand */}
            <g transform="translate(150, 100) rotate(-15)">
              {/* Hand Base */}
              <path d="M0 0 C 20 -30, 50 -30, 70 0 L 70 60 C 50 90, 20 90, 0 60 Z" fill="#0a0f0a" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Fingers */}
              <path d="M0 60 C -20 75, -20 105, 0 120" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              <path d="M15 60 C -5 75, -5 105, 15 120" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              <path d="M30 60 C 10 75, 10 105, 30 120" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              <path d="M45 60 C 25 75, 25 105, 45 120" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              
              {/* Thumb */}
              <path d="M0 30 C -30 15, -30 -45, 0 -60 C 15 -45, 30 -15, 15 15" fill="#0a0f0a" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Cuff */}
              <path d="M50 0 L 90 -20 L 110 40 L 70 60 Z" fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="round" />
            </g>
          </g>
        </svg>
      </div>

      {/* Pip-Boy Stats Overlay (Static Decoration) */}
      <div className="absolute bottom-12 left-12 text-terminal opacity-70 font-bold text-sm hidden md:block tracking-widest">
        <div className="flex gap-6 mb-3">
          <div className="flex items-center gap-2">
            <span>HP</span>
            <div className="border-2 border-terminal px-3 py-1 bg-[var(--terminal-color)]/10">95/100</div>
          </div>
          <div className="flex items-center gap-2">
            <span>AP</span>
            <div className="border-2 border-terminal px-3 py-1 bg-[var(--terminal-color)]/10">70/90</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-32 h-3 border border-terminal p-[1px]">
            <div className="w-[95%] h-full bg-[var(--terminal-color)]"></div>
          </div>
          <div className="w-32 h-3 border border-terminal p-[1px]">
            <div className="w-[77%] h-full bg-[var(--terminal-color)]"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 text-terminal opacity-70 font-bold text-sm hidden md:block text-right tracking-widest">
        <div className="mb-2 flex items-center justify-end gap-3">
          <span className="animate-pulse text-red-500">RADS</span>
          <div className="border-2 border-terminal px-3 py-1 bg-[var(--terminal-color)]/10">12</div>
        </div>
        <div className="w-48 h-3 border border-terminal p-[1px] ml-auto">
          <div className="w-[12%] h-full bg-red-500"></div>
        </div>
      </div>

      {/* Menu Tabs */}
      <div className="absolute top-10 left-0 w-full flex justify-center gap-12 text-terminal opacity-80 font-bold text-lg tracking-[0.2em] pointer-events-none">
        <span className="opacity-40 hover:opacity-100 transition-opacity">STAT</span>
        <span className="opacity-40 hover:opacity-100 transition-opacity">INV</span>
        <span className="border-b-4 border-terminal pb-1 px-2 shadow-[0_0_10px_currentColor]">DATA</span>
        <span className="opacity-40 hover:opacity-100 transition-opacity">MAP</span>
        <span className="opacity-40 hover:opacity-100 transition-opacity">RADIO</span>
      </div>
      
      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 bg-[var(--terminal-color)] opacity-[0.02] mix-blend-screen animate-pulse pointer-events-none"></div>
    </div>
  );
}
