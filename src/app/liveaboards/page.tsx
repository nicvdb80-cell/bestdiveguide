import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

type LBEntry = {
  rank: number
  name: string
  area: string
  country: string
  desc: string
  winner?: boolean
}

const entries: LBEntry[] = [
  { rank:1, name:"Emperor Harmoni", area:"Raja Ampat, Komodo, Banda Sea", country:"Indonesia", winner:true,
    desc:"Best overall Asia pick: modern boat, strong dive operation, spacious cabins, good food, all-inclusive style pricing, free nitrox." },
  { rank:2, name:"Scubaspa Yang", area:"Central & Southern Atolls", country:"Maldives",
    desc:"One of the highest-rated Maldives luxury liveaboards. Spa and dive hybrid concept." },
  { rank:3, name:"Scubaspa Zen Indonesia", area:"Komodo, Raja Ampat, Banda Sea", country:"Indonesia",
    desc:"Luxury comfort with strong itineraries across three of Indonesia best dive regions. High-end guest experience." },
  { rank:4, name:"Philippine Siren", area:"Tubbataha, Visayas", country:"Philippines",
    desc:"Strong reputation, good Tubbataha and Visayas itineraries, excellent crew comments." },
  { rank:5, name:"Mikumba Dua", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Excellent review scores, strong value, intimate Indonesian liveaboard feeling." },
  { rank:6, name:"Sawasdee Fasai", area:"Similan Islands, Richelieu Rock", country:"Thailand",
    desc:"Very high review volume and strong Similan and Richelieu Rock value." },
  { rank:7, name:"Spirit of Maldives", area:"Central Atolls", country:"Maldives",
    desc:"Strong verified reviews, especially for food, comfort and crew quality." },
  { rank:8, name:"Amaya Explorer", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Very high public review score, good balance of comfort, route quality, and price." },
  { rank:9, name:"Samambaia", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Premium phinisi, strong reputation, excellent for serious divers and photographers." },
  { rank:10, name:"Solitude One", area:"Tubbataha, Visayas", country:"Philippines",
    desc:"Premium Philippines and Tubbataha option with strong food and operation feedback." },
  { rank:11, name:"Blue Manta", area:"Raja Ampat, Komodo, Banda Sea", country:"Indonesia",
    desc:"Large, professional, very reliable for Raja Ampat, Komodo and Banda routes." },
  { rank:12, name:"Damai I", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"High-end service, boutique luxury, excellent food and comfort reputation." },
  { rank:13, name:"Carpe Vita", area:"Central & Southern Atolls", country:"Maldives",
    desc:"Premium Maldives liveaboard with a strong service reputation." },
  { rank:14, name:"Jelajahi Laut", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"High review score, good price-to-value ratio, strong guest feedback." },
  { rank:15, name:"White Manta", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Comfortable, professional, good for photographers and experienced divers." },
  { rank:16, name:"Mermaid I", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Long-established premium Indonesia liveaboard with strong safety and service reputation." },
  { rank:17, name:"Thailand Master", area:"Similans, Surin, Richelieu Rock", country:"Thailand",
    desc:"Strong brand, good for Similans, Surin, Richelieu and sometimes Myanmar routes." },
  { rank:18, name:"Ambai", area:"Raja Ampat, Banda Sea", country:"Indonesia",
    desc:"Serious diver boat with a strong Raja Ampat and Banda Sea reputation." },
  { rank:19, name:"Carpe Diem Maldives", area:"Central Atolls", country:"Maldives",
    desc:"Established Maldives brand, good central atoll trips." },
  { rank:20, name:"Tiare Cruise", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Premium comfort, boutique service, strong Indonesia itineraries." },
  { rank:21, name:"Dewi Nusantara", area:"Raja Ampat, Komodo, Banda Sea", country:"Indonesia",
    desc:"One of the grand luxury Indonesia vessels. Spacious and iconic." },
  { rank:22, name:"Infiniti", area:"Tubbataha, Visayas", country:"Philippines",
    desc:"Good Tubbataha and Visayas option with strong food and diving comments." },
  { rank:23, name:"Pindito", area:"Raja Ampat, Banda Sea, Alor", country:"Indonesia",
    desc:"Legendary Indonesia pioneer with a strong historical reputation among serious divers." },
  { rank:24, name:"La Galigo", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Popular, well-reviewed, strong Raja Ampat and Komodo value proposition." },
  { rank:25, name:"Mermaid II", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Reliable, professional, popular for Komodo and Raja Ampat routes." },
  { rank:26, name:"Emperor Virgo", area:"Central Atolls", country:"Maldives",
    desc:"Reliable Emperor Maldives boat, good manta and shark routes." },
  { rank:27, name:"Seatopia", area:"Similan Islands", country:"Thailand",
    desc:"Excellent review score, strong budget and value position." },
  { rank:28, name:"Damai II", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Bigger sister to Damai I with premium service and dive experience." },
  { rank:29, name:"Coralia", area:"Raja Ampat", country:"Indonesia",
    desc:"Luxury phinisi, good for Raja Ampat with strong comfort and design." },
  { rank:30, name:"Gaia Love", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Premium, spacious, photographer-friendly, strong dive deck setup." },
  { rank:31, name:"Philippines Aggressor II", area:"Tubbataha, Visayas", country:"Philippines",
    desc:"International standard, good for Tubbataha and Visayas." },
  { rank:32, name:"Seven Seas", area:"Raja Ampat, Komodo, Banda Sea", country:"Indonesia",
    desc:"Classic high-end Indonesia liveaboard with loyal repeat guests." },
  { rank:33, name:"Emperor Serenity", area:"Central Atolls", country:"Maldives",
    desc:"Larger comfort-focused Maldives liveaboard." },
  { rank:34, name:"Carpe Novo", area:"Central Atolls", country:"Maldives",
    desc:"Modern, comfortable Maldives operation." },
  { rank:35, name:"Lady Denok", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Consistently strong public review score and value." },
  { rank:36, name:"The Junk", area:"Similan Islands, Richelieu Rock", country:"Thailand",
    desc:"Character boat, classic wooden vessel, memorable guest experience." },
  { rank:37, name:"Atlantis Azores", area:"Tubbataha, Visayas", country:"Philippines",
    desc:"Established Philippines operator with good food and crew comments." },
  { rank:38, name:"Aliikai", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Boutique luxury option with strong comfort and service." },
  { rank:39, name:"Emperor Explorer", area:"Central & Northern Atolls", country:"Maldives",
    desc:"Established Maldives boat with reliable logistics and itineraries." },
  { rank:40, name:"Jaya", area:"Raja Ampat", country:"Indonesia",
    desc:"High review volume, good value, good Raja Ampat presence." },
  { rank:41, name:"Raja Ampat Aggressor", area:"Raja Ampat", country:"Indonesia",
    desc:"International brand, reliable Raja Ampat operation." },
  { rank:42, name:"Emperor Raja Laut", area:"Raja Ampat, Komodo", country:"Indonesia",
    desc:"Strong guest comments for crew, food, and relaxed operation." },
  { rank:43, name:"Stella Maris Explorer", area:"Tubbataha, Apo Reef", country:"Philippines",
    desc:"Solid Tubbataha and Apo Reef option, comfortable mid-to-upper range." },
  { rank:44, name:"EcoPro Seascape", area:"Central Atolls", country:"Maldives",
    desc:"Good review signal and value in Maldives." },
  { rank:45, name:"Amba Liveaboard", area:"Northern Atolls", country:"Maldives",
    desc:"Strong for northern Maldives and more remote routes." },
  { rank:46, name:"Epica", area:"Raja Ampat", country:"Indonesia",
    desc:"More affordable Raja Ampat option with strong guest praise." },
  { rank:47, name:"Eco Blue", area:"Central Atolls", country:"Maldives",
    desc:"Good food and value signals in public reviews." },
  { rank:48, name:"Akomo Isseki", area:"Raja Ampat", country:"Indonesia",
    desc:"Good value, intimate, suited to divers wanting smaller boats." },
  { rank:49, name:"Princess Sara", area:"Central Atolls", country:"Maldives",
    desc:"Strong review count and value-driven Maldives option." },
  { rank:50, name:"Arora Virgo", area:"Central Atolls", country:"Maldives",
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
  const indoCount = entries.filter(e => e.country === "Indonesia").length
  const maldivesCount = entries.filter(e => e.country === "Maldives").length
  const philCount = entries.filter(e => e.country === "Philippines").length
  const thaiCount = entries.filter(e => e.country === "Thailand").length

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

      {/* List */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"2rem"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {entries.map(e => {
            const [bg, tc] = countryColor(e.country)
            return (
              <div key={e.rank} style={{background:"#fff",border: e.winner ? "2px solid #E8723A" : "1px solid #E8E8E8",borderRadius:"12px",padding:"1.25rem 1.5rem",display:"flex",alignItems:"flex-start",gap:"1.25rem",boxShadow: e.winner ? "0 2px 12px rgba(232,114,58,0.15)" : "0 1px 4px rgba(0,0,0,0.04)"}}>
                {/* Rank */}
                <div style={{minWidth:"48px",textAlign:"center",paddingTop:"2px"}}>
                  <div style={{fontSize:"22px",fontWeight:700,color: e.rank<=3 ? "#E8723A" : "#0A2342",lineHeight:1}}>#{e.rank}</div>
                </div>
                {/* Body */}
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"5px"}}>
                    <span style={{fontWeight:700,fontSize:"15px",color:"#0A2342"}}>{e.name}</span>
                    {e.winner && (
                      <span style={{background:"#E8723A",color:"#fff",fontSize:"10px",fontWeight:700,padding:"2px 8px",borderRadius:"4px",letterSpacing:"0.5px"}}>
                        WINNER
                      </span>
                    )}
                    <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.5px",textTransform:"uppercase",padding:"2px 8px",borderRadius:"3px",background:bg,color:tc}}>
                      {e.country}
                    </span>
                  </div>
                  <div style={{fontSize:"12px",color:"#0097A7",fontWeight:600,marginBottom:"6px"}}>
                    📍 {e.area}
                  </div>
                  <p style={{fontSize:"13px",color:"#666",lineHeight:1.6,margin:0}}>{e.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Source note */}
        <div style={{background:"#EFF4FB",border:"1px solid #D6E4F0",borderRadius:"10px",padding:"1.25rem 1.5rem",marginTop:"2rem",textAlign:"center"}}>
          <p style={{fontSize:"12px",color:"#1B6CA8",margin:0,lineHeight:1.6}}>
            Rankings based on public review signals, booking-platform scores, operator reputation, dive route quality, service, food, safety and overall guest experience.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
