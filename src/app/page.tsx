
import HeaderApple from '@/components/layout/HeaderApple'

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-white via-neutral-100 to-neutral-200 flex flex-col items-center">
      <HeaderApple />
      <section className="mt-24 mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Bienvenue sur mon portfolio</h1>
        <p className="text-xl md:text-2xl font-medium mb-8">Découvrez mes projets, mon expertise et mon parcours, dans une expérience inspirée par l’UX/UI d’Apple.</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="/projects" className="px-6 py-3 rounded-full bg-black text-white font-semibold shadow hover:bg-neutral-800 transition">Voir les projets</a>
          <a href="/contact" className="px-6 py-3 rounded-full border border-black text-black font-semibold shadow hover:bg-neutral-100 transition">Me contacter</a>
        </div>
      </section>
      {/* Sections Apple-like à venir */}
    </main>
  )
}
