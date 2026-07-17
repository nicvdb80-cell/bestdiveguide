// deploy trigger: 1784259539
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Something is bubbling — Best Dive Guide",
  description: "Best Dive Guide is almost ready. Something is bubbling beneath the surface.",
  robots: { index: false, follow: false },
}

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A1F3A",
      backgroundImage: "url(/ocean-hero.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, system-ui, sans-serif",
      textAlign: "center",
      padding: "2rem",
    }}>
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 31, 58, 0.72)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <style>{`
          @keyframes rise {
            0%   { transform: translateY(0) scale(1);   opacity: 0.7; }
            100% { transform: translateY(-120px) scale(1.3); opacity: 0; }
          }
          .bubble {
            position: absolute;
            bottom: -10px;
            border-radius: 50%;
            background: rgba(0, 151, 167, 0.35);
            border: 1px solid rgba(0, 151, 167, 0.5);
            animation: rise linear infinite;
          }
        `}</style>

        <div style={{ position: "relative", width: 120, height: 100, margin: "0 auto 2.5rem" }}>
          {[
            { size: 14, left: 20, delay: "0s",   dur: "2.8s" },
            { size: 9,  left: 45, delay: "0.6s", dur: "2.2s" },
            { size: 18, left: 65, delay: "1.1s", dur: "3.2s" },
            { size: 11, left: 85, delay: "0.3s", dur: "2.6s" },
            { size: 7,  left: 30, delay: "1.6s", dur: "2.0s" },
            { size: 13, left: 55, delay: "2.0s", dur: "2.9s" },
          ].map((b, i) => (
            <div key={i} className="bubble" style={{
              width: b.size,
              height: b.size,
              left: b.left,
              animationDelay: b.delay,
              animationDuration: b.dur,
            }} />
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#E8723A", marginBottom: 20 }}>
          Best Dive Guide
        </div>

        <h1 style={{
          color: "#ffffff",
          fontSize: "clamp(28px, 6vw, 52px)",
          fontWeight: 700,
          lineHeight: 1.2,
          maxWidth: 560,
          margin: "0 auto 1.25rem",
          letterSpacing: "-0.5px",
        }}>
          Something is bubbling.
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "clamp(14px, 2.5vw, 18px)",
          maxWidth: 380,
          margin: "0 auto",
          lineHeight: 1.7,
        }}>
          Come back soon.
        </p>
      </div>
    </div>
  )
}
