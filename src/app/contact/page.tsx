'use client'

import { useState } from 'react'
import { Mail, Github, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { BlurText } from '@/components/animations/BlurText'
import { RevealCard } from '@/components/animations/RevealCard'
import { personalInfo } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useI18n } from '@/lib/i18n'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { t } = useI18n()
  const reduce = useReducedMotion()

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formState.name.trim()) newErrors.name = 'Nom requis'
    if (!formState.email.trim() || !formState.email.includes('@')) newErrors.email = 'Email invalide'
    if (!formState.message.trim()) newErrors.message = 'Message requis'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitted(true)
    // In a real app, send actual email here.
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const easeOutExpo = [0.16, 1, 0.3, 1] as const

  return (
    <ErrorBoundary>
      <main className="min-h-screen pt-32 pb-32 bg-background">
        <div className="container-wide">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="font-mono text-xs text-[#0a0a0b]/50 mb-6 flex items-center gap-3"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8faa88] animate-pulse" />
              DISPONIBLE · PARIS · FR/EN/ES
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-primary mb-6">
              <BlurText text="Contact." stagger={0.06} delay={0.1} />
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: easeOutExpo }}
              className="text-xl md:text-2xl text-secondary leading-relaxed"
            >
              Une idée de projet ? Une opportunité de collaboration ?
              N&apos;hésitez pas à m&apos;envoyer un message.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Form */}
            <div>
              {isSubmitted ? (
                <RevealCard>
                  <div className="card p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-cta/10 flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="text-cta" size={40} />
                    </div>
                    <h2 className="text-3xl font-semibold text-primary mb-4">Message envoyé.</h2>
                    <p className="text-secondary mb-8">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
                    <motion.button
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                      onClick={() => setIsSubmitted(false)}
                      className="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]"
                    >
                      Envoyer un autre message
                    </motion.button>
                  </div>
                </RevealCard>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0, ease: easeOutExpo }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-secondary ml-1">Nom Complet</label>
                      <input
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className={`w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl p-4 text-primary outline-none focus:ring-2 focus:ring-cta/50 transition-all ${errors.name ? 'ring-2 ring-red-500/50' : ''}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-secondary ml-1">Email</label>
                      <input
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="jean.dupont@mail.com"
                        className={`w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl p-4 text-primary outline-none focus:ring-2 focus:ring-cta/50 transition-all ${errors.email ? 'ring-2 ring-red-500/50' : ''}`}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.08, ease: easeOutExpo }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-semibold text-secondary ml-1">Sujet</label>
                    <input
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Collaboration, Opportunité..."
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl p-4 text-primary outline-none focus:ring-2 focus:ring-cta/50 transition-all"
                    />
                  </motion.div>

                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.16, ease: easeOutExpo }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-semibold text-secondary ml-1">Message</label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Comment puis-je vous aider ?"
                      rows={6}
                      className={`w-full bg-black/5 dark:bg-white/5 border-none rounded-[24px] p-4 text-primary outline-none focus:ring-2 focus:ring-cta/50 transition-all resize-none ${errors.message ? 'ring-2 ring-red-500/50' : ''}`}
                    />
                  </motion.div>

                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.24, ease: easeOutExpo }}
                  >
                    <motion.button
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                      type="submit"
                      className="btn-primary w-full md:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]"
                    >
                      Envoyer le message <Send size={18} className="ml-2 inline" />
                    </motion.button>
                  </motion.div>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-12">
              <RevealCard delay={0}>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Contact Infos</h3>
                  <div className="space-y-6">
                    <motion.a
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                      href={`mailto:${personalInfo.email}`}
                      className="flex items-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]"
                    >
                      <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                        <Mail className="text-cta" size={20} />
                      </div>
                      <span className="text-lg font-medium text-primary group-hover:text-cta transition-colors motion-reduce:transition-none">{personalInfo.email}</span>
                    </motion.a>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                        <MapPin className="text-cta" size={20} />
                      </div>
                      <span className="text-lg font-medium text-primary">{personalInfo.location || 'Paris, France'}</span>
                    </div>
                  </div>
                </div>
              </RevealCard>

              <RevealCard delay={0.1}>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6">Socials</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.a
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card p-6 flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]"
                    >
                      <Linkedin className="text-cta" size={20} />
                      <span className="font-semibold">LinkedIn</span>
                    </motion.a>
                    <motion.a
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card p-6 flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]"
                    >
                      <Github className="text-cta" size={20} />
                      <span className="font-semibold">GitHub</span>
                    </motion.a>
                  </div>
                </div>
              </RevealCard>

              <RevealCard delay={0.2}>
                <div className="p-8 rounded-[32px] bg-cta text-white">
                  <h4 className="text-2xl font-semibold mb-2">Disponibilité.</h4>
                  <p className="opacity-80">Je suis actuellement ouvert à de nouvelles opportunités en Data Engineering et Développement Fullstack.</p>
                </div>
              </RevealCard>
            </div>

          </div>
        </div>
      </main>
    </ErrorBoundary>
  )
}
