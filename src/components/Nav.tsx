"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navLinks = [
  { href: "/top100", label: "Top 99 Asia" },
  { href: "/top100-world", label: "Top 99 World" },
  { href: "/stays", label: "Best Stays" },
  { href: "/food", label: "Best Food" },
  { href: "/sites", label: "Dive Sites" },
  { href: "/liveaboards", label: "Liveaboards" },
  { href: "/sustainable", label: "Sustainable" },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav style={{background:"#0A2342",height:"60px",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,0.18)"}}>
      <Link href="/" style={{color:"#fff",fontWeight:700,fontSize:"18px",textDecoration:"none",flexShrink:0}}>
        Best<span style={{color:"#E8723A"}}>Dive</span>Guide
      </Link>

      <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
        <Link href="/vote" style={{background:"#E8723A",color:"#fff",padding:"8px 18px",borderRadius:"7px",textDecoration:"none",fontSize:"13px",fontWeight:600}}>
          Vote
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{background:"none",border:"none",cursor:"pointer",padding:"6px",display:"flex",flexDirection:"column",gap:"5px",justifyContent:"center",alignItems:"center",width:"36px",height:"36px"}}
        >
          <span style={{display:"block",width:"22px",height:"2px",background:"#fff",borderRadius:"2px",transition:"transform 0.2s",transform:open?"rotate(45deg) translateY(5px)":"none"}} />
          <span style={{display:"block",width:"22px",height:"2px",background:"#fff",borderRadius:"2px",transition:"opacity 0.2s",opacity:open?0:1}} />
          <span style={{display:"block",width:"22px",height:"2px",background:"#fff",borderRadius:"2px",transition:"transform 0.2s",transform:open?"rotate(-45deg) translateY(-5px)":"none"}} />
        </button>
      </div>

      {open && (
        <div style={{position:"absolute",top:"60px",left:0,right:0,background:"#0A2342",borderTop:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 8px 24px rgba(0,0,0,0.25)",zIndex:99,padding:"12px 0"}}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display:"block",
                padding:"14px 2rem",
                color: pathname === link.href ? "#fff" : "rgba(255,255,255,0.65)",
                fontWeight: pathname === link.href ? 700 : 400,
                fontSize:"14px",
                textDecoration:"none",
                borderLeft: pathname === link.href ? "3px solid #E8723A" : "3px solid transparent",
                background: pathname === link.href ? "rgba(255,255,255,0.05)" : "transparent",
                transition:"background 0.15s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
