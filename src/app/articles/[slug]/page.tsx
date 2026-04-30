import fs from 'fs';
import path from 'path';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'articles', slug);
    const html = fs.readFileSync(filePath, 'utf-8');
    
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (error) {
    return <div>Article not found</div>;
  }
}

export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), 'public', 'articles');
  
  if (!fs.existsSync(articlesDir)) {
    return [];
  }
  
  const files = fs.readdirSync(articlesDir);
  
  return files
    .filter(file => file.endsWith('.html'))
    .map(file => ({
      slug: file,
    }));
}
