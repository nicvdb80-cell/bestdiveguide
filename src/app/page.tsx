import type { Metadata } from "next"
import HomeClient from "./HomeClient"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Best Dive Guide — Ranked Dive Resorts, Liveaboards & Food in Asia",
  description: "The most trusted dive ranking platform in Asia. Real divers vote on the best dive resorts, liveaboards, dive food, and dive sites across Indonesia, Philippines, Maldives, Thailand and beyond.",
  alternates: { canonical: "https://bestdiveguide.com" },
  openGraph: {
    title: "Best Dive Guide — Asia's Most Trusted Dive Ranking Platform",
    description: "Real divers vote. Real experiences rank. No paid winners. Discover the best dive resorts, liveaboards, food and dive sites across Asia.",
    url: "https://bestdiveguide.com",
    siteName: "Best Dive Guide",
    type: "website",
    images: [{ url: "https://bestdiveguide.com/og-image.png", width: 1200, height: 630, alt: "Best Dive Guide — Asia's dive ranking platform" }],
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Best Dive Guide",
  url: "https://bestdiveguide.com",
  description: "Diver-voted rankings for the best dive resorts, liveaboards, dive food and dive sites in Asia.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://bestdiveguide.com/top100?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Best Dive Guide — Category Rankings",
  description: "Asia's top-ranked dive resorts, liveaboards, dive food experiences, dive sites and sustainable operators.",
  numberOfItems: 7,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Top 99 Dive Experiences Asia", url: "https://bestdiveguide.com/top100" },
    { "@type": "ListItem", position: 2, name: "Best Dive Stays Asia", url: "https://bestdiveguide.com/stays" },
    { "@type": "ListItem", position: 3, name: "Best Dive Food Asia", url: "https://bestdiveguide.com/food" },
    { "@type": "ListItem", position: 4, name: "Best Liveaboards Asia", url: "https://bestdiveguide.com/liveaboards" },
    { "@type": "ListItem", position: 5, name: "Best Dive Sites Asia", url: "https://bestdiveguide.com/sites" },
    { "@type": "ListItem", position: 6, name: "Top 99 Dive Experiences World", url: "https://bestdiveguide.com/top100-world" },
    { "@type": "ListItem", position: 7, name: "Most Sustainable Dive Operators", url: "https://bestdiveguide.com/sustainable" },
  ],
}

export default function Home() {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", background: "#fff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Server-rendered hero — fully crawlable by Google */}
      <Nav />
      <div style={{
        backgroundImage: "url(/ocean-hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        padding: "clamp(3rem,8vw,5rem) clamp(1rem,3vw,2rem) clamp(2rem,6vw,4rem)",
        textAlign: "center",
      }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,5.5vw,46px)", fontWeight: 700, lineHeight: 1.15, maxWidth: 680, margin: "0 auto 1rem" }}>
          Discover where to go for the world's best{" "}
          <span style={{ color: "#0097A7" }}>dives</span>, dining & sleep.
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(14px,2.5vw,18px)", maxWidth: 500, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
          Ranked by experienced divers, food lovers, and real guests who have actually been there.
        </p>
        <div style={{ maxWidth: 640, margin: "0 auto 2rem", background: "rgba(0,151,167,0.15)", border: "1px solid #0097A7", borderRadius: 10, padding: "14px 20px" }}>
          <p style={{ fontSize: 14, color: "#fff", margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
            Best Dive Guide is a diver-voted ranking platform for the best dive resorts, liveaboards, dive food and dive sites across Asia. Indonesia, Philippines, Maldives, Thailand, Malaysia, Palau and Japan — ranked by people who have actually been there.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/top100" style={{ background: "#E8723A", color: "#fff", padding: "14px 28px", borderRadius: 9, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
            Explore Top 99 Asia
          </Link>
          <Link href="/top100-world" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", padding: "13px 24px", borderRadius: 9, textDecoration: "none", fontWeight: 500, fontSize: 15 }}>
            Top 99 World
          </Link>
        </div>
      </div>

      {/* Server-rendered category links — crawlable navigation for Google */}
      <nav aria-label="Browse rankings" style={{ background: "#f7f9fc", borderBottom: "1px solid #e5e7eb", padding: "1.25rem clamp(1rem,3vw,2rem)", overflowX: "auto" }}>
        <ul style={{ display: "flex", gap: "0.5rem", listStyle: "none", margin: 0, padding: 0, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { href: "/top100", label: "Top 99 Asia", color: "#E8723A" },
            { href: "/stays", label: "Best Dive Stays" },
            { href: "/food", label: "Best Dive Food" },
            { href: "/liveaboards", label: "Liveaboards" },
            { href: "/sites", label: "Dive Sites" },
            { href: "/sustainable", label: "Sustainable" },
            { href: "/about", label: "How We Rank" },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} style={{
                display: "block",
                padding: "7px 16px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                background: item.color ? item.color : "#0A2342",
                color: "#fff",
                whiteSpace: "nowrap",
              }}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Server-rendered intro text — the key SEO content block */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(2rem,5vw,3.5rem) clamp(1rem,3vw,2rem)" }}>
        <h2 style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 700, color: "#0A2342", marginBottom: "1rem", textAlign: "center" }}>
          The only dive ranking that covers dive, food and stay — together
        </h2>
        <p style={{ fontSize: 15, color: "#555", lineHeight: 1.85, textAlign: "center", maxWidth: 700, margin: "0 auto 2rem" }}>
          Most dive guides rank the reef. Best Dive Guide ranks the whole experience — the dive, the food on the boat, the bed you sleep in and the people running it. Because after three hours underwater, what you eat and where you sleep matters just as much as what you saw.
        </p>

        {/* Category summary — server rendered, fully crawlable */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            {
              title: "Top 99 Asia",
              href: "/top100",
              text: "The definitive dive ranking for Asia. Resorts, liveaboards and operators across Indonesia, Philippines, Maldives, Thailand and beyond — voted by real divers, reviewed by experts.",
            },
            {
              title: "Best Dive Stays",
              href: "/stays",
              text: "99 dive resorts ranked on room quality, service, dive access, food and location. From boutique island lodges in Raja Ampat to full-service resorts in the Maldives.",
            },
            {
              title: "Best Dive Food",
              href: "/food",
              text: "The only standalone food ranking for dive destinations. 99 operations scored on freshness, flavour, dietary care and how well the kitchen understands what divers need after a long day underwater.",
            },
            {
              title: "Liveaboards",
              href: "/liveaboards",
              text: "49 liveaboards across Indonesia, Maldives, Philippines and Thailand. Scored on dive quality, cabin comfort, galley food, crew, safety and value.",
            },
            {
              title: "Dive Sites",
              href: "/sites",
              text: "Walls, wrecks, muck dives, seamounts and big animal encounters. Ranked by visibility, marine life diversity, access and the moment you surface saying nothing.",
            },
            {
              title: "Sustainable Operators",
              href: "/sustainable",
              text: "The operators leading on reef conservation, waste reduction, community impact and verified sustainability certifications — not just marketing.",
            },
          ].map((cat) => (
            <Link key={cat.href} href={cat.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "1.25rem", height: "100%", transition: "border-color 0.2s" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A2342", marginBottom: 8 }}>{cat.title}</h3>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>{cat.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Interactive flip cards — client component */}
      <HomeClient />

      <Footer />
    </div>
  )
}
