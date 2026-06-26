"use client"
import { useState } from "react"
import Link from "next/link"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

const LISTINGS = [
  { rank:1, slug:"emperor-harmony-liveaboard", name:"Emperor Harmoni", loc:"Raja Ampat, Indonesia", cats:["liveaboard","dive","food","stay"], green:true, overall:9.4, dive:9.5, food:9.2, stay:9.3, votes:47,
    summary:"Purpose-built for serious divers. World-class Raja Ampat dive routes, a chef-driven galley, and well-appointed cabin comfort. The benchmark liveaboard experience.",
    bestFor:"Advanced divers, underwater photographers, food-loving divers", discount:"BDG10-EMPEROR" },
  { rank:2, slug:"coraleye-bunaken-sulawesi", name:"CoralEye Boutique Resort", loc:"Bunaken, North Sulawesi", cats:["dive","food","stay"], green:true, overall:9.3, dive:9.4, food:9.1, stay:9.2, votes:31,
    summary:"Small, design-led resort on Bunaken Island with immediate access to legendary wall dives. The dive team knows every metre of the reef.",
    bestFor:"Advanced divers, wall diving specialists, photographers", discount:"BDG10-CORALEYE" },
  { rank:3, slug:"scubaspa-yang-maldives", name:"Scubaspa Yang", loc:"Central Atolls, Maldives", cats:["liveaboard","dive","food","stay"], green:false, overall:9.2, dive:9.0, food:9.3, stay:9.4, votes:55,
    summary:"Luxury spa-dive hybrid liveaboard. One of the highest-rated Maldives operations combining wellness, comfort, and strong manta diving.",
    bestFor:"Luxury seekers, couples, spa lovers, manta divers" },
  { rank:4, slug:"palau-aggressor-iii", name:"Palau Aggressor III", loc:"Palau, Micronesia", cats:["liveaboard","dive","food"], green:true, overall:9.2, dive:9.5, food:8.8, votes:38,
    summary:"Iconic routes through Blue Corner, German Channel, and Jellyfish Lake. The full pelagic menu delivered with precision.",
    bestFor:"Advanced divers, shark specialists, pelagic divers" },
  { rank:5, slug:"wakatobi-dive-resort", name:"Wakatobi Dive Resort", loc:"Sulawesi, Indonesia", cats:["dive","food","stay"], green:true, overall:9.0, dive:9.3, food:8.9, stay:9.1, votes:54,
    summary:"Remote island resort with private reef and one of the richest house reef dive sites on the planet.",
    bestFor:"Advanced divers, photographers, couples", discount:"BDG10-WAKATOBI" },
  { rank:6, slug:"scubaspa-zen-indonesia", name:"Scubaspa Zen Indonesia", loc:"Komodo, Raja Ampat", cats:["liveaboard","dive","food","stay"], green:false, overall:8.9, dive:9.1, food:9.0, stay:9.2, votes:34,
    summary:"Luxury comfort with strong itineraries across Komodo, Raja Ampat and Banda Sea. High-end guest experience throughout.",
    bestFor:"Luxury divers, photographers, couples" },
  { rank:7, slug:"lembeh-resort", name:"Lembeh Resort", loc:"North Sulawesi, Indonesia", cats:["dive","food","stay"], green:true, overall:8.7, dive:9.4, food:8.2, stay:8.6, votes:41,
    summary:"The spiritual home of muck diving. Dedicated macro guides, camera facilities, and the most species-rich strait on the planet.",
    bestFor:"Macro photographers, muck divers", discount:"BDG10-LEMBEH" },
  { rank:8, slug:"philippine-siren", name:"Philippine Siren", loc:"Tubbataha, Philippines", cats:["liveaboard","dive","food"], green:true, overall:8.7, dive:9.3, food:8.5, votes:29,
    summary:"Strong reputation, excellent Tubbataha and Visayas itineraries. Crew comments are consistently outstanding.",
    bestFor:"Reef divers, shark seekers, Tubbataha specialists" },
  { rank:9, slug:"four-seasons-landaa-maldives", name:"Four Seasons Maldives at Landaa", loc:"Baa Atoll, Maldives", cats:["dive","food","stay"], green:false, overall:9.1, dive:8.8, food:9.3, stay:9.4, votes:62,
    summary:"UNESCO Biosphere Reserve location, world-class marine biology program, four restaurants, and overwater villas above a pristine house reef.",
    bestFor:"Luxury seekers, couples, manta divers, food lovers" },
  { rank:10, slug:"mikumba-dua", name:"Mikumba Dua", loc:"Raja Ampat, Indonesia", cats:["liveaboard","dive","food"], green:true, overall:8.6, dive:9.1, food:8.4, votes:26,
    summary:"Excellent review scores, strong value, intimate Indonesian liveaboard feeling with great guide-to-guest ratio.",
    bestFor:"Experienced divers, photographers, value seekers" },
  { rank:11, slug:"malapascua-exotic-island", name:"Malapascua Exotic Island", loc:"Malapascua, Philippines", cats:["dive","stay"], green:true, overall:8.5, dive:9.2, stay:8.2, votes:33,
    summary:"The only consistent place on earth to dive with thresher sharks at cleaning stations. A pioneering shark conservation program.",
    bestFor:"Shark divers, conservation-minded divers", discount:"BDG10-MALAPASCUA" },
  { rank:12, slug:"samambaia", name:"Samambaia", loc:"Raja Ampat, Komodo", cats:["liveaboard","dive","stay"], green:true, overall:8.5, dive:9.0, stay:8.8, votes:28,
    summary:"Premium phinisi liveaboard, strong reputation among serious divers and photographers across Indonesia.",
    bestFor:"Photographers, experienced divers, phinisi lovers" },
  { rank:13, slug:"sawasdee-fasai", name:"Sawasdee Fasai", loc:"Similan Islands, Thailand", cats:["liveaboard","dive"], green:false, overall:8.5, dive:9.0, votes:64,
    summary:"Very high review volume and strong Similan and Richelieu Rock value. Consistently delivers big animal encounters.",
    bestFor:"Whale shark seekers, budget-conscious divers" },
  { rank:14, slug:"spirit-of-maldives", name:"Spirit of Maldives", loc:"Central Atolls, Maldives", cats:["liveaboard","dive","food"], green:false, overall:8.4, dive:8.7, food:8.9, votes:42,
    summary:"Strong verified reviews, especially for food, comfort and crew quality across central Maldives atoll routes.",
    bestFor:"Maldives first-timers, food lovers, manta divers" },
  { rank:34, slug:"manta-ray-kitchen-dive", name:"Manta Ray Kitchen & Dive", loc:"Nusa Lembongan, Bali", cats:["dive","food"], green:true, overall:8.4, dive:8.9, food:9.1, votes:22,
    summary:"A small operation with a serious kitchen. Outstanding local cuisine after exceptional manta dives.",
    bestFor:"Food-loving divers, solo travellers, manta enthusiasts", discount:"BDG10-MANTARAY" },
]

