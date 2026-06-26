"use client"

import { useState } from "react"
import Link from "next/link"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

const CATS = [
  {t:"Top 99 Asia",c:"#E8723A",h:"/top100",d:"The definitive ranking of Asia’s best dive experiences. Resorts, liveaboards and dive operators ranked by professional panel, verified votes and expert review.",icon:"/icons/top99asia.png"},
  {t:"Top 99 World",c:"#1B6CA8",h:"/top100-world",d:"The global edition. Every continent, every ocean. From the Red Sea to the Caribbean, the Pacific to the Mediterranean. Coming 2026.",icon:"/icons/top99world.png"},
  {t:"Best Stays",c:"#0097A7",h:"/stays",d:"99 dive resorts ranked on room quality, service, location and how well the stay supports serious diving.",icon:"/icons/beststays.png"},
  {t:"Best Food",c:"#C85A20",h:"/food",d:"99 dive food experiences ranked on freshness, flavour, dietary care and atmosphere. Where divers eat the best.",icon:"/icons/bestfood.png"},
  {t:"Dive Sites",c:"#1B6CA8",h:"/sites",d:"The best walls, wrecks, muck dives, seamounts and shark encounters. Ranked by visibility, marine life, access and wow factor.",icon:"/icons/divesites.png"},
  {t:"Liveaboards",c:"#5E35B1",h:"/liveaboards",d:"49 liveaboards across Indonesia, Maldives, Philippines and Thailand. Comfort, food, crew, safety and dive quality all scored.",icon:"/icons/liveaboards.png"},
  {t:"Sustainable",c:"#2E7D32",h:"/sustainable",d:"Operators leading on reef conservation, waste reduction, community impact and certified sustainability.",icon:"/icons/sustainable.png"},
]

function FlipCard({c}:{c:typeof CATS[0]}) {
  const [f,sF] = useState(false)
  return (
    <div onClick={()=>sF(!f)} style={{perspective:800,cursor:"pointer"}}>
      <div style={{position:"relative",width:"100%",height:240,transformStyle:"preserve-3d",transition:"transform .5s",transform:f?"rotateY(180deg)":"none"}}>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"linear-gradient(145deg,#0A2342 0%,#132F4C 100%)",borderRadius:14,border:"1px solid rgba(201,168,76,0.25)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem 1.5rem",textAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>
          <img src={c.icon} alt={c.t} style={{width:130,height:130,objectFit:"contain",marginBottom:14,filter:"drop-shadow(0 0 8px rgba(201,168,76,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.5))"}} />
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
