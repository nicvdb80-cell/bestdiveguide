import type { Metadata } from "next"
import FoodClient from "./FoodClient"

export const metadata: Metadata = {
  title: "Best Dive Food Asia 2025 — Top 99 Ranked Dive Dining Experiences",
  description: "Where divers eat the best. Ranked by real diver votes: freshness, flavour, dietary care, atmosphere and post-dive satisfaction. The only ranking focused on food at dive destinations.",
  keywords: "best dive food Asia, dive resort restaurant, food at dive resorts, best dining dive destination, dive holiday food",
  alternates: {
    canonical: "https://bestdiveguide.com/food",
  },
  openGraph: {
    title: "Best Dive Food Asia 2025 — Top 99 Ranked Dive Dining Experiences",
    description: "Where divers eat the best. Ranked by real diver votes: freshness, flavour, dietary care, atmosphere and post-dive satisfaction. The only ranking focused on food at dive destinations.",
    url: "https://bestdiveguide.com/food",
    siteName: "Best Dive Guide",
    type: "website",
    images: [
      {
        url: "https://bestdiveguide.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Best Dive Food Asia 2025 — Top 99 Ranked Dive Dining Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dive Food Asia 2025 — Top 99 Ranked Dive Dining Experiences",
    description: "Where divers eat the best. Ranked by real diver votes: freshness, flavour, dietary care, atmosphere and post-dive satisfaction. The only ranking focused on food at dive destinations.",
  },
}

export default function Page() {
  return <FoodClient />
}
