"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { GuildLogo } from "@/components/guild-logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-7 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong py-3 shadow-elevated"
          : "py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <GuildLogo height={36} />
        </a>
        <a
          href="#final-cta"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-guild-blue to-guild-blue-dark text-white font-semibold text-sm rounded-xl tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-[0_2px_12px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
        >
          <span className="hidden sm:inline">Join the Waitlist</span>
          <span className="sm:hidden">Join</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </nav>
  );
}
