"use client"

import { useState } from "react"
import Link from "next/link"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

const CATS = [
  {t:"Top 99 Asia",c:"#E8723A",h:"/top100",d:"The definitive ranking of Asia’s best dive experiences. Resorts, liveaboards and dive operators ranked by professional panel, verified votes and expert review.",icon:`<svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M32 8c-3 0-5.5 2-6.5 4.5C23 11 20 12 18 14.5c-2.5 3-2 7 .5 9.5l-3 2c-1 .5-1.5 1.5-1 2.5l2 4c.5 1 1.5 1.5 2.5 1l3-1.5c2 2 5 3 8 3h4c3 0 6-1 8-3l3 1.5c1 .5 2 0 2.5-1l2-4c.5-1 0-2-1-2.5l-3-2c2.5-2.5 3-6.5.5-9.5-2-2.5-5-3.5-7.5-2C37.5 10 35 8 32 8z" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 44v12M40 44v12M28 44v14M36 44v14" stroke-linecap="round"/><text x="32" y="35" text-anchor="middle" fill="#C9A84C" stroke="none" font-size="14" font-weight="700" font-family="serif">99</text></svg>`},
  {t:"Top 99 World",c:"#1B6CA8",h:"/top100-world",d:"The global edition. Every continent, every ocean. From the Red Sea to the Caribbean, the Pacific to the Mediterranean. Coming 2026.",icon:`<svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="22"/><ellipse cx="32" cy="32" rx="10" ry="22"/><line x1="10" y1="32" x2="54" y2="32"/><line x1="13" y1="22" x2="51" y2="22"/><line x1="13" y1="42" x2="51" y2="42"/><text x="32" y="37" text-anchor="middle" fill="#C9A84C" stroke="none" font-size="12" font-weight="700" font-family="serif">99</text></svg>`},
  {t:"Best Stays",c:"#0097A7",h:"/stays",d:"99 dive resorts ranked on room quality, service, location and how well the stay supports serious diving.",icon:`<svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="28" width="48" height="20" rx="3" stroke-linejoin="round"/><path d="M14 28v-8a4 4 0 014-4h28a4 4 0 014 4v8" stroke-linejoin="round"/><rect x="16" y="20" width="12" height="8" rx="2"/><rect x="36" y="20" width="12" height="8" rx="2"/><line x1="8" y1="48" x2="8" y2="54"/><line x1="56" y1="48" x2="56" y2="54"/><path d="M12 36h40" stroke-linecap="round"/></svg>`},
  {t:"Best Food",c:"#C85A20",h:"/food",d:"99 dive food experiences ranked on freshness, flavour, dietary care and atmosphere. Where divers eat the best.",icon:`<svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M12 42h40" stroke-linecap="round"/><path d="M14 42c0-14 8-24 18-24s18 10 18 24" stroke-linejoin="round"/><ellipse cx="32" cy="46" rx="22" ry="6"/><circle cx="32" cy="14" r="2.5" fill="#C9A84C" stroke="none"/><line x1="32" y1="16.5" x2="32" y2="18"/></svg>`},
  {t:"Dive Sites",c:"#1B6CA8",h:"/sites",d:"The best walls, wrecks, muck dives, seamounts and shark encounters. Ranked by visibility, marine life, access and wow factor.",icon:`<svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="26" r="10"/><circle cx="42" cy="26" r="10"/><circle cx="22" cy="26" r="5"/><circle cx="42" cy="26" r="5"/><path d="M32 30v8c0 2-1.5 4-4 5l-6 3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22c-2-3-1-8 2-10" stroke-linecap="round"/><path d="M52 22c2-3 1-8-2-10" stroke-linecap="round"/><path d="M32 26v-6" stroke-linecap="round"/></svg>`},
  {t:"Liveaboards",c:"#5E35B1",h:"/liveaboards",d:"49 liveaboards across Indonesia, Maldives, Philippines and Thailand. Comfort, food, crew, safety and dive quality all scored.",icon:`<svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M6 40l4-4h44l4 4" stroke-linejoin="round"/><path d="M10 36V26a2 2 0 012-2h14v12" stroke-linejoin="round"/><path d="M38 36V20a2 2 0 012-2h8a2 2 0 012 2v16" stroke-linejoin="round"/><path d="M26 36V18l12-6v24" stroke-linejoin="round"/><path d="M6 40c2 4 8 6 14 6h24c6 0 12-2 14-6" stroke-linejoin="round"/><line x1="16" y1="30" x2="22" y2="30"/><rect x="42" y="24" width="4" height="4" rx="0.5"/></svg>`},
  {t:"Sustainable",c:"#2E7D32",h:"/sustainable",d:"Operators leading on reef conservation, waste reduction, community impact and certified sustainability.",icon:`<svg viewBox="0 0 64 64" fill="none" stroke="#C9A84C" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg"><path d="M32 56V32" stroke-linecap="round"/><path d="M32 32c-6-10-16-14-20-12 2 8 10 16 20 16" stroke-linejoin="round"/><path d="M32 28c4-8 14-12 18-10-1 7-8 14-18 14" stroke-linejoin="round"/><path d="M26 44c-4 2-6 6-6 10" stroke-linecap="round"/><path d="M38 44c4 2 6 6 6 10" stroke-linecap="round"/><circle cx="20" cy="16" r="3"/><circle cx="44" cy="14" r="2"/><circle cx="14" cy="24" r="1.5"/></svg>`},
]