const REC = [
  { name:"Coral Bay Dive Center", loc:"Amed, Bali, Indonesia", cats:["dive","food"] },
  { name:"Tulamben Salt Pier Lodge", loc:"Tulamben, Bali, Indonesia", cats:["dive","stay"] },
]

const CATS_STYLE: Record<string,{bg:string,color:string}> = {
  dive:{ bg:"#E1F5F8", color:"#006D78" },
  food:{ bg:"#FEF0E8", color:"#A84B1A" },
  stay:{ bg:"#E8EFF8", color:"#144F8C" },
  liveaboard:{ bg:"#EEE8F8", color:"#5A2EA0" },
}

export default function Top100() {
  const [flipped, setFlipped] = useState<number|null>(null)
  const [filter, setFilter] = useState("all")
  const [green, setGreen] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = LISTINGS.filter(l => {
    if (filter !== "all" && !l.cats.includes(filter)) return false
    if (green && !l.green) return false
    if (search && !l.name.toLowerCase().includes(search) && !l.loc.toLowerCase().includes(search)) return false
    return true
  })

  return (
    <div style={{minHeight:"100vh",background:"#fff",fontFamily:"Inter,system-ui,sans-serif"}}>
      <Nav active="/top100" />

      <div style={{background:"#0A2342",padding:"2.5rem 2rem 2rem"}}>
        <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"#0097A7",marginBottom:"8px"}}>Rankings</div>
        <h1 style={{color:"#fff",fontSize:"28px",fontWeight:700,marginBottom:"6px"}}>Top 99 Dive Experiences</h1>
        <p style={{color:"rgba(255,255,255,0.55)",fontSize:"14px"}}>Ranked by a professional panel, verified guest votes, and an annual expert committee.</p>
      </div>

      {/* Filters */}
      <div style={{background:"#F5F0E8",borderBottom:"1px solid #E0D8CC",padding:".75rem 2rem",display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#aaa",marginRight:"4px"}}>Filter</span>
        {["all","dive","food","stay","liveaboard"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{fontSize:"12px",fontWeight:600,padding:"5px 12px",borderRadius:"20px",border:filter===f?"none":"1.5px solid #ddd",background:filter===f?"#0A2342":"#fff",color:filter===f?"#fff":"#555",cursor:"pointer",textTransform:"capitalize"}}>{f==="all"?"All":f==="liveaboard"?"Liveaboard":f}</button>
        ))}
        <button onClick={()=>setGreen(!green)} style={{fontSize:"12px",fontWeight:600,padding:"5px 12px",borderRadius:"20px",border:green?"none":"1.5px solid #ddd",background:green?"#2E7D32":"#fff",color:green?"#fff":"#555",cursor:"pointer"}}>🌿 Green Diver</button>
        <input value={search} onChange={e=>setSearch(e.target.value.toLowerCase())} placeholder="Search..." style={{marginLeft:"auto",border:"1px solid #ddd",borderRadius:"8px",padding:"5px 12px",fontSize:"13px",outline:"none",width:"200px"}} />
      </div>

      <div style={{padding:".5rem 2rem",fontSize:"12px",color:"#aaa",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span>{filtered.length} of {LISTINGS.length} listed</span>
        {filter === "liveaboard" && (
          <Link href="/liveaboards" style={{fontSize:"12px",fontWeight:700,color:"#E8723A",textDecoration:"none"}}>
            View full 49 Best Liveaboards list →
          </Link>
        )}
      </div>

      {/* Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",padding:"1rem 2rem 2rem"}}>
        {filtered.map((l,i)=>(
          <div key={l.rank} onClick={()=>setFlipped(flipped===i?null:i)} style={{border:"1px solid #E8E8E8",borderRadius:"12px",overflow:"hidden",cursor:"pointer",background:"#fff",transition:"transform .15s, box-shadow .15s"}}>
            {flipped!==i ? (
              <>
                <div style={{height:"130px",background:"#0A2342",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",fontSize:"32px"}}>
                  <span style={{position:"absolute",top:"10px",left:"11px",background:l.rank<=2?"#E8723A":"rgba(255,255,255,0.92)",color:l.rank<=2?"#fff":"#0A2342",fontSize:"13px",fontWeight:700,padding:"3px 9px",borderRadius:"5px"}}>#{l.rank}</span>
                  {l.green&&<span style={{position:"absolute",top:"10px",right:"10px",background:"#2E7D32",color:"#fff",fontSize:"9px",fontWeight:700,padding:"3px 7px",borderRadius:"4px"}}>★ Green Diver</span>}
                  🌊
                </div>
                <div style={{padding:"13px"}}>
                  <div style={{fontWeight:700,fontSize:"13px",color:"#0A2342",marginBottom:"2px"}}>{l.name}</div>
                  <div style={{fontSize:"11px",color:"#aaa",marginBottom:"7px"}}>{l.loc}</div>
                  <div style={{display:"flex",gap:"4px",flexWrap:"wrap",marginBottom:"8px"}}>
                    {l.cats.map(c=><span key={c} style={{fontSize:"9px",fontWeight:700,letterSpacing:".4px",textTransform:"uppercase",padding:"2px 6px",borderRadius:"3px",background:CATS_STYLE[c]?.bg,color:CATS_STYLE[c]?.color}}>{c}</span>)}
                  </div>
                  <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
                    <span style={{background:"#EFF4FB",color:"#1B5CA0",fontWeight:700,fontSize:"11px",padding:"3px 8px",borderRadius:"4px"}}>{l.overall.toFixed(1)} overall</span>
                    {l.discount&&<span style={{background:"#FEF0E8",color:"#C85A20",fontWeight:700,fontSize:"10px",padding:"3px 8px",borderRadius:"4px"}}>10% off</span>}
                  </div>
                  <div style={{fontSize:"10px",color:"#ccc",textAlign:"right",marginTop:"6px"}}>Tap to read more</div>
                </div>
              </>
            ) : (
              <div style={{padding:"1.1rem",background:"#F8F9FA",minHeight:"240px",display:"flex",flexDirection:"column"}}>
                <div style={{fontWeight:700,fontSize:"13px",color:"#0A2342",marginBottom:"2px"}}>{l.name}</div>
                <div style={{fontSize:"11px",color:"#aaa",marginBottom:"10px"}}>{l.loc}</div>
                <p style={{fontSize:"12px",color:"#555",lineHeight:1.6,flex:1}}>{l.summary}</p>
                <div style={{fontSize:"11px",color:"#aaa",margin:"8px 0",lineHeight:1.4}}>Best for: <span style={{color:"#0A2342",fontWeight:600}}>{l.bestFor}</span></div>
                <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                  <Link href={"/listing/" + l.slug} onClick={e=>e.stopPropagation()} style={{fontSize:"11px",fontWeight:700,background:"#0A2342",color:"#fff",padding:"6px 12px",borderRadius:"6px",textDecoration:"none"}}>Read more</Link>
                  {l.discount&&<a href={"/api/book/" + l.discount} onClick={e=>e.stopPropagation()} style={{fontSize:"11px",fontWeight:700,background:"#E8723A",color:"#fff",padding:"6px 12px",borderRadius:"6px",textDecoration:"none"}}>Book — 10% off ⚡</a>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Liveaboard CTA when filter active */}
      {filter === "liveaboard" && (
        <div style={{background:"#EEE8F8",padding:"1.5rem 2rem",textAlign:"center",margin:"0 2rem 2rem",borderRadius:"12px"}}>
          <p style={{fontSize:"14px",color:"#5A2EA0",margin:"0 0 12px",fontWeight:600}}>Looking for the complete liveaboard ranking?</p>
          <Link href="/liveaboards" style={{background:"#5A2EA0",color:"#fff",padding:"10px 24px",borderRadius:"8px",textDecoration:"none",fontWeight:700,fontSize:"13px"}}>
            View 49 Best Liveaboards in Asia →
          </Link>
        </div>
      )}

      {/* Recommended */}
      <div style={{background:"#F2F4F6",borderTop:"1px solid #E8E8E8",borderBottom:"1px solid #E8E8E8",padding:".75rem 2rem"}}>
        <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",color:"#E8723A"}}>R — Recommended</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"12px",padding:"1.5rem 2rem 2rem"}}>
        {REC.map(r=>(
          <div key={r.name} style={{background:"#fff",border:"1px solid #E8E8E8",borderRadius:"8px",padding:"13px 15px",display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{width:"34px",height:"34px",borderRadius:"50%",background:"#E8723A",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"14px",flexShrink:0}}>R</div>
            <div>
              <div style={{fontWeight:700,fontSize:"13px",color:"#0A2342"}}>{r.name}</div>
              <div style={{fontSize:"11px",color:"#aaa",marginBottom:"5px"}}>{r.loc}</div>
              <div style={{display:"flex",gap:"4px"}}>
                {r.cats.map(c=><span key={c} style={{fontSize:"9px",fontWeight:700,textTransform:"uppercase",padding:"2px 6px",borderRadius:"3px",background:CATS_STYLE[c]?.bg,color:CATS_STYLE[c]?.color}}>{c}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}
