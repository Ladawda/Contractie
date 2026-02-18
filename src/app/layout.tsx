import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PHProvider } from "@/lib/posthog/provider";
import { PostHogPageView } from "@/lib/posthog/pageview";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joinguild.app"),
  title: "Guild | Find Verified Contractors Near You",
  description:
    "Guild connects you with verified, licensed contractors. No lead fees, no commissions. Post a job and get matched with pros near you.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "https://tdhxydzsguacwuwtledk.supabase.co/storage/v1/object/public/Logo/logo.svg",
    apple: "https://tdhxydzsguacwuwtledk.supabase.co/storage/v1/object/public/Logo/logo.svg",
  },
  openGraph: {
    title: "Guild — Find Verified Contractors Near You",
    description:
      "Post a job. Get matched with verified contractors. No lead fees. No commissions. Direct connections only.",
    type: "website",
    url: "https://joinguild.app",
    siteName: "Guild",
    images: [
      {
        url: "https://tdhxydzsguacwuwtledk.supabase.co/storage/v1/object/public/Logo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guild — Find Verified Contractors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guild — Find Verified Contractors Near You",
    description:
      "Post a job. Get matched with verified contractors. No lead fees. No commissions.",
    images: [
      "https://tdhxydzsguacwuwtledk.supabase.co/storage/v1/object/public/Logo/og-image.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-CWPHNGS1WT"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CWPHNGS1WT');
        `}
      </Script>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-body antialiased`}
      >
        <PHProvider>
          <PostHogPageView />
          {children}
        </PHProvider>
      </body>
    </html>
  );
}
