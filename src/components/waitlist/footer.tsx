import { GuildLogo } from "@/components/guild-logo";

export function Footer() {
  return (
    <footer className="py-10 bg-white border-t border-silver/50">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <GuildLogo height={24} className="opacity-40" />

          {/* Links */}
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { label: "Why Guild", href: "#problem" },
              { label: "How It Works", href: "#how" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "mailto:hello@joinguild.app" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[0.8125rem] text-gray-400 transition-colors duration-300 hover:text-gray-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <span className="text-xs text-gray-300">
            &copy; {new Date().getFullYear()} Guild. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
