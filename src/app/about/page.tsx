import type { Metadata } from "next"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How We Rank — About Best Dive Guide",
  description: "Best Dive Guide ranks dive resorts, liveaboards, dive food and dive sites across Asia using verified diver votes, a professional panel and an annual expert review. No paid rankings. No sponsored winners.",
  alternates: {
    canonical: "https://bestdiveguide.com/about",
  },
  openGraph: {
    title: "How We Rank — About Best Dive Guide",
    description: "Best Dive Guide ranks dive resorts, liveaboards, dive food and dive sites across Asia using verified diver votes, a professional panel and an annual expert review. No paid rankings. No sponsored winners.",
    url: "https://bestdiveguide.com/about",
    siteName: "Best Dive Guide",
    type: "website",
    images: [{ url: "https://bestdiveguide.com/og-image.png", width: 1200, height: 630, alt: "How We Rank — Best Dive Guide" }],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Best Dive Guide rank dive resorts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every ranking on Best Dive Guide is built from three sources: a professional panel of dive experts, culinary directors and hospitality specialists (weighted 3x); verified public votes from divers who have actually visited (weighted 1.0 to 1.4x based on dive experience); and an annual review committee of ten independent experts who verify consistency and confirm final rankings. No operator can pay to improve their position.",
      },
    },
    {
      "@type": "Question",
      name: "Can a dive resort or liveaboard pay to rank higher?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Rankings on Best Dive Guide cannot be bought, influenced by advertising spend, or improved through paid profiles. A paid listing may include more photos and information, but has zero effect on ranking position. This is enforced by our editorial firewall — the ranking panel operates independently of any commercial relationships.",
      },
    },
    {
      "@type": "Question",
      name: "Who votes on Best Dive Guide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Any diver who can verify they have visited a listed operator can vote. Votes are weighted by the voter's dive experience and expertise — a diver with 500 logged dives carries more weight than someone on their first trip. This prevents operators from flooding the vote with unqualified submissions.",
      },
    },
    {
      "@type": "Question",
      name: "Which countries does Best Dive Guide cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Best Dive Guide Asia currently covers Indonesia (Raja Ampat, Komodo, Bali, Bunaken, Banda Sea), the Philippines (Tubbataha, Palawan, Malapascua, Anilao), the Maldives, Thailand (Similan Islands, Koh Tao, Richelieu Rock), Malaysia (Sipadan, Perhentian Islands), Palau, and Japan (Okinawa). Global rankings covering the Red Sea, Caribbean, Pacific and Mediterranean are planned for 2026.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a dive resort rank highly on Best Dive Guide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resorts are scored across five dimensions: dive quality and access, food quality and dietary care, accommodation comfort and service, sustainability practices, and overall guest experience. A great dive resort with poor food or inconsistent service will score lower than one that delivers consistently across all five. This reflects how serious divers actually choose where to go.",
      },
    },
    {
      "@type": "Question",
      name: "How is dive food ranked on Best Dive Guide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Best Dive Guide is the only ranking platform that scores food at dive destinations as a standalone category. Food is judged on freshness and sourcing, flavour and technique, dietary accommodation (vegetarian, vegan, allergy awareness), post-dive recovery suitability, and atmosphere. The best dive food in Asia is not always at the most expensive resort — some of the highest scores come from small island operations with exceptional local kitchens.",
      },
    },
  ],
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://bestdiveguide.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://bestdiveguide.com/about" },
  ],
}

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", background: "#fff" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />

      {/* Hero */}
      <div style={{
        background: "#0A2342",
        padding: "clamp(3rem,7vw,5rem) clamp(1rem,3vw,2rem)",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#E8723A", marginBottom: 16 }}>
          How We Rank
        </p>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, lineHeight: 1.2, maxWidth: 680, margin: "0 auto 1.25rem" }}>
          Built on three layers of trust — not one opinion
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(15px,2.5vw,18px)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          Real divers vote. Independent experts verify. No operator can buy a ranking, a shortlist position, or a winner badge.
        </p>
      </div>

      {/* What this is */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(2.5rem,6vw,4.5rem) clamp(1rem,3vw,2rem)" }}>
        <h2 style={{ fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 700, color: "#0A2342", marginBottom: "1.25rem" }}>
          What Best Dive Guide is
        </h2>
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: "1.25rem" }}>
          Best Dive Guide is Asia&apos;s diver-voted ranking platform for dive resorts, liveaboards, dive food experiences and dive sites. It exists because the best places to dive, eat and sleep underwater are rarely the most advertised — they&apos;re the ones divers come back to year after year and tell each other about quietly.
        </p>
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: "1.25rem" }}>
          The platform covers Indonesia, the Philippines, the Maldives, Thailand, Malaysia, Palau and Japan — with global rankings planned for 2026. Every operator listed is there because divers voted for it, not because it paid to be included.
        </p>
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.8 }}>
          Food is treated as a first-class category — not an afterthought. A dive resort that serves bad food after three hours underwater is a worse experience regardless of how good the reef is. Best Dive Guide is the only ranking platform that scores food at dive destinations as a standalone dimension, with its own criteria and its own top 99 list.
        </p>
      </div>

      {/* Three layers */}
      <div style={{ background: "#f7f9fc", padding: "clamp(2rem,5vw,4rem) clamp(1rem,3vw,2rem)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 700, color: "#0A2342", marginBottom: "0.75rem" }}>
            How rankings are built
          </h2>
          <p style={{ fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Every score on Best Dive Guide comes from three independent sources. No single source decides a ranking on its own.
          </p>

          {/* Layer 1 */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: 48, height: 48, background: "#E8723A", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>1</div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0A2342", marginBottom: 8 }}>Professional panel — 3× weight</h3>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, margin: 0 }}>
                A curated panel of dive professionals, underwater photographers, culinary directors and hospitality specialists score each operator independently. Panel members declare conflicts of interest and cannot score any operation they have a commercial relationship with. Their scores carry three times the weight of a standard public vote because they are verified experts evaluating what they know.
              </p>
            </div>
          </div>

          {/* Layer 2 */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: 48, height: 48, background: "#0097A7", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>2</div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0A2342", marginBottom: 8 }}>Verified diver votes — 1.0× to 1.4× weight</h3>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, margin: 0 }}>
                Any diver who can verify a visit to a listed operator can vote. Votes are weighted by dive experience — logged dives, certification level and regional familiarity. A 500-dive photographer voting on an underwater photography resort carries more weight than a first-time visitor. Suspicious voting patterns, duplicate accounts and incentivised votes are removed before scores are calculated.
              </p>
            </div>
          </div>

          {/* Layer 3 */}
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: 48, height: 48, background: "#2E7D32", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>3</div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0A2342", marginBottom: 8 }}>Annual review committee — override authority</h3>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, margin: 0 }}>
                Once a year, ten independent experts convene to review the combined scores, verify consistency across categories and confirm final rankings. The committee has the authority to flag anomalies, investigate score spikes and override results where the data does not reflect reality on the ground. Final rankings are published after this review — not before.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What cannot be bought */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(2.5rem,6vw,4.5rem) clamp(1rem,3vw,2rem)" }}>
        <h2 style={{ fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 700, color: "#0A2342", marginBottom: "1.25rem" }}>
          What cannot be bought
        </h2>
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.8, marginBottom: "1.25rem" }}>
          Sponsorships exist on Best Dive Guide. Advertising exists. Enhanced listings exist. None of these affect rankings. The commercial side and the editorial side operate with a strict firewall between them.
        </p>
        <ul style={{ fontSize: 16, color: "#444", lineHeight: 2, paddingLeft: "1.25rem", marginBottom: "1.25rem" }}>
          <li>Votes cannot be purchased</li>
          <li>Ranking positions cannot be purchased</li>
          <li>Shortlist placement cannot be purchased</li>
          <li>Winner badges cannot be purchased before results are final</li>
          <li>Sponsors have no access to voting data before publication</li>
          <li>Sponsors cannot join judging panels for categories they sponsor</li>
        </ul>
        <p style={{ fontSize: 16, color: "#444", lineHeight: 1.8 }}>
          The moment an operator can pay to win, the ranking is worthless. That is the only rule that matters.
        </p>
      </div>

      {/* FAQ */}
      <div style={{ background: "#f7f9fc", padding: "clamp(2rem,5vw,4rem) clamp(1rem,3vw,2rem)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 700, color: "#0A2342", marginBottom: "2rem" }}>
            Common questions
          </h2>
          {[
            {
              q: "Which countries are covered?",
              a: "Indonesia (Raja Ampat, Komodo, Bali, Bunaken, Banda Sea), the Philippines (Tubbataha, Palawan, Malapascua, Anilao), the Maldives, Thailand (Similan Islands, Koh Tao, Richelieu Rock), Malaysia (Sipadan, Perhentian Islands), Palau and Japan (Okinawa). Global rankings launching 2026."
            },
            {
              q: "How is food judged separately from the resort?",
              a: "Food is scored on five criteria: freshness and local sourcing, flavour and technique, dietary accommodation (vegetarian, vegan, allergy awareness), post-dive recovery suitability, and atmosphere. It is evaluated independently from the room, the dive operation and the overall experience. A resort can score in the Top 99 for food without ranking in the overall Top 99 — and vice versa."
            },
            {
              q: "How do liveaboards compete against land-based resorts?",
              a: "They don't — liveaboards are ranked in their own category. A liveaboard is scored on cabin comfort, galley food quality, crew professionalism, dive briefing quality, route and site selection, safety standards and overall value for the experience delivered. The best liveaboards in Asia run routes through Raja Ampat, Komodo, the Banda Sea, the Maldives and Tubbataha."
            },
            {
              q: "When are rankings updated?",
              a: "Scores are updated continuously as verified votes come in. Final published rankings are confirmed once a year following the annual review committee meeting. Rankings show the confirmed date so divers know when each list was last verified."
            },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0A2342", marginBottom: 10 }}>{item.q}</h3>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: "#0A2342",
        padding: "clamp(2rem,5vw,3.5rem) clamp(1rem,3vw,2rem)",
        textAlign: "center",
      }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(18px,3.5vw,24px)", fontWeight: 700, marginBottom: 12 }}>
          Ready to explore the rankings?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>
          Start with the Top 99 Asia — the most comprehensive dive ranking in the region.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/top100" style={{ background: "#E8723A", color: "#fff", padding: "13px 28px", borderRadius: 9, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
            Top 99 Asia
          </Link>
          <Link href="/stays" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", padding: "12px 24px", borderRadius: 9, textDecoration: "none", fontWeight: 500, fontSize: 15 }}>
            Best Dive Stays
          </Link>
          <Link href="/food" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", padding: "12px 24px", borderRadius: 9, textDecoration: "none", fontWeight: 500, fontSize: 15 }}>
            Best Dive Food
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
