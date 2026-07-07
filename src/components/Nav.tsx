"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
const navLinks = [
  { href: "/top100", label: "Top 99 Asia" },
  { href: "/top100-world", label: "Top 99 World" },
  { href: "/stays", label: "Best Stays" },
  { href: "/food", label: "Best Food" },
  { href: "/sites", label: "Dive Sites" },
  { href: "/liveaboards", label: "Liveaboards" },
  { href: "/sustainable", label: "Sustainable" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      style={{
        background: "#0A2342",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1rem,3vw,2rem)",
        position: "sticky",
        top: 0,
        zIndex: 200,
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        Best<span style={{ color: "#E8723A" }}>Dive</span>Guide
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link
          href="/vote"
          style={{
            background: "#E8723A",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: 7,
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Vote
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            width: 36,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#fff",
              borderRadius: 2,
              transition: "all .25s",
              transform: open ? "rotate(45deg) translate(3.5px,3.5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#fff",
              borderRadius: 2,
              transition: "opacity .2s",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "#fff",
              borderRadius: 2,
              transition: "all .25s",
              transform: open
                ? "rotate(-45deg) translate(3.5px,-3.5px)"
                : "none",
            }}
          />
        </button>
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            background: "#0A2342",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            zIndex: 199,
            padding: "8px 0",
          }}
          onClick={() => setOpen(false)}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "block",
                padding: "14px clamp(1rem,3vw,2rem)",
                color: pathname === l.href ? "#fff" : "rgba(255,255,255,0.65)",
                fontWeight: pathname === l.href ? 700 : 400,
                fontSize: 14,
                textDecoration: "none",
                borderLeft:
                  pathname === l.href
                    ? "3px solid #E8723A"
                    : "3px solid transparent",
                background:
                  pathname === l.href
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
