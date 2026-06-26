"use client"
import { useState } from "react"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

type LB = {
  rank: number
  name: string
  area: string
  country: string
  desc: string
  url: string
  winner?: boolean
}

const ALL: LB[] = [
  { rank:1, name:"Emperor Harmoni", area:"Raja Ampat, Komodo, Banda Sea", country:"Indonesia", winner:true, url:"https://www.emperordivers.com/liveaboards/emperor-harmoni/",
    desc:"Best overall Asia pick: modern boat, strong dive operation, spacious cabins, good food, all-inclusive style pricing, free nitrox." },
  { rank:2, name:"Scubaspa Yang", area:"Central & Southern Atolls", country:"Maldives", url:"https://www.scubaspa.com/yang/",
    desc:"One of the highest-rated Maldives luxury liveaboards. Spa and dive hybrid concept." },
  { rank:3, name:"Scubaspa Zen Indonesia", area:"Komodo, Raja Ampat, Banda Sea", country:"Indonesia", url:"https://www.scubaspa.com/zen/",
    desc:"Luxury comfort with strong itineraries across three of Indonesia best dive regions. High-end guest experience." },
  { rank:4, name:"Philippine Siren", area:"Tubbataha, Visayas", country:"Philippines", url:"https://www.sirenfleet.com/philippine-siren/",
    desc:"Strong reputation, good Tubbataha and Visayas itineraries, excellent crew comments." },
  { rank:5, name:"Mikumba Dua", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://mikumbadiving.com/",
    desc:"Excellent review scores, strong value, intimate Indonesian liveaboard feeling." },
  { rank:6, name:"Sawasdee Fasai", area:"Similan Islands, Richelieu Rock", country:"Thailand", url:"https://www.sawasdeefasai.com/",
    desc:"Very high review volume and strong Similan and Richelieu Rock value." },
  { rank:7, name:"Spirit of Maldives", area:"Central Atolls", country:"Maldives", url:"https://www.spiritofmaldivesliveaboard.com/",
    desc:"Strong verified reviews, especially for food, comfort and crew quality." },
  { rank:8, name:"Amaya Explorer", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.amayacruise.com/",
    desc:"Very high public review score, good balance of comfort, route quality, and price." },
  { rank:9, name:"Samambaia", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.samambaia-liveaboard.com/",
    desc:"Premium phinisi, strong reputation, excellent for serious divers and photographers." },
  { rank:10, name:"Solitude One", area:"Tubbataha, Visayas", country:"Philippines", url:"https://www.solitudeliveaboards.com/",
    desc:"Premium Philippines and Tubbataha option with strong food and operation feedback." },
  { rank:11, name:"Blue Manta", area:"Raja Ampat, Komodo, Banda Sea", country:"Indonesia", url:"https://www.bluemantadiving.com/",
    desc:"Large, professional, very reliable for Raja Ampat, Komodo and Banda routes." },
  { rank:12, name:"Damai I", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.damailiveaboard.com/",
    desc:"High-end service, boutique luxury, excellent food and comfort reputation." },
  { rank:13, name:"Carpe Vita", area:"Central & Southern Atolls", country:"Maldives", url:"https://www.carpediemmaldives.com/carpe-vita/",
    desc:"Premium Maldives liveaboard with a strong service reputation." },
  { rank:14, name:"Jelajahi Laut", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.jelajahilaut.com/",
    desc:"High review score, good price-to-value ratio, strong guest feedback." },
  { rank:15, name:"White Manta", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.whitemanta.com/",
    desc:"Comfortable, professional, good for photographers and experienced divers." },
  { rank:16, name:"Mermaid I", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.mermaid-liveaboards.com/",
    desc:"Long-established premium Indonesia liveaboard with strong safety and service reputation." },
  { rank:17, name:"Thailand Master", area:"Similans, Surin, Richelieu Rock", country:"Thailand", url:"https://www.master-liveaboards.com/thailand-master/",
    desc:"Strong brand, good for Similans, Surin, Richelieu and sometimes Myanmar routes." },
  { rank:18, name:"Ambai", area:"Raja Ampat, Banda Sea", country:"Indonesia", url:"https://www.ambai-liveaboard.com/",
    desc:"Serious diver boat with a strong Raja Ampat and Banda Sea reputation." },
  { rank:19, name:"Carpe Diem Maldives", area:"Central Atolls", country:"Maldives", url:"https://www.carpediemmaldives.com/",
    desc:"Established Maldives brand, good central atoll trips." },
  { rank:20, name:"Tiare Cruise", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.tiarecruise.com/",
    desc:"Premium comfort, boutique service, strong Indonesia itineraries." },
  { rank:21, name:"Dewi Nusantara", area:"Raja Ampat, Komodo, Banda Sea", country:"Indonesia", url:"https://www.dewinusantara.com/",
    desc:"One of the grand luxury Indonesia vessels. Spacious and iconic." },
  { rank:22, name:"Infiniti", area:"Tubbataha, Visayas", country:"Philippines", url:"https://www.infinitiliveaboard.com/",
    desc:"Good Tubbataha and Visayas option with strong food and diving comments." },
  { rank:23, name:"Pindito", area:"Raja Ampat, Banda Sea, Alor", country:"Indonesia", url:"https://www.pindito.com/",
    desc:"Legendary Indonesia pioneer with a strong historical reputation among serious divers." },
  { rank:24, name:"La Galigo", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.lagaligoliveaboard.com/",
    desc:"Popular, well-reviewed, strong Raja Ampat and Komodo value proposition." },
  { rank:25, name:"Mermaid II", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.mermaid-liveaboards.com/",
    desc:"Reliable, professional, popular for Komodo and Raja Ampat routes." },
  { rank:26, name:"Emperor Virgo", area:"Central Atolls", country:"Maldives", url:"https://www.emperordivers.com/liveaboards/emperor-virgo/",
    desc:"Reliable Emperor Maldives boat, good manta and shark routes." },
  { rank:27, name:"Seatopia", area:"Similan Islands", country:"Thailand", url:"https://www.seatopialiveaboard.com/",
    desc:"Excellent review score, strong budget and value position." },
  { rank:28, name:"Damai II", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.damailiveaboard.com/",
    desc:"Bigger sister to Damai I with premium service and dive experience." },
  { rank:29, name:"Coralia", area:"Raja Ampat", country:"Indonesia", url:"https://www.coralia-liveaboard.com/",
    desc:"Luxury phinisi, good for Raja Ampat with strong comfort and design." },
  { rank:30, name:"Gaia Love", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.gaialoveadventures.com/",
    desc:"Premium, spacious, photographer-friendly, strong dive deck setup." },
  { rank:31, name:"Philippines Aggressor II", area:"Tubbataha, Visayas", country:"Philippines", url:"https://www.aggressor.com/",
    desc:"International standard, good for Tubbataha and Visayas." },
  { rank:32, name:"Seven Seas", area:"Raja Ampat, Komodo, Banda Sea", country:"Indonesia", url:"https://www.thesevenseas.net/",
    desc:"Classic high-end Indonesia liveaboard with loyal repeat guests." },
  { rank:33, name:"Emperor Serenity", area:"Central Atolls", country:"Maldives", url:"https://www.emperordivers.com/liveaboards/emperor-serenity/",
    desc:"Larger comfort-focused Maldives liveaboard." },
  { rank:34, name:"Carpe Novo", area:"Central Atolls", country:"Maldives", url:"https://www.carpediemmaldives.com/carpe-novo/",
    desc:"Modern, comfortable Maldives operation." },
  { rank:35, name:"Lady Denok", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.ladydenok.com/",
    desc:"Consistently strong public review score and value." },
  { rank:36, name:"The Junk", area:"Similan Islands, Richelieu Rock", country:"Thailand", url:"https://www.thejunk.com/",
    desc:"Character boat, classic wooden vessel, memorable guest experience." },
  { rank:37, name:"Atlantis Azores", area:"Tubbataha, Visayas", country:"Philippines", url:"https://www.atlantishotel.com/",
    desc:"Established Philippines operator with good food and crew comments." },
  { rank:38, name:"Aliikai", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.aliikai.com/",
    desc:"Boutique luxury option with strong comfort and service." },
  { rank:39, name:"Emperor Explorer", area:"Central & Northern Atolls", country:"Maldives", url:"https://www.emperordivers.com/liveaboards/emperor-explorer/",
    desc:"Established Maldives boat with reliable logistics and itineraries." },
  { rank:40, name:"Jaya", area:"Raja Ampat", country:"Indonesia", url:"https://www.jayaliveaboard.com/",
    desc:"High review volume, good value, good Raja Ampat presence." },
  { rank:41, name:"Raja Ampat Aggressor", area:"Raja Ampat", country:"Indonesia", url:"https://www.aggressor.com/",
    desc:"International brand, reliable Raja Ampat operation." },
  { rank:42, name:"Emperor Raja Laut", area:"Raja Ampat, Komodo", country:"Indonesia", url:"https://www.emperordivers.com/liveaboards/emperor-raja-laut/",
    desc:"Strong guest comments for crew, food, and relaxed operation." },
  { rank:43, name:"Stella Maris Explorer", area:"Tubbataha, Apo Reef", country:"Philippines", url:"https://www.stellamarisexplorer.com/",
    desc:"Solid Tubbataha and Apo Reef option, comfortable mid-to-upper range." },
  { rank:44, name:"EcoPro Seascape", area:"Central Atolls", country:"Maldives", url:"https://www.ecoprodivers.com/",
    desc:"Good review signal and value in Maldives." },
  { rank:45, name:"Amba Liveaboard", area:"Northern Atolls", country:"Maldives", url:"https://www.ambaliveaboard.com/",
    desc:"Strong for northern Maldives and more remote routes." },
  { rank:46, name:"Epica", area:"Raja Ampat", country:"Indonesia", url:"https://www.epicaliveaboard.com/",
    desc:"More affordable Raja Ampat option with strong guest praise." },
  { rank:47, name:"Eco Blue", area:"Central Atolls", country:"Maldives", url:"https://www.ecoblueliveaboard.com/",
    desc:"Good food and value signals in public reviews." },
  { rank:48, name:"Akomo Isseki", area:"Raja Ampat", country:"Indonesia", url:"https://www.akomoisseki.com/",
    desc:"Good value, intimate, suited to divers wanting smaller boats." },
  { rank:49, name:"Princess Sara", area:"Central Atolls", country:"Maldives", url:"https://www.princesssaramaldives.com/",
    desc:"Strong review count and value-driven Maldives option." },
  { rank:50, name:"Arora Virgo", area:"Central Atolls", country:"Maldives", url:"https://www.aroramaldives.com/",
    desc:"Very high score but smaller review sample. Promising luxury and value option." },
]

