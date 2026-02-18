"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";
import { Lock, Check } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { joinWaitlist } from "@/app/actions/waitlist";

export function FinalCta() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const posthog = usePostHog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const result = await joinWaitlist({
      email: formData.get("email") as string,
      role: (formData.get("role") as string) || undefined,
      zipCode: (formData.get("zipCode") as string) || undefined,
      referralSource: "final-cta",
    });

    setLoading(false);

    if (result.success) {
      const email = formData.get("email") as string;
      const role = formData.get("role") as string;
      const zip = formData.get("zipCode") as string;
      posthog?.capture("waitlist_signup", {
        role,
        zip_code: zip,
        referral_source: "final-cta",
      });
      posthog?.identify(email, { role, zip_code: zip });
      setSubmitted(true);
    } else {
      posthog?.capture("waitlist_signup_error", {
        error: result.error,
        referral_source: "final-cta",
      });
      setErrorMsg(result.error);
    }
  };

  return (
    <section
      id="final-cta"
      className="py-[clamp(4rem,8vw,7rem)] bg-snow text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-guild-blue/15 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(37,99,235,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative">
        <ScrollReveal>
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-guild-coral justify-center mb-4">
            <span className="w-6 h-0.5 bg-current rounded-full" />
            EARLY ACCESS
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 leading-tight tracking-wide mb-3">
            Get Early Access
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-gray-500 max-w-[500px] mx-auto leading-relaxed mb-10">
            Be first in line when the guild opens its doors. Founding members get the best pricing - forever.
          </p>
        </ScrollReveal>

        {!submitted ? (
          <ScrollReveal delay={0.3}>
            <form onSubmit={handleSubmit} className="max-w-[520px] mx-auto flex flex-col gap-4">
              <label htmlFor="cta-email" className="sr-only">Email address</label>
              <input
                id="cta-email"
                type="email"
                name="email"
                placeholder="Your email address"
                required
                className="w-full px-5 py-4 bg-white border border-silver rounded-xl text-gray-900 text-[0.9375rem] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-guild-blue focus:ring-3 focus:ring-guild-blue/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cta-role" className="sr-only">I am a</label>
                  <select
                    id="cta-role"
                    name="role"
                    aria-label="I am a"
                    required
                    defaultValue=""
                    className="w-full px-5 py-4 bg-white border border-silver rounded-xl text-gray-900 text-[0.9375rem] outline-none transition-all duration-300 focus:border-guild-blue focus:ring-3 focus:ring-guild-blue/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)] appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2710%27%20height%3D%276%27%20viewBox%3D%270%200%2010%206%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201L5%205L9%201%27%20stroke%3D%27rgba(0%2C0%2C0%2C0.3)%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] pr-10"
                  >
                    <option value="" disabled className="text-gray-400">
                      I am a...
                    </option>
                    <option value="quest-giver">
                      Client (need work done)
                    </option>
                    <option value="adventurer">
                      Contractor (looking for work)
                    </option>
                    <option value="both">
                      Both
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cta-zip" className="sr-only">ZIP code</label>
                  <input
                    id="cta-zip"
                    type="text"
                    name="zipCode"
                    placeholder="ZIP code"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    required
                    className="w-full px-5 py-4 bg-white border border-silver rounded-xl text-gray-900 text-[0.9375rem] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-guild-blue focus:ring-3 focus:ring-guild-blue/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-4.5 bg-gradient-to-br from-guild-blue to-guild-teal text-white text-[1.0625rem] font-bold rounded-xl tracking-wide transition-all duration-300 overflow-hidden mt-2 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.3),0_0_40px_rgba(13,148,136,0.12)] btn-shimmer shadow-[0_2px_12px_rgba(37,99,235,0.2)] disabled:opacity-70 disabled:pointer-events-none"
              >
                <span className="relative z-10">
                  {loading ? "Joining..." : "Join the Guild"}
                </span>
              </button>
              {errorMsg && (
                <p className="text-sm text-red-500 text-center">{errorMsg}</p>
              )}
              <p className="text-[0.8125rem] text-gray-400 flex items-center justify-center gap-1.5 mt-1">
                <Lock className="w-3 h-3" />
                We hate spam too. Unsubscribe anytime.
              </p>
            </form>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col items-center gap-4 py-8 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-guild-teal to-guild-blue flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.25)]">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-2xl font-bold text-gray-900">
              Quest Accepted!
            </h3>
            <p className="text-[0.9375rem] text-gray-500 text-center max-w-[360px]">
              You&apos;re on the waitlist. We&apos;ll notify you as soon as the guild doors open. Get ready to level up.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
