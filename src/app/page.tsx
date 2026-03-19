

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-[#f5f5f7] via-[#f0f1f3] to-[#e9e9ee]">
      {/* Hero Section */}
      <section className="container-apple fade-in text-center mt-24 mb-16">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8" style={{letterSpacing: '-0.04em'}}>Adam Beloucif</h1>
        <p className="text-2xl md:text-3xl font-medium mb-10 text-secondary">Data Engineer & Fullstack Developer<br/>Inspiré par l’UX/UI d’Apple</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-2">
          <a href="/projects" className="btn-apple-primary">Voir les projets</a>
          <a href="/contact" className="btn-apple-secondary">Me contacter</a>
        </div>
      </section>

      {/* Projets Section */}
      <section className="container-apple fade-in" style={{animationDelay: '0.2s'}}>
        <h2 className="text-4xl font-bold mb-6">Projets phares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Exemple de projet Apple Card */}
          <div className="card-apple">
            <h3 className="text-2xl font-semibold mb-2">Data Pipeline IA</h3>
            <p className="text-secondary mb-4">Automatisation complète d’un pipeline de données pour l’IA, déploiement cloud, monitoring et visualisation temps réel.</p>
            <a href="/projects" className="btn-apple-secondary">Voir le projet</a>
          </div>
          <div className="card-apple">
            <h3 className="text-2xl font-semibold mb-2">Portfolio Next.js</h3>
            <p className="text-secondary mb-4">Site personnel ultra-rapide, design premium, animations fluides, responsive et SEO optimisé.</p>
            <a href="/projects" className="btn-apple-secondary">Voir le projet</a>
          </div>
        </div>
      </section>

      {/* À propos Section */}
      <section className="container-apple fade-in" style={{animationDelay: '0.4s'}}>
        <h2 className="text-4xl font-bold mb-6">À propos</h2>
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-6">Ingénieur Data & Fullstack passionné par la création de solutions élégantes, performantes et scalables. Spécialisé en Python, Machine Learning, React, Next.js, cloud et IA. J’aime concevoir des expériences utilisateurs premium, inspirées des meilleurs standards du design.</p>
        <a href="/about" className="btn-apple-primary">En savoir plus</a>
      </section>

      {/* Call to Action Section */}
      <section className="container-apple fade-in" style={{animationDelay: '0.6s'}}>
        <h2 className="text-3xl font-bold mb-4">Travaillons ensemble</h2>
        <p className="text-secondary mb-6">Disponible pour missions freelance, collaborations ou CDI. Discutons de votre projet !</p>
        <a href="/contact" className="btn-apple-primary">Contact rapide</a>
      </section>
    </main>
  )
}
