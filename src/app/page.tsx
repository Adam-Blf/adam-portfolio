import Link from 'next/link'
import { personalInfo } from '@/lib/data'

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#faf7f0] text-[#0a0a0b]">
      <section className="min-h-screen pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-xs text-[#0a0a0b]/50 mb-12 flex items-center gap-3 flex-wrap">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8faa88] animate-pulse" />
            DISPONIBLE · CDI · FREELANCE · COLLABS
            <span className="ml-auto">Paris · FR/EN/ES</span>
          </div>

          <h1 className="font-serif text-[15vw] md:text-[11vw] leading-[0.85] -tracking-[0.02em]">
            Adam<br />
            <span className="italic text-[#6b4c7a]">Beloucif</span>
            <span className="text-[#e8b65b]">.</span>
          </h1>

          <div className="mt-12 md:mt-16 grid md:grid-cols-[1.3fr_1fr] gap-10 items-end">
            <p className="text-xl md:text-2xl leading-relaxed text-[#0a0a0b]/80 max-w-2xl">
              Je construis des <span className="font-serif italic text-[#6b4c7a]">systèmes data</span> qui transforment les chiffres en décisions, et des <span className="font-serif italic text-[#6fa4cc]">interfaces</span> qu'on a envie d'ouvrir. Actuellement en alternance <strong>Data Engineer / PMSI</strong> au GHT Psy Sud, M1 Data Engineering & IA à l'EFREI.
            </p>
            <div className="space-y-3 text-sm">
              <Link href="/projects" className="group flex items-center justify-between bg-[#0a0a0b] text-[#f5f1ea] px-6 py-4 rounded-2xl hover:bg-[#6b4c7a] transition">
                <span className="font-semibold">Voir mes projets</span>
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
              <Link href="/contact" className="group flex items-center justify-between bg-[#f5f1ea] border border-[#0a0a0b]/10 px-6 py-4 rounded-2xl hover:border-[#0a0a0b]/40 transition">
                <span className="font-semibold">Me contacter</span>
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-6 bg-[#0a0a0b] text-[#f5f1ea] overflow-hidden border-y border-[#f5f1ea]/10">
        <div className="whitespace-nowrap flex gap-10 font-serif text-3xl italic animate-[scroll_45s_linear_infinite]" style={{ animation: 'scroll 45s linear infinite' }}>
          {['Python','TypeScript','SQL / PL-SQL','React','Next.js','Oracle','Docker','Pandas','PHP','Machine Learning','NLP','RAG','Business Objects','DxCare','Python','TypeScript','SQL / PL-SQL','React','Next.js','Oracle','Docker','Pandas'].map((s, i) => (
            <span key={i}>{s} <span className="text-[#e8b65b]">·</span></span>
          ))}
        </div>
      </div>

      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <Link href="/parcours" className="group block bg-[#faf7f0] border border-[#0a0a0b]/10 rounded-3xl p-8 min-h-[280px] flex flex-col justify-between hover:-translate-y-1 transition">
            <div>
              <div className="font-mono text-xs text-[#0a0a0b]/50">01 · À PROPOS</div>
              <h2 className="font-serif text-5xl mt-4 leading-[0.95]">Qui je suis, <span className="italic text-[#6b4c7a]">ce que je cherche</span>.</h2>
            </div>
            <div className="font-semibold text-sm mt-6">En savoir plus →</div>
          </Link>
          <Link href="/projects" className="group block bg-[#0a0a0b] text-[#f5f1ea] rounded-3xl p-8 min-h-[280px] flex flex-col justify-between hover:-translate-y-1 transition">
            <div>
              <div className="font-mono text-xs text-[#f5f1ea]/50">02 · TRAVAUX</div>
              <h2 className="font-serif text-5xl mt-4 leading-[0.95]">Projets data, IA,<br /><span className="italic text-[#e8b65b]">fullstack</span>.</h2>
            </div>
            <div className="font-semibold text-sm mt-6">Voir les projets →</div>
          </Link>
          <Link href="/contact" className="group block bg-[#e8b65b] text-[#0a0a0b] rounded-3xl p-8 min-h-[280px] flex flex-col justify-between hover:-translate-y-1 transition">
            <div>
              <div className="font-mono text-xs text-[#0a0a0b]/60">03 · CONTACT</div>
              <h2 className="font-serif text-5xl mt-4 leading-[0.95]">Disons-nous<br /><span className="italic">bonjour</span>.</h2>
            </div>
            <div className="font-semibold text-sm mt-6">Me contacter →</div>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes scroll { to { transform: translateX(-50%); } }
      `}</style>
    </main>
  )
}
