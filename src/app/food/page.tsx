"use client"
import { useState } from "react"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

type FoodEntry = {
  rank: number
  name: string
  area: string
  country: string
  type: string
  desc: string
  url?: string
  winner?: boolean
  liveaboard?: boolean
}

const ALL: FoodEntry[] = [
  { rank:1, name:"Coral Eye", area:"Bangka Island, North Sulawesi", country:"Indonesia", type:"Dive resort", desc:"Food feels like part of the trip: Indonesian flavour, Italian roots, communal table, relaxed boutique service.", url:"https://www.coraleye.com/", winner:true },
  { rank:2, name:"Siladen Resort & Spa", area:"Bunaken, North Sulawesi", country:"Indonesia", type:"Dive resort", desc:"One of Asia strongest true dive-resort food reputations, polished full-board dining.", url:"https://www.siladenresort.com/" },
  { rank:3, name:"Minang Cove Resort", area:"Tioman", country:"Malaysia", type:"Dive resort", desc:"Small peaceful island resort where food supports a slow stay.", url:"https://www.minangcove.com.my/" },
  { rank:4, name:"Six Senses Laamu", area:"Laamu Atoll", country:"Maldives", type:"Dive resort", desc:"Luxury food program with sustainability, wellness and strong house-reef diving.", url:"https://www.sixsenses.com/en/resorts/laamu/" },
  { rank:5, name:"Wakatobi Dive Resort", area:"Southeast Sulawesi", country:"Indonesia", type:"Dive resort", desc:"Remote luxury diving with chef-led full-board meals and strong buffet praise.", url:"https://www.wakatobi.com/" },
  { rank:6, name:"Misool Resort", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Private-island dining with fresh, well-paced meals matching the conservation story.", url:"https://www.misoolresort.com/" },
  { rank:7, name:"Atlantis Dumaguete", area:"Dauin", country:"Philippines", type:"Dive resort", desc:"Fresh, varied resort food with good chef comments and dietary handling.", url:"https://www.atlantishotel.com/" },
  { rank:8, name:"Emperor Harmoni", area:"Komodo & Raja Ampat routes", country:"Indonesia", type:"Liveaboard", desc:"Meals are part of the luxury rhythm: generous, varied and built around serious diving days.", url:"https://www.emperordivers.com/liveaboards/emperor-harmoni/", liveaboard:true },
  { rank:9, name:"Dive Into Lembeh", area:"Lembeh Strait", country:"Indonesia", type:"Dive resort", desc:"Very food-aware macro base, especially noted for vegan, vegetarian and gluten-free options.", url:"https://www.diveintolembeh.com/" },
  { rank:10, name:"Japamala Resort", area:"Tioman", country:"Malaysia", type:"Resort with dive access", desc:"Boutique food-and-stay reputation with diving for atmosphere lovers.", url:"https://www.japamalaresorts.com/" },
  { rank:11, name:"Lembeh Resort", area:"Lembeh Strait", country:"Indonesia", type:"Dive resort", desc:"High-end macro resort where food, service and diver snacks are part of the experience.", url:"https://www.lembehresort.com/" },
  { rank:12, name:"Atmosphere Resort & Spa", area:"Dauin", country:"Philippines", type:"Dive resort", desc:"Proper resort-restaurant standard beside strong diving: Filipino, international and wellness choices.", url:"https://www.atmosphereresorts.com/" },
  { rank:13, name:"Papua Explorers", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Fresh Indonesian and Western meals in an overwater setting with good dietary flexibility.", url:"https://www.papuaexplorers.com/" },
  { rank:14, name:"Dewi Nusantara", area:"Indonesia", country:"Indonesia", type:"Liveaboard", desc:"Elegant liveaboard dining with a yacht-style feel and meals designed for comfort between dives.", url:"https://www.dewinusantara.com/", liveaboard:true },
  { rank:15, name:"Amun Ini Beach Resort & Spa", area:"Bohol", country:"Philippines", type:"Dive resort", desc:"Boutique luxury feel, polished hospitality and quiet food experience.", url:"https://www.amunini.com/" },
  { rank:16, name:"Arenui", area:"Indonesia", country:"Indonesia", type:"Liveaboard", desc:"Boutique liveaboard with strong hospitality, plated meals and refined onboard atmosphere.", url:"https://www.thearenui.com/", liveaboard:true },
  { rank:17, name:"Komodo Resort", area:"Sebayur Island, Komodo", country:"Indonesia", type:"Dive resort", desc:"Island-resort dining with Italian influence, fresh seafood and Komodo diving access.", url:"https://www.komodoresort.com/" },
  { rank:18, name:"Bunga Raya Island Resort", area:"Sabah", country:"Malaysia", type:"Resort with dive access", desc:"Luxury stay with strong food standards and marine access.", url:"https://www.bungarayaresort.com/" },
  { rank:19, name:"Gangga Island Resort & Spa", area:"North Sulawesi", country:"Indonesia", type:"Dive resort", desc:"Elegant island setting with reliable meals, warm service and North Sulawesi dive access.", url:"https://www.ganggaisland.com/" },
  { rank:20, name:"Sea Souls Dive Resort", area:"Bangka Island", country:"Indonesia", type:"Dive resort", desc:"Relaxed, personal and warm; food praised as part of the small-resort atmosphere.", url:"https://www.seasoulsdiveresort.com/" },
  { rank:21, name:"Atlantis Puerto Galera", area:"Puerto Galera", country:"Philippines", type:"Dive resort", desc:"Established resort with reliable hospitality, food and diver social scene.", url:"https://www.atlantishotel.com/" },
  { rank:22, name:"Bastianos Bangka", area:"Bangka Island", country:"Indonesia", type:"Dive resort", desc:"Good value dive-resort meals with a friendly full-board rhythm.", url:"https://www.bastianos.com/" },
  { rank:23, name:"Murex Bangka", area:"Bangka Island", country:"Indonesia", type:"Dive resort", desc:"Reliable operator with practical, consistent food for dive-focused guests.", url:"https://www.murexdive.com/" },
  { rank:24, name:"Gaya Island Resort", area:"Sabah", country:"Malaysia", type:"Resort with dive access", desc:"Strong resort food, good stay quality and marine activities.", url:"https://www.gayaislandresort.com/" },
  { rank:25, name:"Murex Manado", area:"Manado", country:"Indonesia", type:"Dive resort", desc:"Classic dive-resort meals, smooth logistics and good Bunaken base.", url:"https://www.murexdive.com/" },
  { rank:26, name:"El Galleon Dive Resort", area:"Puerto Galera", country:"Philippines", type:"Dive resort", desc:"Classic diver resort with good restaurant-bar atmosphere after diving.", url:"https://www.elgalleon.com/" },
  { rank:27, name:"Bunaken Oasis Dive Resort", area:"Bunaken", country:"Indonesia", type:"Dive resort", desc:"Boutique Bunaken stay with higher-than-average food standard.", url:"https://www.bunakenoasis.com/" },
  { rank:28, name:"NAD Lembeh", area:"Lembeh Strait", country:"Indonesia", type:"Dive resort", desc:"Photographer-focused with solid meals, good snacks and diver-friendly rhythm.", url:"https://www.nad-lembeh.com/" },
  { rank:29, name:"Asia Divers Resort", area:"Puerto Galera", country:"Philippines", type:"Dive resort", desc:"Long-running diver base with dependable food and community feel.", url:"https://www.asiadivers.com/" },
  { rank:30, name:"Solitude Lembeh Resort", area:"Lembeh Strait", country:"Indonesia", type:"Dive resort", desc:"Comfortable macro resort where food helps soften the intense dive schedule.", url:"https://www.solitudeliveaboards.com/" },
  { rank:31, name:"Black Sand Dive Retreat", area:"Lembeh Strait", country:"Indonesia", type:"Dive resort", desc:"Small macro base with boutique feel and good food reputation.", url:"https://www.blacksanddive.com/" },
  { rank:32, name:"Sipadan Kapalai Dive Resort", area:"Sabah", country:"Malaysia", type:"Dive resort", desc:"Iconic overwater resort with varied buffet-style meals.", url:"https://www.sipadankapalai.com/" },
  { rank:33, name:"Thalassa Dive Resort Lembeh", area:"Lembeh Strait", country:"Indonesia", type:"Dive resort", desc:"Local food, helpful service and simple comfort.", url:"https://www.thalassamanado.com/" },
  { rank:34, name:"Thalassa Dive Resort Manado", area:"Manado", country:"Indonesia", type:"Dive resort", desc:"Long-running dive resort with relaxed full-board meals.", url:"https://www.thalassamanado.com/" },
  { rank:35, name:"Magic Oceans Dive Resort", area:"Anda, Bohol", country:"Philippines", type:"Dive resort", desc:"Quiet boutique with good food, service and peaceful dive rhythm.", url:"https://www.magicoceans.ph/" },
  { rank:36, name:"Park Hyatt Maldives Hadahaa", area:"Gaafu Alifu Atoll", country:"Maldives", type:"Dive resort", desc:"Excellent house reef combined with serious resort restaurants.", url:"https://www.hyatt.com/park-hyatt/malph-park-hyatt-maldives-hadahaa/" },
  { rank:37, name:"Raja4Divers", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Small, personal island resort where communal meals support the intimate atmosphere.", url:"https://www.raja4divers.com/" },
  { rank:38, name:"Sorido Bay Resort", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Serious Raja Ampat heritage with full-board dining built around remote diving.", url:"https://www.papuadiving.com/" },
  { rank:39, name:"Magic Island Dive Resort", area:"Moalboal", country:"Philippines", type:"Dive resort", desc:"Good diver-resort meals, social atmosphere and sardine-run access.", url:"https://www.magicisland.com.ph/" },
  { rank:40, name:"Kri Eco Resort", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Rustic and natural, with communal food that fits the classic diver mood.", url:"https://www.papuadiving.com/" },
  { rank:41, name:"Mabul Water Bungalows", area:"Sabah", country:"Malaysia", type:"Dive resort", desc:"Overwater comfort with buffet meals, appreciated for seafood.", url:"https://www.mabulwaterbungalows.com/" },
  { rank:42, name:"Cove Eco Resort", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Boutique eco stay with simple, fresh meals and calm dive-holiday balance.", url:"https://www.coveecolodge.com/" },
  { rank:43, name:"Meridian Adventure Dive", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Modern base with organised service, convenient dining and strong logistics.", url:"https://www.meridianadventuredive.com/" },
  { rank:44, name:"Evolution Dive Resort", area:"Malapascua", country:"Philippines", type:"Dive resort", desc:"Strong diver base with good food and bar for thresher-shark trips.", url:"https://www.evolution.com.ph/" },
  { rank:45, name:"Papua Paradise Eco Resort", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Overwater comfort, good meals and easy rhythm for long dive days.", url:"https://www.papuaparadise.com/" },
  { rank:46, name:"Waiwo Dive Resort", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Simple but useful food-and-dive base for practical travellers.", url:"https://www.waiwodiveresort.com/" },
  { rank:47, name:"Borneo Divers Mabul Resort", area:"Sabah", country:"Malaysia", type:"Dive resort", desc:"Serious Sipadan dive base with full-board food.", url:"https://www.borneodivers.com/" },
  { rank:48, name:"Biodiversity Eco Resort", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Eco-diver atmosphere, honest meals and strong sense of place.", url:"https://www.biodiversityecoresort.com/" },
  { rank:49, name:"Agusta Eco Resort", area:"Raja Ampat", country:"Indonesia", type:"Dive resort", desc:"Italian-linked island resort where food is part of the relaxed identity.", url:"https://www.agustaecoresort.com/" },
  { rank:50, name:"Buena Vida Resort & Spa", area:"Malapascua", country:"Philippines", type:"Dive resort", desc:"Boutique stay with better food comfort than simple island bases.", url:"https://www.buenavida.ph/" },
  { rank:51, name:"Kalimaya Dive Resort", area:"Sumbawa", country:"Indonesia", type:"Dive resort", desc:"Remote diving with good food and accommodation comments.", url:"https://www.kalimaya-dive-resort.com/" },
  { rank:52, name:"Alam Batu", area:"Bali", country:"Indonesia", type:"Dive resort", desc:"Peaceful full-board resort style with relaxed food after macro dives.", url:"https://www.alambatu.com/" },
  { rank:53, name:"Ocean Vida Beach & Dive", area:"Malapascua", country:"Philippines", type:"Dive resort", desc:"Beach restaurant feel, relaxed meals and convenient dive access.", url:"https://www.oceanvida.com/" },
  { rank:54, name:"Scuba Seraya Resort", area:"Tulamben, Bali", country:"Indonesia", type:"Dive resort", desc:"Diver-friendly local meals close to macro sites and the Liberty wreck.", url:"https://www.scubaseraya.com/" },
  { rank:55, name:"Mimpi Resort Tulamben", area:"Tulamben, Bali", country:"Indonesia", type:"Dive resort", desc:"Comfortable resort restaurant and easy shore-dive access.", url:"https://www.mimpi.com/" },
  { rank:56, name:"Seaventures Dive Rig", area:"Sabah", country:"Malaysia", type:"Dive resort", desc:"Unique oil-rig base; food is functional but total experience unforgettable.", url:"https://www.seaventuresdive.com/" },
  { rank:57, name:"Siddhartha Oceanfront Resort", area:"Kubu, Bali", country:"Indonesia", type:"Dive resort", desc:"Better stay-and-food level than many Bali dive bases, calm oceanfront dining.", url:"https://www.siddharthabali.com/" },
  { rank:58, name:"Villa Markisa", area:"Tulamben, Bali", country:"Indonesia", type:"Dive resort", desc:"Boutique dive resort with personal meal rhythm and comfort reputation.", url:"https://www.villa-markisa.com/" },
  { rank:59, name:"Tepanee Beach Resort", area:"Malapascua", country:"Philippines", type:"Dive resort", desc:"Good stay and restaurant standard for divers wanting comfort.", url:"https://www.tepanee.com/" },
  { rank:60, name:"Tauch Terminal Resort", area:"Tulamben, Bali", country:"Indonesia", type:"Dive resort", desc:"Practical, simple and reliable food for divers in the water all day.", url:"https://www.tauchterminal.com/" },
  { rank:61, name:"Mambo Dive Resort", area:"Nusa Penida, Bali", country:"Indonesia", type:"Dive resort", desc:"Modern setup with casual food energy and manta-season appeal.", url:"https://www.mambodiveresort.com/" },
  { rank:62, name:"Mataking Reef Dive Resort", area:"Sabah", country:"Malaysia", type:"Dive resort", desc:"Strong island stay with good resort food and Sipadan diving.", url:"https://www.mataking.com/" },
  { rank:63, name:"Two Fish Divers Bunaken", area:"Bunaken", country:"Indonesia", type:"Dive resort", desc:"Simple diver resort with communal meals and social table atmosphere.", url:"https://www.twofishdivers.com/" },
  { rank:64, name:"Thresher Cove Resort", area:"Malapascua", country:"Philippines", type:"Dive resort", desc:"Diver-friendly with functional meals and island-dive energy.", url:"https://www.threshersharkdivers.com/" },
  { rank:65, name:"Two Fish Divers Lembeh", area:"Lembeh", country:"Indonesia", type:"Dive resort", desc:"No-fuss dive meals and practical base for macro photographers.", url:"https://www.twofishdivers.com/" },
  { rank:66, name:"Two Fish Divers Amed", area:"Amed, Bali", country:"Indonesia", type:"Dive resort", desc:"Casual dive-resort food, easy Bali diving and relaxed community feel.", url:"https://www.twofishdivers.com/" },
  { rank:67, name:"Bohol Beach Club", area:"Bohol", country:"Philippines", type:"Resort with dive access", desc:"Strong resort food and stay quality, useful for comfort-seeking divers.", url:"https://www.boholbeachclub.com.ph/" },
  { rank:68, name:"Blue Corner Dive Resort", area:"Nusa Lembongan, Bali", country:"Indonesia", type:"Dive resort", desc:"Strong diver-social atmosphere with casual food and island energy.", url:"https://www.bluecornerdive.com/" },
  { rank:69, name:"Kandolhu Maldives", area:"North Ari Atoll", country:"Maldives", type:"Resort with dive access", desc:"Small luxury island with excellent food reputation and reef access.", url:"https://www.kandolhu.com/" },
  { rank:70, name:"Planet Nomadas Resort", area:"Bunaken", country:"Indonesia", type:"Dive resort", desc:"Small diver resort with local-style food and relaxed hospitality.", url:"https://www.planetnomadas.com/" },
  { rank:71, name:"Pom Pom Island Resort", area:"Sabah", country:"Malaysia", type:"Dive resort", desc:"Island resort with seafood, local dining and reef access.", url:"https://www.pompomisland.com/" },
  { rank:72, name:"Happy Gecko Dive Resort", area:"Bunaken", country:"Indonesia", type:"Dive resort", desc:"Friendly, simple and warm, meals that fit the classic Bunaken style.", url:"https://www.happygecko.com/" },
  { rank:73, name:"Bastianos Bunaken", area:"Bunaken", country:"Indonesia", type:"Dive resort", desc:"Reliable food, good value and straightforward full-board comfort.", url:"https://www.bastianos.com/" },
  { rank:74, name:"Amorita Resort", area:"Bohol", country:"Philippines", type:"Resort with dive access", desc:"Excellent food and stay reputation with nearby dive access.", url:"https://www.amoritaresort.com/" },
  { rank:75, name:"Froggies Divers Bunaken", area:"Bunaken", country:"Indonesia", type:"Dive resort", desc:"Classic diver resort with relaxed meals and strong heritage.", url:"https://www.froggiesdivers.com/" },
  { rank:76, name:"Onong Resort", area:"Siladen", country:"Indonesia", type:"Dive resort", desc:"Small island resort with Italian influence and simple good food.", url:"https://www.onongresort.com/" },
  { rank:77, name:"Kasai Village Dive Resort", area:"Moalboal", country:"Philippines", type:"Dive resort", desc:"Diver-focused with solid meals and easy Moalboal access.", url:"https://www.kasaivillage.com/" },
  { rank:78, name:"Cocotinos Manado", area:"North Sulawesi", country:"Indonesia", type:"Dive resort", desc:"Comfortable resort restaurant, good food and easy Bunaken diving.", url:"https://www.cocotinos.com/" },
  { rank:79, name:"Lankayan Island Dive Resort", area:"Sabah", country:"Malaysia", type:"Dive resort", desc:"Remote island with full-board meals and classic tropical feel.", url:"https://www.lankayan-island.com/" },
  { rank:80, name:"Tasik Ria Resort", area:"Manado", country:"Indonesia", type:"Dive resort", desc:"Established dive base with proper kitchen and restaurant for groups.", url:"https://www.tasikria.com/" },
  { rank:81, name:"Minahasa Lagoon", area:"Manado", country:"Indonesia", type:"Dive resort", desc:"Comfortable dive-resort meals and quiet setting for Bunaken diving.", url:"https://www.minahasalagoon.com/" },
  { rank:82, name:"Dolphin House Resort", area:"Moalboal", country:"Philippines", type:"Dive resort", desc:"Better stay-and-food level for Moalboal with relaxed dining.", url:"https://www.dolphinhouse-moalboal.com/" },
  { rank:83, name:"Kungkungan Bay Resort", area:"Lembeh", country:"Indonesia", type:"Dive resort", desc:"Historic Lembeh macro resort with full-board reputation.", url:"https://www.kungkungan.com/" },
  { rank:84, name:"Pulisan Jungle Beach Resort", area:"North Sulawesi", country:"Indonesia", type:"Dive resort", desc:"Rustic, atmospheric and adventurous, food fits the remote mood.", url:"https://www.pulisan.com/" },
  { rank:85, name:"The Taaras Beach & Spa", area:"Redang", country:"Malaysia", type:"Resort with dive access", desc:"Better resort food and stay quality for divers on Redang.", url:"https://www.thetaaras.com/" },
  { rank:86, name:"Kuda Laut Boutique Dive", area:"Siladen", country:"Indonesia", type:"Dive resort", desc:"Boutique island feel where food and service are personal.", url:"https://www.kudalautdiveresort.com/" },
  { rank:87, name:"Blue Bay Divers Sahaung", area:"Bangka", country:"Indonesia", type:"Dive resort", desc:"Small, local and intimate, meals strengthen the community atmosphere.", url:"https://www.bluebaydivers.de/" },
  { rank:88, name:"Sangat Island Dive Resort", area:"Coron", country:"Philippines", type:"Dive resort", desc:"Remote wreck-diving island with Robinson-style food atmosphere.", url:"https://www.sangatisland.com/" },
  { rank:89, name:"Nomad Divers Bangka", area:"Bangka Island", country:"Indonesia", type:"Dive resort", desc:"Simple diver resort with community table style and easy rhythm.", url:"https://www.nomaddiversbangka.com/" },
  { rank:90, name:"Bira Dive Camp", area:"South Sulawesi", country:"Indonesia", type:"Dive resort", desc:"Casual food scene with strong seafood and local flavour after wall dives.", url:"https://www.biradivecamp.com/" },
  { rank:91, name:"Club Paradise Palawan", area:"Coron", country:"Philippines", type:"Resort with dive access", desc:"Stronger resort food and stay comfort with diving nearby.", url:"https://www.clubparadisepalawan.com/" },
  { rank:92, name:"Aqua Blu", area:"Indonesia", country:"Indonesia", type:"Liveaboard", desc:"Expedition-yacht dining with luxury service and strong route appeal.", url:"https://www.aquablu.com/", liveaboard:true },
  { rank:93, name:"Samambaia", area:"Indonesia", country:"Indonesia", type:"Liveaboard", desc:"Boutique phinisi atmosphere with generous meals and warm dining rhythm.", url:"https://www.samambaia-liveaboard.com/", liveaboard:true },
  { rank:94, name:"Laguna Redang Island Resort", area:"Redang", country:"Malaysia", type:"Dive resort", desc:"Popular dive and snorkel base with easy buffet-style meals.", url:"https://www.lagunaredang.com.my/" },
  { rank:95, name:"Amira Indonesia", area:"Indonesia", country:"Indonesia", type:"Liveaboard", desc:"Spacious liveaboard with German-influenced organisation and reliable meals.", url:"https://www.amira-indonesia.com/", liveaboard:true },
  { rank:96, name:"Damai I & II", area:"Indonesia", country:"Indonesia", type:"Liveaboard", desc:"Luxury dive yachts where personalised service and meals are premium.", url:"https://www.damailiveaboard.com/", liveaboard:true },
  { rank:97, name:"El Rio y Mar Resort", area:"Coron", country:"Philippines", type:"Resort with dive access", desc:"Good resort meals, calm service and practical dive access.", url:"https://www.elrioymar.com/" },
  { rank:98, name:"Indo Siren", area:"Indonesia", country:"Indonesia", type:"Liveaboard", desc:"Classic Indonesia liveaboard with buffet meals and sociable dining deck.", url:"https://www.sirenfleet.com/", liveaboard:true },
  { rank:99, name:"Mermaid I", area:"Indonesia", country:"Indonesia", type:"Liveaboard", desc:"Reliable food rhythm for Komodo and Raja Ampat with good comfort.", url:"https://www.mermaid-liveaboards.com/", liveaboard:true },
]

function countryColor(c: string): [string, string] {
  if (c === "Indonesia") return ["#E1F5F8", "#006D78"]
  if (c === "Philippines") return ["#FEF0E8", "#C85A20"]
  if (c === "Malaysia") return ["#FFF8E1", "#F57F17"]
  if (c === "Maldives") return ["#EDE7F6", "#5E35B1"]
  return ["#F5F5F5", "#555"]
}

export default function Food() {
  const [filterCountry, setFilterCountry] = useState("all")
  const filtered = filterCountry === "all" ? ALL : ALL.filter(e => e.country === filterCountry)

  return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#F8F9FA"}}>
      <Nav />
      <div style={{background:"linear-gradient(135deg,#1A0A05 0%,#3D1500 100%)",padding:"clamp(2rem,5vw,4rem) clamp(1rem,3vw,2rem) clamp(1.5rem,4vw,3rem)",textAlign:"center"}}>
        <div style={{fontSize:"11px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"#E8723A",marginBottom:"12px"}}>Best Dive Guide 2025</div>
        <h1 style={{color:"#fff",fontSize:"clamp(26px,5.5vw,42px)",fontWeight:700,lineHeight:1.15,maxWidth:"700px",margin:"0 auto 1rem"}}>The 99 Best Dive <span style={{color:"#E8723A"}}>Food Experiences</span> in Asia</h1>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:"16px",maxWidth:"560px",margin:"0 auto",lineHeight:1.7}}>Where divers remember the meals as much as the dives. Resorts, island stays and liveaboards ranked on freshness, flavour, dietary care and atmosphere.</p>
        <div style={{display:"flex",gap:"16px",justifyContent:"center",marginTop:"1.5rem",flexWrap:"wrap"}}>
          {[{label:"Indonesia",n:ALL.filter(e=>e.country==="Indonesia").length,color:"#0097A7"},{label:"Philippines",n:ALL.filter(e=>e.country==="Philippines").length,color:"#E8723A"},{label:"Malaysia",n:ALL.filter(e=>e.country==="Malaysia").length,color:"#F9A825"},{label:"Maldives",n:ALL.filter(e=>e.country==="Maldives").length,color:"#7E57C2"}].map(s=>(
            <div key={s.label} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"8px",padding:"10px 20px",textAlign:"center"}}>
              <div style={{color:s.color,fontWeight:700,fontSize:"22px"}}>{s.n}</div>
              <div style={{color:"rgba(255,255,255,0.5)",fontSize:"11px",marginTop:"2px"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#E8723A",padding:"12px 2rem",textAlign:"center"}}>
        <span style={{color:"#fff",fontSize:"14px",fontWeight:700}}>🍽 Best Food Dive Experience — Coral Eye, Bangka Island, North Sulawesi</span>
      </div>
      <div style={{background:"#fff",borderBottom:"1px solid #E8E8E8",padding:"12px 2rem",display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#aaa",marginRight:"4px"}}>Filter</span>
        {["all","Indonesia","Philippines","Malaysia","Maldives"].map(c=>(
          <button key={c} onClick={()=>setFilterCountry(c)} style={{fontSize:"12px",fontWeight:600,padding:"5px 14px",borderRadius:"20px",cursor:"pointer",border:filterCountry===c?"none":"1.5px solid #ddd",background:filterCountry===c?"#0A2342":"#fff",color:filterCountry===c?"#fff":"#555"}}>{c==="all"?"All Countries":c}</button>
        ))}
        <span style={{marginLeft:"auto",fontSize:"12px",color:"#aaa"}}>{filtered.length} of 99 shown</span>
      </div>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"clamp(1rem,3vw,2rem)"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {filtered.map(e=>{const [bg,tc]=countryColor(e.country);return(
            <div key={e.rank} style={{background:"#fff",border:e.winner?"2px solid #E8723A":"1px solid #E8E8E8",borderRadius:"14px",padding:"1.25rem 1.5rem",display:"flex",alignItems:"flex-start",gap:"1.25rem",boxShadow:e.winner?"0 4px 16px rgba(232,114,58,0.1)":"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={{minWidth:"48px",height:"48px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:e.rank===1?"#E8723A":e.rank<=3?"#0A2342":"#F5F5F5",color:e.rank<=3?"#fff":"#0A2342",fontSize:"17px",fontWeight:700}}>#{e.rank}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"5px"}}>
                  {e.url ? <a href={e.url} target="_blank" rel="noopener noreferrer" style={{fontWeight:700,fontSize:"15px",color:"#0A2342",textDecoration:"none",borderBottom:"1px solid transparent"}}>{e.name}</a> : <span style={{fontWeight:700,fontSize:"15px",color:"#0A2342"}}>{e.name}</span>}
                  {e.winner&&<span style={{background:"#E8723A",color:"#fff",fontSize:"10px",fontWeight:700,padding:"2px 8px",borderRadius:"4px",letterSpacing:"0.5px"}}>BEST FOOD</span>}
                  {e.liveaboard&&<span style={{background:"#EEE8F8",color:"#5A2EA0",fontSize:"10px",fontWeight:700,padding:"2px 8px",borderRadius:"4px",letterSpacing:"0.5px"}}>LIVEABOARD</span>}
                  <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.5px",textTransform:"uppercase",padding:"2px 8px",borderRadius:"4px",background:bg,color:tc}}>{e.country}</span>
                </div>
                <div style={{fontSize:"12px",color:"#0097A7",fontWeight:600,marginBottom:"6px"}}>📍 {e.area}</div>
                <p style={{fontSize:"13px",color:"#555",lineHeight:1.6,margin:0}}>{e.desc}</p>
              </div>
            </div>
          )})}
        </div>
        <div style={{background:"#FEF0E8",border:"1px solid #FBCBA9",borderRadius:"10px",padding:"1.25rem 1.5rem",marginTop:"2rem",textAlign:"center"}}>
          <p style={{fontSize:"12px",color:"#C85A20",margin:0,lineHeight:1.6}}>Food-first editorial ranking based on public reputation, dive-travel visibility, food mentions, resort positioning and dining fit for divers.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