function FlipCard({c}:{c:typeof CATS[0]}) {
  const [f,sF] = useState(false)
  return (
    <div onClick={()=>sF(!f)} style={{perspective:800,cursor:"pointer"}}>
      <div style={{position:"relative",width:"100%",height:240,transformStyle:"preserve-3d",transition:"transform .5s",transform:f?"rotateY(180deg)":"none"}}>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"linear-gradient(145deg,#0A2342 0%,#132F4C 100%)",borderRadius:14,border:"1px solid rgba(201,168,76,0.25)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1.5rem",textAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>
          <div style={{width:64,height:64,marginBottom:16}} dangerouslySetInnerHTML={{__html:c.icon}} />
          <h3 style={{fontSize:15,fontWeight:700,color:"#C9A84C",marginBottom:6,letterSpacing:1,textTransform:"uppercase"}}>{c.t}</h3>
          <span style={{fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:500}}>Tap to learn more</span>
        </div>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",background:"linear-gradient(145deg,#0A2342 0%,#132F4C 100%)",borderRadius:14,border:"1px solid rgba(201,168,76,0.25)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"1.5rem",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>
          <div>
            <h3 style={{fontSize:14,fontWeight:700,color:"#C9A84C",marginBottom:10,letterSpacing:0.5}}>{c.t}</h3>
            <p style={{fontSize:12,color:"rgba(255,255,255,0.65)",lineHeight:1.65,margin:0}}>{c.d}</p>
          </div>
          <Link href={c.h} onClick={e=>e.stopPropagation()} style={{display:"block",background:c.c,color:"#fff",padding:"9px 18px",borderRadius:7,textDecoration:"none",fontSize:12,fontWeight:700,textAlign:"center",marginTop:12}}>View full list →</Link>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#fff"}}>
      <Nav />
      <div style={{background:"#0A2342",padding:"clamp(3rem,8vw,5rem) clamp(1rem,3vw,2rem) clamp(2rem,6vw,4rem)",textAlign:"center"}}>
        <h1 style={{color:"#fff",fontSize:"clamp(28px,5.5vw,46px)",fontWeight:700,lineHeight:1.15,maxWidth:680,margin:"0 auto 1rem"}}>
          Discover where to go for the world’s best <span style={{color:"#0097A7"}}>dives</span>, dining & sleep.
        </h1>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:"clamp(14px,2.5vw,18px)",maxWidth:500,margin:"0 auto 2.5rem",lineHeight:1.6}}>
          Ranked by experienced divers, food lovers, and real guests who have actually been there.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <Link href="/top100" style={{background:"#E8723A",color:"#fff",padding:"14px 28px",borderRadius:9,textDecoration:"none",fontWeight:700,fontSize:15}}>Explore Top 99 Asia</Link>
          <Link href="/top100-world" style={{background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.4)",padding:"13px 24px",borderRadius:9,textDecoration:"none",fontWeight:500,fontSize:15}}>Top 99 World</Link>
        </div>
      </div>

      <div style={{padding:"clamp(2rem,5vw,4rem) clamp(1rem,3vw,2rem)",maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#C9A84C",marginBottom:10}}>Explore Categories</div>
          <h2 style={{fontSize:"clamp(22px,4vw,28px)",fontWeight:700,color:"#0A2342",marginBottom:8}}>Seven ways to find the best</h2>
          <p style={{fontSize:15,color:"#666",maxWidth:480,margin:"0 auto"}}>Tap any card to learn more, then dive into the full ranking.</p>
        </div>
        <div className="r-grid-cards">
          {CATS.map(c=><FlipCard key={c.t} c={c}/>)}
        </div>
      </div>

      <div style={{background:"#0A2342",padding:"clamp(2rem,5vw,3.5rem) clamp(1rem,3vw,2rem)"}}>
        <h2 style={{color:"#fff",fontSize:"clamp(18px,4vw,24px)",fontWeight:700,textAlign:"center",marginBottom:6}}>Built on trust. Three layers deep.</h2>
        <p style={{color:"rgba(255,255,255,0.5)",textAlign:"center",fontSize:14,marginBottom:"2rem"}}>Every ranking verified by three independent sources — not just user reviews.</p>
        <div className="r-grid-3" style={{maxWidth:900,margin:"0 auto"}}>
          {[
            {n:"01",t:"Professional Panel",d:"A curated group of dive professionals, photographers, culinary directors, and hospitality experts.",w:"3× weight"},
            {n:"02",t:"Verified Public Votes",d:"Any guest with proof of visit can vote. Weight adjusted by dive experience and expertise.",w:"1.0–1.4× weight"},
            {n:"03",t:"Annual Review Committee",d:"Once a year, 10 experts convene to verify consistency and confirm final rankings.",w:"Override authority"},
          ].map(i=>(
            <div key={i.n} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"1.5rem"}}>
              <div style={{fontSize:32,fontWeight:700,color:"rgba(255,255,255,0.12)",marginBottom:"0.75rem"}}>{i.n}</div>
              <h4 style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:8}}>{i.t}</h4>
              <p style={{fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.6,marginBottom:10}}>{i.d}</p>
              <span style={{background:"rgba(232,114,58,0.2)",color:"#E8723A",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:4}}>{i.w}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
