'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Délai global en secondes (utile pour orchestrer plusieurs cards) */
  delay?: number
  /** Classes Tailwind passées au conteneur motion */
  className?: string
}

/**
 * RevealCard · wrapper d'animation scroll-reveal pour les cards.
 *
 * Animation · `opacity 0→1`, `y 24→0`, `scale 0.97→1` lorsque la card
 * entre dans le viewport (margin -10% pour pré-déclencher avant le scroll
 * exact). `viewport.once: true` garantit qu'on n'anime qu'une fois.
 *
 * Pour orchestrer plusieurs cards en stagger, passer un `delay` croissant
 * (ex. `delay={i * 0.08}` dans un map).
 */
export function RevealCard({ children, delay = 0, className = '' }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      whileHover={reduce ? undefined : { y: -4 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