function countryColor(c: string): [string, string] {
  if (c === "Indonesia") return ["#E1F5F8", "#006D78"]
  if (c === "Maldives") return ["#EDE7F6", "#5E35B1"]
  if (c === "Philippines") return ["#FEF0E8", "#C85A20"]
  if (c === "Thailand") return ["#FFF8E1", "#F57F17"]
  return ["#F5F5F5", "#555"]
}

export default function Liveaboards() {
  const [filterCountry, setFilterCountry] = useState("all")

  const indoCount = ALL.filter(e => e.country === "Indonesia").length
  const maldivesCount = ALL.filter(e => e.country === "Maldives").length
  const philCount = ALL.filter(e => e.country === "Philippines").length
  const thaiCount = ALL.filter(e => e.country === "Thailand").length

  const filtered = filterCountry === "all" ? ALL : ALL.filter(e => e.country === filterCountry)

  return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#F8F9FA"}}>
      <Nav active="/liveaboards" />

      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0A2342 0%,#0D3060 100%)",padding:"4rem 2rem 3rem",textAlign:"center"}}>
        <div style={{fontSize:"11px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"#0097A7",marginBottom:"12px"}}>Best Dive Guide 2025</div>
        <h1 style={{color:"#fff",fontSize:"42px",fontWeight:700,lineHeight:1.15,maxWidth:"700px",margin:"0 auto 1rem"}}>
          The 50 Best <span style={{color:"#E8723A"}}>Liveaboards</span> in Asia
        </h1>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:"16px",maxWidth:"560px",margin:"0 auto",lineHeight:1.7}}>
          Ranked on dive quality, comfort, food, safety, crew, and overall guest experience across Indonesia, Maldives, Philippines, and Thailand.
        </p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",marginTop:"1.5rem",flexWrap:"wrap"}}>
          {[
            {label:"Indonesia",n:indoCount,color:"#0097A7"},
            {label:"Maldives",n:maldivesCount,color:"#7E57C2"},
            {label:"Philippines",n:philCount,color:"#E8723A"},
            {label:"Thailand",n:thaiCount,color:"#F9A825"},
          ].map(s=>(
            <div key={s.label} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"8px",padding:"10px 20px",textAlign:"center"}}>
              <div style={{color:s.color,fontWeight:700,fontSize:"22px"}}>{s.n}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:"11px",marginTop:"2px"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Winner banner */}
      <div style={{background:"#E8723A",padding:"1rem 2rem",textAlign:"center"}}>
        <span style={{color:"#fff",fontSize:"14px",fontWeight:700,letterSpacing:"0.5px"}}>
          🏆 No. 1 — Emperor Harmoni, Indonesia
        </span>
        <span style={{color:"rgba(255,255,255,0.8)",fontSize:"13px",marginLeft:"12px"}}>
          Best all-round liveaboard for serious divers who still want comfort.
        </span>
      </div>

      {/* Country filter */}
      <div style={{background:"#fff",borderBottom:"1px solid #E8E8E8",padding:"12px 2rem",display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#aaa",marginRight:"4px"}}>Filter</span>
        {["all","Indonesia","Maldives","Philippines","Thailand"].map(c => (
          <button key={c} onClick={() => setFilterCountry(c)} style={{
            fontSize:"12px",fontWeight:600,padding:"5px 14px",borderRadius:"20px",cursor:"pointer",
            border: filterCountry===c ? "none" : "1.5px solid #ddd",
            background: filterCountry===c ? "#0A2342" : "#fff",
            color: filterCountry===c ? "#fff" : "#555",
          }}>{c === "all" ? "All Countries" : c}</button>
        ))}
        <span style={{marginLeft:"auto",fontSize:"12px",color:"#aaa"}}>{filtered.length} of 50 shown</span>
      </div>

      {/* List */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"2rem"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {filtered.map(e => {
            const [bg, tc] = countryColor(e.country)
            return (
              <div key={e.rank} style={{
                background:"#fff",
                border: e.winner ? "2px solid #E8723A" : "1px solid #E8E8E8",
                borderRadius:"14px",
                padding:"1.5rem",
                display:"flex",
                alignItems:"flex-start",
                gap:"1.25rem",
                boxShadow: e.winner ? "0 4px 20px rgba(232,114,58,0.12)" : "0 1px 4px rgba(0,0,0,0.04)",
                transition:"box-shadow 0.2s",
              }}>
                {/* Rank circle */}
                <div style={{
                  minWidth:"52px",height:"52px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                  background: e.rank === 1 ? "#E8723A" : e.rank <= 3 ? "#0A2342" : "#F5F5F5",
                  color: e.rank <= 3 ? "#fff" : "#0A2342",
                  fontSize:"18px",fontWeight:700,
                }}>
                  #{e.rank}
                </div>

                {/* Body */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"6px"}}>
                    <span style={{fontWeight:700,fontSize:"16px",color:"#0A2342"}}>{e.name}</span>
                    {e.winner && (
                      <span style={{background:"#E8723A",color:"#fff",fontSize:"10px",fontWeight:700,padding:"3px 10px",borderRadius:"4px",letterSpacing:"0.5px"}}>
                        WINNER
                      </span>
                    )}
                    <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.5px",textTransform:"uppercase",padding:"3px 10px",borderRadius:"4px",background:bg,color:tc}}>
                      {e.country}
                    </span>
                  </div>

                  <div style={{fontSize:"12px",color:"#0097A7",fontWeight:600,marginBottom:"8px"}}>
                    📍 {e.area}
                  </div>

                  <p style={{fontSize:"13.5px",color:"#555",lineHeight:1.65,margin:"0 0 12px"}}>{e.desc}</p>

                  <a href={e.url} target="_blank" rel="noopener noreferrer" style={{
                    display:"inline-flex",alignItems:"center",gap:"6px",
                    fontSize:"12px",fontWeight:700,color:"#0A2342",
                    background:"#F0F2F5",padding:"6px 14px",borderRadius:"6px",
                    textDecoration:"none",transition:"background 0.15s",
                  }}>
                    Visit website ↗
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Source note */}
        <div style={{background:"#EFF4FB",border:"1px solid #D6E4F0",borderRadius:"10px",padding:"1.25rem 1.5rem",marginTop:"2rem",textAlign:"center"}}>
          <p style={{fontSize:"12px",color:"#1B6CA8",margin:0,lineHeight:1.6}}>
            Rankings based on public review signals from Liveaboard.com, PADI Travel, ZuBlu, Bluewater Dive Travel, DiveIN, and operator reputation.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
