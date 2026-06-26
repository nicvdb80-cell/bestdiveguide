"use client"
import { useState } from "react"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

type Resort = {
  rank: number
  name: string
  area: string
  country: string
  desc: string
  winner?: boolean
  bestStay?: boolean
}

const ALL: Resort[] = [
  { rank:1, name:"Coral Eye", area:"Bangka Island, North Sulawesi", country:"Indonesia", desc:"Best overall: boutique, intimate, design-led, excellent food, serious diving, strong house reef and warm hospitality.", winner:true },
  { rank:2, name:"Amun Ini Beach Resort", area:"Bohol", country:"Philippines", desc:"Boutique, polished, good for Bohol diving and relaxed luxury." },
  { rank:3, name:"Minang Cove Resort", area:"Tioman", country:"Malaysia", desc:"Small island resort, good dive setting, peaceful stay." },
  { rank:4, name:"Six Senses Laamu", area:"Laamu Atoll", country:"Maldives", desc:"Excellent luxury stay, good house reef and sustainability." },
  { rank:5, name:"Koh Tao Cabana", area:"Koh Tao", country:"Thailand", desc:"Strong Thailand dive island base for mixed-level divers." },
  { rank:6, name:"Misool Resort", area:"Raja Ampat", country:"Indonesia", desc:"Best stay in Asia: remote private island, conservation-led, luxury but deeply connected to diving.", bestStay:true },
  { rank:7, name:"Atmosphere Resort & Spa", area:"Dauin", country:"Philippines", desc:"One of the best luxury dive resorts in the Philippines." },
  { rank:8, name:"Wakatobi Dive Resort", area:"Southeast Sulawesi", country:"Indonesia", desc:"One of Asia most complete luxury dive resorts, known for high service, fine dining and exceptional reef access." },
  { rank:9, name:"Siladen Resort & Spa", area:"Bunaken, North Sulawesi", country:"Indonesia", desc:"Excellent food, beachfront comfort, strong Bunaken diving and polished hospitality." },
  { rank:10, name:"Atlantis Dumaguete", area:"Dauin", country:"Philippines", desc:"Strong food reputation, macro and Apo Island access." },
  { rank:11, name:"Papua Explorers", area:"Raja Ampat", country:"Indonesia", desc:"Strong diver-focused resort, great access to central Raja Ampat, excellent service." },
  { rank:12, name:"Bunga Raya Island Resort", area:"Sabah", country:"Malaysia", desc:"Luxury option with diving, more resort than dive lodge." },
  { rank:13, name:"Sorido Bay Resort", area:"Raja Ampat", country:"Indonesia", desc:"One of the original Raja Ampat dive pioneers, strong house reef and dive heritage." },
  { rank:14, name:"Atlantis Puerto Galera", area:"Puerto Galera", country:"Philippines", desc:"Classic dive resort with strong repeat-guest reputation." },
  { rank:15, name:"Kri Eco Resort", area:"Raja Ampat", country:"Indonesia", desc:"Natural, eco-style, legendary location, excellent for real divers." },
  { rank:16, name:"Raja4Divers", area:"Raja Ampat", country:"Indonesia", desc:"Small, high-quality, quiet island feel, good for personal service." },
  { rank:17, name:"El Galleon Dive Resort", area:"Puerto Galera", country:"Philippines", desc:"Long-standing diver resort, good value and dive access." },
  { rank:18, name:"Cove Eco Resort", area:"Raja Ampat", country:"Indonesia", desc:"Boutique eco option, good comfort, strong house reef setting." },
  { rank:19, name:"Sipadan Kapalai Dive Resort", area:"Sabah", country:"Malaysia", desc:"Iconic water-village, strong Sipadan and Mabul access." },
  { rank:20, name:"Meridian Adventure Dive", area:"Raja Ampat", country:"Indonesia", desc:"Modern resort base, good logistics, speedboat-based diving." },
  { rank:21, name:"Magic Oceans Dive Resort", area:"Anda, Bohol", country:"Philippines", desc:"Quiet, well-reviewed, strong house reef and macro/reef mix." },
  { rank:22, name:"Murex Bangka", area:"Bangka Island, North Sulawesi", country:"Indonesia", desc:"Strong diving, good for combining Bangka, Bunaken and Lembeh." },
  { rank:23, name:"Four Seasons Landaa Giraavaru", area:"Baa Atoll", country:"Maldives", desc:"High-end with marine biology, manta access and service." },
  { rank:24, name:"Murex Manado", area:"Manado, North Sulawesi", country:"Indonesia", desc:"Reliable classic dive resort for Bunaken walls and North Sulawesi." },
  { rank:25, name:"Magic Island Dive Resort", area:"Moalboal", country:"Philippines", desc:"Good for sardine run, reefs and relaxed atmosphere." },
  { rank:26, name:"Lembeh Resort", area:"Lembeh Strait", country:"Indonesia", desc:"One of Asia best macro photography resorts, serious critter reputation." },
  { rank:27, name:"Mabul Water Bungalows", area:"Sabah", country:"Malaysia", desc:"Best luxury-style base around Mabul and Sipadan." },
  { rank:28, name:"The Sarojin", area:"Khao Lak", country:"Thailand", desc:"Best stay-style base for Similan and Richelieu trips." },
  { rank:29, name:"NAD Lembeh", area:"Lembeh Strait", country:"Indonesia", desc:"Photographer-focused, strong dive guides, good value for macro divers." },
  { rank:30, name:"Evolution Dive Resort", area:"Malapascua", country:"Philippines", desc:"Strong thresher shark diving reputation." },
  { rank:31, name:"Solitude Lembeh Resort", area:"Lembeh Strait", country:"Indonesia", desc:"Comfortable, photographer-friendly, strong macro diving base." },
  { rank:32, name:"Black Sand Dive Retreat", area:"Lembeh Strait", country:"Indonesia", desc:"Boutique macro resort for photographers and critter hunters." },
  { rank:33, name:"Buena Vida Resort & Spa", area:"Malapascua", country:"Philippines", desc:"Boutique stay option for Malapascua divers." },
  { rank:34, name:"Bastianos Lembeh", area:"Lembeh Strait", country:"Indonesia", desc:"Good value, established operation, easy access to muck sites." },
  { rank:35, name:"Bastianos Bangka", area:"Bangka Island", country:"Indonesia", desc:"Good diving, nice pool and dining setting with good food." },
  { rank:36, name:"Aiyanar Beach & Dive", area:"Anilao", country:"Philippines", desc:"High-quality with strong macro access and photography appeal." },
  { rank:37, name:"Borneo Divers Mabul Resort", area:"Sabah", country:"Malaysia", desc:"Established Sipadan operator, strong infrastructure." },
  { rank:38, name:"Sea Souls Dive Resort", area:"Bangka Island", country:"Indonesia", desc:"Strong guest comments for organized dives, good food and warm staff." },
  { rank:39, name:"Buceo Anilao Beach & Dive", area:"Anilao", country:"Philippines", desc:"Serious resort with strong guide reputation and macro focus." },
  { rank:40, name:"Gangga Island Resort & Spa", area:"North Sulawesi", country:"Indonesia", desc:"Elegant island resort, strong access to Bangka, Bunaken and Lembeh." },
  { rank:41, name:"Alam Batu", area:"East Bali", country:"Indonesia", desc:"Relaxed, remote Bali dive resort with macro, reef and shore diving." },
  { rank:42, name:"Soneva Fushi", area:"Baa Atoll", country:"Maldives", desc:"Ultra-luxury barefoot stay, strong marine life access." },
  { rank:43, name:"Crystal Blue Resort", area:"Anilao", country:"Philippines", desc:"Photographer-friendly with excellent macro diving." },
  { rank:44, name:"Scuba Seraya Resort", area:"Tulamben, Bali", country:"Indonesia", desc:"Good for macro and Liberty wreck, simple but diver-friendly." },
  { rank:45, name:"Seaventures Dive Rig", area:"Sabah", country:"Malaysia", desc:"Unique converted oil-rig for serious Sipadan divers." },
  { rank:46, name:"Mimpi Resort Tulamben", area:"Tulamben, Bali", country:"Indonesia", desc:"Best easy Bali wreck-diving resort for comfort and access." },
  { rank:47, name:"Solitude Acacia Resort", area:"Anilao", country:"Philippines", desc:"Comfortable with calm atmosphere for photographers." },
  { rank:48, name:"Kalimaya Dive Resort", area:"Sumbawa", country:"Indonesia", desc:"Remote, strong Coral Triangle diving, good food and stay." },
  { rank:49, name:"Komodo Resort", area:"Sebayur Island, Komodo", country:"Indonesia", desc:"Strong Komodo access with proper resort comfort and dive focus." },
  { rank:50, name:"Eagle Point Beach & Dive", area:"Anilao", country:"Philippines", desc:"Long-established with direct dive access and broad appeal." },
  { rank:51, name:"Sudamala Resort Seraya", area:"Labuan Bajo, Komodo", country:"Indonesia", desc:"Best stay-style Komodo resort, comfort with diving." },
  { rank:52, name:"The Datai Langkawi", area:"Langkawi", country:"Malaysia", desc:"One of Asia best nature-luxury stays with marine access." },
  { rank:53, name:"Jamahkiri Dive Resort & Spa", area:"Koh Tao", country:"Thailand", desc:"Comfortable resort with dive access and sea views." },
  { rank:54, name:"Bunaken Oasis Dive Resort", area:"Bunaken, North Sulawesi", country:"Indonesia", desc:"High-end Bunaken option, strong service, boutique comfort." },
  { rank:55, name:"Marco Vincent Dive Resort", area:"Puerto Galera", country:"Philippines", desc:"Classic resort with strong repeat-guest reputation." },
  { rank:56, name:"Tasik Ria Resort", area:"Manado", country:"Indonesia", desc:"Classic North Sulawesi dive base, good logistics for Bunaken." },
  { rank:57, name:"Papua Paradise Eco Resort", area:"Raja Ampat", country:"Indonesia", desc:"Luxury eco-style base with strong reef access and overwater bungalows." },
  { rank:58, name:"Dolphinbay Beachfront & Dive", area:"Puerto Galera", country:"Philippines", desc:"Quiet option with beachfront setting and reef access." },
  { rank:59, name:"Dive Into Raja Ampat", area:"Raja Ampat", country:"Indonesia", desc:"Good-value resort with direct dive access and diver-first feel." },
  { rank:60, name:"Mataking Reef Resort", area:"Semporna, Sabah", country:"Malaysia", desc:"Island resort with Sipadan-area access and house reef." },
  { rank:61, name:"Biodiversity Eco Resort", area:"Raja Ampat", country:"Indonesia", desc:"Small eco resort with house-reef atmosphere and conservation focus." },
  { rank:62, name:"Kasai Village Dive Resort", area:"Moalboal", country:"Philippines", desc:"Established for sardine run, turtles and Cebu diving." },
  { rank:63, name:"Park Hyatt Maldives Hadahaa", area:"Gaafu Alifu Atoll", country:"Maldives", desc:"Beautiful house reef, luxury villas, stay-plus-dive balance." },
  { rank:64, name:"Agusta Eco Resort", area:"Raja Ampat", country:"Indonesia", desc:"Remote private-island feel, clear water and peaceful stay." },
  { rank:65, name:"Waiwo Dive Resort", area:"Raja Ampat", country:"Indonesia", desc:"Accessible option near Waisai, easier logistics and transfers." },
  { rank:66, name:"Quo Vadis Dive Resort", area:"Moalboal", country:"Philippines", desc:"Practical diver base with convenient site access." },
  { rank:67, name:"Scuba Republic Raja Ampat", area:"Raja Ampat", country:"Indonesia", desc:"Simple diver-focused base with practical site access." },
  { rank:68, name:"Onong Resort", area:"Siladen, North Sulawesi", country:"Indonesia", desc:"Small island resort with Bunaken access and Italian hospitality." },
  { rank:69, name:"Liquid Dive Resort", area:"Dauin", country:"Philippines", desc:"Modern resort with strong diving and Apo access." },
  { rank:70, name:"Sipadan-Mabul Resort", area:"Mabul, Sabah", country:"Malaysia", desc:"Established Sipadan-area resort with strong diving." },
  { rank:71, name:"Living Colours Diving", area:"Bunaken, North Sulawesi", country:"Indonesia", desc:"Established Bunaken dive base with friendly atmosphere." },
  { rank:72, name:"Pura Vida Beach & Dive", area:"Dauin", country:"Philippines", desc:"Long-running beach resort with strong diver community." },
  { rank:73, name:"Cocotinos Manado", area:"Manado, North Sulawesi", country:"Indonesia", desc:"Comfortable resort with Bunaken dive logistics." },
  { rank:74, name:"Thalassa Dive Resort", area:"Manado, North Sulawesi", country:"Indonesia", desc:"Long-running operator with flexible Bunaken diving." },
  { rank:75, name:"Ocean Vida Beach & Dive", area:"Malapascua", country:"Philippines", desc:"Beachfront base with thresher-shark diving." },
  { rank:76, name:"Two Fish Divers Lembeh", area:"Lembeh Strait", country:"Indonesia", desc:"Good-value macro base with practical dive packages." },
  { rank:77, name:"Scuba Junkie Mabul", area:"Mabul, Sabah", country:"Malaysia", desc:"Diver-first with conservation focus and Sipadan access." },
  { rank:78, name:"Haad Tien Beach Resort", area:"Koh Tao", country:"Thailand", desc:"Stay-focused resort with beach setting and dive access." },
  { rank:79, name:"Kungkungan Bay Resort", area:"Lembeh Strait", country:"Indonesia", desc:"Historic Lembeh resort with macro-diving legacy." },
  { rank:80, name:"Tepanee Beach Resort", area:"Malapascua", country:"Philippines", desc:"Boutique stay with comfort and dive access." },
  { rank:81, name:"Blue Bay Divers", area:"Bangka, North Sulawesi", country:"Indonesia", desc:"Small dive base with good reef access and quiet setting." },
  { rank:82, name:"Machchafushi Island Resort", area:"South Ari Atoll", country:"Maldives", desc:"Whale-shark area, house reef and polished comfort." },
  { rank:83, name:"Tauch Terminal Resort", area:"Tulamben, Bali", country:"Indonesia", desc:"Classic Tulamben dive hotel with wreck and shore access." },
  { rank:84, name:"Sangat Island Dive Resort", area:"Coron", country:"Philippines", desc:"Iconic wreck-diving island resort near Coron wrecks." },
  { rank:85, name:"Villa Markisa", area:"Tulamben, Bali", country:"Indonesia", desc:"Boutique resort with macro reputation and refined comfort." },
  { rank:86, name:"Lankayan Island Dive Resort", area:"Sabah", country:"Malaysia", desc:"Remote island with macro, wreck and reef diving." },
  { rank:87, name:"Siddhartha Resort & Spa", area:"Kubu, Bali", country:"Indonesia", desc:"Comfortable oceanfront resort with diving and spa." },
  { rank:88, name:"El Rio y Mar Resort", area:"Busuanga, Coron", country:"Philippines", desc:"Comfortable Palawan resort with wreck diving." },
  { rank:89, name:"Matahari Tulamben Resort", area:"Tulamben, Bali", country:"Indonesia", desc:"Simple, reliable resort for Liberty wreck and value stays." },
  { rank:90, name:"Kubu Indah Dive & Spa", area:"Kubu, Bali", country:"Indonesia", desc:"Quiet northeast Bali resort with shore diving." },
  { rank:91, name:"Club Paradise Palawan", area:"Coron, Dimakya Island", country:"Philippines", desc:"Luxury-leaning island resort with diving access." },
  { rank:92, name:"Bali Dive Resort Amed", area:"Amed, Bali", country:"Indonesia", desc:"Good Amed dive resort with shore and boat diving." },
  { rank:93, name:"Uncle Chang Sipadan Lodge", area:"Mabul, Sabah", country:"Malaysia", desc:"Simple diver-first base with budget Sipadan access." },
  { rank:94, name:"Lotus Bungalows", area:"Candidasa, Bali", country:"Indonesia", desc:"Reliable east Bali base for Padang Bai and Nusa Penida." },
  { rank:95, name:"Scandi Divers Resort", area:"Puerto Galera", country:"Philippines", desc:"Well-known resort with easy reef and macro access." },
  { rank:96, name:"Alam Anda Resort", area:"North Bali", country:"Indonesia", desc:"Peaceful oceanfront resort with diving and spa." },
  { rank:97, name:"Mimpi Resort Menjangan", area:"Northwest Bali", country:"Indonesia", desc:"Comfortable base for Menjangan walls and relaxed stay." },
  { rank:98, name:"Mike Dauin Beach Resort", area:"Dauin", country:"Philippines", desc:"Friendly smaller resort with macro access and value." },
  { rank:99, name:"Zen Resort Bali", area:"Pemuteran, Bali", country:"Indonesia", desc:"Wellness-led resort with Menjangan dive access." },
]

