'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

export default function GlassHero() {
  const { t } = useI18n()

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-24 md:py-36 bg-gradient-to-br from-[#FAFAFA]/80 via-[#3F3F46]/30 to-[#18181B]/80 dark:from-[#18181B]/80 dark:via-[#3F3F46]/40 dark:to-[#09090B]/80 overflow-hidden">
      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-2xl px-8 py-12 rounded-3xl backdrop-blur-xl bg-white/60 dark:bg-black/40 border border-white/30 dark:border-white/10 shadow-xl flex flex-col items-center animate-fade-in-up">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-[#2563EB]/30 shadow-lg mb-8">
          <Image
            src="/images/adam-photo.jpg"
            alt="Adam Beloucif"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <h1 className="font-archivo text-4xl md:text-6xl font-bold text-[#18181B] dark:text-[#FAFAFA] tracking-tight mb-2 drop-shadow-lg">
          ADAM BELOUCIF
        </h1>
        <p className="font-space-grotesk text-xl md:text-2xl text-[#3F3F46] dark:text-[#FAFAFA]/80 font-medium mb-6 text-center max-w-xl">
          {t('hero.role')}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-2">
          <Link href="/projects" className="px-6 py-2 rounded-full bg-[#2563EB] text-white font-semibold shadow-md hover:bg-[#1d4ed8] transition-all motion-reduce:transition-none duration-150 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]">
            {t('hero.exploreProjects')}
          </Link>
          <Link href="/contact" className="px-6 py-2 rounded-full border border-[#2563EB] text-[#2563EB] font-semibold shadow-sm hover:bg-[#2563EB]/10 transition-all motion-reduce:transition-none duration-150 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]">
            {t('hero.getInTouch')} <span className="ml-1 opacity-70">›</span>
          </Link>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-sm font-medium text-[#2563EB] opacity-90">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <span className="uppercase tracking-[0.2em] text-[10px] sm:text-xs">
            {t('hero.status')}
          </span>
        </div>
      </div>
      {/* Glassy background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl opacity-60 animate-float" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-[#3F3F46]/20 rounded-full blur-3xl opacity-50 animate-float-slow" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'radial-gradient(ellipse at 60% 40%, #2563EB22 0%, transparent 70%)'}} />
    </section>
  )
}
