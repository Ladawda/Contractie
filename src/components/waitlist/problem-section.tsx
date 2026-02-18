"use client";

import { ScrollReveal } from "./scroll-reveal";
import { X } from "lucide-react";

const problems = [
  { text: "$50-100 per lead", detail: "that gets shared with 5 other contractors" },
  { text: "20% commission", detail: "taken from every job you complete" },
  { text: "Race to the bottom", detail: "- compete on price, not quality" },
  { text: "Platform controls communication", detail: "- you can't even talk directly" },
  { text: "Pay for leads that ghost you", detail: "- money gone, no refund" },
];

const comparisons = [
  { them: "$25-120 per lead", us: "$10 flat per quest" },
  { them: "20% commission", us: "0% commission" },
  { them: "Lead shared 3-5x", us: "Direct party formation" },
  { them: "Platform-controlled", us: "You own the relationship" },
  { them: "Revenue stream", us: "Guild member" },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-[clamp(4rem,8vw,7rem)] bg-pearl relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,rgba(239,68,68,0.03)_0%,transparent_60%)]" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative">
        <ScrollReveal>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-destructive mb-4">
            <span className="w-6 h-0.5 bg-current rounded-full" />
            THE PROBLEM
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 leading-tight tracking-wide mb-5">
            The Old Way Sucks
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-gray-500 max-w-[600px] leading-relaxed mb-12">
            You&apos;re either overpaying for garbage leads or drowning in spam from unqualified workers. There has to be a better way.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Problem list */}
          <ul className="flex flex-col gap-3">
            {problems.map((problem, i) => (
              <li key={i}>
                <ScrollReveal delay={i * 0.08}>
                  <div className="flex items-start gap-4 p-4 bg-white border border-red-100 rounded-xl transition-all duration-300 hover:shadow-elevated hover:border-red-200 hover:translate-x-1">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-red-50 flex items-center justify-center text-destructive">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[0.9375rem] text-gray-600 leading-relaxed">
                      <strong className="text-gray-900 font-semibold">{problem.text}</strong> {problem.detail}
                    </span>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>

          {/* Comparison callout */}
          <ScrollReveal delay={0.2}>
            <div className="p-8 glass-strong rounded-2xl relative overflow-hidden shadow-elevated">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-destructive to-guild-coral rounded-full" />
              <h3 className="font-display text-[1.375rem] font-bold text-gray-900 mb-5">
                How They See You
              </h3>
              <div className="flex flex-col gap-3">
                {comparisons.map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center text-sm">
                    <span className="text-right text-gray-400">{row.them}</span>
                    <span className="text-gray-300 font-bold text-xs tracking-[0.1em]">VS</span>
                    <span className="text-guild-teal font-semibold">{row.us}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
