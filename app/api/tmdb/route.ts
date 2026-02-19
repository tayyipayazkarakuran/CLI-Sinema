import { NextRequest, NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.TMDB_API_KEY || '0bc00260243a580baf482945c66e703e';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');
  
  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  // Construct the TMDB URL
  const url = new URL(`${TMDB_BASE_URL}/${path}`);
  url.searchParams.append('api_key', TMDB_API_KEY);

  // Append other query params from the request, excluding 'path'
  searchParams.forEach((value, key) => {
    if (key !== 'path') {
      url.searchParams.append(key, value);
    }
  });

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      return NextResponse.json({ error: `TMDB API error: ${res.statusText}` }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
