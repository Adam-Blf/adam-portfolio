'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BlurText } from '@/components/animations/BlurText'
import { RevealCard } from '@/components/animations/RevealCard'
import { Github, Code2, Database, Cloud, Brain, Blocks, Server, Award, ChevronRight } from 'lucide-react'
import { skills as staticSkills, certifications } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useI18n } from '@/lib/i18n'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  topics: string[]
  fork: boolean
  archived: boolean
}

interface SkillData {
  name: string
  count: number
}

interface CachedCategory {
  key: string
  title: string
  skills: SkillData[]
}

interface SkillCategory extends CachedCategory {
  icon: React.ReactNode
}

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code2 size={24} />,
  frameworks: <Blocks size={24} />,
  data: <Database size={24} />,
  ai: <Brain size={24} />,
  databases: <Server size={24} />,
  cloud: <Cloud size={24} />,
}

const addIconsToCategories = (cached: CachedCategory[]): SkillCategory[] => {
  return cached.map(cat => ({
    ...cat,
    icon: categoryIcons[cat.key] || <Code2 size={24} />,
  }))
}

export default function SkillsPage() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalRepos, setTotalRepos] = useState(0)
  const { t } = useI18n()
  const reduce = useReducedMotion()

  useEffect(() => {
    const CACHE_KEY = 'github-skills'
    const CACHE_DURATION = 1000 * 60 * 30

    async function fetchSkills() {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setCategories(addIconsToCategories(data.categories))
            setTotalRepos(data.totalRepos)
            setLoading(false)
            return
          }
        }
      } catch { }

      try {
        setLoading(false)
      } catch (err) {
        setError('Impossible de charger les compétences.')
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) return (
    <main className="min-h-screen pt-32 pb-20 bg-background flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-secondary font-medium">Analyse des compétences...</p>
    </main>
  )

  const totalSkills = categories.reduce((acc, cat) => acc + cat.skills.length, 0)

  return (
    <ErrorBoundary>
      <main className="min-h-screen pt-32 pb-32 bg-background">
        <div className="container-wide">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-[#0a0a0b]/50 dark:text-[#faf7f0]/50 mb-6 flex items-center gap-3"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8faa88] animate-pulse" />
              STACK · COMPÉTENCES · CERTIFICATIONS
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-primary mb-6">
              <BlurText text="Expertise Technique." stagger={0.06} delay={0.1} />
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-secondary leading-relaxed"
            >
              Un aperçu de mon stack technologique, analysé dynamiquement à travers mes projets
              et soutenu par des certifications reconnues.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {[
              { label: 'Technologies', value: totalSkills || staticSkills.languages.length + staticSkills.frameworks.length },
              { label: 'Projets Analysés', value: totalRepos || 24 },
              { label: 'Certifications', value: certifications.length },
              { label: 'Années d\'Exp.', value: '3+' },
            ].map((stat, i) => (
              <RevealCard key={stat.label} delay={i * 0.08}>
                <div className="card p-8 text-center flex flex-col justify-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">{stat.label}</p>
                  <p className="text-4xl font-semibold text-primary tabular-nums">{stat.value}</p>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* Categories */}
          <div className="space-y-32">
            {categories.map((category, catIdx) => (
              <section key={category.key}>
                <div className="flex items-center gap-4 mb-12 border-b border-black/5 dark:border-white/10 pb-6">
                  <span className="text-primary">{category.icon}</span>
                  <h2 className="text-3xl font-semibold tracking-tight">{category.title}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                  {category.skills.map((skill, idx) => {
                    const catMax = category.skills[0]?.count || 1
                    const progress = Math.max(10, (skill.count / catMax) * 100)
                    return (
                      <RevealCard key={skill.name} delay={idx * 0.08}>
                        <div className="group">
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="text-lg font-medium text-primary group-hover:text-cta transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <div className="h-1 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cta transition-all duration-1000 ease-out"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </RevealCard>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Certifications Section */}
          <section className="mt-32">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-semibold tracking-tight text-primary mb-6">Certifications.</h2>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={reduce ? false : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl text-secondary"
              >
                Validations académiques et professionnelles de mes compétences.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, i) => (
                <RevealCard key={cert.name} delay={i * 0.08}>
                  <div className="card p-8 flex items-start gap-6 group hover:scale-[1.01]">
                    <div className="w-12 h-12 rounded-full bg-background border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0">
                      <Award className="text-cta" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-1">{cert.name}</h3>
                      <p className="text-secondary font-medium mb-1">{cert.issuer}</p>
                      <p className="text-sm text-secondary/60 font-medium tabular-nums">{cert.year}</p>
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>
          </section>

          {/* GitHub CTA */}
          <div className="mt-32 bg-primary rounded-[40px] p-12 md:p-20 text-center text-background">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">
              Prêt à collaborer sur votre prochain projet ?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-block">
                <a href="/contact" className="btn-primary !bg-white !text-black hover:!bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]">
                  Me contacter
                </a>
              </motion.div>
              <motion.div whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-block">
                <a href="https://github.com/Adam-Blf" target="_blank" rel="noopener noreferrer" className="btn-secondary !text-white hover:underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]">
                  Voir mon GitHub <ChevronRight size={20} className="inline ml-1 transition-transform motion-reduce:transition-none group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                </a>
              </motion.div>
            </div>
          </div>

        </div>
      </main>
    </ErrorBoundary>
  )
}
