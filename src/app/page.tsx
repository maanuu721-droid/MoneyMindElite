import React from 'react';
import Image from 'next/image';

export default function Home() {
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
          El futuro del arbitraje de tráfico impulsado por agentes de IA autónomos. 
          Generación de contenido dinámico y optimización de conversiones en tiempo real.
        </p>
        <div className="btn-group">
          <a href="#explore" className="btn-primary">Explorar Estrategias</a>
        </div>

        <div className="content-grid" id="explore">
          <div className="glass-card">
            <h3>Análisis Predictivo</h3>
            <p>Nuestros agentes analizan tendencias globales para anticipar nichos de alta rentabilidad antes que la competencia.</p>
          </div>
          <div className="glass-card">
            <h3>Contenido Autónomo</h3>
            <p>Generación de artículos, creatividades y copy optimizado para SEO y engagement sin intervención humana.</p>
          </div>
          <div className="glass-card">
            <h3>Distribución Inteligente</h3>
            <p>Orquestación multinivel en redes sociales y buscadores para maximizar el ROI de cada clic.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} MoneyMindElite. Powered by Advanced AI Agents.</p>
      </footer>
    </main>
  );
}
