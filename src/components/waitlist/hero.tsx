"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowLeft, MapPin } from "lucide-react";
import { usePostHog, useFeatureFlagVariantKey } from "posthog-js/react";
import { joinWaitlist } from "@/app/actions/waitlist";

function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blue orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #2563EB 0%, transparent 70%)",
          top: "-10%",
          left: "20%",
          animation: "orb-drift 20s ease-in-out infinite",
        }}
      />
      {/* Teal orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #0D9488 0%, transparent 70%)",
          bottom: "5%",
          right: "15%",
          animation: "orb-drift-alt 25s ease-in-out infinite",
        }}
      />
      {/* Purple orb */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          top: "30%",
          right: "5%",
          animation: "orb-drift 22s ease-in-out 3s infinite",
        }}
      />
    </div>
  );
}

type Role = "adventurer" | "quest-giver" | "both";

const roles: { value: Role; label: string }[] = [
  { value: "adventurer", label: "⚔️ Adventurer" },
  { value: "quest-giver", label: "🏰 Quest Giver" },
  { value: "both", label: "Both" },
];

export function Hero() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("adventurer");
  const [zipCode, setZipCode] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const zipRef = useRef<HTMLInputElement>(null);
  const posthog = usePostHog();
  const flagVariant = useFeatureFlagVariantKey("landing-hero-variant");
  const variant = flagVariant === "clarity" ? "clarity" : "control";

  const copy = variant === "clarity"
    ? {
        badge: "NOW RECRUITING MEMBERS",
        headline: "Post Jobs. Find Contractors.",
        headlineAccent: "Skip the Middleman.",
        subtitle: "Guild connects contractors directly with clients — no lead fees, no commissions, no platform taking a cut.",
        promo1: (
          <>
            First month <strong className="text-guild-coral font-semibold">FREE</strong> for clients posting jobs
          </>
        ),
        promo2: (
          <>
            First 100 contractors: <strong className="text-guild-coral font-semibold">$25/mo forever</strong>
          </>
        ),
      }
    : {
        badge: "GRAND OPENING SOON",
        headline: "Join the",
        headlineAccent: "Guild",
        subtitle: (
          <>
            Post a quest. Find your party. Get it done.
            <br />
            No lead fees. No commissions. No BS.
          </>
        ),
        promo1: (
          <>
            First month <strong className="text-guild-coral font-semibold">FREE</strong> for quest posters
          </>
        ),
        promo2: (
          <>
            First 100 adventurers: <strong className="text-guild-coral font-semibold">$25/mo forever</strong>
          </>
        ),
      };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    posthog?.capture("waitlist_step1_completed", {
      role,
      referral_source: "hero",
      variant,
    });
    setStep(2);
    // Focus the ZIP input after transition
    setTimeout(() => zipRef.current?.focus(), 400);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const result = await joinWaitlist({ email, role, zipCode, referralSource: "hero" });

    if (result.success) {
      posthog?.capture("waitlist_signup", {
        role,
        zip_code: zipCode,
        referral_source: "hero",
        variant,
      });
      posthog?.identify(email, { role, zip_code: zipCode });
      setStatus("success");
      setEmail("");
      setZipCode("");
      setTimeout(() => {
        setStatus("idle");
        setStep(1);
      }, 4000);
    } else {
      posthog?.capture("waitlist_signup_error", {
        error: result.error,
        referral_source: "hero",
        variant,
      });
      setErrorMsg(result.error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-ambient" />
      <AmbientOrbs />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 w-full">
        <div className="max-w-[720px] mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 glass rounded-full text-[0.8125rem] font-semibold text-guild-coral tracking-wide mb-8"
          >
            <span className="relative w-1.5 h-1.5 bg-guild-coral rounded-full">
              <span className="absolute -inset-1 bg-guild-coral rounded-full animate-pulse-ring" />
            </span>
            {copy.badge}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.08] tracking-wide text-gray-900 mb-5"
          >
            {copy.headline}{" "}
            <span className="text-gradient-brand">{copy.headlineAccent}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.0625rem,2vw,1.25rem)] text-gray-500 max-w-[560px] mx-auto mb-7 leading-relaxed"
          >
            {copy.subtitle}
          </motion.p>

          {/* Promo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-wrap justify-center gap-x-4 gap-y-1.5 px-6 py-3.5 glass rounded-2xl mb-10"
          >
            <span className="text-sm text-gray-600">{copy.promo1}</span>
            <span className="text-sm text-gray-600">{copy.promo2}</span>
          </motion.div>

          {/* Two-step form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[480px] mx-auto"
          >
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Role Selector */}
                  <div className="flex items-center justify-center gap-1 p-1 bg-white/60 backdrop-blur-sm border border-silver rounded-xl max-w-[380px] mx-auto mb-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                    {roles.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRole(value)}
                        className={`flex-1 px-3 py-2.5 rounded-lg text-[0.8125rem] font-semibold transition-all duration-300 whitespace-nowrap ${
                          role === value
                            ? "bg-gradient-to-br from-guild-blue to-guild-blue-dark text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)]"
                            : "text-gray-500 hover:text-gray-700 hover:bg-white/80"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Email Form */}
                  <form
                    onSubmit={handleStep1}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
                  >
                    <label htmlFor="hero-email" className="sr-only">Email address</label>
                    <input
                      id="hero-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-5 py-4 bg-white border border-silver rounded-xl text-gray-900 text-base outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-guild-blue focus:ring-3 focus:ring-guild-blue/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    />
                    <button
                      type="submit"
                      className="relative px-8 py-4 bg-gradient-to-br from-guild-blue to-guild-blue-dark text-white text-base font-semibold rounded-xl whitespace-nowrap transition-all duration-300 overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.3)] btn-shimmer shadow-[0_2px_12px_rgba(37,99,235,0.25)]"
                    >
                      <span className="relative z-10">Join the Guild</span>
                    </button>
                  </form>

                  {/* Trust line */}
                  <p className="text-[0.8125rem] text-gray-400 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    We respect your inbox. Unsubscribe anytime.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Context bar */}
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <button
                      type="button"
                      onClick={() => { setStep(1); setErrorMsg(""); }}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <span className="text-sm text-gray-500">
                      Almost there — one more step!
                    </span>
                  </div>

                  {/* ZIP Code Form */}
                  <form
                    onSubmit={handleStep2}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
                  >
                    <div className="relative w-full sm:w-auto">
                      <label htmlFor="hero-zip" className="sr-only">ZIP code</label>
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="hero-zip"
                        ref={zipRef}
                        type="text"
                        value={zipCode}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 5);
                          setZipCode(v);
                        }}
                        placeholder="ZIP code"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        required
                        inputMode="numeric"
                        className="w-full sm:w-48 pl-10 pr-5 py-4 bg-white border border-silver rounded-xl text-gray-900 text-base outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-guild-blue focus:ring-3 focus:ring-guild-blue/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="relative w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-guild-blue to-guild-teal text-white text-base font-semibold rounded-xl whitespace-nowrap transition-all duration-300 overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.3),0_0_40px_rgba(13,148,136,0.12)] disabled:opacity-70 disabled:pointer-events-none btn-shimmer shadow-[0_2px_12px_rgba(37,99,235,0.25)]"
                    >
                      <span className="relative z-10">
                        {status === "loading"
                          ? "Joining..."
                          : status === "success"
                          ? "You're In! ✓"
                          : "Confirm"}
                      </span>
                    </button>
                  </form>

                  {errorMsg && (
                    <p className="text-sm text-red-500 text-center mb-2">{errorMsg}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 text-xs tracking-[0.1em] uppercase hidden md:flex"
      >
        <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent animate-float" />
        SCROLL
      </motion.div>
    </section>
  );
}
