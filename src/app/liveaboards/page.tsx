import type { Metadata } from "next"
import LiveaboardsClient from "./LiveaboardsClient"

export const metadata: Metadata = {
  title: "Best Liveaboards Asia 2025 — Top 49 Ranked Dive Liveaboards",
  description: "The most trusted liveaboard ranking in Asia. Scored on dive quality, cabin comfort, food, crew, safety and value. Indonesia, Maldives, Philippines and Thailand routes.",
  keywords: "best liveaboard Asia, liveaboard ranking Indonesia, Raja Ampat liveaboard, Komodo liveaboard, Maldives liveaboard, Philippines liveaboard, top liveaboard 2025",
  alternates: {
    canonical: "https://bestdiveguide.com/liveaboards",
  },
  openGraph: {
    title: "Best Liveaboards Asia 2025 — Top 49 Ranked Dive Liveaboards",
    description: "The most trusted liveaboard ranking in Asia. Scored on dive quality, cabin comfort, food, crew, safety and value. Indonesia, Maldives, Philippines and Thailand routes.",
    url: "https://bestdiveguide.com/liveaboards",
    siteName: "Best Dive Guide",
    type: "website",
    images: [
      {
        url: "https://bestdiveguide.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Best Liveaboards Asia 2025 — Top 49 Ranked Dive Liveaboards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Liveaboards Asia 2025 — Top 49 Ranked Dive Liveaboards",
    description: "The most trusted liveaboard ranking in Asia. Scored on dive quality, cabin comfort, food, crew, safety and value. Indonesia, Maldives, Philippines and Thailand routes.",
  },
}

export default function Page() {
  return <LiveaboardsClient />
}
