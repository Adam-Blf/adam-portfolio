"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Mail, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Magnetic Button Hover Effect using GSAP
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;

    gsap.to(buttonRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setEmailInput("");
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-36 px-6 md:px-12 w-full overflow-hidden bg-[#0A0A0A] text-[#F5F3EF] border-b border-[#F5F3EF]/10"
    >
      {/* Ambient Animated Pulse Glowing Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#EAE7E1]/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-[#8E8E8E]/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#F5F3EF]/20 bg-[#F5F3EF]/5 backdrop-blur-xs">
          <Mail className="w-3.5 h-3.5 text-[#F5F3EF]" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F5F3EF]">
            INITIATE COLLABORATION
          </span>
        </div>

        {/* Massive Centered Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[104px] font-black uppercase tracking-tight leading-[0.95] max-w-6xl mb-8 mix-blend-difference text-[#F5F3EF]">
          LET'S BUILD THE FUTURE.
        </h2>

        <p className="max-w-2xl text-sm md:text-lg text-[#8E8E8E] font-medium leading-relaxed mb-12">
          Have a revolutionary project, custom neural agent requirement, or high-end web experience in mind? Connect with PIXZEN today.
        </p>

        {/* Form & Magnetic Button Area */}
        <div className="w-full max-w-xl flex flex-col items-center gap-6">
          <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full px-6 py-4 rounded-full bg-[#F5F3EF]/10 border border-[#F5F3EF]/20 text-[#F5F3EF] placeholder-[#8E8E8E] text-sm focus:outline-none focus:border-[#F5F3EF] transition-colors"
            />

            {/* Magnetic Pill Button Wrapper */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="p-3 inline-block shrink-0"
            >
              <button
                ref={buttonRef}
                type="submit"
                className="px-8 py-4 rounded-full bg-[#F5F3EF] text-[#0A0A0A] text-xs font-black tracking-[0.2em] uppercase hover:bg-[#EAE7E1] transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                {formSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#0A0A0A]" />
                    SENT!
                  </>
                ) : (
                  <>
                    START A PROJECT
                    <ArrowUpRight className="w-4 h-4 text-[#0A0A0A]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Direct Email Link */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-6 text-xs font-mono text-[#8E8E8E]">
            <span>DIRECT INQUIRIES:</span>
            <a
              href="mailto:hello@pixzen.ai"
              className="text-[#F5F3EF] underline decoration-[#F5F3EF]/30 hover:decoration-[#F5F3EF] font-bold tracking-widest transition-colors"
            >
              hello@pixzen.ai
            </a>
            <span className="hidden sm:inline">·</span>
            <a
              href="tel:+33786466834"
              className="text-[#F5F3EF] hover:text-[#8E8E8E] transition-colors"
            >
              +33 7 86 46 68 34
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
