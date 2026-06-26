"use client"

import { useState } from "react"
import Link from "next/link"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

const CATEGORIES = [
  {
    title: "Top 99 Asia",
    emoji: "🏆",
    color: "#E8723A",
    bg: "#FEF0E8",
    href: "/top100",
    desc: "The definitive ranking of Asia\'s best dive experiences. Resorts, liveaboards and dive operators ranked by a professional panel, verified votes and expert review."
  },
  {
    title: "Top 99 World",
    emoji: "🌍",
    color: "#1B6CA8",
    bg: "#E8EFF8",
    href: "/top100-world",
    desc: "The global edition. Every continent, every ocean. From the Red Sea to the Caribbean, the Pacific to the Mediterranean. Coming 2026."
  },
  {
    title: "Best Stays",
    emoji: "🛏️",
    color: "#0097A7",
    bg: "#E1F5F8",
    href: "/stays",
    desc: "99 dive resorts ranked on room quality, service, location and how well the stay supports serious diving. Where divers sleep the best."
  },
  {
    title: "Best Food",
    emoji: "🍽️",
    color: "#C85A20",
    bg: "#FEF0E8",
    href: "/food",
    desc: "99 dive food experiences ranked on freshness, flavour, dietary care and atmosphere. Where divers remember the meals as much as the dives."
  },
  {
    title: "Dive Sites",
    emoji: "🤿",
    color: "#1B6CA8",
    bg: "#E8EFF8",
    href: "/sites",
    desc: "The world\'s best walls, wrecks, muck dives, seamounts and shark encounters. Ranked by visibility, marine life, access and wow factor."
  },
  {
    title: "Liveaboards",
    emoji: "🚢",
    color: "#5E35B1",
    bg: "#EDE7F6",
    href: "/liveaboards",
    desc: "49 liveaboards ranked across Indonesia, Maldives, Philippines and Thailand. Comfort, food, crew, safety and dive quality all scored."
  },
  {
    title: "Sustainable",
    emoji: "🌿",
    color: "#2E7D32",
    bg: "#E8F5E9",
    href: "/sustainable",
    desc: "Operators leading on reef conservation, waste reduction, community impact and certified sustainability. The green divers of the industry."
  },
]

function FlipCard({ cat }: { cat: typeof CATEGORIES[0] }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: "800px", cursor: "pointer", minHeight: "220px" }}
    >
      <div style={{
        position: "relative",
        width: "100%",
        height: "220px",
        transformStyle: "preserve-3d",
        transition: "transform 0.5s ease",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          background: "#fff",
          borderRadius: "14px",
          border: "1px solid #E8E8E8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "14px" }}>{cat.emoji}</div>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0A2342", marginBottom: "8px" }}>{cat.title}</h3>
          <span style={{ fontSize: "11px", color: "#999", fontWeight: 500 }}>Tap to learn more</span>
        </div>

        {/* Back */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: cat.bg,
          borderRadius: "14px",
          border: `1.5px solid ${cat.color}20`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1.5rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: cat.color, marginBottom: "10px" }}>{cat.title}</h3>
            <p style={{ fontSize: "12.5px", color: "#444", lineHeight: 1.65, margin: 0 }}>{cat.desc}</p>
          </div>
          <Link
            href={cat.href}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-block",
              background: cat.color,
              color: "#fff",
              padding: "9px 18px",
              borderRadius: "7px",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: 700,
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            View full list \u2192
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ fontFamily: "Inter,system-ui,sans-serif", minHeight: "100vh", background: "#fff" }}>
      <Nav />

      {/* Hero */}
      <div style={{ background: "#0A2342", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "46px", fontWeight: 700, lineHeight: 1.15, maxWidth: "680px", margin: "0 auto 1rem" }}>
          Discover where to go for the world\u2019s best <span style={{ color: "#0097A7" }}>dives</span>, dining & sleep.
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
          Ranked by experienced divers, food lovers, and real guests who have actually been there.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/top100" style={{ background: "#E8723A", color: "#fff", padding: "14px 28px", borderRadius: "9px", textDecoration: "none", fontWeight: 700, fontSize: "15px" }}>
            Explore Top 99 Asia
          </Link>
          <Link href="/top100-world" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", padding: "13px 24px", borderRadius: "9px", textDecoration: "none", fontWeight: 500, fontSize: "15px" }}>
            Top 99 World
          </Link>
        </div>
      </div>

      {/* 7 Category Flip Cards */}
      <div style={{ padding: "4rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#0097A7", marginBottom: "10px" }}>
            Explore Categories
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#0A2342", marginBottom: "8px" }}>
            Seven ways to find the best
          </h2>
          <p style={{ fontSize: "15px", color: "#666", maxWidth: "480px", margin: "0 auto" }}>
            Tap any card to learn more, then dive into the full ranking.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
          {CATEGORIES.map(cat => (
            <FlipCard key={cat.title} cat={cat} />
          ))}
        </div>
      </div>

      {/* Trust section */}
      <div style={{ background: "#0A2342", padding: "3.5rem 2rem" }}>
        <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: 700, textAlign: "center", marginBottom: "6px" }}>
          Built on trust. Three layers deep.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", fontSize: "14px", marginBottom: "2rem" }}>
          Every ranking verified by three independent sources \u2014 not just user reviews.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { num: "01", title: "Professional Panel", desc: "A curated group of dive professionals, photographers, culinary directors, and hospitality experts.", weight: "3\u00d7 weight" },
            { num: "02", title: "Verified Public Votes", desc: "Any guest with proof of visit can vote. Weight adjusted by dive experience and expertise.", weight: "1.0\u20131.4\u00d7 weight" },
            { num: "03", title: "Annual Review Committee", desc: "Once a year, 10 experts convene to verify consistency and confirm final rankings.", weight: "Override authority" },
          ].map(item => (
            <div key={item.num} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "1.5rem" }}>
              <div style={{ fontSize: "32px", fontWeight: 700, color: "rgba(255,255,255,0.12)", marginBottom: "0.75rem" }}>{item.num}</div>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{item.title}</h4>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: "10px" }}>{item.desc}</p>
              <span style={{ background: "rgba(232,114,58,0.2)", color: "#E8723A", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "4px" }}>{item.weight}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
