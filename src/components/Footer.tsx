import Link from "next/link";

export default function Footer() {
  const links = [
    { h: "/top100", l: "Top 99 Asia" },
    { h: "/top100-world", l: "Top 99 World" },
    { h: "/stays", l: "Stays" },
    { h: "/food", l: "Food" },
    { h: "/sites", l: "Sites" },
    { h: "/liveaboards", l: "Liveaboards" },
    { h: "/sustainable", l: "Sustainable" },
    { h: "/vote", l: "Vote" },
    { h: "/about", l: "How We Rank" },
  ];
  return (
    <footer
      style={{
        background: "#0A2342",
        padding: "2.5rem clamp(1rem,3vw,2rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
      }}
    >
      <div>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
          Best<span style={{ color: "#E8723A" }}>Dive</span>Guide
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            fontStyle: "italic",
            marginTop: 4,
          }}
        >
          Dive. Eat. Sleep. Repeat.
        </div>
      </div>
      <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
        {links.map((i) => (
          <Link
            key={i.h}
            href={i.h}
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 12,
              textDecoration: "none",
            }}
          >
            {i.l}
          </Link>
        ))}
        <a
          href="mailto:nic.vdb80@gmail.com"
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 12,
            textDecoration: "none",
          }}
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
