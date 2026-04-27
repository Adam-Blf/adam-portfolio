'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  text: string
  /** Mode de découpe · mots ou lettres */
  by?: 'words' | 'letters'
  /** Délai entre chaque segment en secondes (défaut 0.06s) */
  stagger?: number
  /** Délai global avant le début (défaut 0) */
  delay?: number
  /** Direction du translate Y · top fait apparaître depuis le haut */
  direction?: 'top' | 'bottom'
  /** Classes Tailwind appliquées au conteneur (utile pour la typo) */
  className?: string
  /** Element wrapping rendu · h1, h2, p, span... (défaut span) */
  as?: React.ElementType
}

/**
 * BlurText · stagger reveal lettre/mot avec flou progressif.
 *
 * Pattern Apple/Linear · chaque segment apparaît avec `filter: blur(8px) → 0`
 * + `opacity: 0 → 1` + `y: 12 → 0`, easing `out-expo` (0.16, 1, 0.3, 1).
 *
 * Respecte `prefers-reduced-motion` · si l'utilisateur a activé l'option
 * d'accessibilité, l'animation est désactivée mais le texte reste lisible.
 *
 * Inspiration · 21st.dev community · `BlurText` atom + Hero Section One.
 */
export function BlurText({
  text,
  by = 'words',
  stagger = 0.06,
  delay = 0,
  direction = 'bottom',
  className = '',
  as: Tag = 'span',
}: Props) {
  const reduce = useReducedMotion()
  const segments = by === 'words' ? text.split(' ') : text.split('')
  const yFrom = direction === 'top' ? -12 : 12

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = Tag as any

  return (
    <Wrapper className={className} aria-label={text}>
      {segments.map((seg, i) => (
        <motion.span
          key={`${seg}-${i}`}
          initial={reduce ? false : { opacity: 0, filter: 'blur(8px)', y: yFrom }}
          animate={reduce ? false : { opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {seg}
          {by === 'words' && i < segments.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Wrapper>
  )
}
