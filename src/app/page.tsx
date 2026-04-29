import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Article {
  title: string;
  niche: string;
  date: string;
  filename: string;
  imageUrl: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/articles.json')
      .then(res => res.json())
      .then(data => setArticles(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error loading articles:', err));
  }, []);

  return (
    <main className="premium-container">
      <section className="hero-section">
        <div className="logo-container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Image 
            src="/logo.png" 
            alt="MoneyMindElite Logo" 
            width={150} 
            height={150} 
            priority
            style={{ borderRadius: '20px', boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}
          />
        </div>
        <h1>MoneyMindElite</h1>
        <p className="subtitle">
          The future of traffic arbitrage powered by autonomous AI agents. 
          Dynamic content generation and real-time conversion optimization for the US, CA, and UK markets.
        </p>
        
        <div className="btn-group">
          <a href="#explore" className="btn-primary">Explore Insights</a>
        </div>

        <div className="articles-section" id="explore" style={{ marginTop: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Latest Market Insights</h2>
          <div className="content-grid">
            {articles.length === 0 ? (
              <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <p>Curating the latest opportunities... Check back shortly.</p>
              </div>
            ) : (
              articles.map((article, idx) => (
                <div key={idx} className="glass-card article-card">
                  <div className="badge">{article.niche}</div>
                  <img src={article.imageUrl} alt={article.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
                  <h3>{article.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#aaa' }}>{article.date}</p>
                  <a href={article.filename.replace('public/', '/')} className="read-more">Read Analysis →</a>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="features-grid" style={{ marginTop: '4rem' }}>
          <div className="glass-card">
            <h3>Predictive Analysis</h3>
            <p>Our agents analyze global trends to anticipate high-yield niches before the competition.</p>
          </div>
          <div className="glass-card">
            <h3>Autonomous Content</h3>
            <p>SEO-optimized articles, creatives, and copy generated without human intervention.</p>
          </div>
          <div className="glass-card">
            <h3>Smart Distribution</h3>
            <p>Multi-level orchestration across social platforms and search engines to maximize ROI.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} MoneyMindElite. Powered by Advanced AI Agents.</p>
      </footer>

      <style jsx global>{`
        .badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
          margin-bottom: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .article-card {
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }
        .article-card:hover {
          transform: translateY(-5px);
        }
        .read-more {
          margin-top: auto;
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          font-size: 0.9rem;
          padding-top: 1rem;
        }
      `}</style>
    </main>
  );
}
