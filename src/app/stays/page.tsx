import type { Metadata } from "next"
import StaysClient from "./StaysClient"

export const metadata: Metadata = {
  title: "Best Dive Stays Asia 2025 — Top 99 Ranked Dive Resorts",
  description: "The definitive ranking of Asia's best dive resorts and boutique dive stays. Rated by real divers on room quality, service, dive access, food and location. Indonesia, Philippines, Maldives & more.",
  keywords: "best dive resorts Asia, dive resort ranking, top dive stays Indonesia, best dive hotel Maldives, dive resort Philippines, boutique dive resort",
  alternates: {
    canonical: "https://bestdiveguide.com/stays",
  },
  openGraph: {
    title: "Best Dive Stays Asia 2025 — Top 99 Ranked Dive Resorts",
    description: "The definitive ranking of Asia's best dive resorts and boutique dive stays. Rated by real divers on room quality, service, dive access, food and location. Indonesia, Philippines, Maldives & more.",
    url: "https://bestdiveguide.com/stays",
    siteName: "Best Dive Guide",
    type: "website",
    images: [
      {
        url: "https://bestdiveguide.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Best Dive Stays Asia 2025 — Top 99 Ranked Dive Resorts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dive Stays Asia 2025 — Top 99 Ranked Dive Resorts",
    description: "The definitive ranking of Asia's best dive resorts and boutique dive stays. Rated by real divers on room quality, service, dive access, food and location. Indonesia, Philippines, Maldives & more.",
  },
}

export default function Page() {
  return <StaysClient />
}
