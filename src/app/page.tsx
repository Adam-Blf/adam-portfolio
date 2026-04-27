'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { BlurText } from '@/components/animations/BlurText'
import { RevealCard } from '@/components/animations/RevealCard'

/**
 * Home · landing du portfolio.
 *
 * Animations framer-motion (standards [[Stack Web Standards]]) ·
 *  - Hero h1 · stagger blur word-reveal via `BlurText` (pattern 21st.dev)
 *  - Status pill · fade-in + slide-down au mount
 *  - CTA buttons · `whileTap` scale 0.97 (feedback haptique iOS)
 *  - Cards de navigation · scroll reveal stagger via `RevealCard`
 *  - Marquee · `whileHover` pause via Tailwind `group`
 *
 * Easing imposé · `[0.16, 1, 0.3, 1]` (out-expo, signature Apple/Linear).
 */
export default function Home() {
  const reduce = useReducedMotion()

  return (
    <main className="min-h-screen w-full bg-[#faf7f0] text-[#0a0a0b]">
      <section className="min-h-screen pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Status pill · fade-down au mount */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs text-[#0a0a0b]/50 mb-12 flex items-center gap-3 flex-wrap"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8faa88] animate-pulse" />
            DISPONIBLE · CDI · FREELANCE · COLLABS
            <span className="ml-auto">Paris · FR/EN/ES</span>
          </motion.div>

          {/* H1 · blur word-stagger */}
          <h1 className="font-serif text-[15vw] md:text-[11vw] leading-[0.85] -tracking-[0.02em]">
            <BlurText text="Adam" stagger={0.08} delay={0.1} className="block" />
            <BlurText
              text="Beloucif"
              stagger={0.06}
              delay={0.3}
              className="italic text-[#6b4c7a]"
            />
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.5 }}
              animate={reduce ? false : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#e8b65b] inline-block"
            >
              .
            </motion.span>
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 grid md:grid-cols-[1.3fr_1fr] gap-10 items-end"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-[#0a0a0b]/80 max-w-2xl">
              Je construis des{' '}
              <span className="font-serif italic text-[#6b4c7a]">systèmes data</span>{' '}
              qui transforment les chiffres en décisions, et des{' '}
              <span className="font-serif italic text-[#6fa4cc]">interfaces</span>{' '}
              qu&apos;on a envie d&apos;ouvrir. Actuellement en alternance{' '}
              <strong>Data Engineer / PMSI</strong> au GHT Psy Sud, M1 Data
              Engineering &amp; IA à l&apos;EFREI.
            </p>
            <div className="space-y-3 text-sm">
              <motion.div whileTap={reduce ? undefined : { scale: 0.97 }}>
                <Link
                  href="/projects"
                  className="group flex items-center justify-between bg-[#0a0a0b] text-[#f5f1ea] px-6 py-4 rounded-2xl hover:bg-[#6b4c7a] transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  <span className="font-semibold">Voir mes projets</span>
                  <span className="group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform motion-reduce:transition-none">→</span>
                </Link>
              </motion.div>
              <motion.div whileTap={reduce ? undefined : { scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between bg-[#f5f1ea] border border-[#0a0a0b]/10 px-6 py-4 rounded-2xl hover:border-[#0a0a0b]/40 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]"
                >
                  <span className="font-semibold">Me contacter</span>
                  <span className="group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform motion-reduce:transition-none">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee · pause au hover via group/peer */}
      <div className="group py-6 bg-[#0a0a0b] text-[#f5f1ea] overflow-hidden border-y border-[#f5f1ea]/10">
        <div
          className="whitespace-nowrap flex gap-10 font-serif text-3xl italic group-hover:[animation-play-state:paused]"
          style={{ animation: 'scroll 45s linear infinite' }}
        >
          {[
            'Python',
            'TypeScript',
            'SQL / PL-SQL',
            'React',
            'Next.js',
            'Oracle',
            'Docker',
            'Pandas',
            'PHP',
            'Machine Learning',
            'NLP',
            'RAG',
            'Business Objects',
            'DxCare',
            'Python',
            'TypeScript',
            'SQL / PL-SQL',
            'React',
            'Next.js',
            'Oracle',
            'Docker',
            'Pandas',
          ].map((s, i) => (
            <span key={i}>
              {s} <span className="text-[#e8b65b]">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Cards de navigation · scroll reveal stagger */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <RevealCard delay={0}>
            <Link
              href="/parcours"
              className="group block bg-[#faf7f0] border border-[#0a0a0b]/10 rounded-3xl p-8 min-h-[280px] flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]"
            >
              <div>
                <div className="font-mono text-xs text-[#0a0a0b]/50">01 · À PROPOS</div>
                <h2 className="font-serif text-5xl mt-4 leading-[0.95]">
                  Qui je suis,{' '}
                  <span className="italic text-[#6b4c7a]">ce que je cherche</span>.
                </h2>
              </div>
              <div className="font-semibold text-sm mt-6">En savoir plus →</div>
            </Link>
          </RevealCard>
          <RevealCard delay={0.1}>
            <Link
              href="/projects"
              className="group block bg-[#0a0a0b] text-[#f5f1ea] rounded-3xl p-8 min-h-[280px] flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              <div>
                <div className="font-mono text-xs text-[#f5f1ea]/50">02 · TRAVAUX</div>
                <h2 className="font-serif text-5xl mt-4 leading-[0.95]">
                  Projets data, IA,
                  <br />
                  <span className="italic text-[#e8b65b]">fullstack</span>.
                </h2>
              </div>
              <div className="font-semibold text-sm mt-6">Voir les projets →</div>
            </Link>
          </RevealCard>
          <RevealCard delay={0.2}>
            <Link
              href="/contact"
              className="group block bg-[#e8b65b] text-[#0a0a0b] rounded-3xl p-8 min-h-[280px] flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]"
            >
              <div>
                <div className="font-mono text-xs text-[#0a0a0b]/60">03 · CONTACT</div>
                <h2 className="font-serif text-5xl mt-4 leading-[0.95]">
                  Disons-nous
                  <br />
                  <span className="italic">bonjour</span>.
                </h2>
              </div>
              <div className="font-semibold text-sm mt-6">Me contacter →</div>
            </Link>
          </RevealCard>
        </div>
      </section>

      <style>{`@keyframes scroll { to { transform: translateX(-50%); } }`}</style>
    </main>
  )
}
