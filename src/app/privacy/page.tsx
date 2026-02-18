import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Guild",
  description: "Guild privacy policy — how we collect, use, and protect your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-snow py-20 px-5 md:px-8">
      <article className="max-w-[720px] mx-auto prose prose-gray">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-guild-blue hover:underline mb-8 no-underline"
        >
          &larr; Back to home
        </Link>

        <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-10">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When you join our waitlist or use Guild, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Email address</li>
            <li>ZIP code (to match you with local professionals)</li>
            <li>Role selection (client, contractor, or both)</li>
            <li>Usage data and analytics (via PostHog and Google Analytics)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>To communicate with you about Guild updates and launch status</li>
            <li>To match you with relevant contractors or clients in your area</li>
            <li>To improve our platform and user experience</li>
            <li>To send you marketing communications (you can unsubscribe anytime)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. Data Sharing</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We do not sell your personal information. We may share data with trusted third-party services
            that help us operate Guild, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Supabase (database and authentication)</li>
            <li>Resend (email delivery)</li>
            <li>PostHog (product analytics)</li>
            <li>Google Analytics (website analytics)</li>
            <li>Vercel (hosting)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Cookies and Tracking</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use cookies and similar technologies to analyze website traffic and improve your experience.
            You can control cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Data Security</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use industry-standard security measures to protect your data, including encrypted connections
            (HTTPS), secure database hosting, and access controls.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Request access to your personal data</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from marketing emails at any time</li>
            <li>Opt out of analytics tracking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">7. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you have questions about this privacy policy or your data, contact us at{" "}
            <a href="mailto:hello@joinguild.app" className="text-guild-blue hover:underline">
              hello@joinguild.app
            </a>.
          </p>
        </section>
      </article>
    </main>
  );
}
