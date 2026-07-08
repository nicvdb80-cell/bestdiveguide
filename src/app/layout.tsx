// bestdiveguide layout v2.0 — full SEO + AEO
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"

const BASE_URL = "https://bestdiveguide.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Best Dive Guide — Ranked Dive Resorts, Liveaboards & Food in Asia",
    template: "%s | Best Dive Guide",
  },
  description:
    "The most trusted dive ranking platform in Asia. Real divers vote on the best dive resorts, liveaboards, dive food, and dive sites across Indonesia, Philippines, Maldives, Thailand and beyond.",
  keywords: [
    "best dive resorts Asia",
    "best liveaboard Asia",
    "best dive sites Indonesia",
    "dive resort ranking",
    "liveaboard ranking",
    "best dive food",
    "dive travel Asia",
    "scuba diving ranking",
    "dive resort reviews",
    "best dive resort Indonesia",
    "best dive resort Philippines",
    "best dive resort Maldives",
    "Raja Ampat liveaboard",
    "Komodo liveaboard",
    "dive holiday Asia",
  ],
  authors: [{ name: "Best Dive Guide", url: BASE_URL }],
  creator: "Best Dive Guide",
  publisher: "Best Dive Guide",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Best Dive Guide — Asia's Most Trusted Dive Ranking Platform",
    description:
      "Real divers vote. Real experiences rank. No paid winners. Discover the best dive resorts, liveaboards, food and dive sites across Asia.",
    url: BASE_URL,
    siteName: "Best Dive Guide",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Best Dive Guide — Asia's dive ranking platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dive Guide — Asia's Most Trusted Dive Rankings",
    description:
      "Real divers vote. No paid winners. Best dive resorts, liveaboards, food & sites in Asia.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@bestdiveguide",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
}

// JSON-LD: Organization + WebSite schema for AEO (AI/answer engines)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Best Dive Guide",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  description:
    "Best Dive Guide is Asia's most trusted diver-voted ranking platform for dive resorts, liveaboards, dive food experiences, and dive sites. Real divers vote. No paid winners.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    email: "nic.vdb80@gmail.com",
    contactType: "editorial",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Best Dive Guide",
  url: BASE_URL,
  description:
    "Diver-voted rankings for the best dive resorts, liveaboards, dive food and dive sites in Asia.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/top100?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How are dive resorts ranked on Best Dive Guide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rankings are based on verified diver votes, expert panel review, and scored criteria including dive quality, food quality, accommodation, sustainability, and value. Paid profiles cannot improve rankings.",
      },
    },
    {
      "@type": "Question",
      name: "Can operators pay to rank higher on Best Dive Guide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Best Dive Guide is a no-pay-to-win platform. Votes and scores from real divers determine all rankings. Sponsorships are kept entirely separate from editorial results.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries are covered in Best Dive Guide Asia rankings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Best Dive Guide Asia covers Indonesia (Bali, Raja Ampat, Komodo, Bunaken), Philippines (Tubbataha, Palawan, Malapascua), Maldives, Thailand (Similan Islands, Koh Tao), Malaysia (Sipadan, Perhentian), Palau, and more.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best liveaboard in Asia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "According to Best Dive Guide diver votes, the top-ranked liveaboards in Asia operate in Raja Ampat, Komodo, the Maldives, and the Philippines. Visit bestdiveguide.com/liveaboards for the full ranked list.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best dive resort in Indonesia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Indonesia's top-rated dive resorts according to Best Dive Guide include operations in Bunaken, Raja Ampat, Bangka Island, and Komodo. See the full ranking at bestdiveguide.com/stays.",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
