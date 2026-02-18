"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Check } from "lucide-react";

const features = [
  { bold: "Quest Givers post for $10 flat", detail: "- FREE during launch month. No hidden fees." },
  { bold: "Adventurers pay $25/month", detail: "for unlimited quest access. Founding price locked forever." },
  { bold: "Direct party formation", detail: "- talk to quest givers immediately. No middleman." },
  { bold: "Keep 100% of your earnings.", detail: "Your rates, your terms, your guild." },
  { bold: "Every adventurer is verified.", detail: "Licenses checked against state contractor board databases. No shortcuts." },
];

const questGiverPerks = [
  "Post quests for free during launch",
  "Get direct access to verified adventurers",
  "No middleman markup on anything",
  "You choose who joins your party",
  "7-day credit if no one applies",
];

const adventurerPerks = [
  "$25/month for unlimited quest access",
  "No per-lead fees, ever",
  "No commission on quests you complete",
  "Keep 100% of what you earn",
  "Direct relationship with quest givers",
];

export function SolutionSection() {
  return (
    <section
      id="solution"
      className="py-[clamp(4rem,8vw,7rem)] bg-snow relative"
    >
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-guild-teal/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_60%,rgba(13,148,136,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative">
        <ScrollReveal>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-guild-teal mb-4">
            <span className="w-6 h-0.5 bg-current rounded-full" />
            THE GUILD WAY
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 leading-tight tracking-wide mb-8">
            Built Different
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Features */}
          <div className="max-w-[480px]">
            <ScrollReveal delay={0.2}>
              <blockquote className="text-lg italic text-gray-500 border-l-[3px] border-guild-teal pl-5 mb-10 leading-relaxed">
                &ldquo;We don&apos;t sell leads. We don&apos;t take cuts. We just connect adventurers with quests.&rdquo;
              </blockquote>
            </ScrollReveal>

            <div className="flex flex-col gap-3">
              {features.map((feature, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                  <div className="flex items-start gap-3 p-4 bg-white border border-teal-100 rounded-xl transition-all duration-300 hover:shadow-elevated hover:border-guild-teal/20 hover:translate-x-1">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-teal-50 flex items-center justify-center text-guild-teal">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[0.9375rem] text-gray-600 leading-relaxed">
                      <strong className="text-gray-900 font-semibold">{feature.bold}</strong> {feature.detail}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right: Role cards */}
          <div className="flex flex-col gap-5">
            <ScrollReveal delay={0.15}>
              <div className="p-7 rounded-2xl glass-strong border border-blue-100 transition-all duration-400 hover:-translate-y-1 hover:shadow-elevated">
                <div className="inline-flex px-3 py-1 bg-guild-blue-soft rounded-lg text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-guild-blue mb-4">
                  Quest Giver
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  Post a Quest. Find Your Party.
                </h3>
                <ul className="flex flex-col gap-2">
                  {questGiverPerks.map((perk) => (
                    <li key={perk} className="text-sm text-gray-500 pl-5 relative before:content-['+'] before:absolute before:left-0 before:font-bold before:text-gray-300">
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-7 rounded-2xl glass-strong border border-teal-100 transition-all duration-400 hover:-translate-y-1 hover:shadow-elevated">
                <div className="inline-flex px-3 py-1 bg-guild-teal-soft rounded-lg text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-guild-teal mb-4">
                  Adventurer
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  Your Skills. Your Rates. Your Guild.
                </h3>
                <ul className="flex flex-col gap-2">
                  {adventurerPerks.map((perk) => (
                    <li key={perk} className="text-sm text-gray-500 pl-5 relative before:content-['+'] before:absolute before:left-0 before:font-bold before:text-gray-300">
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
