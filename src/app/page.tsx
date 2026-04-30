'use client';

import React, { useEffect, useState } from 'react';

interface Article {
  title: string;
  niche: string;
  date: string;
  filename: string;
  imageUrl: string;
  seo_description?: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/articles.json')
      .then(res => res.json())
      .then(data => {
        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // filename stored as "articles/20260430_slug.html" → URL is "/articles/20260430_slug.html"
  const getArticleUrl = (filename: string) => {
    if (filename.startsWith('/')) return filename;
    if (filename.startsWith('articles/')) return `/${filename}`;
    return `/articles/${filename}`;
  };

  const nicheColor: Record<string, string> = {
    'Small Business': '#f59e0b',
    'Real Estate': '#10b981',
    'Wealth Arbitrage': '#6366f1',
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 100%)',
      color: '#e8e8e8',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Georgia, sans-serif",
    }}>
      {/* Top Bar */}
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        padding: '14px 20px',
        textAlign: 'center',
      }}>
        <span style={{ color: '#000', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '1px' }}>
          💰 MoneyMindElite — Premium Financial Intelligence
        </span>
      </div>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '60px 24px 40px' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
        }}>
          MoneyMindElite
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px' }}>
          AI-powered financial intelligence for US, Canada &amp; UK markets.
          Micro-SaaS · Real Estate · Wealth Arbitrage.
        </p>
      </section>

      {/* Articles Grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.6rem', color: '#fff', marginBottom: '40px' }}>
          Latest Market Insights
        </h2>

        {loading && (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Loading articles...</p>
        )}

        {!loading && articles.length === 0 && (
          <div style={{
            background: '#111',
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            color: '#64748b',
          }}>
            <p>Curating the latest opportunities... Check back shortly.</p>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {articles.map((article, idx) => {
            const color = nicheColor[article.niche] || '#f59e0b';
            const url = getArticleUrl(article.filename);
            return (
              <a
                key={idx}
                href={url}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: '#111',
                  border: '1px solid #1e293b',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'transform 0.2s, border-color 0.2s',
                  cursor: 'pointer',
                  height: '100%',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.borderColor = color;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.borderColor = '#1e293b';
                  }}
                >
                  {/* Niche tag */}
                  <span style={{
                    display: 'inline-block',
                    background: `${color}22`,
                    color: color,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '4px 14px',
                    borderRadius: '20px',
                    border: `1px solid ${color}44`,
                    marginBottom: '16px',
                  }}>
                    {article.niche}
                  </span>

                  <h3 style={{
                    color: '#fff',
                    fontSize: '1.1rem',
                    lineHeight: 1.4,
                    marginBottom: '10px',
                  }}>
                    {article.title}
                  </h3>

                  {article.seo_description && (
                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
                      {article.seo_description}
                    </p>
                  )}

                  <p style={{ color: '#475569', fontSize: '0.75rem', marginBottom: '20px' }}>
                    {article.date}
                  </p>

                  <span style={{
                    display: 'inline-block',
                    background: `linear-gradient(135deg, ${color}, #ef4444)`,
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    padding: '10px 20px',
                    borderRadius: '8px',
                  }}>
                    Read Analysis →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #1a1a1a',
        padding: '24px',
        textAlign: 'center',
        color: '#334155',
        fontSize: '0.8rem',
      }}>
        <p>© {new Date().getFullYear()} MoneyMindElite. For informational purposes only. Not financial advice.</p>
      </footer>
    </main>
  );
}
