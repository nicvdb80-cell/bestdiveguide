// bestdiveguide v1.0
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Best Dive Guide — Find the world\'s best places to dive, eat, and sleep',
  description: 'Ranked by experienced divers, food lovers, and real guests who have actually been there. The world\'s most trusted dive, food, and stay ranking platform.',
  keywords: ['dive guide', 'best dive resorts', 'liveaboard ranking', 'dive travel', 'best dive food'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Best Dive Guide',
    description: 'Dive. Eat. Sleep. Repeat.',
    url: 'https://bestdiveguide.com',
    siteName: 'Best Dive Guide',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
