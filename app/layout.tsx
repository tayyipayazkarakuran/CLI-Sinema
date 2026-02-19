import type {Metadata} from 'next';
import {JetBrains_Mono} from 'next/font/google';
import './globals.css'; // Global styles

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Terminal Cinema',
  description: 'A terminal-style interface for browsing and watching movies/TV shows.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body suppressHydrationWarning className="antialiased font-mono bg-[#0c0c0c] text-[#00ff41] min-h-screen w-screen overflow-hidden">
        <div className="scanlines" />
        <div className="crt-flicker" />
        <div className="crt-vignette" />
        <div className="crt-curve" />
        {children}
      </body>
    </html>
  );
}
