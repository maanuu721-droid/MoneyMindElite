import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Sanitize: only allow safe filenames (alphanumeric, dash, underscore, dot)
  if (!/^[\w\-\.]+\.html$/.test(filename)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const filePath = join(process.cwd(), 'public', 'articles', filename);

  if (!existsSync(filePath)) {
    return new NextResponse(`Article not found: ${filename}`, { status: 404 });
  }

  const html = readFileSync(filePath, 'utf-8');

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
