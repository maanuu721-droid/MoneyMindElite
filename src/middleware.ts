import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Si la ruta es /articles/*.html, servir desde public
  if (pathname.startsWith('/articles/') && pathname.endsWith('.html')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/articles/:path*.html',
};
