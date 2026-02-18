import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Guild",
  description:
    "Learn how Guild collects, uses, and protects your personal information. Read our full privacy policy.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Guild",
    description:
      "Learn how Guild collects, uses, and protects your personal information.",
    url: "https://joinguild.app/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-snow py-20 px-5 md:px-8">
      <article className="max-w-[720px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-guild-blue hover:underline mb-8"
        >
          &larr; Back to home
        </Link>

        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Effective date: February 18, 2026
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Guild (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website
            joinguild.app. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or join our waitlist. Please read
            this policy carefully. If you do not agree with the terms of this policy, please do not
            access the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We collect information that you voluntarily provide to us when you register on the
            waitlist, express interest in obtaining information about us or our products, or
            otherwise contact us. The personal information we collect may include:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Email address</li>
            <li>ZIP code, used to match you with local service professionals</li>
            <li>Role preference (client seeking services, contractor offering services, or both)</li>
            <li>Device and browser information collected automatically through cookies</li>
            <li>Usage patterns and interaction behavior via product and website tools</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use the information we collect for the following business purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>To send you updates about Guild, including launch announcements and new features</li>
            <li>To match you with relevant contractors or clients in your geographic area</li>
            <li>To personalize your experience and deliver content tailored to your interests</li>
            <li>To improve our website, products, and services based on usage patterns</li>
            <li>To send marketing communications, which you can unsubscribe from at any time</li>
            <li>To detect, prevent, and address technical issues or fraudulent activity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We do not sell your personal information to third parties. However, we may share
            information with trusted service providers that help us operate our platform. These
            include:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Supabase &mdash; database hosting and authentication</li>
            <li>Resend &mdash; transactional and marketing email delivery</li>
            <li>PostHog &mdash; product usage insights</li>
            <li>Google &mdash; website traffic measurement</li>
            <li>Vercel &mdash; website hosting and deployment</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">
            Each third-party provider is contractually obligated to protect your information and
            may only use it to provide services on our behalf.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to monitor activity on our website
            and store certain information. Cookies are small files placed on your device. You can
            instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            However, if you do not accept cookies, you may not be able to use some portions of our
            site. We use both session cookies (which expire when you close your browser) and
            persistent cookies (which remain until you delete them or they expire).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Security</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We implement appropriate technical and organizational security measures to protect
            your personal information. This includes encrypted connections via HTTPS, secure
            database hosting with row-level security, access controls, and regular security
            reviews. However, no method of transmission over the internet is 100% secure, and
            we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Depending on your location, you may have certain rights regarding your personal
            information, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>The right to access the personal information we hold about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to unsubscribe from marketing emails at any time</li>
            <li>The right to opt out of tracking and behavioral profiling</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mb-4">
            To exercise any of these rights, please contact us using the information below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new policy on this page and updating the effective date above.
            You are advised to review this page periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you have questions or concerns about this Privacy Policy or how we handle your
            information, please contact us at{" "}
            <a href="mailto:hello@joinguild.app" className="text-guild-blue hover:underline">
              hello@joinguild.app
            </a>.
          </p>
        </section>
      </article>
    </main>
  );
}