function countryColor(c: string): [string, string] {
  if (c === "Indonesia") return ["#E1F5F8", "#006D78"]
  if (c === "Philippines") return ["#FEF0E8", "#C85A20"]
  if (c === "Malaysia") return ["#FFF8E1", "#F57F17"]
  if (c === "Maldives") return ["#EDE7F6", "#5E35B1"]
  if (c === "Thailand") return ["#FCE4EC", "#C62828"]
  return ["#F5F5F5", "#555"]
}

export default function Stays() {
  const [filterCountry, setFilterCountry] = useState("all")
  const filtered = filterCountry === "all" ? ALL : ALL.filter(e => e.country === filterCountry)

  return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#F8F9FA"}}>
      <Nav active="/stays" />
      <div style={{background:"linear-gradient(135deg,#0A2342 0%,#0D3060 100%)",padding:"4rem 2rem 3rem",textAlign:"center"}}>
        <div style={{fontSize:"11px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"#0097A7",marginBottom:"12px"}}>Best Dive Guide 2025</div>
        <h1 style={{color:"#fff",fontSize:"42px",fontWeight:700,lineHeight:1.15,maxWidth:"700px",margin:"0 auto 1rem"}}>The 99 Best Dive <span style={{color:"#E8723A"}}>Resorts</span> in Asia</h1>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:"16px",maxWidth:"560px",margin:"0 auto",lineHeight:1.7}}>Resorts, boutique hotels and island lodges — ranked on dive quality, stay, food, service, atmosphere and identity. No liveaboards.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",marginTop:"1.5rem",flexWrap:"wrap"}}>
          {[{label:"Indonesia",n:ALL.filter(e=>e.country==="Indonesia").length,color:"#0097A7"},{label:"Philippines",n:ALL.filter(e=>e.country==="Philippines").length,color:"#E8723A"},{label:"Malaysia",n:ALL.filter(e=>e.country==="Malaysia").length,color:"#F9A825"},{label:"Maldives",n:ALL.filter(e=>e.country==="Maldives").length,color:"#7E57C2"},{label:"Thailand",n:ALL.filter(e=>e.country==="Thailand").length,color:"#E53935"}].map(s=>(
            <div key={s.label} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"8px",padding:"10px 20px",textAlign:"center"}}>
              <div style={{color:s.color,fontWeight:700,fontSize:"22px"}}>{s.n}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:"11px",marginTop:"2px"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:"1px",background:"#E8E8E8"}}>
        <div style={{flex:1,background:"#E8723A",padding:"12px 1.5rem",textAlign:"center"}}><div style={{color:"#fff",fontSize:"10px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",opacity:0.8}}>Best Dive Resort</div><div style={{color:"#fff",fontSize:"14px",fontWeight:700,marginTop:"2px"}}>Coral Eye, North Sulawesi</div></div>
        <div style={{flex:1,background:"#0A2342",padding:"12px 1.5rem",textAlign:"center"}}><div style={{color:"rgba(255,255,255,0.5)",fontSize:"10px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>Best Stay</div><div style={{color:"#fff",fontSize:"14px",fontWeight:700,marginTop:"2px"}}>Misool Resort, Raja Ampat</div></div>
        <div style={{flex:1,background:"#0097A7",padding:"12px 1.5rem",textAlign:"center"}}><div style={{color:"rgba(255,255,255,0.7)",fontSize:"10px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase"}}>Best Food</div><div style={{color:"#fff",fontSize:"14px",fontWeight:700,marginTop:"2px"}}>Coral Eye, North Sulawesi</div></div>
      </div>
      <div style={{background:"#fff",borderBottom:"1px solid #E8E8E8",padding:"12px 2rem",display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#aaa",marginRight:"4px"}}>Filter</span>
        {["all","Indonesia","Philippines","Malaysia","Maldives","Thailand"].map(c=>(
          <button key={c} onClick={()=>setFilterCountry(c)} style={{fontSize:"12px",fontWeight:600,padding:"5px 14px",borderRadius:"20px",cursor:"pointer",border:filterCountry===c?"none":"1.5px solid #ddd",background:filterCountry===c?"#0A2342":"#fff",color:filterCountry===c?"#fff":"#555"}}>{c==="all"?"All Countries":c}</button>
        ))}
        <span style={{marginLeft:"auto",fontSize:"12px",color:"#aaa"}}>{filtered.length} of 99 shown</span>
      </div>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"2rem"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {filtered.map(e=>{const [bg,tc]=countryColor(e.country);return(
            <div key={e.rank} style={{background:"#fff",border:e.winner?"2px solid #E8723A":e.bestStay?"2px solid #0A2342":"1px solid #E8E8E8",borderRadius:"14px",padding:"1.25rem 1.5rem",display:"flex",alignItems:"flex-start",gap:"1.25rem",boxShadow:(e.winner||e.bestStay)?"0 4px 16px rgba(0,0,0,0.08)":"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={{minWidth:"48px",height:"48px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:e.rank===1?"#E8723A":e.rank<=3?"#0A2342":"#F5F5F5",color:e.rank<=3?"#fff":"#0A2342",fontSize:"17px",fontWeight:700}}>#{e.rank}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"5px"}}>
                  <span style={{fontWeight:700,fontSize:"15px",color:"#0A2342"}}>{e.name}</span>
                  {e.winner&&<span style={{background:"#E8723A",color:"#fff",fontSize:"10px",fontWeight:700,padding:"2px 8px",borderRadius:"4px",letterSpacing:"0.5px"}}>BEST RESORT</span>}
                  {e.bestStay&&<span style={{background:"#0A2342",color:"#fff",fontSize:"10px",fontWeight:700,padding:"2px 8px",borderRadius:"4px",letterSpacing:"0.5px"}}>BEST STAY</span>}
                  <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.5px",textTransform:"uppercase",padding:"2px 8px",borderRadius:"4px",background:bg,color:tc}}>{e.country}</span>
                </div>
                <div style={{fontSize:"12px",color:"#0097A7",fontWeight:600,marginBottom:"6px"}}>📍 {e.area}</div>
                <p style={{fontSize:"13px",color:"#555",lineHeight:1.6,margin:0}}>{e.desc}</p>
              </div>
            </div>
          )})}
        </div>
        <div style={{background:"#EFF4FB",border:"1px solid #D6E4F0",borderRadius:"10px",padding:"1.25rem 1.5rem",marginTop:"2rem",textAlign:"center"}}>
          <p style={{fontSize:"12px",color:"#1B6CA8",margin:0,lineHeight:1.6}}>Rankings based on TripAdvisor, Booking.com, PADI Travel, ZuBlu, Bluewater Dive Travel, Undercurrent, resort websites and dive-travel operator reputation.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
