// Header Apple-like premium
import Link from 'next/link'

export default function HeaderApple() {
  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-lg border-b border-black/5 shadow-sm z-50 flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-6">
        <span className="font-bold text-xl tracking-tight">Adam Portfolio</span>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]">Accueil</Link>
          <Link href="/projects" className="hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]">Projets</Link>
          <Link href="/about" className="hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]">À propos</Link>
          <Link href="/contact" className="hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]">Contact</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/contact" className="px-5 py-2 rounded-full bg-black text-white font-semibold shadow hover:bg-neutral-800 transition motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4c7a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf7f0]">Me contacter</Link>
      </div>
    </header>
  )
}
