import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--terminal-bg)] text-[var(--terminal-color)] font-mono selection:bg-[var(--terminal-color)] selection:text-black">
      <Terminal />
    </main>
  );
}
