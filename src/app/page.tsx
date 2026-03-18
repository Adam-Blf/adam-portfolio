import GlassHero from '@/components/sections/GlassHero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import AboutPreview from '@/components/sections/AboutPreview'
import SkillsPreview from '@/components/sections/SkillsPreview'

export default function Home() {
  return (
    <div className="flex flex-col">
      <GlassHero />
      <FeaturedProjects />
      <AboutPreview />
      <SkillsPreview />
    </div>
  )
}
