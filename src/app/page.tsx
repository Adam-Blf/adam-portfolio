import Link from 'next/link'
import { ArrowUpRight, Code2, Database, Sparkles, Users, Award, Briefcase, MapPin, Mail } from 'lucide-react'
import { personalInfo, keyAchievements, staticMetrics, projects, experiences } from '@/lib/data'

export default function Home() {
  const featured = projects.featured
    .map((name) => {
      for (const cat of Object.values(projects.categories)) {
        const found = (cat as any[]).find((p) => p.name === name)
        if (found) return found
      }
      return null
    })
    .filter(Boolean) as Array<{ name: string; lang: string; desc: string; tags: string[] }>

  return (
    <main className="min-h-screen w-full bg-[#f5f5f7] text-[#1d1d1f]">
      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#dbeafe_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,#fde7f3_0%,transparent_55%)] opacity-70" />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 md:pt-44 md:pb-32">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-black/5 rounded-full px-4 py-1.5 text-xs font-medium text-[#1d1d1f]/70 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Disponible · CDI · Freelance · Collaborations
          </div>

          <h1 className="text-[clamp(3rem,9vw,8rem)] font-bold tracking-[-0.045em] leading-[0.92] mb-8">
            {personalInfo.name.split(' ')[0]}{' '}
            <span className="bg-gradient-to-r from-[#0071e3] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
              {personalInfo.name.split(' ').slice(1).join(' ')}
            </span>
            .
          </h1>

          <p className="text-xl md:text-3xl font-medium text-[#1d1d1f] max-w-3xl leading-tight mb-4">
            {personalInfo.title}.
          </p>
          <p className="text-lg md:text-xl text-[#6e6e73] max-w-2xl mb-10 italic">
            « {personalInfo.slogan} »
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <Link href="/projects" className="group inline-flex items-center gap-2 bg-[#1d1d1f] hover:bg-black text-white font-semibold px-6 py-3 rounded-full transition">
              Voir les projets
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
            <Link href="/parcours" className="inline-flex items-center gap-2 bg-white hover:bg-white/80 border border-black/10 text-[#1d1d1f] font-semibold px-6 py-3 rounded-full transition">
              Mon parcours
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[#1d1d1f] font-semibold px-6 py-3 hover:text-[#0071e3] transition">
              <Mail className="w-4 h-4" /> Me contacter
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { label: "Années d'exp.", value: `${staticMetrics.yearsExperience}+`, icon: Briefcase },
              { label: 'Certifications', value: staticMetrics.certifications, icon: Award },
              { label: 'Rôles associatifs', value: staticMetrics.volunteerRoles, icon: Users },
              { label: 'Langues', value: staticMetrics.languages.length, icon: Sparkles },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white/60 backdrop-blur border border-black/5 rounded-2xl p-5">
                <Icon className="w-5 h-5 text-[#0071e3] mb-3" />
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                <div className="text-xs text-[#6e6e73] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CURRENT ROLE ——— */}
      <section className="bg-[#1d1d1f] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0071e3]">Actuellement</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-4">
              {personalInfo.currentRole.title}
            </h2>
            <p className="text-xl text-white/70 mb-2">@ {personalInfo.currentRole.company}</p>
            <p className="text-white/50 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {personalInfo.location} · {personalInfo.currentRole.type}
            </p>
            <p className="mt-6 text-white/80 max-w-2xl leading-relaxed">{personalInfo.bio}</p>
          </div>
          <Link href="/parcours" className="shrink-0 bg-white text-[#1d1d1f] hover:bg-white/90 font-semibold px-6 py-3 rounded-full transition inline-flex items-center gap-2 self-start md:self-center">
            Parcours complet <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ——— KEY ACHIEVEMENTS ——— */}
      <section className="py-24 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0071e3]">Ce qui me définit</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-3">Ce dont je suis fier.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyAchievements.map((a: any, i: number) => (
              <div key={i} className="group bg-white rounded-3xl p-6 border border-black/5 hover:border-[#0071e3]/30 hover:shadow-xl transition">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#8b5cf6] flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs font-bold text-[#0071e3] mb-2">{a.year}</div>
                <h3 className="font-bold text-lg tracking-tight mb-2">{a.title}</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— FEATURED PROJECTS ——— */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0071e3]">Projets phares</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-3">Quelques réalisations.</h2>
            </div>
            <Link href="/projects" className="text-[#0071e3] font-semibold hover:underline inline-flex items-center gap-1">
              Tous les projets <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(0, 6).map((p) => {
              const url = (projects.homepages as Record<string, string>)[p.name]
              return url ? (
                <a
                  key={p.name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative bg-gradient-to-br from-[#f5f5f7] to-white rounded-3xl p-6 border border-black/5 hover:border-black/20 hover:shadow-2xl transition block"
                >
                  <ProjectCardInner p={p} withArrow />
                </a>
              ) : (
                <div
                  key={p.name}
                  className="group relative bg-gradient-to-br from-[#f5f5f7] to-white rounded-3xl p-6 border border-black/5 hover:border-black/20 hover:shadow-2xl transition block"
                >
                  <ProjectCardInner p={p} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ——— SKILLS TEASER ——— */}
      <section className="py-24 bg-gradient-to-br from-[#0071e3] via-[#8b5cf6] to-[#ec4899] text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Stack</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-3 mb-6">Data × Code × Design.</h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Python, SQL, TypeScript, React, Next.js, Machine Learning, Cloud, Docker, et une obsession pour l'UX premium inspirée d'Apple.
            </p>
            <Link href="/competences" className="inline-flex items-center gap-2 bg-white text-[#1d1d1f] font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition">
              Voir les compétences <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['Python', 'TypeScript', 'SQL/PL-SQL', 'React', 'Next.js', 'Docker', 'Pandas', 'Oracle', 'Tailwind'].map((s) => (
              <div key={s} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 text-center text-sm font-semibold">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className="py-32 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] mb-6">
            Travaillons<br />
            <span className="bg-gradient-to-r from-[#0071e3] to-[#ec4899] bg-clip-text text-transparent">ensemble.</span>
          </h2>
          <p className="text-xl text-[#6e6e73] mb-10 max-w-xl mx-auto">
            Une idée data, un produit à shipper, un stage à pourvoir ? Mon inbox est ouverte.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="bg-[#1d1d1f] hover:bg-black text-white font-semibold px-8 py-4 rounded-full transition inline-flex items-center gap-2">
              <Mail className="w-4 h-4" /> {personalInfo.email}
            </Link>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="bg-white border border-black/10 hover:border-black/30 text-[#1d1d1f] font-semibold px-8 py-4 rounded-full transition">
              LinkedIn
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="bg-white border border-black/10 hover:border-black/30 text-[#1d1d1f] font-semibold px-8 py-4 rounded-full transition">
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProjectCardInner({ p, withArrow }: { p: { name: string; lang: string; desc: string; tags: string[] }; withArrow?: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
          {p.lang === 'Python' ? <Database className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
        </div>
        {withArrow && <ArrowUpRight className="w-5 h-5 text-[#6e6e73] group-hover:text-[#0071e3] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />}
      </div>
      <h3 className="font-bold text-xl tracking-tight mb-2">{p.name}</h3>
      <p className="text-sm text-[#6e6e73] leading-relaxed mb-4 min-h-[3rem]">{p.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {p.tags.slice(0, 3).map((t) => (
          <span key={t} className="text-[10px] font-semibold uppercase tracking-wider bg-black/5 text-[#1d1d1f] px-2 py-1 rounded-md">
            {t}
          </span>
        ))}
      </div>
    </>
  )
}
