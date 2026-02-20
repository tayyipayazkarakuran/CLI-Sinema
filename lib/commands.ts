import { ReactNode } from 'react';

export type CommandResult = {
  type: 'output' | 'component' | 'error' | 'clear' | 'play' | 'theme' | 'matrix' | 'animation' | 'sound' | 'zoom' | 'boot';
  content?: string | ReactNode;
  data?: any;
};

export async function executeCommand(input: string): Promise<CommandResult> {
  const parts = input.trim().split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'help':
      return {
        type: 'output',
        content: `
AVAILABLE COMMANDS:
-------------------
  help                  Show this help message
  clear                 Clear the terminal screen
  search [query]        Search for movies and TV shows
  top [movie|tv]        List top rated movies or TV shows
  now_playing           List movies currently in theaters
  upcoming              List upcoming movies
  info [id] [type]      Get details for a specific ID (type: movie|tv)
  play [type] [id]      Play a movie or TV show
  animation [type]      Set background animation (matrix, fallout, off)
  sound [on/off]        Toggle sound effects
  zoom [level]          Set font size (1-5)
  neofetch              Show system information
`
      };

    case 'yardım':
      return {
        type: 'output',
        content: `
MEVCUT KOMUTLAR:
----------------
  yardım                Bu yardım mesajını göster
  temizle               Terminal ekranını temizle
  ara [sorgu]           Film ve dizileri ara
  top [movie|tv]        En çok oy alan film veya dizileri listele
  vizyondakiler         Vizyondaki filmleri listele
  yakinda               Yakında çıkacak filmleri listele
  bilgi [id] [type]     Belirli bir ID için detayları getir
  oynat [type] [id]     Film veya dizi oynat
  animasyon [tur]       Arka plan animasyonunu ayarla (matrix, fallout, kapat)
  ses [ac/kapat]        Ses efektlerini aç/kapat
  zoom [seviye]         Yazı boyutunu ayarla (1-5)
  sistem                Sistem bilgilerini göster
`
      };

    case 'clear':
    case 'temizle':
      return { type: 'clear' };

    case 'animation':
    case 'animasyon':
    case 'matrix': // Backward compatibility
      let animType = args[0]?.toLowerCase();
      
      // Handle 'matrix [on/off]' legacy command
      if (command === 'matrix') {
         if (animType === 'on' || animType === 'ac') animType = 'matrix';
         else if (animType === 'off' || animType === 'kapat') animType = 'off';
         else if (!animType) animType = 'matrix'; // Default to on if just 'matrix' typed
      }

      if (animType === 'kapat') animType = 'off';
      
      if (!['matrix', 'fallout', 'off'].includes(animType)) {
         return { type: 'error', content: 'Usage: animation [matrix|fallout|off] / animasyon [matrix|fallout|kapat]' };
      }
      return { type: 'animation', data: animType };

    case 'sound':
    case 'ses':
      const sState = args[0]?.toLowerCase();
      if (sState === 'on' || sState === 'ac') return { type: 'sound', data: true };
      if (sState === 'off' || sState === 'kapat') return { type: 'sound', data: false };
      return { type: 'error', content: 'Usage: sound [on/off] / ses [ac/kapat]' };

    case 'zoom':
      const level = parseInt(args[0]);
      if (isNaN(level) || level < 1 || level > 5) return { type: 'error', content: 'Usage: zoom [1-5]' };
      return { type: 'zoom', data: level };

    case 'neofetch':
    case 'sistem':
      return {
        type: 'component',
        data: { type: 'neofetch' }
      };

    case 'now_playing':
    case 'vizyondakiler':
      try {
        const res = await fetch(`/api/tmdb?path=movie/now_playing&language=tr-TR`);
        const data = await res.json();
        return { type: 'component', data: { type: 'list', items: data.results } };
      } catch (e) {
        return { type: 'error', content: 'Veri çekilemedi.' };
      }

    case 'upcoming':
    case 'yakinda':
      try {
        const res = await fetch(`/api/tmdb?path=movie/upcoming&language=tr-TR`);
        const data = await res.json();
        return { type: 'component', data: { type: 'list', items: data.results } };
      } catch (e) {
        return { type: 'error', content: 'Veri çekilemedi.' };
      }

    case 'search':
    case 'ara':
      if (args.length === 0) return { type: 'error', content: 'Kullanım: ara [sorgu] (Usage: search [query])' };
      const query = args.join(' ');
      try {
        const res = await fetch(`/api/tmdb?path=search/multi&query=${encodeURIComponent(query)}&language=tr-TR`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return { type: 'component', data: { type: 'list', items: data.results } };
        }
        return { type: 'output', content: 'Sonuç bulunamadı. (No results found.)' };
      } catch (e) {
        return { type: 'error', content: 'Veri çekilemedi. (Failed to fetch data.)' };
      }

    case 'top':
      const type = args[0] === 'tv' ? 'tv' : 'movie';
      try {
        const res = await fetch(`/api/tmdb?path=${type}/top_rated&language=tr-TR`);
        const data = await res.json();
        return { type: 'component', data: { type: 'list', items: data.results } };
      } catch (e) {
        return { type: 'error', content: 'Veri çekilemedi. (Failed to fetch data.)' };
      }

    case 'info':
    case 'bilgi':
      if (args.length < 2) return { type: 'error', content: 'Kullanım: bilgi [id] [movie|tv]' };
      const id = args[0];
      const infoType = args[1] === 'tv' ? 'tv' : 'movie';
      try {
        const res = await fetch(`/api/tmdb?path=${infoType}/${id}&language=tr-TR`);
        const data = await res.json();
        return { type: 'component', data: { type: 'details', item: data, mediaType: infoType } };
      } catch (e) {
        return { type: 'error', content: 'Detaylar alınamadı. (Failed to fetch details.)' };
      }

    case 'play':
    case 'oynat':
    case 'izle':
      if (args.length < 2) return { type: 'error', content: 'Kullanım: oynat [movie|tv] [id] [sezon] [bölüm]' };
      const playType = args[0] === 'tv' ? 'tv' : 'movie';
      const playId = args[1];
      const season = args[2] ? parseInt(args[2]) : 1;
      const episode = args[3] ? parseInt(args[3]) : 1;
      
      return { 
        type: 'play', 
        data: { 
          id: playId, 
          type: playType, 
          season, 
          episode 
        } 
      };

    default:
      return { type: 'error', content: `Komut bulunamadı: ${command}. Mevcut komutlar için 'yardım' yazın. (Command not found)` };
  }
}
