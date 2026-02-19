import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0c0c] text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black">
      <Terminal />
    </main>
  );
}
