import type { Metadata } from "next"
import Top100Client from "./Top100Client"

export const metadata: Metadata = {
  title: "Top 99 Dive Experiences Asia 2025 — Best Dive Resorts & Liveaboards Ranked",
  description: "The definitive dive ranking for Asia. Resorts, liveaboards and dive operators across Indonesia, Philippines, Maldives, Thailand and beyond. Voted by real divers, reviewed by experts.",
  keywords: "top dive resorts Asia 2025, best dive experiences Asia, dive ranking Asia, top liveaboard Asia, best dive resort 2025, dive awards Asia",
  alternates: {
    canonical: "https://bestdiveguide.com/top100",
  },
  openGraph: {
    title: "Top 99 Dive Experiences Asia 2025 — Best Dive Resorts & Liveaboards Ranked",
    description: "The definitive dive ranking for Asia. Resorts, liveaboards and dive operators across Indonesia, Philippines, Maldives, Thailand and beyond. Voted by real divers, reviewed by experts.",
    url: "https://bestdiveguide.com/top100",
    siteName: "Best Dive Guide",
    type: "website",
    images: [
      {
        url: "https://bestdiveguide.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Top 99 Dive Experiences Asia 2025 — Best Dive Resorts & Liveaboards Ranked",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 99 Dive Experiences Asia 2025 — Best Dive Resorts & Liveaboards Ranked",
    description: "The definitive dive ranking for Asia. Resorts, liveaboards and dive operators across Indonesia, Philippines, Maldives, Thailand and beyond. Voted by real divers, reviewed by experts.",
  },
}

export default function Page() {
  return <Top100Client />
}
