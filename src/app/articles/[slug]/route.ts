import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), 'public', 'articles', slug);
    
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Article not found', { status: 404 });
    }
    
    const html = fs.readFileSync(filePath, 'utf-8');
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    return new NextResponse('Error loading article', { status: 500 });
  }
}
